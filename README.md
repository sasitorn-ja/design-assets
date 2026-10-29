# Design Assets

เว็บคู่มือ UI/UX design ของทุกโปรเจคในทีม (แบบ ui.shadcn.com) รันในเครื่อง ไม่ต้อง deploy

- ดู design แยกรายโปรเจค: สี ฟอนต์ เมนู/Layout ภาพหน้าจอจริง components และกติกา
- หยิบไปใช้ได้ทั้งธีม หรือทีละ component (ก๊อปโค้ด หรือ `npx shadcn add`)

## เริ่มใช้

```bash
npm install
npm run dev        # http://localhost:4000
```

ติดตั้ง component ลงโปรเจคของคุณ (ต้องเปิดเว็บนี้ค้างไว้):

```bash
npx shadcn@latest add http://localhost:4000/r/nong-wang-jai-metric-card.json
npx shadcn@latest add http://localhost:4000/r/rmc-salesupport-theme.json
```

## โปรเจคที่มี

| slug | โปรเจค | เว็บจริง |
| --- | --- | --- |
| nong-wang-jai | Project_NongWangJai | https://rmc.cipcloud.net/nong-wang-jai/ |
| pricing-monitor | Pricing Monitor | https://salespark.cipcloud.net/s-and-op-pricing-monitor |
| rmc-salesupport | Project_Rmc-salesupport | https://salespark.cipcloud.net/s-and-op |
| stock | Project_Stock (SyncDrop) | https://store.cipcloud.net/syncdrop/ |
| suea-safety | Project_SUEASafety | https://safety.cipcloud.net/ |
| cpac-dealer | SaleSpark_cpac-dealer | https://salespark.cipcloud.net/cpac-dealer/scg |
| washout-pit | Washout_Pit | https://plant.cipcloud.net/cwp/login |

## โครงสร้าง

```
registry/<slug>/
  project.ts       สี ฟอนต์ เมนู กติกา รายการ component
  components/      โค้ดที่ให้คนอื่นก๊อป/ติดตั้ง
  demos.tsx        ตัวอย่างในแท็บ Preview
  screenshots/     ภาพหน้าจอจริง + manifest.json
app/               หน้าเว็บคู่มือ (Next.js)
app/r/[name]       endpoint สำหรับ shadcn CLI
scripts/           สคริปต์ login และเก็บภาพหน้าจอ
```

เพิ่มโปรเจคใหม่: ก๊อปโฟลเดอร์ใน `registry/` เป็น slug ใหม่ แล้วเพิ่มใน `lib/projects.ts` และ `lib/demos.ts`

## อัปเดตภาพหน้าจอ

```bash
npm run browser          # เปิด Chrome แล้ว login SSO เอง (ค้างไว้)
npm run capture          # เก็บภาพทุกโปรเจค
npm run capture stock    # หรือเฉพาะโปรเจคเดียว
```

รายการหน้าที่เก็บอยู่ใน `scripts/capture-pages.mjs` · session login อยู่ใน `.auth/` (อยู่ใน .gitignore ห้าม commit)

> ภาพหน้าจอมีข้อมูลจริงของบริษัท ใช้ภายในทีมเท่านั้น
