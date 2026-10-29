# Washout Pit (CWP) — คู่มือดีไซน์พร้อมโค้ด

ไฟล์นี้ใช้ได้ด้วยตัวเอง มีสเปกดีไซน์ ธีม และโค้ด component ครบ ไม่ต้องเปิดเว็บคลัง ไม่ต้องใช้ shadcn CLI

## ใช้กับโปรเจคของคุณใน 3 ขั้นตอน

1. ดาวน์โหลดไฟล์ .md นี้เก็บไว้ในโปรเจคของคุณ
2. แนบไฟล์ให้ AI ที่ช่วยเขียนโค้ด หรือให้ AI อ่านไฟล์ในโฟลเดอร์
3. บอกชื่อส่วนที่อยากใช้ แล้วตรวจผลในโปรเจคของคุณ

### ข้อความพร้อมส่งให้ AI

> อ่านไฟล์นี้ แล้วนำดีไซน์ Washout Pit (CWP) มาใช้กับโปรเจคของฉัน โดยเลือกเฉพาะ [ระบุ เช่น เมนู / ปุ่ม / ตาราง / ธีมสี] ตรวจ framework และ CSS ของโปรเจคก่อน ปรับโค้ดให้เข้ากัน คงการทำงาน API และสิทธิ์เดิมไว้ พร้อมตรวจหน้าจอมือถือและเดสก์ท็อป

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

ระบบขออนุมัติจัดการคอนกรีตเหลือ (บ่อล้าง/บ่อคาย) สร้างคำขอแบบฟอร์มหลายขั้น ส่งอนุมัติ และดู Dashboard รายภาค โทนขาวสะอาดอมฟ้า ฟอนต์ IBM Plex Sans Thai มี design system เขียนละเอียด 3 ไฟล์ใน repo

แนวเทคโนโลยีต้นแบบ: Next.js 15, React 19, Tailwind CSS 4, shadcn (base-ui), CSS classes ใน globals.css, lucide-react

### บุคลิกของดีไซน์

- สะอาด สว่าง data-dense แบบ admin dashboard
- Sky blue เป็น accent เดียว (#0284C7)
- การ์ด KPI พื้นไล่สีอ่อนตามหมวด (teal / purple / blue / orange)
- เมนูบนกึ่งกลาง แบนเนอร์หัวหน้ามีภาพรถโม่จริง

### เหมาะกับงาน

- ระบบแบบฟอร์มขออนุมัติหลายขั้นตอน (workflow)
- หน้า Dashboard สรุปรายภาค/รายโรงงาน
- อยากได้ design system ที่มีเอกสารละเอียดเป็นต้นแบบ

## สี

### Accent (sky blue)

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| accent-50 | #E0F7FF | พื้น chip, hover, chart fill |
| accent-400 | #22D3EE | accent รอง, focus outline |
| accent-600 | #0284C7 | ปุ่มหลัก, ลิงก์, active |
| accent-900 | #075985 | หัวข้อบนพื้นอ่อน |
| Nav active bg | #E8F2FF | เมนูที่เลือก |
| Nav active text | #075FA8 |  |
| Nav text | #32618F | เมนูปกติ |

### Neutral

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| bg-app | #F9FBFE | พื้นหลังแอป |
| bg-surface | #FFFFFF | card, table |
| bg-inverse | #111318 | การ์ดมืด |
| border | #CFEAF5 | เส้นขอบการ์ด |
| border-subtle | #E2F3F8 | เส้นในการ์ด |
| text-primary | #111827 | หัวข้อ, ตัวเลข |
| text-secondary | #53738B | label |
| text-muted | #9CA3AF | placeholder |

### Semantic & Metric card

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| success | #0F9F75 | bg #D9FBEA |
| danger | #DC2626 | bg #FEE2E2 |
| warning | #B45309 | bg #FEF3C7 (ฉบับร่าง) |
| Metric teal | #D9F5F2 | gradient จาก #F0FCFB |
| Metric purple | #EEE9FF | gradient จาก #FAF8FF |
| Metric blue | #EDF4FF | gradient จาก #F8FBFF |
| Metric orange | #FFEDE1 | gradient จาก #FFF9F4 |

## ฟอนต์และตัวอักษร

Font family: `var(--font-plex-thai), 'IBM Plex Sans Thai', sans-serif`

IBM Plex Sans Thai (เว็บจริง) — design-system.md เขียนเป็น Inter สำหรับภาษาอังกฤษ ตัวเลขใช้ tabular

| รายการ | ขนาด | น้ำหนัก | การใช้งาน |
| --- | --- | --- | --- |
| Hero title | 28–30px | 700 | หัวแบนเนอร์ |
| Card stat value | 28–32px | 600–700 | ตัวเลข KPI |
| Page title | 24px | 600 |  |
| Section heading | 15–16px | 600 | หัวการ์ด |
| Body / table | 13–14px | 400–500 |  |
| Nav | 13px | 600 |  |
| Table header | 12px | 600 |  |

## ระยะห่าง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| space-1…8 | 4 / 8 / 12 / 16 / 20 / 24 / 32px |  |
| Page container | max 1200–1280px, padding 24px |  |
| Card padding | 16–20px |  |
| Stat grid gutter | 16–20px | 4 คอลัมน์ |

## มุมโค้ง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| control | 8px | --radius-control ปุ่ม, input |
| nav | 9px | เมนู |
| surface | 12px | --radius-surface การ์ด, ตาราง |
| full | 999px | avatar, pill, badge |

## เงา

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| card | 0 1px 2px rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.06) | --shadow-card |
| frame | 0 20px 60px rgba(16,24,40,.08) | กรอบใหญ่ |
| popover | 0 8px 24px rgba(16,24,40,.12) | dropdown, account panel |

## Layout

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Header | logo ซ้าย, nav กลาง, account ขวา |  |
| Page hero | แบนเนอร์ภาพ + การ์ดขาวซ้าย มีแถบฟ้าแนวตั้ง | หน้า home / list |
| Dashboard | Executive summary + 4 metric cards / ภาพรวม 6 ภาค + กราฟ |  |
| Form | Stepper 6 ขั้นด้านบน + section การ์ด | สร้างคำขอ |

## เมนูและการนำทาง

Top nav กึ่งกลาง + เมนูบัญชีผู้ใช้

แถบบนสีขาว โลโก้ CWP ซ้าย เมนูอยู่กึ่งกลาง (icon 18px + ข้อความ 13px/600) เมนูที่เลือกพื้นฟ้าอ่อน #E8F2FF ตัวอักษร #075FA8 มุม 9px เมนู 'ผู้ดูแลระบบ' เป็น dropdown (จัดการสิทธิ์, ตารางสิทธิ์, Activity Log) ขวาสุดเป็นปุ่มบัญชี (avatar + ชื่อ + บทบาท) กดแล้วเปิดแผงรายละเอียด กิจการ/ภาค/แผนก และปุ่มออกจากระบบ บนมือถือเมนูยุบเป็นปุ่ม Menu

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| เมนู | 13px / 600, radius 9px, icon 18px stroke 1.8 | ปกติ #32618F |
| Active | bg #E8F2FF / text #075FA8 | aria-current=page |
| Focus | outline 2px #22D3EE offset 2px |  |
| Account trigger | avatar วงกลม + ชื่อ + บทบาทตัวพิมพ์ใหญ่ | เปิด panel แบบ dialog |
| มือถือ | ปุ่ม Menu (outline icon) เปิดเมนูแนวตั้ง |  |

### เมนูหลัก

- หน้าหลัก (icon: House)
- สร้างคำขอขออนุมัติจัดการคอนกรีตเหลือ (icon: FilePlus2)
- รายการคำขอ (icon: BarChart3)
- Dashboard (icon: LayoutDashboard)

### ผู้ดูแลระบบ (dropdown)

- จัดการสิทธิ์ (icon: ShieldCheck)
- จัดการตารางสิทธิ์ (icon: Table)
- Activity Log (icon: Activity)

- ชื่อเมนู 'สร้างคำขอ...' ยาวมาก บนจอเล็กควรย่อเป็น 'สร้างคำขอ'

## กติกาดีไซน์

### ควรทำ

- ใช้ accent-600 (#0284C7) เป็นสีเดียวของ action หลัก
- การ์ด KPI ใช้สีพื้นตามหมวด (เปียก = ฟ้า, แห้ง = ส้ม, เอกสาร = teal, ปริมาตร = ม่วง) และใช้สีเดิมในกราฟ
- แบบฟอร์มยาวให้มี stepper บอกขั้นตอนและกดข้ามไป section ได้
- ตารางมีแท็บนับจำนวน (ทั้งหมด / ฉบับร่าง / ส่งแล้ว) + ค้นหา + ตัวกรองประเภท
- ทุกปุ่ม/เมนูมี focus outline ฟ้า 2px

### ควรเลี่ยง

- ใช้สีเข้มหรือ gradient แรงกับการ์ด KPI (ให้อ่อนมาก)
- ตั้งชื่อเมนูยาวโดยไม่มีเวอร์ชันสั้นสำหรับจอเล็ก
- ใช้ shadow หนัก ให้ใช้ --shadow-card

### Design doc ใน repo (อ่านต่อ)

- design-system.md — สี, ตัวอักษร, spacing, component specs
- AI_UI_DESIGN_SYSTEM_V2.md — กติกาละเอียดสำหรับ AI/ทีม (37KB)
- docs/ui-shadcn-migration-report.md — การย้ายไป shadcn

### ขั้นตอนฟอร์มสร้างคำขอ

- ข้อมูลทั่วไป
- ข้อมูลรายละเอียดบ่อคาย
- ค่าใช้จ่ายที่ขออนุมัติ
- วิธีจัดหาและผู้เสนอราคา
- สรุปผลการคัดเลือก
- ส่งคำขอ

## ธีม CSS


```css
:root {
  --background: #F9FBFE;
  --foreground: #111827;
  --card: #FFFFFF;
  --card-foreground: #111827;
  --popover: #FFFFFF;
  --popover-foreground: #111827;
  --primary: #0284C7;
  --primary-foreground: #FFFFFF;
  --secondary: #F1F7FB;
  --secondary-foreground: #111827;
  --muted: #F1F7FB;
  --muted-foreground: #53738B;
  --accent: #E0F7FF;
  --accent-foreground: #075985;
  --destructive: #DC2626;
  --border: #CFEAF5;
  --input: #DBE5F0;
  --ring: #22D3EE;
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
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
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
| top-nav | Top Nav + Account | เมนูบนกึ่งกลาง active ฟ้าอ่อน และปุ่มบัญชีที่เปิดแผงรายละเอียด |
| page-hero | Page Hero | แบนเนอร์หัวหน้า: การ์ดขาวพร้อมแถบฟ้า ทับภาพด้านขวา |
| metric-card | Metric Card | การ์ด KPI พื้นไล่สีอ่อน 4 สี พร้อม icon วงกลมมุมขวาล่าง |
| status-tabs | Status Tabs + Search | แท็บนับจำนวน ทั้งหมด / ฉบับร่าง / ส่งแล้ว พร้อมช่องค้นหา |
| request-table | Request Table | ตารางคำขอ: ป้ายประเภทบ่อ (เปียก/แห้ง), สถานะ, ปุ่มแก้ไข/ลบ, pagination |
| request-stepper | Request Stepper | ขั้นตอนฟอร์ม 6 ขั้น กดไปยัง section ได้ |
| button | Button | primary / secondary / quiet / danger มุม 8px ยกขึ้น 1px ตอน hover |

Package ที่ใช้ในชุดนี้ (เลือกติดตั้งเฉพาะที่นำไปใช้): `class-variance-authority`, `clsx`, `lucide-react`, `tailwind-merge`

## โค้ด component

### top-nav — Top Nav + Account

เมนูบนกึ่งกลาง active ฟ้าอ่อน และปุ่มบัญชีที่เปิดแผงรายละเอียด

ตำแหน่งไฟล์แนะนำ: `components/washout-pit/top-nav.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useState } from "react";
import { BarChart3, ChevronDown, FilePlus2, House, LayoutDashboard, LogOut, ShieldCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Link = { href: string; label: string; short?: string; icon: LucideIcon; dropdown?: boolean };

const LINKS: Link[] = [
  { href: "/home", label: "หน้าหลัก", icon: House },
  { href: "/requests/new", label: "สร้างคำขอขออนุมัติจัดการคอนกรีตเหลือ", short: "สร้างคำขอ", icon: FilePlus2 },
  { href: "/data", label: "รายการคำขอ", icon: BarChart3 },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin", label: "ผู้ดูแลระบบ", icon: ShieldCheck, dropdown: true },
];

export function TopNav({ links = LINKS, user = { name: "ศศิธร จรุงจรรยาพงศ์", role: "SUPER ADMIN", business: "CPAC", region: "Metro" } }: { links?: Link[]; user?: { name: string; role: string; business: string; region: string } }) {
  const [active, setActive] = useState("/home");
  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex h-14 items-center gap-4 border-b border-[#e2f3f8] bg-white px-5">
      <span className="shrink-0 text-xl font-black italic text-[#0284c7]">CWP</span>
      <nav aria-label="Main navigation" className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto [scrollbar-width:none]">
        {links.map((link) => {
          const isActive = active === link.href;
          return (
            <button
              key={link.href}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => setActive(link.href)}
              className={cn(
                "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[9px] px-3 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22d3ee]",
                isActive ? "bg-[#e8f2ff] text-[#075fa8]" : "text-[#32618f] hover:bg-[#f1f7fb]",
              )}
            >
              <link.icon size={18} strokeWidth={1.8} aria-hidden />
              <span className="hidden xl:inline">{link.label}</span>
              <span className="xl:hidden">{link.short ?? link.label}</span>
              {link.dropdown ? <ChevronDown className="size-3.5" /> : null}
            </button>
          );
        })}
      </nav>

      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex shrink-0 items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-[#f1f7fb] focus-visible:outline-2 focus-visible:outline-[#22d3ee]">
        <span className="flex size-8 items-center justify-center rounded-full bg-[#53738b] text-sm font-bold text-white">{user.name.charAt(0)}</span>
        <span className="hidden text-left leading-tight md:block">
          <strong className="block text-[13px] text-[#111827]">{user.name}</strong>
          <small className="text-[10px] font-semibold tracking-[0.12em] text-[#53738b]">{user.role}</small>
        </span>
        <ChevronDown className={cn("size-3.5 text-[#53738b] transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <section role="dialog" aria-label="Account details" className="absolute right-4 top-full z-20 mt-2 w-72 rounded-xl border border-[#cfeaf5] bg-white p-4 shadow-[0_8px_24px_rgba(16,24,40,0.12)]">
          <p className="font-semibold text-[#111827]">{user.name}</p>
          <span className="mt-1 inline-block rounded-full bg-[#e0f7ff] px-2 py-0.5 text-[11px] font-bold text-[#075985]">{user.role}</span>
          <dl className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-[#f9fbfe] p-3 text-xs">
            <dt className="text-[#53738b]">กิจการ</dt>
            <dd className="font-semibold">{user.business}</dd>
            <dt className="text-[#53738b]">ภาค</dt>
            <dd className="font-semibold">{user.region}</dd>
          </dl>
          <button type="button" className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#cfeaf5] text-sm font-semibold text-[#111827] hover:bg-[#f9fbfe]">
            <LogOut size={16} /> ออกจากระบบ
          </button>
        </section>
      )}
    </header>
  );
}
```


### page-hero — Page Hero

แบนเนอร์หัวหน้า: การ์ดขาวพร้อมแถบฟ้า ทับภาพด้านขวา

ตำแหน่งไฟล์แนะนำ: `components/washout-pit/page-hero.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
// แบนเนอร์หัวหน้า: ภาพเต็มกว้าง (หรือ gradient ฟ้า) + การ์ดขาวทางซ้ายที่มีแถบฟ้าแนวตั้ง
export function PageHero({ title, description, image }: { title: string; description?: string; image?: string }) {
  return (
    <section
      className="relative overflow-hidden rounded-lg border border-[#cfeaf5] bg-cover bg-right"
      style={{ backgroundImage: image ? `url("${image}")` : "linear-gradient(100deg,#eaf6ff 0%,#d4ecfb 45%,#9fd4f3 100%)" }}
    >
      <div className="flex min-h-[150px] items-center p-6 md:p-8">
        <div className="relative max-w-[700px] rounded-2xl bg-white/90 py-4 pl-9 pr-6 shadow-[0_8px_24px_rgba(16,24,40,0.08)] backdrop-blur">
          <span className="absolute left-4 top-4 bottom-4 w-1.5 rounded-full bg-[#0284c7]" />
          <h1 className="text-[26px] font-bold leading-tight text-[#111827] md:text-[30px]">{title}</h1>
          {description ? <p className="mt-1.5 text-sm text-[#53738b]">{description}</p> : null}
        </div>
      </div>
    </section>
  );
}
```


### metric-card — Metric Card

การ์ด KPI พื้นไล่สีอ่อน 4 สี พร้อม icon วงกลมมุมขวาล่าง

ตำแหน่งไฟล์แนะนำ: `components/washout-pit/metric-card.tsx`

Package เพิ่มเติม: lucide-react


```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MetricTone = "teal" | "purple" | "blue" | "orange";

const tones: Record<MetricTone, { bg: string; value: string; icon: string }> = {
  teal: { bg: "bg-[linear-gradient(145deg,#f0fcfb_0%,#d9f5f2_100%)]", value: "text-[#0f766e]", icon: "text-[#0f9f75]" },
  purple: { bg: "bg-[linear-gradient(145deg,#faf8ff_0%,#eee9ff_100%)]", value: "text-[#6d28d9]", icon: "text-[#7c3aed]" },
  blue: { bg: "bg-[linear-gradient(145deg,#f8fbff_0%,#edf4ff_100%)] border border-[#cfe2ff]", value: "text-[#1d4ed8]", icon: "text-[#2563eb]" },
  orange: { bg: "bg-[linear-gradient(145deg,#fff9f4_0%,#ffede1_100%)]", value: "text-[#c2410c]", icon: "text-[#ea580c]" },
};

// การ์ด KPI พื้นไล่สีอ่อนตามหมวด + icon ในวงกลมขาวโปร่งมุมขวาล่าง
export function MetricCard({ label, value, unit, tone, icon }: { label: string; value: string | number; unit?: string; tone: MetricTone; icon: ReactNode }) {
  const t = tones[tone];
  return (
    <div className={cn("relative min-h-[132px] overflow-hidden rounded-xl p-5 pl-12", t.bg)}>
      <p className="text-[22px] font-semibold leading-tight text-[#334155]">{label}</p>
      <p className={cn("mt-1 text-[32px] font-bold leading-none [font-feature-settings:'tnum']", t.value)}>{typeof value === "number" ? value.toLocaleString() : value}</p>
      {unit ? <p className="mt-3 text-[13px] text-[#53738b]">{unit}</p> : null}
      <span className={cn("absolute -bottom-6 -right-6 flex size-28 items-start justify-start rounded-full bg-white/45 pl-7 pt-7 [&_svg]:size-8", t.icon)}>{icon}</span>
    </div>
  );
}
```


### status-tabs — Status Tabs + Search

แท็บนับจำนวน ทั้งหมด / ฉบับร่าง / ส่งแล้ว พร้อมช่องค้นหา

ตำแหน่งไฟล์แนะนำ: `components/washout-pit/status-tabs.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { ChevronDown, Clock3, FileText, Search, Send, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusTab = { key: string; label: string; count: number; icon: LucideIcon };

export const DEFAULT_TABS: StatusTab[] = [
  { key: "all", label: "ทั้งหมด", count: 1, icon: FileText },
  { key: "draft", label: "ฉบับร่าง", count: 1, icon: Clock3 },
  { key: "sent", label: "ส่งแล้ว", count: 0, icon: Send },
];

// แท็บนับจำนวน + ค้นหา + ตัวกรองประเภท อยู่ในแถบขาวเดียวกัน
export function StatusTabs({ tabs = DEFAULT_TABS, value, onChange, search, onSearch }: { tabs?: StatusTab[]; value: string; onChange: (key: string) => void; search: string; onSearch: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e2f3f8] bg-white p-2 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)]">
      <div role="tablist" className="flex rounded-xl border border-[#e2f3f8] p-1">
        {tabs.map((t) => {
          const active = value === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => onChange(t.key)}
              className={cn("inline-flex h-9 items-center gap-1.5 rounded-lg px-4 text-[13px] font-semibold transition-colors", active ? "bg-[#0284c7] text-white" : "text-[#53738b] hover:bg-[#f1f7fb]")}
            >
              <t.icon className={cn("size-4", !active && t.key === "draft" && "text-[#b45309]", !active && t.key === "sent" && "text-[#0f9f75]")} />
              {t.label}
              <span className="ml-1.5 font-bold">{t.count}</span>
            </button>
          );
        })}
      </div>
      <div className="ml-auto flex min-w-[260px] flex-1 items-center gap-2 sm:flex-none">
        <label className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-[#dbe5f0] px-3 focus-within:border-[#0284c7] focus-within:ring-2 focus-within:ring-[#e0f7ff] sm:w-[340px]">
          <Search className="size-4 text-[#9ca3af]" />
          <input value={search} onChange={(e) => onSearch(e.target.value)} placeholder="ค้นหาเลขที่เอกสาร หรือชื่อโรงงาน..." className="w-full bg-transparent text-sm outline-none placeholder:text-[#9ca3af]" />
        </label>
        <button type="button" className="inline-flex h-10 items-center gap-6 rounded-lg border border-[#dbe5f0] px-3 text-sm text-[#53738b]">
          เลือกประเภทบ่อ <ChevronDown className="size-4" />
        </button>
      </div>
    </div>
  );
}
```


### request-table — Request Table

ตารางคำขอ: ป้ายประเภทบ่อ (เปียก/แห้ง), สถานะ, ปุ่มแก้ไข/ลบ, pagination

ตำแหน่งไฟล์แนะนำ: `components/washout-pit/request-table.tsx`

Package เพิ่มเติม: lucide-react


```tsx
import { ChevronLeft, ChevronRight, Droplets, Pencil, Trash2, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

export type Request = { docNo: string | null; plant: string; plantCode: string; type: "wet" | "dry"; volume: number; status: "draft" | "sent" | "approved"; sentAt?: string; updatedAt: string };

const typePill = {
  wet: { label: "เปียก", icon: Droplets, className: "bg-[#e8f1ff] text-[#2563eb]" },
  dry: { label: "แห้ง", icon: Wind, className: "bg-[#fff1e6] text-[#ea580c]" },
};
const statusPill = {
  draft: { label: "ฉบับร่าง", className: "bg-[#fef3c7] text-[#b45309]" },
  sent: { label: "ส่งแล้ว", className: "bg-[#e0f7ff] text-[#0284c7]" },
  approved: { label: "อนุมัติแล้ว", className: "bg-[#d9fbea] text-[#0f9f75]" },
};

// ตารางคำขอ: หัวตารางพื้นฟ้าอ่อน, ป้ายประเภท+สถานะ, ปุ่มแก้ไข/ลบเล็ก, แถบนับรายการ + pagination
export function RequestTable({ rows, page = 1 }: { rows: Request[]; page?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e2f3f8] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-[13px] [font-feature-settings:'tnum']">
          <thead>
            <tr className="bg-[#f6fbfe] text-xs font-semibold text-[#53738b]">
              {["เลขที่เอกสาร", "โรงงาน", "ประเภทบ่อ", "ปริมาตร (ลบ.ม.)", "สถานะ", "วันที่ส่งคำขอ", "แก้ไขล่าสุด", "การจัดการ"].map((h, i) => (
                <th key={h} className={cn("border-b border-r border-[#e2f3f8] px-4 py-3 last:border-r-0", i === 3 ? "text-right" : [2, 4, 7].includes(i) ? "text-center" : "text-left")}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => {
              const T = typePill[r.type];
              const S = statusPill[r.status];
              return (
                <tr key={idx} className="hover:bg-[#f9fbfe]">
                  <td className="border-r border-[#e2f3f8] whitespace-nowrap px-4 py-3 font-semibold text-[#0284c7]">{r.docNo ?? "ฉบับร่าง"}</td>
                  <td className="border-r border-[#e2f3f8] px-4 py-3">
                    <span className="block font-medium text-[#111827]">{r.plant}</span>
                    <span className="text-xs text-[#53738b]">{r.plantCode}</span>
                  </td>
                  <td className="border-r border-[#e2f3f8] px-4 py-3 text-center">
                    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold", T.className)}><T.icon className="size-3.5" />{T.label}</span>
                  </td>
                  <td className="border-r border-[#e2f3f8] px-4 py-3 text-right">{r.volume.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="border-r border-[#e2f3f8] px-4 py-3 text-center">
                    <span className={cn("inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold", S.className)}>{S.label}</span>
                  </td>
                  <td className="border-r border-[#e2f3f8] whitespace-nowrap px-4 py-3">{r.sentAt ?? "—"}</td>
                  <td className="border-r border-[#e2f3f8] whitespace-nowrap px-4 py-3">{r.updatedAt}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex gap-1.5">
                      <button type="button" className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#dbe5f0] px-2 text-xs text-[#53738b] hover:bg-[#f9fbfe]"><Pencil className="size-3.5" />แก้ไข</button>
                      <button type="button" className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#fecaca] bg-[#fff5f5] px-2 text-xs text-[#dc2626] hover:bg-[#fee2e2]"><Trash2 className="size-3.5" />ลบ</button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-[#e2f3f8] px-4 py-2.5 text-[13px] text-[#53738b]">
        <span>{rows.length} รายการ / แสดงต่อหน้า <span className="ml-1 rounded-lg border border-[#dbe5f0] px-2 py-1 text-[#111827]">10</span></span>
        <span className="flex items-center gap-1.5">
          <button type="button" aria-label="ก่อนหน้า" className="flex size-7 items-center justify-center rounded-full border border-[#dbe5f0]"><ChevronLeft className="size-3.5" /></button>
          <span className="flex size-7 items-center justify-center rounded-full bg-[#0284c7] text-xs font-bold text-white">{page}</span>
          <button type="button" aria-label="ถัดไป" className="flex size-7 items-center justify-center rounded-full border border-[#dbe5f0]"><ChevronRight className="size-3.5" /></button>
        </span>
      </div>
    </div>
  );
}
```


### request-stepper — Request Stepper

ขั้นตอนฟอร์ม 6 ขั้น กดไปยัง section ได้

ตำแหน่งไฟล์แนะนำ: `components/washout-pit/request-stepper.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const REQUEST_STEPS = [
  { id: "general", label: "ข้อมูลทั่วไป" },
  { id: "pond", label: "ข้อมูลรายละเอียดบ่อคาย" },
  { id: "cost", label: "ค่าใช้จ่ายที่ขออนุมัติ" },
  { id: "procurement", label: "วิธีจัดหาและผู้เสนอราคา" },
  { id: "summary", label: "สรุปผลการคัดเลือก" },
  { id: "submit", label: "ส่งคำขอ" },
];

// ขั้นตอนฟอร์ม: ขั้นที่ผ่านแล้วมีเครื่องหมายถูก ขั้นปัจจุบันเป็นสีหลัก กดเพื่อเลื่อนไปยัง section
export function RequestStepper({ steps = REQUEST_STEPS, current, onSelect }: { steps?: { id: string; label: string }[]; current: number; onSelect: (index: number) => void }) {
  return (
    <ol className="flex gap-2 overflow-x-auto rounded-xl border border-[#e2f3f8] bg-white p-3 [scrollbar-width:none]">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.id} className="flex min-w-[150px] flex-1 items-center gap-2">
            <button type="button" onClick={() => onSelect(i)} aria-current={active ? "step" : undefined} className="flex min-w-0 items-center gap-2 rounded-lg p-1.5 text-left hover:bg-[#f9fbfe]">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  done && "bg-[#d9fbea] text-[#0f9f75]",
                  active && "bg-[#0284c7] text-white shadow-[0_0_0_4px_#e0f7ff]",
                  !done && !active && "border border-[#dbe5f0] text-[#9ca3af]",
                )}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </span>
              <span className={cn("truncate text-[13px]", active ? "font-semibold text-[#111827]" : done ? "text-[#0f9f75]" : "text-[#53738b]")}>{s.label}</span>
            </button>
            {i < steps.length - 1 ? <span className={cn("h-px min-w-4 flex-1", done ? "bg-[#0f9f75]" : "bg-[#e2f3f8]")} /> : null}
          </li>
        );
      })}
    </ol>
  );
}
```


### button — Button

primary / secondary / quiet / danger มุม 8px ยกขึ้น 1px ตอน hover

ตำแหน่งไฟล์แนะนำ: `components/washout-pit/button.tsx`

Package เพิ่มเติม: class-variance-authority


```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// แปลงจาก .button-primary / .button-secondary / .button-quiet ใน globals.css
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent font-semibold transition-[filter,transform,background-color] hover:-translate-y-px hover:brightness-[.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22d3ee] disabled:cursor-not-allowed disabled:opacity-55",
  {
    variants: {
      variant: {
        primary: "bg-[#0284c7] text-white",
        strong: "bg-[#1e40af] text-white shadow-[0_8px_18px_rgba(30,64,175,0.25)]", // ปุ่ม 'สร้างคำขอใหม่'
        secondary: "border-[#cfeaf5] bg-white text-[#111827]",
        quiet: "bg-transparent text-[#0284c7] hover:bg-[#e0f7ff]",
        danger: "border-[#fecaca] bg-[#fff5f5] text-[#dc2626]",
      },
      size: {
        default: "h-10 px-4 text-sm",
        sm: "h-8 px-3 text-xs",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, type = "button", ...props }, ref) => (
  <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";
```

