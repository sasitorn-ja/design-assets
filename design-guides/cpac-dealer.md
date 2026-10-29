# SaleSpark CPAC Dealer — คู่มือดีไซน์พร้อมโค้ด

ไฟล์นี้ใช้ได้ด้วยตัวเอง มีสเปกดีไซน์ ธีม และโค้ด component ครบ ไม่ต้องเปิดเว็บคลัง ไม่ต้องใช้ shadcn CLI

## ใช้กับโปรเจคของคุณใน 3 ขั้นตอน

1. ดาวน์โหลดไฟล์ .md นี้เก็บไว้ในโปรเจคของคุณ
2. แนบไฟล์ให้ AI ที่ช่วยเขียนโค้ด หรือให้ AI อ่านไฟล์ในโฟลเดอร์
3. บอกชื่อส่วนที่อยากใช้ แล้วตรวจผลในโปรเจคของคุณ

### ข้อความพร้อมส่งให้ AI

> อ่านไฟล์นี้ แล้วนำดีไซน์ SaleSpark CPAC Dealer มาใช้กับโปรเจคของฉัน โดยเลือกเฉพาะ [ระบุ เช่น เมนู / ปุ่ม / ตาราง / ธีมสี] ตรวจ framework และ CSS ของโปรเจคก่อน ปรับโค้ดให้เข้ากัน คงการทำงาน API และสิทธิ์เดิมไว้ พร้อมตรวจหน้าจอมือถือและเดสก์ท็อป

## คำแนะนำสำหรับผู้พัฒนาและ AI

- ใช้ข้อมูลทั้งหมดในไฟล์นี้ได้โดยไม่ต้องเปิด localhost:4000 หรือเข้าถึง repo ต้นทางเพิ่มเติม
- โค้ดตัวอย่างเป็น React + TypeScript + Tailwind CSS ถ้าใช้ framework อื่น ให้ใช้สเปกดีไซน์แล้วเขียนใหม่ให้ตรงกับโปรเจคปลายทาง
- เลือกเฉพาะ component ที่ต้องการ ไม่จำเป็นต้องคัดลอกทั้งหมด ตรวจ import ที่อ้างไฟล์ข้างเคียงและนำไฟล์นั้นไปด้วย (โค้ดทุก component อยู่ท้ายไฟล์นี้)
- ติดตั้งเฉพาะ package ที่ component ที่เลือก import และยังไม่มีในโปรเจค; การอ่านไฟล์นี้ไม่ต้องติดตั้งอะไร
- ใช้ cn เดิมของโปรเจคถ้ามี มิฉะนั้นใช้โค้ด lib/utils.ts ด้านล่าง และปรับ alias @/ ให้ตรงกับปลายทาง
- ธีม CSS ด้านล่างเป็นตัวแปรพื้นฐาน สำหรับ Tailwind v4 ให้ผูกผ่าน @theme inline; สำหรับ v3 ให้ผูกใน tailwind.config ของปลายทาง
- ตรวจฟอนต์ที่ใช้จริง: var(--font-...) ต้องตั้งค่า font ในโปรเจคปลายทางก่อน ไฟล์นี้ไม่ได้ฝังไฟล์ฟอนต์หรือรูปภาพ
- บาง component ใช้สีที่กำหนดใน class โดยตรง เปลี่ยนธีมอย่างเดียวอาจไม่เปลี่ยนสีทั้งหมด
- เมนูและข้อมูลเป็นตัวอย่าง ต้องต่อ routing, state, API และสิทธิ์กับระบบปลายทาง พร้อมตรวจ keyboard, focus และ responsive
- อย่าทับ global CSS หรือ component เดิมทั้งไฟล์ ให้รวมเฉพาะส่วนที่เลือกและตรวจผลกระทบกับหน้าเดิม

## ภาพรวม

ศูนย์จัดการร้านค้า Dealer ดูยอดขาย อันดับ แคมเปญ โบรชัวร์ และแผนที่โรงงาน สีฟ้า CPAC #00A1E5 บนพื้นเทาฟ้า ตัวเลขใหญ่ชัด เมนูด้านบนเป็นปุ่มแคปซูล เมนูเปลี่ยนตามบทบาท (Dealer / Viewer / Admin / Super Admin) มีชุด shadcn components ครบที่สุดในทีม

แนวเทคโนโลยีต้นแบบ: Next.js 15, React 19, Tailwind CSS 3, shadcn (radix-ui), ECharts, Leaflet + markercluster, lucide-react

### บุคลิกของดีไซน์

- ฟ้า CPAC สด + กรมท่าเข้ม #092943
- การ์ดขาวมุม 16px เงาเบามาก
- ตัวเลข KPI ใหญ่ หน่วยเล็กข้างๆ
- ใช้สีแยกสินค้า/อันดับ (ทอง เงิน ทองแดง)

### เหมาะกับงาน

- Portal สำหรับคู่ค้า/ร้านค้าภายนอก
- Dashboard ยอดขาย + อันดับ + แคมเปญ
- ระบบที่มีหลายบทบาทและต้องสลับ role ได้
- อยากได้ชุด shadcn ที่ปรับธีมแล้วครบ (alert, dialog, tabs, slider, switch ฯลฯ)

## สี

### Brand & Ink

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Primary | #00A1E5 | ปุ่มหลัก, เมนู active, ลิงก์ |
| Primary hover | #008CCB | hover ปุ่มหลัก |
| Accent | #E8F6FD | พื้น soft, badge |
| Ink 900 | #092943 | หัวข้อ, ตัวเลข |
| Subtle | #577189 | เมนู, ข้อความรอง |
| Muted | #7890A1 | helper text |
| Background | #F2F6F9 | พื้นหลังหน้า |
| Surface subtle | #F8FAFC | หัวตาราง |
| Border | #DCE6ED | เส้นขอบ |
| Border strong | #B8D2E3 | input hover |

### Semantic

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Success | #0BAA76 | ยอดเพิ่ม, สำเร็จ |
| Warning | #F2A500 | เตือน |
| Danger | #DC2626 | ลบ, ผิดพลาด |
| Info | #00A1E5 | ข้อมูล |

### สินค้า / อันดับ

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Dealer Price | #F59E0B | สินค้าอันดับ 1, ทอง |
| โม่เล็ก | #0EA5E9 |  |
| Easypump | #10B981 |  |
| Superplus | #8B5CF6 |  |
| Advance WP | #06B6D4 |  |
| Rank 2 (เงิน) | #94A3B8 |  |
| Rank 3 (ทองแดง) | #B45309 |  |

## ฟอนต์และตัวอักษร

Font family: `var(--font-sarabun), 'TH Sarabun New', sans-serif`

Sarabun (สำรอง TH Sarabun New, TH Sarabun PSK) ตัวเลข KPI ตัวหนามากและเปิด tnum

| รายการ | ขนาด | น้ำหนัก | การใช้งาน |
| --- | --- | --- | --- |
| Page title | 24px | 800 | ภาพรวมยอดขาย |
| KPI value | 30–32px | 800 | 532,340.91 คิว |
| Card title | 17–18px | 800 | แนวโน้มยอดขาย |
| Body | 14px | 400–600 |  |
| Menu | 13px | 600 / 700 active |  |
| Badge | 11px | 700 | pill |
| Helper | 12px | 400 | คำอธิบายใต้ตัวเลข |

## ระยะห่าง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Page section gap | 12px | --page-section-gap |
| Card padding | 20px |  |
| Button | h 28–36px | sm 28 / default 32 / lg 36 |
| Filter bar | h 40px | select + date range |

## มุมโค้ง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Base | 12px (.75rem) | --radius ปุ่ม, เมนู |
| sm / md | 8px / 10px |  |
| Admin card | 16px | --admin-card-radius |
| Badge | 9999px |  |

## เงา

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Card | 0 2px 12px rgb(9 41 67 / .04) | --shadow-card |
| Raised | 0 4px 16px rgb(9 41 67 / .06) | --shadow-raised |
| Overlay | 0 10px 25px -5px rgb(9 41 67 / .18) | dialog, popover |
| Focus | 0 0 0 3px rgb(0 161 229 / .2) | --shadow-focus |

## Layout

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Header | เมนูบน + แถบชื่อหน้า/ตัวกรอง sticky |  |
| KPI row | 4 การ์ด |  |
| Content | 2 คอลัมน์ (กราฟ 60% / สัดส่วน 40%) |  |
| Mobile | tab bar ล่าง + header บาง |  |

## เมนูและการนำทาง

Top nav แคปซูล + Mobile tab bar ตามบทบาท

Header สีขาว โลโก้ SaleSpark ซ้าย เมนูเป็นปุ่มแคปซูลสูง 36px มุม 12px เมนูที่เลือกเป็นพื้นฟ้า #00A1E5 ตัวขาวพร้อมเงาฟ้า บางเมนูมี badge ตัวเล็ก (เช่นจำนวนแคมเปญ) ขวามีปุ่มสลับ role และเมนูผู้ใช้ ใต้ header มีแถบชื่อหน้า + ตัวกรอง (กิจการ ภาค สินค้า ช่วงวันที่) บนมือถือใช้ tab bar ด้านล่าง 5 ปุ่ม

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| เมนู | h-9, radius 12px, px 12–14px, 13px/600 | สีปกติ #577189 icon #718694 |
| Hover | bg #edf3f7 / text #092943 / icon #00a1e5 |  |
| Active | bg #00a1e5, ตัวขาว 700 | เงา 0 2px 8px rgba(0,161,229,.35) |
| Badge ในเมนู | 9.5px/700 radius 6px | ปกติ bg #e8f6fd text #00a1e5 / active bg ขาว 20% |
| ปุ่มสลับ role | พื้นกรมท่าเข้ม ตัวขาว | เห็นชัดว่ากำลังใช้ role อะไร |
| มือถือ | tab bar ล่าง 5 ปุ่ม | Dealer: หน้าหลัก อันดับ แคมเปญ โบรชัวร์ โปรไฟล์ |

### Dealer (มือถือ)

- หน้าหลัก (icon: Home)
- อันดับ (icon: Trophy)
- แคมเปญ (icon: Megaphone)
- โบรชัวร์ (icon: FileText)
- โปรไฟล์ (icon: UserRound)

### พนักงาน SCG / Viewer

- Dashboard (icon: LayoutDashboard)
- อันดับ (icon: Trophy)
- แผนที่ (icon: MapPinned)
- โบรชัวร์ (icon: FileText)
- ติดต่อพนักงาน (icon: Headphones)

### Admin

- Dashboard (icon: LayoutDashboard)
- อันดับ (icon: Trophy)
- แคมเปญ / รายงานแคมเปญ (icon: Gift)
- ร้านค้า (icon: Store)
- ตั้งค่า (dropdown) (icon: Settings)

- เมนูต่างกันตาม role ใช้ไฟล์ Navigation.tsx เดียวกัน
- เว็บนี้แสดงลายน้ำ 'FOR TEST ONLY' เพราะ URL ที่ให้มาเป็น environment ทดสอบ

## กติกาดีไซน์

### ควรทำ

- ตัวเลขยอดขายใหญ่ หน่วยเล็กข้างๆ (คิว, บาท, ร้าน) และบรรทัดอธิบายใต้ตัวเลข
- ใส่ % เปลี่ยนแปลงเป็น chip เขียว/แดงพร้อมลูกศร
- สินค้าแต่ละตัวใช้สีเดิมทุกกราฟ
- อันดับ 1–3 ใช้วงกลมทอง/เงิน/ทองแดง
- ตัวกรองหลักอยู่บนแถบชื่อหน้า ช่วงวันที่เป็นปุ่มขอบฟ้า
- ใช้ component จาก components/ui (shadcn) ก่อนเขียนใหม่

### ควรเลี่ยง

- ใช้สีฟ้าทึบกับปุ่มหลายปุ่มในแถวเดียว (เลือก 1 ปุ่มหลัก)
- ตั้งชื่อเมนูยาวเกิน 2 คำบน top nav
- ซ่อนการสลับ role ไว้ลึก ให้เห็นบน header เสมอ

### หน้าในระบบ (มุมพนักงาน)

- Dashboard: KPI 4 ตัว, แนวโน้มยอดขาย, สัดส่วนสินค้า, Top 5 สินค้า/ร้านค้า
- อันดับ: ranking ร้านค้า
- แผนที่: โรงงาน CPAC (Leaflet + cluster)
- โบรชัวร์: เอกสารการขาย
- ติดต่อพนักงาน

## ธีม CSS


```css
:root {
  --background: #F2F6F9;
  --foreground: #092943;
  --card: #FFFFFF;
  --card-foreground: #092943;
  --popover: #FFFFFF;
  --popover-foreground: #092943;
  --primary: #00A1E5;
  --primary-hover: #008CCB;
  --primary-foreground: #FFFFFF;
  --secondary: #EDF3F7;
  --secondary-foreground: #092943;
  --muted: #EDF3F7;
  --muted-foreground: #7890A1;
  --accent: #E8F6FD;
  --accent-foreground: #008CCB;
  --destructive: #DC2626;
  --success: #0BAA76;
  --warning: #F2A500;
  --border: #DCE6ED;
  --input: #DCE6ED;
  --ring: #00A1E5;
  --radius: 12px;
}
```


### ผูกตัวแปรกับ Tailwind v4


```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}
```


## โค้ดตัวช่วย lib/utils.ts


```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ตัวช่วยรวม className แบบเดียวกับ shadcn (ทุก component ใน registry ใช้ตัวนี้)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```


## รายการ component

| ID ที่บอก AI ได้ | ชื่อ | หน้าที่ |
| --- | --- | --- |
| top-nav | Top Navigation (pill) | เมนูบนแบบแคปซูล ตัวที่เลือกพื้นฟ้าทึบ มี badge |
| mobile-tab-bar | Mobile Tab Bar | แถบล่าง 5 ปุ่มสำหรับ Dealer บนมือถือ |
| kpi-card | KPI Card | การ์ดตัวเลข: icon, ชื่อ, chip % เปลี่ยนแปลง, ตัวเลขใหญ่ + หน่วย, คำอธิบาย |
| button | Button | ปุ่ม default / soft / outline / ghost / destructive / success |
| badge | Badge | Pill หลายสี: soft, success, warning, destructive, violet, teal, orange, neutral |
| share-bars | Product Share Bars | สัดส่วนยอดขายตามสินค้า แถบสีตามสินค้า + ค่า + % |
| rank-table | Top 5 Rank Table | ตารางอันดับ วงกลมทอง/เงิน/ทองแดง แถบสัดส่วน |

Package ที่ใช้ในชุดนี้ (เลือกติดตั้งเฉพาะที่นำไปใช้): `class-variance-authority`, `clsx`, `lucide-react`, `tailwind-merge`

## โค้ด component

### top-nav — Top Navigation (pill)

เมนูบนแบบแคปซูล ตัวที่เลือกพื้นฟ้าทึบ มี badge

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer/top-nav.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useState } from "react";
import { ChevronDown, Crown, FileText, Headphones, LayoutDashboard, MapPinned, Settings, Trophy, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; icon: LucideIcon; badge?: string; dropdown?: boolean };

const ITEMS: Item[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "rank", label: "อันดับ", icon: Trophy },
  { id: "plants", label: "แผนที่", icon: MapPinned },
  { id: "docs", label: "โบรชัวร์", icon: FileText, badge: "ใหม่" },
  { id: "contact", label: "ติดต่อพนักงาน", icon: Headphones },
  { id: "settings", label: "ตั้งค่า", icon: Settings, dropdown: true },
];

const topLinkClass =
  "group inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3 text-[13px] font-semibold text-[#577189] transition-all hover:bg-[#edf3f7] hover:text-[#092943] data-[active]:bg-[#00a1e5] data-[active]:font-bold data-[active]:text-white data-[active]:shadow-[0_2px_8px_rgba(0,161,229,0.35)] xl:px-3.5";

export function TopNav({ items = ITEMS, role = "Super Admin" }: { items?: Item[]; role?: string }) {
  const [active, setActive] = useState("overview");
  return (
    <header className="flex h-[68px] items-center gap-3 border-b border-[#dce6ed] bg-white px-4">
      <span className="shrink-0 text-xl font-black italic text-[#00a1e5]">Sale<span className="text-[#092943]">Spark</span></span>
      <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none]">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button key={item.id} type="button" data-active={isActive ? "" : undefined} onClick={() => setActive(item.id)} className={topLinkClass}>
              <item.icon className={cn("size-4 shrink-0 transition-colors", isActive ? "text-white" : "text-[#718694] group-hover:text-[#00a1e5]")} />
              {item.label}
              {item.badge ? (
                <span className={cn("rounded-md px-1.5 py-0.5 text-[9.5px] font-bold leading-none tracking-wide", isActive ? "bg-white/20 text-white" : "bg-[#e8f6fd] text-[#00a1e5]")}>{item.badge}</span>
              ) : null}
              {item.dropdown ? <ChevronDown className="size-3.5" /> : null}
            </button>
          );
        })}
      </nav>
      <button type="button" className="hidden h-9 shrink-0 items-center gap-1.5 rounded-xl bg-[#092943] px-3 text-[13px] font-bold text-white md:inline-flex">
        <Crown className="size-4" /> {role} · สลับ role
      </button>
    </header>
  );
}
```


### mobile-tab-bar — Mobile Tab Bar

แถบล่าง 5 ปุ่มสำหรับ Dealer บนมือถือ

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer/mobile-tab-bar.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useState } from "react";
import { FileText, Home, Megaphone, Trophy, UserRound, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; icon: LucideIcon };

const ITEMS: Item[] = [
  { id: "home", label: "หน้าหลัก", icon: Home },
  { id: "rank", label: "อันดับ", icon: Trophy },
  { id: "promo", label: "แคมเปญ", icon: Megaphone },
  { id: "docs", label: "โบรชัวร์", icon: FileText },
  { id: "profile", label: "โปรไฟล์", icon: UserRound },
];

// tab bar มือถือของ Dealer — ในแอปจริงให้ fixed bottom-0 และเว้น safe-area
export function MobileTabBar({ items = ITEMS }: { items?: Item[] }) {
  const [active, setActive] = useState("home");
  return (
    <nav aria-label="เมนูหลัก" className="grid border-t border-[#dce6ed] bg-white/95 px-1 pb-[max(6px,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))` }}>
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button key={item.id} type="button" onClick={() => setActive(item.id)} aria-current={isActive ? "page" : undefined} className="flex flex-col items-center gap-1 py-1">
            <span className={cn("flex h-7 w-12 items-center justify-center rounded-full transition-colors", isActive ? "bg-[#e8f6fd] text-[#00a1e5]" : "text-[#718694]")}>
              <item.icon className="size-[19px]" strokeWidth={isActive ? 2.4 : 2} />
            </span>
            <span className={cn("text-[11px]", isActive ? "font-bold text-[#00a1e5]" : "font-medium text-[#577189]")}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
```


### kpi-card — KPI Card

การ์ดตัวเลข: icon, ชื่อ, chip % เปลี่ยนแปลง, ตัวเลขใหญ่ + หน่วย, คำอธิบาย

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer/kpi-card.tsx`

Package เพิ่มเติม: lucide-react


```tsx
import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// KPI: icon ในกล่องฟ้าอ่อน + ชื่อ + chip % → ตัวเลขใหญ่ + หน่วย → คำอธิบาย
export function KpiCard({ icon, title, value, unit, delta, hint, action }: { icon: ReactNode; title: string; value: string; unit?: string; delta?: number; hint?: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#dce6ed] bg-white p-5 shadow-[0_2px_12px_rgb(9_41_67/0.04)]">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f6fd] text-[#00a1e5] [&_svg]:size-[18px]">{icon}</span>
        <p className="min-w-0 flex-1 truncate text-[15px] font-bold text-[#092943]">{title}</p>
        {typeof delta === "number" ? (
          <span className={cn("inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold", delta >= 0 ? "bg-[#e7f7f1] text-[#0baa76]" : "bg-[#fef2f2] text-[#dc2626]")}>
            {delta >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {delta >= 0 ? "+" : ""}
            {delta}%
          </span>
        ) : null}
        {action}
      </div>
      <p className="mt-4 text-[30px] font-extrabold leading-none text-[#092943] [font-feature-settings:'tnum']">
        {value}
        {unit ? <span className="ml-1.5 text-base font-semibold text-[#577189]">{unit}</span> : null}
      </p>
      {hint ? <p className="mt-2 truncate text-xs text-[#7890a1]">{hint}</p> : null}
    </div>
  );
}
```


### button — Button

ปุ่ม default / soft / outline / ghost / destructive / success

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer/button.tsx`

Package เพิ่มเติม: class-variance-authority


```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ใช้สีจากธีม: ก๊อป tokens ของ CPAC Dealer ไปด้วย (มี --primary-hover, --success)
export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-transparent text-sm outline-none transition-all select-none focus-visible:shadow-[0_0_0_3px_rgb(0_161_229/0.2)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] font-bold text-white shadow-sm hover:bg-[var(--primary-hover)]",
        soft: "bg-[var(--accent)] font-bold text-[var(--accent-foreground)] hover:bg-[#d3eefb]",
        outline: "border-[var(--border)] bg-white font-bold text-[#2c4a63] hover:bg-[#f8fafc] hover:text-[var(--foreground)]",
        secondary: "bg-[var(--secondary)] font-semibold text-[var(--secondary-foreground)] hover:bg-[#dce6ed]",
        ghost: "font-semibold text-[#577189] hover:bg-[#edf3f7] hover:text-[var(--foreground)]",
        destructive: "bg-[var(--destructive)] font-bold text-white shadow-sm hover:bg-[#b91c1c]",
        "destructive-soft": "bg-[#fef2f2] font-bold text-[#dc2626] hover:bg-[#fee2e2]",
        success: "bg-[var(--success)] font-bold text-white shadow-sm hover:bg-[#09945f]",
      },
      size: {
        sm: "h-7 rounded-[10px] px-2.5 text-[0.8rem]",
        default: "h-8 px-2.5",
        lg: "h-9 px-3",
        icon: "size-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, type = "button", ...props }, ref) => (
  <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";
```


### badge — Badge

Pill หลายสี: soft, success, warning, destructive, violet, teal, orange, neutral

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer/badge.tsx`

Package เพิ่มเติม: class-variance-authority


```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border border-transparent px-2.5 py-0.5 text-[11px] font-bold [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-[#00a1e5] text-white",
        soft: "border-[#b3e3f7] bg-[#e8f6fd] text-[#008ccb]",
        success: "border-[#b6e9d6] bg-[#e7f7f1] text-[#08905f]",
        warning: "border-[#fbe2a8] bg-[#fef3d6] text-[#b77b00]",
        destructive: "border-[#fecaca] bg-[#fef2f2] text-[#dc2626]",
        violet: "border-violet-200 bg-violet-50 text-violet-600",
        teal: "border-teal-100 bg-teal-50 text-teal-600",
        orange: "border-orange-100 bg-orange-50 text-orange-600",
        neutral: "border-[#dce6ed] bg-[#f8fafc] text-[#577189]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
```


### share-bars — Product Share Bars

สัดส่วนยอดขายตามสินค้า แถบสีตามสินค้า + ค่า + %

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer/share-bars.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
export type ShareItem = { name: string; value: number; color: string };

// สัดส่วนยอดขายตามสินค้า: จุดสี + ชื่อ + ค่า + % แล้วแถบเต็มความกว้าง
export function ShareBars({ items, unit = "คิว" }: { items: ShareItem[]; unit?: string }) {
  const total = items.reduce((s, i) => s + i.value, 0) || 1;
  return (
    <div>
      <div className="space-y-4">
        {items.map((item) => {
          const pct = (item.value / total) * 100;
          return (
            <div key={item.name}>
              <div className="mb-1.5 flex items-center gap-2 text-[13px]">
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: item.color }} />
                <span className="min-w-0 flex-1 truncate font-medium text-[#092943]">{item.name}</span>
                <span className="font-bold text-[#092943] [font-feature-settings:'tnum']">{item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                <span className="w-12 text-right text-xs text-[#7890a1]">{pct.toFixed(1)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#edf3f7]">
                <div className="h-full rounded-full" style={{ width: `${Math.max(pct, 1)}%`, background: item.color }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-between border-t border-[#edf3f7] pt-3 text-[13px]">
        <span className="text-[#7890a1]">รวมทุกสินค้า</span>
        <span className="font-bold text-[#092943]">
          {total.toLocaleString(undefined, { maximumFractionDigits: 2 })} {unit}
        </span>
      </div>
    </div>
  );
}
```


### rank-table — Top 5 Rank Table

ตารางอันดับ วงกลมทอง/เงิน/ทองแดง แถบสัดส่วน

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer/rank-table.tsx`

Package เพิ่มเติม: lucide-react


```tsx
import { ChevronRight, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export type RankRow = { name: string; sub?: string; value: number; share?: number; color?: string };

const medal = ["bg-[#f59e0b] text-white", "bg-[#94a3b8] text-white", "bg-[#b45309] text-white"];

// ตาราง Top N: วงกลมอันดับ ทอง/เงิน/ทองแดง, อันดับ 1 มีมงกุฎ, แถบสัดส่วนถ้ามี share
export function RankTable({ title, subtitle, valueLabel, rows, showShare = false }: { title: string; subtitle?: string; valueLabel: string; rows: RankRow[]; showShare?: boolean }) {
  return (
    <section className="rounded-2xl border border-[#dce6ed] bg-white p-5 shadow-[0_2px_12px_rgb(9_41_67/0.04)]">
      <header className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-[17px] font-extrabold text-[#092943]">
          {title} {subtitle ? <span className="text-xs font-medium text-[#7890a1]">{subtitle}</span> : null}
        </h3>
        <button type="button" className="inline-flex h-8 items-center gap-1 rounded-full border border-[#dce6ed] px-3 text-xs font-bold text-[#2c4a63] hover:bg-[#f8fafc]">
          ดูทั้งหมด <ChevronRight className="size-3.5" />
        </button>
      </header>
      <table className="w-full text-[13px] [font-feature-settings:'tnum']">
        <thead>
          <tr className="bg-[#f8fafc] text-left text-xs text-[#577189]">
            <th className="w-10 rounded-l-lg px-2 py-2 font-semibold">#</th>
            <th className="px-2 py-2 font-semibold">ชื่อ</th>
            <th className="px-2 py-2 text-right font-semibold">{valueLabel}</th>
            {showShare ? <th className="rounded-r-lg px-2 py-2 text-right font-semibold">สัดส่วน</th> : <th className="rounded-r-lg" />}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.name} className="border-b border-[#edf3f7] last:border-0">
              <td className="px-2 py-2.5">
                <span className={cn("flex size-6 items-center justify-center rounded-full text-[11px] font-bold", medal[i] ?? "bg-[#edf3f7] text-[#577189]")}>{i + 1}</span>
              </td>
              <td className="px-2 py-2.5 font-medium text-[#092943]">
                <span className="flex items-center gap-1">
                  {i === 0 ? <Crown className="size-3.5 text-[#f59e0b]" /> : null}
                  {r.name}
                </span>
                {r.sub ? <span className="text-xs text-[#7890a1]">{r.sub}</span> : null}
              </td>
              <td className="px-2 py-2.5 text-right font-bold text-[#092943]">{r.value.toLocaleString()}</td>
              <td className="px-2 py-2.5">
                {showShare && typeof r.share === "number" ? (
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-1.5 w-28 overflow-hidden rounded-full bg-[#edf3f7]">
                      <div className="h-full rounded-full" style={{ width: `${Math.max(r.share, 1)}%`, background: r.color ?? "#00a1e5" }} />
                    </div>
                    <span className="w-12 text-right text-xs text-[#7890a1]">{r.share.toFixed(1)}%</span>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
```

