# คู่มือ Implement ระบบปลอมตัว SSO (เข้าใช้งานแทนผู้ใช้) แบบ S&OP

**ต้นแบบ** CPAC S&OP / RMC Sale Support · สาขา `release` · commit `36586bc4` · ตรวจเมื่อ 10 พฤศจิกายน 2569 · ทวนกับ commit `f20050ce` เมื่อ 16 พฤศจิกายน 2569 (flow จำลองไม่เปลี่ยน ปรับเฉพาะเรื่อง cache ในข้อ 1.2)  
**สำหรับ** นักพัฒนาและผู้ดูแลระบบที่ต้องการนำฟีเจอร์นี้ไปใช้กับแอปที่มี SSO, RBAC และการจำกัดขอบเขตข้อมูล

ระบบปลอมตัว SSO หรือระบบเข้าใช้งานแทนผู้ใช้ (User Impersonation) ให้ผู้ดูแลที่ได้รับอนุญาตเปิดแอปในมุมของบัญชีจริงอีกบัญชีหนึ่ง เช่น ตรวจว่า Sale คนหนึ่งเห็นเมนูและ Site ใด หรือทดสอบขั้นตอนโอน Site ด้วยสิทธิ์ของ Sale คนนั้น การยืนยันตัวตนยังผูกกับบัญชีผู้ดูแลตลอดช่วงการใช้งานแทน

- [พฤติกรรมจริงของ S&OP](#sop-current)
- [สเปกสำหรับโปรเจกต์ใหม่](#portable-design)
- [ฐานข้อมูลและวงจร session](#storage)
- [API และจุดเชื่อมระบบ](#api)
- [หน้าจอและสถานะข้ามแท็บ](#ui)
- [ทดสอบและนำขึ้นระบบ](#acceptance)
- [Prompt สำหรับส่งต่อ](#handoff)

<a id="sop-current"></a>

## 1. พฤติกรรมจริงของ S&OP

| เรื่อง | พฤติกรรมในต้นแบบ |
| --- | --- |
| ผู้มีสิทธิ์เริ่ม | ผู้ใช้ที่ resolve เป็น base role `super_admin` และยังไม่ได้อยู่ในโหมดใช้งานแทน |
| เป้าหมาย | Username ที่มีอยู่จริงใน RMC SSO และมี permission row กับ role definition ที่ active โดย role เป้าหมายต้องมี base role อื่นที่ไม่ใช่ `super_admin` การ resolve session จะใช้เป้าหมายได้เมื่อ assignment ให้ผลเป็น role ที่ไม่ใช่ `guest` ด้วย |
| การอ่านและเขียน | หน้า เมนู filter ขอบเขตกิจการ พื้นที่ Site และ action อิงผู้ใช้เป้าหมาย งานที่เขียนได้จะบันทึกจริงตามกฎปกติของ action นั้น เช่น การโอน Site ตรวจ action permission, write scope, เจ้าของ และผู้รับโอน |
| การระบุตัวตน | `session.user` กลายเป็นเป้าหมายทั้งตัว ส่วน `session.sub` ยังเป็น subject ของผู้ดูแลจาก base session ใน flow นี้ โค้ดธุรกิจใช้ `session.user.username ?? session.user.employeeCode ?? session.user.id` |
| การกลับบัญชีเดิม | กดป้ายสีเหลืองใน Navbar เพื่อลบคุกกี้จำลอง แล้วโหลดหน้า Role Matrix ใหม่ ส่วน logout ลบทั้งคุกกี้ login, business view scope และ simulation |
| ขอบเขตของฟีเจอร์ | สลับผู้ใช้ภายในแอป S&OP ผ่าน app session เดิม การเลือกกิจการผ่าน `/api/auth/view-scope` เป็นอีกฟีเจอร์หนึ่ง และ scope ที่ผู้ดูแลเลือกไว้จะกลับมาใช้หลังหยุดจำลอง |

### 1.1 API และลำดับการทำงานในต้นแบบ

| HTTP | Request / response | เงื่อนไข |
| --- | --- | --- |
| `GET /api/auth/permission-simulation` | `200 { simulation, users }` | Super Admin หรือ session ที่กำลังจำลองเข้าได้ รายชื่อมาจาก directory จัดการสิทธิ์ที่ join กับ active permission และ role definition |
| `POST /api/auth/permission-simulation` | `{ "username": "SALE01" }` → `200 { "ok": true }` พร้อม Set-Cookie | Super Admin ที่ยังไม่ได้จำลอง ตรวจ username ใน SSO โดยตรงอีกครั้ง รวมถึงตรวจ active permission และ active role |
| `POST /api/auth/permission-simulation` | `{ "action": "stop" }` → `200 { "ok": true }` พร้อมลบคุกกี้ | Super Admin หรือ session ที่กำลังจำลองเข้าได้ |
| `GET /api/auth/session` | `200 { authenticated: true, user }` หรือ `401 { authenticated: false }` | คืน effective user ของ request นั้น |
| `GET /api/auth/logout` | Redirect ออกจากแอปและลบคุกกี้ | ปลายทางต่างกันตามโหมด deployment |

API ควบคุมคืน `403` เมื่อไม่มี session หรือสิทธิ์ไม่ผ่าน, `400` เมื่อเป้าหมายใช้ไม่ได้ และ `500` เมื่อขั้นตอนออกคุกกี้ไม่มี secret รายชื่อแต่ละแถวมี `username`, `displayName`, `email`, `roleCode`, `assignedRoleCode`, `roleName`, `division` และ `divisionSource` รายชื่อสำหรับเลือกมีข้อมูลจากผู้ใช้ที่ระบบรู้จักด้วย จึงอาจมีรายการที่ POST เริ่มใช้งานแทนปฏิเสธเมื่อหาใน SSO ไม่พบ ชื่อกิจการใน picker มาจากกิจการแรกของ role หรือ division/company ของ SSO โดย `central_agency` แสดง “ทุกกิจการ” ค่าเหล่านี้ใช้แสดงผล ส่วนการตัดสิน scope เกิดใน DAL

1. SSO callback สร้าง `rmc_app_session` แบบ signed JSON ซึ่งเก็บ identity/profile กับ `sub`, `iat`, `exp` อายุ 8 ชั่วโมง และ resolve สิทธิ์ปัจจุบันจากระบบภายหลัง
2. เมื่อเริ่มจำลอง handler เซ็น payload `{ targetUsername }` ด้วย HMAC-SHA256 และ `APP_SESSION_SECRET` โดยแยกคุกกี้ `rmc_permission_simulation` ออกจาก base session คุกกี้ตั้ง `HttpOnly`, `SameSite=Lax`, `Path=/`, `Secure` ใน production และ browser `Max-Age` 8 ชั่วโมง ชื่อคุกกี้เปลี่ยนตาม `APP_COOKIE_NAMESPACE` เมื่อกำหนดค่า
3. ในเส้นทาง local app session, `getAppSession()` ตรวจ base session, resolve สิทธิ์ผู้ดูแล, ตรวจลายเซ็น simulation แล้วโหลด assignment, role และ profile ของเป้าหมาย เมื่อเงื่อนไขผ่านจะสร้าง `session.user` ใหม่ โดยใช้ target username เป็น `id` และ `employeeCode` ใน simulation รวมทั้งใส่ `simulation: { roleCode, roleName, targetUsername }` การอ่าน profile ใช้ SSO replica และ fallback ข้อมูลแสดงผลจากแอป หรือใช้ username เมื่อไม่มี profile
4. `assignedRoleCode` คือ role ที่กำหนดจริงและใช้หา route, permission และ scope ส่วน `roleCode` คือ base role ที่โค้ดบางส่วนใช้จัดกลุ่ม การ resolve assignment ใช้ข้อจำกัดรายคน เช่น module access และ Follow Up access มาลดสิทธิ์จากเพดานของ role แล้ว DAL ตรวจ business, area, Site และ ownership ตาม action อีกชั้น
5. Navbar เปิด picker เมื่อเป็น Super Admin และค้นจากชื่อที่แสดง, username หรือชื่อ Role ตามข้อมูลที่ส่งให้ตัวค้นหา เมื่อเริ่มสำเร็จจะโหลด `/` ใหม่ และเมื่อหยุดจะโหลดหน้าจัดการ Role เพื่อสร้างเมนูและ state ใหม่จาก server

### 1.2 จุดที่ควรปรับเมื่อนำไปใช้ในแอปอื่น

| สิ่งที่พบในต้นแบบ | ผลต่อการย้าย |
| --- | --- |
| Payload จำลองมี target username อย่างเดียว | ลายเซ็นช่วยตรวจการแก้ payload แต่ตัว payload ไม่มี `exp`, actor ID, base session ID หรือกลไก revoke ฝั่ง server การลบคุกกี้มีผลกับ browser ที่ได้รับ response และ callback SSO ปัจจุบันไม่ได้ลบคุกกี้ simulation ตอนสร้าง base session ใหม่ |
| Resolver กลับไปใช้ผู้ดูแลเมื่อ simulation ใช้ไม่ได้ | คำขอที่มาจากหน้าเป้าหมายอาจถูกประมวลผลในบริบทผู้ดูแลเมื่อสิทธิ์เปลี่ยน ให้แยกสถานะหมดอายุหรือถูกเพิกถอนออกจาก session ปกติอย่างชัดเจน |
| Directory ถูกตรวจในขั้น start ส่วน profile ระหว่างใช้งานมี fallback | การอ่าน profile สำเร็จหรือได้ local fallback ใช้ยืนยันสิทธิ์ปัจจุบันของบัญชี SSO ไม่ได้ ให้แยกตัวอ่านสถานะ identity จากตัวอ่านข้อมูลแสดงผล |
| Endpoint ใช้ POST และคุกกี้ SameSite=Lax | ใน handler ที่ตรวจไม่พบการตรวจ Origin หรือ CSRF token โดยเฉพาะ ให้นำระบบป้องกัน CSRF ของแอปปลายทางมาใช้กับทุก transition และ write |
| Session คืน target ใน `session.user` แต่ actor อยู่ใน `sub` | เส้นทางตัวอย่างอย่างโอน Site บันทึกผู้ทำรายการด้วย target username ให้ส่ง actor และ effective user แยกกันไปยัง audit sink ของแอปปลายทาง |
| Role/assignment และ read scope มี cache | ต้นแบบใช้ `SharedTtlCache` เมื่อตั้งค่า Redis จะ cache role/assignment/read scope ไว้ 5 นาที และ directory lookup 10 นาที ร่วมกันทุก replica โดยล้างทั้งกลุ่ม (`auth`, `directory`) เมื่อมีการแก้สิทธิ์ผ่านแอป หากไม่มี Redis จะ fallback เป็น cache ในโปรเซส ประมาณ 5 วินาทีสำหรับสิทธิ์ และ 30 วินาทีสำหรับ directory `write scope` อ่าน assignment ปัจจุบันแบบ uncached แยกออกมา การแก้สิทธิ์ตรงในฐานข้อมูลโดยไม่ผ่านแอปจะไม่ล้าง cache โปรเจกต์ปลายทางต้องกำหนด SLA เพิกถอน และทดสอบผลข้าม instance |
| Remote API มีเส้นทาง session แยก | `proxy.ts` เก็บ endpoint ควบคุมไว้ local แต่ resolver แบบ remote ออกจากฟังก์ชันก่อนประมวลผล simulation cookie ใน local flow หากมี backend กลาง ให้ backend ผู้บังคับสิทธิ์รับรู้บริบทการใช้งานแทนก่อนเปิดฟีเจอร์ |
| Realtime ตรวจตัวตนตอนเชื่อมต่อ | SSE ของต้นแบบ subscribe ตาม effective username ของ request ที่เปิด stream ให้กำหนดการปิดหรือ reauthorize stream เมื่อหยุด หมดอายุ หรือถูกเพิกถอนในระบบปลายทาง |

### 1.3 แผนที่ไฟล์อ้างอิง

ทุก path ด้านล่างอยู่ใน repo `Project_Rmc-salesupport`

| ส่วน | ไฟล์ต้นแบบ |
| --- | --- |
| ควบคุมและออกคุกกี้จำลอง | `src/app/api/auth/permission-simulation/route.ts` |
| สร้างและ resolve session | `src/lib/auth/session.ts`, `src/lib/auth/permission-simulation.ts`, `src/lib/auth/crypto.ts`, `src/lib/auth/config.ts`, `src/lib/cookie-names.ts` |
| Login, session, logout | SSO callback (`src/app/api/auth/callback/rmc-sso/route.ts`), session endpoint (`src/app/api/auth/session/route.ts`), logout endpoint (`src/app/api/auth/logout/route.ts`) |
| Directory และสิทธิ์ | `src/lib/sale-support/selectable-users.ts`, `src/lib/auth/permissions.ts`, `src/lib/auth/role-management.ts`, `src/lib/auth/permission-catalog.ts` |
| ขอบเขตและการเขียนจริง | `src/lib/auth/data-scope.ts`, `src/lib/sale-support/site-mutation-authorization.ts`, Site transfer route (`src/app/api/sites/transfer/route.ts`) |
| UI และการนำทาง | DesktopNavbar (`src/features/sale-support/components/DesktopNavbar.tsx`), Navbar สำหรับ mobile view (`src/features/sale-support/mobile/components/DesktopNavbar.tsx`), UserCombobox (`src/features/sale-support/components/UserCombobox.tsx`), desktop layout (`src/app/(desktop`)/layout.tsx), `src/lib/auth/guards.ts` |
| ขอบเขตเชื่อมระบบ | view-scope endpoint (`src/app/api/auth/view-scope/route.ts`), `src/proxy.ts`, Realtime API (`src/app/api/realtime/route.ts`), ฐานข้อมูล (`docs/database-connections.md`) |
| ชุดทดสอบ | `tests/unit/permission-simulation.test.ts`, `tests/unit/session-cookie.test.mjs`, `tests/e2e/desktop.spec.ts`, `tests/e2e/auth-and-api.spec.ts`, Playwright fixtures (`tests/e2e/helpers.ts`) |

<a id="portable-design"></a>

## 2. สเปกสำหรับโปรเจกต์ใหม่

ส่วนที่เหลือเป็นแบบสำหรับนำไป implement โดยใช้ระบบ login และระบบสิทธิ์เดิมของปลายทาง และเพิ่มการแยกตัวตนที่ยืนยันแล้วออกจากตัวตนที่ใช้ทำงาน

### 2.1 สองตัวตนใน request เดียว

| ค่า | ใช้ทำอะไร |
| --- | --- |
| `actor` | บัญชีที่ผ่าน SSO จริง ใช้ตรวจสิทธิ์เริ่มใช้งานแทน ผูก base session และบันทึก audit |
| `effectiveUser` | บัญชีที่ DAL ใช้ตรวจ page, action, tenant, object และ field scope ใช้เป็นผู้ทำรายการใน workflow ธุรกิจ ถ้าอยู่ในโหมดปกติคือบัญชีเดียวกับ actor |
| `impersonationId` | ID ฝั่ง server สำหรับเชื่อม audit และการเพิกถอนแต่ละครั้ง |
| `contextVersion` | UUID สำหรับเทียบว่าหน้าและ request อยู่ในบริบทเดียวกัน หมุนค่าเมื่อเริ่มหรือหยุด ส่งให้ client ได้และใช้ยืนยันตัวตนไม่ได้ |

เริ่มจาก `read_only` ให้การใช้งานแทนมีสิทธิ์อ่านเท่าที่เป้าหมายอ่านได้ หากต้องการพฤติกรรมเทียบเท่า S&OP ให้เปิด `act_as` เป็นนโยบายแยกสำหรับ workflow ที่อนุมัติ และตรวจพร้อมกันสามชั้น ได้แก่ action ที่เปิดให้ใช้งานแทน, สิทธิ์ปัจจุบันของเป้าหมาย และสิทธิ์ต่อ resource/field นั้น การจัดการ credential, MFA, session/token, role และ permission ควรสงวนให้ session ปกติ การอนุญาต export หรือ action ที่ส่งข้อมูลออกนอกระบบควรแยกจากสิทธิ์ดูหน้า โดยใช้ operation policy ฝั่ง server

กำหนด `impersonation.start` และ `impersonation.act_as` เป็น capability ฝั่ง server อาจผูกกับ Super Admin เพื่อคงนโยบายของ S&OP ให้ตรวจ tenant และขอบเขตของ actor, account status, role ปัจจุบัน, บัญชีเป้าหมายที่ถูกห้าม, การเลือกตนเอง และการซ้อน session การตรวจ privilege ของเป้าหมายต้องครอบคลุมทั้ง base role, custom role และ permission ที่มีผลจริง ใช้ immutable user ID ภายในแทนการผูก session กับชื่อที่อาจเปลี่ยนหรือถูกนำกลับมาใช้ใหม่ เชื่อมกับ identity เดิมผ่าน provider/issuer และ subject ที่แอปเชื่อถือ [OWASP Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

~~~typescript
// Server-side contract. Map IDs and permissions to the destination app.
type Principal = {
  userId: string;
  username: string;
  tenantId: string;
  roleCode: string;
  permissionKeys: readonly string[];
};

type Mode = "read_only" | "act_as";
type InvalidReason = "expired" | "revoked" | "actor_ineligible" | "target_ineligible";

type RequestAuth =
  | { state: "unauthenticated" }
  | {
      state: "normal";
      actor: Principal;
      effectiveUser: Principal;
      contextVersion: string;
    }
  | {
      state: "impersonating";
      actor: Principal;
      effectiveUser: Principal;
      contextVersion: string;
      impersonationId: string;
      mode: Mode;
      expiresAt: Date;
    }
  | {
      state: "impersonation_ended";
      actorUserId: string;
      contextVersion: string;
      reason: InvalidReason;
    };
~~~

ให้ auth/identity adapter แยกผล “บัญชีถูกเพิกถอน” กับ “อ่านระบบสิทธิ์ไม่ได้ชั่วคราว” ออกจากกัน เมื่อระบบต้นทางล่มให้คืน `503` และปิดการเข้าถึงข้อมูลใน request นั้น ส่วน session UI DTO ควรคืนเท่าที่จำเป็น เช่น effective display name, สถานะ, mode, เวลาหมดอายุ และ context version เก็บ internal session ID, credential และข้อมูล audit ไว้ฝั่ง server

<a id="storage"></a>

## 3. ฐานข้อมูลและวงจร session

### 3.1 โครงสร้างที่นำไปปรับใช้ได้

คุกกี้ login เดิมยังเป็นตัวพิสูจน์ตัวตน ผูกสถานะใช้งานแทนกับ base session ฝั่ง server โดยใช้ internal ID ของ session ที่ยกเลิกได้ หากระบบเดิมใช้ signed token แบบ stateless ให้ใช้ `sid` เฉพาะแต่ละ login และมี registry ที่ตรวจอายุและเพิกถอนได้ก่อนใช้สเปกนี้ ใช้คุกกี้แบบ `HttpOnly`, `Secure` ผ่าน HTTPS, `SameSite` ตาม flow SSO และตั้ง namespace แยกระหว่าง test กับ production [OWASP Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)

ตัวอย่าง PostgreSQL ด้านล่างสมมติว่า `auth_sessions(id)` เป็น UUID และมีข้อมูล actor, tenant, วันหมดอายุและการเพิกถอนอยู่แล้ว ปรับ FK และชนิด ID ให้ตรงกับแอปจริง สร้าง `auth_session_contexts` พร้อม base session ใหม่ใน transaction ของ login สำหรับ session เก่าให้ backfill ก่อนเปิดฟีเจอร์ หรือให้ผู้ใช้เข้าสู่ระบบใหม่เพื่อได้ context ครบ

~~~sql
CREATE TABLE auth_session_contexts (
  auth_session_id uuid PRIMARY KEY REFERENCES auth_sessions(id) ON DELETE CASCADE,
  context_version uuid NOT NULL
);

CREATE TABLE impersonation_sessions (
  id uuid PRIMARY KEY,
  auth_session_id uuid NOT NULL REFERENCES auth_session_contexts(auth_session_id) ON DELETE CASCADE,
  actor_user_id uuid NOT NULL,
  target_user_id uuid NOT NULL,
  tenant_id uuid NOT NULL,
  mode text NOT NULL CHECK (mode IN ('read_only', 'act_as')),
  reason text NOT NULL CHECK (char_length(btrim(reason)) BETWEEN 1 AND 500),
  started_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at timestamptz NOT NULL,
  invalidated_at timestamptz,
  invalidated_reason text,
  cleared_at timestamptz,
  CHECK (actor_user_id <> target_user_id),
  CHECK (expires_at > started_at)
);

CREATE UNIQUE INDEX impersonation_one_open_per_session
  ON impersonation_sessions (auth_session_id)
  WHERE cleared_at IS NULL;

CREATE INDEX impersonation_open_by_target
  ON impersonation_sessions (tenant_id, target_user_id)
  WHERE cleared_at IS NULL;

CREATE INDEX impersonation_open_by_actor
  ON impersonation_sessions (tenant_id, actor_user_id)
  WHERE cleared_at IS NULL;
~~~

`cleared_at IS NULL` หมายถึงผู้ใช้ยังไม่ได้กลับสู่บัญชีจริง รายการอาจใช้งานได้ หมดอายุ หรือถูกเพิกถอนแล้ว เก็บสถานะนี้ไว้จน stop หรือ base session สิ้นสุด เพื่อให้คำขอจากหน้าเดิมถูกปฏิเสธในระหว่างนั้น สร้าง ID ด้วย CSPRNG เช่น `crypto.randomUUID()` และกำหนด `expires_at = min(now + ttl, baseSession.expiresAt)` โดยใช้อายุแบบคงที่ ตัวอย่างเริ่มต้น 15 นาที กำหนดค่าจริงตามนโยบายปลายทาง ใช้แหล่งเวลาเดียวกันตอนสร้างและตรวจ expiry หากเวลาเหลือไม่พอให้ต่ออายุผ่าน flow login ก่อนเริ่ม

### 3.2 Transition และการตัดสิน request

| สถานะ | เหตุการณ์ | ผล |
| --- | --- | --- |
| `normal` | Start ผ่านทุกเงื่อนไข | สร้างแถว open, หมุน context version, เขียน audit และเริ่มใช้ target |
| `impersonating` | Start อีกครั้ง | `409` ให้จบการใช้งานครั้งเดิมก่อน |
| `impersonating` | Stop ด้วย context ปัจจุบัน | ปิดแถว open, หมุน context version, เขียน audit แล้วกลับไปใช้สิทธิ์ปัจจุบันของ actor |
| `impersonating` | หมดอายุ, ถูก revoke, actor สูญสิทธิ์เริ่ม หรือ target ใช้ไม่ได้ | เปลี่ยนเป็น `impersonation_ended` ให้ business request ถูกปฏิเสธ และยังเข้า session status กับ stop ได้ถ้า base session ยัง valid |
| `impersonation_ended` | Stop ด้วย context ปัจจุบัน | ปิดแถว open และกลับบัญชีจริงตามสิทธิ์ล่าสุด การ clear อาศัย session เจ้าของรายการ แม้ role ของ actor จะถูกลดแล้ว |
| ทุกสถานะ | Base session logout, ถูก revoke หรือหมดอายุ | `401` สำหรับ business/API ที่ต้อง login จบหรือยกเลิกการใช้งานแทนและเริ่ม session ใหม่หลัง SSO |
| ทุกสถานะที่ login แล้ว | Context ของ start, stop หรือ business mutation เก่ากว่า server | `409 AUTH_CONTEXT_CHANGED` ให้โหลด session ใหม่และให้ผู้ใช้ยืนยันการทำรายการอีกครั้ง |

ลำดับการ resolve สำหรับ request ปกติ

~~~text
base = verifyCurrentLogin(request)
if base is invalid: return unauthenticated

context, open = loadContextAndOpenImpersonation(base.id)
actor = loadCurrentActor(base.actorId, base.tenantId)
if identity or permission service is unavailable: return 503
if actor cannot sign in: reject base session

if no open impersonation:
    return normal(actor, effectiveUser = actor, context.version)

assert open is bound to base.id, actor.userId and base.tenantId
if open is expired, revoked or actor lost eligibility:
    return impersonation_ended

target = loadCurrentPrincipal(open.targetUserId, open.tenantId)
if target cannot sign in or fails target policy:
    return impersonation_ended

return impersonating(actor, effectiveUser = target, open, context.version)
~~~

ตรวจ `read_only` จากชนิดงานจริงที่ service จะทำ รวม Server Actions, upload, GraphQL mutations, export และ endpoint ที่ HTTP method เป็น GET แต่มี side effect ในระบบเดิม แยก side effect ออกหรือปฏิเสธ route นั้นในโหมดดูอย่างเดียว ใช้ตัว resolve เดียวกันจาก page, API และ DAL ฝั่ง server และตรวจ tenant/object/field ก่อนอ่านหรือเขียนข้อมูล [OWASP Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

### 3.3 การทำพร้อมกัน การเพิกถอน และ audit

- ใช้ transaction ล็อกแถว `auth_session_contexts` ด้วย `SELECT ... FOR UPDATE` ใน start/stop และ business mutation ที่อยู่ในขอบเขตฟีเจอร์ ตรวจ context version และ resolve สถานะจาก transaction หลังได้ lock จากนั้นตรวจ permission กับ resource และ commit งานพร้อม audit การล็อกนี้ทำให้ start/stop กับ mutation ของ base session เดียวกันมีลำดับชัดเจน
- เมื่อระบบยืนยันการเพิกถอนหรือพบว่า actor/target ขาดคุณสมบัติ ให้บันทึก `invalidated_at` และ `invalidated_reason` ภายใต้ lock เดียวกัน หรือใช้ lifecycle handler ที่ให้ผลเทียบเท่า สถานะ ended ต้องคงอยู่แม้ role ถูกคืนในภายหลัง ให้ reject business request ต่อจนผู้ใช้ stop และเริ่มใหม่ เมื่อ resolver พบการสิ้นสุดขณะประมวลผล mutation ให้จัดเก็บ transition แยกจากธุรกรรมธุรกิจที่ rollback
- การเพิกถอน role, target หรือบัญชีจากอีกระบบต้องใช้ current state จากแหล่งสิทธิ์จริง หากต้องการรับประกันว่าการเพิกถอนกับ write มีลำดับเด็ดขาด ให้จัดการใน authority เดียวกันด้วย lock หรือ permission version ที่ตรวจร่วมกับ transaction หากข้อมูลกระจายหลาย service ให้ประกาศช่วงหน่วงการเพิกถอนที่รองรับ และให้ปลายทางตรวจบริบทก่อนทำผลข้างเคียง
- เก็บ audit แบบ append-only แยกจากตาราง session และออกแบบ retention ตามนโยบายขององค์กร เก็บ `requestId`, `actorUserId`, `effectiveUserId`, `impersonationId`, `tenantId`, `operation`, `resourceId`, `result`, `reasonCode` และเวลา เหตุการณ์หลักคือ start, denied start, stop, expired, revoked และ attempted/committed sensitive action โดยใช้ event ID หรือ unique constraint กันการบันทึก transition เดิมซ้ำ
- เขียน audit ของ action ที่ commit แล้วใน transaction เดียวกับข้อมูลธุรกิจ หรือเขียน transactional outbox ใน transaction นั้นแล้วส่งต่อ audit sink ส่วน denied attempts บันทึกแยกเพื่อให้รอดจาก rollback จำกัดผู้ดูเหตุผลหรือ ticket และหลีกเลี่ยงการบันทึกคุกกี้, token, secret และ raw request body [OWASP Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- เก็บ attribution ในโดเมนตามผู้ใช้ที่มีผลกับ workflow เช่น `fromUserId` ของ Site transfer เป็น target ส่วน audit ใช้ทั้ง actor และ target ถ้า action สร้าง notification หรือ event ให้ recipient/scope มาจาก workflow ของ target หากเป็นงาน asynchronous ให้แนบข้อมูล audit ที่ server สร้างและตรวจสิทธิ์ก่อนผลข้างเคียงตามนโยบายของงานนั้น

ตัวอย่าง audit ของการโอน Site ที่ commit สำเร็จ ใช้ ID สมมติทั้งหมด

~~~json
{
  "eventId": "evt_381",
  "requestId": "req_290",
  "occurredAt": "2026-11-10T03:15:00Z",
  "tenantId": "tenant_rmc",
  "actorUserId": "admin_007",
  "effectiveUserId": "sale_021",
  "impersonationId": "imp_521",
  "mode": "act_as",
  "operation": "site.transfer.request",
  "resourceId": "site_104",
  "result": "committed"
}
~~~

<a id="api"></a>

## 4. API และจุดเชื่อมระบบ

### 4.1 API contract สำหรับปลายทาง

ทุก response ที่มี session, directory หรือข้อมูลส่วนบุคคลส่ง `Cache-Control: private, no-store` ใช้ error code ที่คงที่เพื่อให้ UI แยกเคสได้ และคืนข้อความที่ไม่เปิดเผยสถานะของบัญชีที่ผู้ขอไม่มีสิทธิ์ทราบ

| HTTP | Request | ผลสำเร็จ | เงื่อนไข |
| --- | --- | --- | --- |
| `GET /api/auth/session` | คุกกี้ login | `200 { state, user, contextVersion, impersonation? }` | ถ้าสถานะ ended ใช้ `user: null` และคืนเหตุผลแบบจำกัด ไม่มี base session คืน `401` |
| `GET /api/auth/impersonation/targets` | `?q=...&cursor=...` | `200 { users, nextCursor }` | ต้องอยู่ใน session ปกติและมี capability เริ่ม ส่งเฉพาะ ID, display name, username, role label, org label ที่จำเป็น จำกัด page size และ rate limit |
| `POST /api/auth/impersonation/start` | `{ targetUserId, mode, reason }` | `201 { state: "impersonating", contextVersion, expiresAt }` | ตรวจ CSRF, context version, actor, target และ mode ซ้ำฝั่ง server ตรวจ step-up หาก policy กำหนด |
| `POST /api/auth/impersonation/stop` | `{}` | `200 { state: "normal", contextVersion }` | ตรวจ CSRF, context version และความเป็นเจ้าของ base session รองรับการหยุดในสถานะ ended หากเป็น normal และ version ตรงให้คืนสถานะเดิม |
| `POST /api/auth/logout` | ตาม auth เดิมของแอป | ตาม auth เดิมของแอป | ยกเลิก base session และปิด impersonation ที่ผูกอยู่ รวมถึงลบคุกกี้ตาม scope เดิม |

`impersonation` ใน session DTO สำหรับ active mode ส่ง `{ mode, expiresAt }` เพิ่มได้ตามความต้องการของ UI โดยใช้ `user` เป็น effective user คำขอเปลี่ยนสถานะและ business mutation ส่ง `X-Auth-Context: <contextVersion>` สำหรับ Server Actions ให้ส่งค่าใน form แล้วตรวจฝั่ง server เช่นเดียวกัน

| Status | Error code ตัวอย่าง | การตอบสนองของ UI |
| --- | --- | --- |
| 400 | `INVALID_INPUT` | ตรวจ shape, enum, ID และความยาว reason ให้ตรงสเปก |
| 401 | `LOGIN_REQUIRED` | ไปหน้า login ตาม flow ปกติ |
| 403 | `FORBIDDEN`, `CSRF_REJECTED`, `TARGET_UNAVAILABLE`, `IMPERSONATION_READ_ONLY` | แสดงข้อความตามบริบท และไม่เผยข้อมูลเป้าหมายที่อยู่นอกขอบเขต |
| 409 | `AUTH_CONTEXT_CHANGED`, `IMPERSONATION_ALREADY_OPEN`, `IMPERSONATION_ENDED` | โหลดสถานะใหม่และให้ผู้ใช้เลือกทำรายการเอง หาก session จบให้แสดงปุ่มกลับบัญชีจริง |
| 429 | `RATE_LIMITED` | แจ้งช่วงรอตาม `Retry-After` เมื่อมี |
| 503 | `AUTH_DEPENDENCY_UNAVAILABLE` | คงบริบทที่หน้าเดิม แสดงว่าระบบตรวจสิทธิ์ใช้ไม่ได้ชั่วคราว และให้ผู้ใช้ลองใหม่ |

ใช้ CSRF protection เดิมของ framework สำหรับ start, stop, logout และ mutation ใน business API ตรวจ Origin กับ allowlist ที่ตั้งจาก public app origin ฝั่ง server ใน flow ที่กำหนดให้มาจาก browser ของแอป ใช้ CSRF token ตามกลไกเดิม ตั้ง CORS ให้จำกัด origin ที่เชื่อถือ และตรวจ content type ของ JSON endpoints [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

### 4.2 แบบลำดับโค้ดฝั่ง server

ตัวอย่างนี้ระบุขอบเขต transaction และจุดเสียบ adapter ให้ใช้ auth, validation, RBAC และ DB client ที่โปรเจกต์ปลายทางมีอยู่

~~~text
start(request):
    validate trusted origin, CSRF, content type and input
    verify base login; rate-limit by actor and tenant
    begin transaction
        lock context row for the verified base session
        recheck base session, compare context version
        reject any uncleared impersonation row
        reload actor and target by internal ID in the current tenant
        enforce start capability, target eligibility, mode and step-up policy
        insert impersonation row with bounded expiry
        rotate context version
        append start audit or audit outbox
    commit and return new context version

stop(request):
    validate trusted origin and CSRF
    verify base login
    begin transaction
        lock context row for the verified base session
        recheck base session, compare context version
        load open row by base session ID
        if no open row: return normal with current context version
        set cleared_at and rotate context version
        append stop audit or audit outbox
    commit and return new context version

mutateResource(request, operation, resourceId):
    validate trusted origin, CSRF and action payload
    verify base login
    begin transaction
        lock context row, recheck base session, compare context version
        resolve actor and effective user from current state
        reject ended state
        if impersonating:
            require act_as and an operation allowed during impersonation
        check effective user action, tenant, object and field permissions
        perform operation with effective user as business actor
        write audit with real actor and effective user or enqueue outbox
    commit and return result
~~~

ถ้าต้องรองรับ retry ของคำสั่งที่ทำซ้ำแล้วเกิดผลเพิ่ม ให้ใช้ idempotency key ที่ตรวจคู่กับ base session, context version, operation และ payload hash เก็บผลเดิมกับธุรกรรมธุรกิจ และตรวจสิทธิ์ก่อนเปิดเผยผลซ้ำ สำหรับ start/stop เมื่อ response สูญหาย ให้ client เรียก session status เพื่อทราบ state ที่ commit แล้วก่อนให้ผู้ใช้ตัดสินใจอีกครั้ง

### 4.3 จุดเสียบสำหรับ Next.js App Router

1. สร้าง Route Handlers ที่ `src/app/api/auth/impersonation/{targets,start,stop}/route.ts` โดยเรียก server-side service ร่วมกัน ใช้ `runtime = "nodejs"` หาก DB/auth SDK ต้องใช้ Node.js
2. อ่านคุกกี้ผ่าน `await cookies()` และเขียนหรือลบผ่าน Route Handler หรือ Server Action `proxy.ts` ทำ redirect หรือ precheck ได้ การอนุญาตจริงอยู่ใน handler/service/DAL และต้องครอบคลุมการเรียก API โดยตรง
3. ใช้ auth resolver จากหน้า, API, Server Actions, export/download, notification, SSE/WebSocket และงานที่เคยอ้าง identity จาก session เดิม แยก helper สำหรับอ่าน actor กับ effective user และตรวจทุกจุดที่อ้าง `session.sub` โดยตรง
4. ใช้ request-scoped memoization เฉพาะการอ่าน หากมี cache ข้าม request ให้แยก key ตาม tenant, effective user, policy/version และ read/write mode ตามข้อมูลที่ cache ใช้ หลีกเลี่ยงการใช้ request memoization ก่อนเริ่ม transaction ซ้ำในขั้น recheck
5. หาก Next.js เป็น BFF และ backend แยก ให้ backend ตรวจบริบทที่ส่งผ่านช่องทาง server-to-server ที่ยืนยันตัวตนแล้ว เช่น short-lived assertion ที่มี audience, issuer, actor, effective user, tenant, mode, expiry และ context reference พร้อมตรวจสถานะเมื่อจำเป็น ลบ header ที่ client สามารถส่งมาชนกับ header ภายใน และปิดฟีเจอร์ในโหมด remote ที่ยังไม่รองรับ
6. ตรวจ docs ของ Next.js เวอร์ชันที่ติดตั้งในปลายทางก่อนลงมือ สำหรับ repo ต้นแบบใช้ `node_modules/next/dist/docs/01-app/` ในหัวข้อ Route Handlers, cookies, Proxy และ Authentication

<a id="ui"></a>

## 5. หน้าจอและสถานะข้ามแท็บ

| ช่วง | พฤติกรรม |
| --- | --- |
| เริ่ม | แสดงปุ่ม “เข้าใช้งานเป็นผู้ใช้” เฉพาะ session ปกติที่ได้รับ capability ค้นด้วยชื่อ, username, role และกิจการตามข้อมูลที่เปิดเผยได้ ใช้ keyboard และ screen reader ได้ |
| ยืนยัน | แสดงชื่อ, role, กิจการ, mode และผลที่ผู้ใช้กำลังยืนยัน เก็บเหตุผลหรือเลข ticket หากเปิด `act_as` ระบุว่ารายการที่ได้รับอนุญาตจะบันทึกจริง |
| กำลังใช้งานแทน | แสดงป้ายคงที่ “กำลังใช้งานเป็น …” พร้อม mode, เวลาหมดอายุ และปุ่ม “กลับบัญชีของฉัน” ครอบคลุม desktop/mobile และหน้าที่โหลดตรงจาก URL |
| หมดอายุหรือถูกยกเลิก | ปิด controls และแสดงหน้าสถานะสำหรับกลับบัญชีจริง คำขอเดิมที่ส่งพร้อม context เก่าต้องถูกปฏิเสธที่ server |
| สลับบริบทสำเร็จ | ยกเลิก in-flight fetch, ปิด stream, เคลียร์ query cache/draft ที่ผูกผู้ใช้เดิม แล้วโหลดหน้าแรกที่มีสิทธิ์เข้า คำนวณ destination ภายในแอปและรองรับ base path |
| หลายแท็บ | ทุกแท็บของ base session เดียวกันใช้บริบทฝั่ง server เดียวกัน ส่งสัญญาณผ่าน BroadcastChannel หรือ reload session status เมื่อกลับมา focus/restore จาก back-forward cache หลีกเลี่ยงการส่ง profile หรือ credential ผ่านช่องนี้ ตรวจ context version ฝั่ง server ทุก mutation แม้ client พลาดสัญญาณ |

สำหรับ stream ที่เชื่อมค้าง ให้ผูกกับ base session และ context version ตอนเปิด ตรวจอีกครั้งเมื่อส่งเหตุการณ์หรือใช้กลไก disconnect/revalidation ที่ครอบคลุมการหมดอายุและ revoke รวมถึงเชื่อมใหม่หลังสลับผู้ใช้ สำหรับ cache ฝั่ง client และค่า UI ที่ต้องเก็บใน storage ให้แยกตาม tenant และ effective user ค่า draft ที่เกิดจากการใช้งานแทนควรมี context ของตัวเองเพื่อป้องกันการส่งข้ามบัญชี

<a id="acceptance"></a>

## 6. ทดสอบและนำขึ้นระบบ

### 6.1 Acceptance tests

| ระดับ | กรณี | ผลที่ต้องได้ |
| --- | --- | --- |
| Unit | Resolver ปกติ, actor/target ต่างกัน, หมดอายุ, revoke, dependency ล่ม | ได้ state ตามสเปก บริบทเป้าหมายใช้ identity กับ permission ของเป้าหมายครบ และ request ที่ใช้ session จบแล้วไม่ได้สิทธิ์ actor |
| API | ไม่มี session, Admin ธรรมดา, เริ่มซ้อน, เลือกตนเอง, target ข้าม tenant, role พิเศษ, role inactive, user inactive | ถูกปฏิเสธตาม contract โดยไม่สร้างแถว open หรือเปลี่ยน version |
| API | POST ตรงโดยไม่มี CSRF, Origin ผิด, body ผิด, แก้ user/tenant/mode ใน client | การตรวจฝั่ง server ปฏิเสธตาม policy ก่อนเกิดผล |
| Integration | Login ตรงเป็น target เทียบกับ actor ใช้งานแทน target | ชุดเมนู, read scope, รายการ Site, ownership และการแจ้งเตือนตรงกันสำหรับ operation ที่อนุญาต ตัวอย่างเทียบ Sale ที่มีและไม่มีสิทธิ์โอน |
| Integration | `read_only` เรียก API เขียน, export ที่ต้องอนุมัติ, Server Action, GET ที่มี side effect | DB และระบบปลายทางไม่เกิดการเปลี่ยนแปลงที่ policy ปฏิเสธ |
| Integration | `act_as` เขียนในขอบเขตและนอกขอบเขต, แก้ field ที่ไม่มีสิทธิ์ | สำเร็จเฉพาะรายการที่ผ่าน policy ใช้ target ใน workflow และ audit ระบุ actor พร้อม target |
| Integration | Disable actor, ย้าย target ข้าม tenant, ถอด role/module/assignment, target ถูก disable กลาง session | Request ถัดไปใช้ผลสิทธิ์ล่าสุดตาม SLA หรือเข้าสถานะ ended ตามกรณี ไม่มีข้อมูล tenant อื่นหลุด |
| Integration | Start พร้อมกันสองคำขอ, stop ชน write, stop จากแท็บเก่าหลังเริ่มรอบใหม่, response หายแล้ว retry | มี open row เดียว, request จาก version เก่าถูกปฏิเสธ, retry ไม่ทำ transition/side effect ซ้ำ |
| Integration | Logout, login ใหม่, base session หมดอายุ, replay token/cookie เดิมหลัง revoke | Session เก่าใช้ไม่ได้และสถานะจำลองไม่ติดไป login ใหม่ |
| Integration | Audit/outbox เขียนล้มเหลว, DB rollback, event delivery ซ้ำ | Business commit กับ audit ที่ต้องมีสอดคล้องกัน และ consumer กรอง event ซ้ำได้ |
| E2E | เริ่มจาก picker จริง, reload, deep link, สองแท็บ, หมดอายุ, หยุด, กลับบัญชีเดิม | หน้าและข้อมูลใช้ context เดียวกับ server และคุกกี้/session มี lifecycle ถูกต้อง |
| E2E | SSE, cache, browser Back, notification, export, base path และ remote mode | ไม่มีข้อมูลเก่าข้ามผู้ใช้ หน้า mobile/desktop ยังหยุดได้ URL ถูกต้อง และ remote mode ใช้ policy เดียวกันหรือปิดฟีเจอร์ |

สำหรับชุดทดสอบปลายทาง ให้มีอย่างน้อยหนึ่ง E2E ใช้ start และ stop endpoint จริงกับ test directory และ test DB ที่ seed ข้อมูลไว้ โดยไม่ inject role หรือ simulation ใน signed session โดยตรง ชุดทดสอบ S&OP ที่อ้างถึงบางรายการใช้ `PLAYWRIGHT_E2E=1`, synthetic session หรือ mock API จึงเป็นหลักฐานของ UI และการใช้ effective user ในบางเส้นทาง ชุดนั้นยังต้องเสริมการทดสอบ lifecycle จริงเมื่อนำไปใช้ในแอปใหม่

คำสั่งตรวจชุดอ้างอิงจาก root ของ S&OP

~~~bash
node --test tests/unit/session-cookie.test.mjs tests/unit/cookie-names.test.mjs
bun test tests/unit/permission-simulation.test.ts
npx playwright test tests/e2e/desktop.spec.ts tests/e2e/auth-and-api.spec.ts \
  --project=chromium-desktop --grep 'impersonat'
~~~

ตอนจัดทำเอกสาร รันคำสั่ง Node สำเร็จ 6 tests ซึ่งครอบคลุม signature, expiry, cookie namespace และการ refresh สิทธิ์ของ base session ส่วนคำสั่ง Bun และ Playwright เป็นชุดอ้างอิงเพิ่มเติมสำหรับนำไปรันใน environment ที่รองรับ

### 6.2 ลำดับ implement และ rollout

1. ทำบัญชีจุดที่อ่าน auth, RBAC, tenant, object/field scope และ entry points ที่เขียนหรือส่งข้อมูลออก แล้วกำหนด action ที่เข้าร่วมได้
2. เพิ่ม auth context, schema และ audit/outbox ทำ migration และ backfill บน staging ที่แยก DB, cookie namespace, secrets และ outbound services
3. เพิ่ม resolver, endpoints และ guards ให้ครบก่อนเปิด UI เชื่อม stream, file, cache และ worker ที่ได้รับผล
4. เปิด feature flag สำหรับผู้ดูแลกลุ่มเล็กในโหมด `read_only` ทดสอบด้วยบัญชีที่มี role และ scope ต่างกัน ตรวจ audit ว่าระบุสองตัวตนได้
5. เปิด `act_as` เฉพาะ workflow ที่ผ่าน acceptance tests และอนุมัติโดยเจ้าของระบบ ติดตาม start/stop, deny, revoke, error rate และการส่ง audit
6. เมื่อ rollback ให้ปิดการเริ่มและการใช้งานแทนทันที revoke รายการ open, ปิด stream ที่เกี่ยวข้อง และให้ผู้ใช้กลับบัญชีผ่าน stop หรือ login ใหม่ เก็บประวัติ audit ตาม retention

<a id="handoff"></a>

## 7. Prompt สำหรับส่งต่อ

คัดลอกส่วนนี้พร้อมแนบไฟล์ Markdown ให้ทีมพัฒนาหรือ coding agent ของโปรเจกต์ปลายทาง

> Implement ระบบเข้าใช้งานแทนผู้ใช้ตามคู่มือ S&OP ที่แนบ สำรวจ auth, SSO, RBAC, tenant/data scope, API, Server Actions และ audit เดิม แล้ว map actor กับ effective user ให้ชัดใน server-side resolver กลาง ใช้ immutable user ID และผูก impersonation กับ base session ที่เพิกถอนได้ เริ่มด้วย read-only รองรับ act-as เฉพาะ action ที่ผ่าน policy และ permission ของ target เพิ่ม start/stop/status, target picker, persistent banner, expiry/revocation, CSRF, audit สองตัวตน และ context version สำหรับ stale mutations แสดงผลและกรองข้อมูลตาม target รวมทุก data entry point ทำ migration และทดสอบด้วย endpoint จริงบน test DB แยก รายงานไฟล์ที่เปลี่ยน ข้อสมมติเรื่องระบบต้นทาง ผลการทดสอบ และจุดเชื่อมที่ยังต้องตั้งค่าก่อนเปิดใช้งาน

