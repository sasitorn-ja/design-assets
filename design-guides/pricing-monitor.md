# Pricing Monitor — คู่มือดีไซน์พร้อมโค้ด

ไฟล์นี้ใช้ได้ด้วยตัวเอง มีสเปกดีไซน์ ธีม และโค้ด component ครบ ไม่ต้องเปิดเว็บคลัง ไม่ต้องใช้ shadcn CLI

## ใช้กับโปรเจคของคุณใน 3 ขั้นตอน

1. ดาวน์โหลดไฟล์ .md นี้เก็บไว้ในโปรเจคของคุณ
2. แนบไฟล์ให้ AI ที่ช่วยเขียนโค้ด หรือให้ AI อ่านไฟล์ในโฟลเดอร์
3. บอกชื่อส่วนที่อยากใช้ แล้วตรวจผลในโปรเจคของคุณ

### ข้อความพร้อมส่งให้ AI

> อ่านไฟล์นี้ แล้วนำดีไซน์ Pricing Monitor มาใช้กับโปรเจคของฉัน โดยเลือกเฉพาะ [ระบุ เช่น เมนู / ปุ่ม / ตาราง / ธีมสี] ตรวจ framework และ CSS ของโปรเจคก่อน ปรับโค้ดให้เข้ากัน คงการทำงาน API และสิทธิ์เดิมไว้ พร้อมตรวจหน้าจอมือถือและเดสก์ท็อป

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

Dashboard ติดตามการขึ้นราคา (CPAC / QMIX) แบบ enterprise analytics มีทั้ง dark mode (ค่าเริ่มต้นใน design doc) และ light mode (ที่ใช้บนเว็บจริง) panel มุมมนใหญ่ เส้นขอบบาง ใช้ CSS variables เป็นแหล่งสีเดียว

แนวเทคโนโลยีต้นแบบ: Vite, React 19, Tailwind CSS 4, shadcn-style UI, Recharts, lucide-react

### บุคลิกของดีไซน์

- Modern enterprise analytics
- Panel มุมมนใหญ่ (20–28px) ซ้อนเป็นชั้น เส้นขอบบาง
- ฟ้าเป็น primary action สีอื่นใช้เฉพาะสถานะ
- ทุกสีมาจาก CSS variable รองรับ dark/light ด้วยการสลับ data-theme

### เหมาะกับงาน

- Dashboard วิเคราะห์ที่มีกราฟเส้น/แท่งเยอะ
- หน้าที่มีตัวกรองหลายตัวเรียงบน header
- ระบบที่ต้องการ dark mode จริงจัง

## สี

### Light mode (ใช้บนเว็บจริง)

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Background | #ffffff | พื้นหลัง |
| Foreground | #12233f | หัวข้อ, ตัวเลข |
| Muted text | #55708f | คำอธิบาย |
| Border | rgba(108,137,172,.20) | เส้นขอบ panel |
| Border strong | rgba(14,116,144,.36) | เมนู active, hover |
| Primary | #0f7fb7 | ปุ่มหลัก, segment ที่เลือก |
| Primary strong | #0b6694 | hover ปุ่มหลัก |
| Primary soft | #eef8ff | พื้นเมนู active, chip ที่เลือก |
| Secondary text | #16325c | ข้อความบนปุ่มรอง |
| Accent text | #0f6f9f | ชื่อบริษัทใต้โลโก้ |

### Dark mode (ค่าเริ่มต้นใน design doc)

พื้นเข้ม + gradient เฉพาะพื้นหลังหลัก panel โปร่งแสงเล็กน้อย

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Background | #081121 | พื้นหลัง + radial gradient น้ำเงิน/เขียวมุมบน |
| Foreground | #eef4ff | ตัวอักษรหลัก |
| Muted text | #9fb0d0 | คำอธิบาย |
| Surface | rgba(7,17,34,.92) | panel |
| Surface strong | rgba(18,34,64,.96) | dropdown, modal, หัวตาราง |
| Primary | #3b82f6 | ปุ่มหลัก |
| Primary soft | rgba(59,130,246,.16) | เมนู active |
| Section eyebrow | #7dd3fc | ข้อความเล็กเหนือหัวข้อ |

### Semantic & Chart

สีสถานะต้องมาคู่กับข้อความหรือ icon เสมอ

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Success | #16a34a | สำเร็จ, ถึงเป้า (dark: #4ade80) |
| Warning | #f59e0b | ใกล้หมดอายุ (dark: #facc15) |
| Error | #dc2626 | ผิดพลาด, ลบ (dark: #f87171) |
| Info | #0ea5e9 | ข้อมูลช่วยเหลือ |
| Price line | #0284c7 | เส้นราคาขาย |
| Increase line | #fb7185 | เส้นการขึ้นราคา |
| Chart grid (light) | #c9d9ef | เส้นประในกราฟ |

### Price ladder (ช่วงราคาที่ขึ้น)

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| 500 บาทขึ้นไป | #16a34a | green-600 |
| 400-499 | #22c55e | green-500 |
| 300-399 | #34d399 | emerald-400 |
| 250-299 | #22d3ee | cyan-400 |
| 200-249 | #38bdf8 | sky-400 |
| 100-199 | #fbbf24 | amber-400 |
| ต่ำกว่า 100 | #fb7185 | rose-400 |
| ไม่มี baseline | #94a3b8 | slate-400 |

## ฟอนต์และตัวอักษร

Font family: `var(--font-sarabun), 'Avenir Next', sans-serif`

Sarabun, 'Avenir Next' line-height ของ body 1.5–1.7 ห้ามใช้ weight 900 กับข้อความยาว

| รายการ | ขนาด | น้ำหนัก | การใช้งาน |
| --- | --- | --- | --- |
| Page title | clamp(1.55rem, 2.6vw, 2.25rem) ≈ 36px | 800–900 | ชื่อ Dashboard |
| Card metric | 1.7rem ≈ 27px | 800–900 | ตัวเลข KPI |
| Section title | 1.5rem = 24px | 600 | ชื่อกราฟ/ตาราง |
| Body | 0.875–0.95rem ≈ 14–15px | 400–500 | คำอธิบาย |
| Small label | 0.72–0.8rem ≈ 12px | 600–800 | eyebrow, หัวตาราง, สถานะ |
| Caption | 0.75rem = 12px | 400–500 | helper text |

## ระยะห่าง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| space-1 / 2 / 3 | 4 / 8 / 12px | icon gap, ระหว่าง control, ภายใน card |
| space-4 / 5 / 6 | 16 / 20 / 24px | panel บนมือถือ, sidebar, ระหว่าง section |
| Main padding | 16 / 24 / 32px | มือถือ / แท็บเล็ต / desktop |
| Card / section gap | 12px | ระหว่าง card และ section |
| Header padding | 12px 16px | sticky header |

## มุมโค้ง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Icon button | 14px | ปุ่ม icon 40–44px |
| Input / dropdown | 14–16px | ช่องกรอก |
| Summary card | 20px | KPI |
| Chart container | 24px | กล่องกราฟ |
| Main panel | 28px | section ใหญ่ |
| Badge | 9999px | pill |

## เงา

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Panel | 0 18px 40px rgba(34,73,112,.10) | panel หลัก |
| Card | 0 10px 24px rgba(34,73,112,.10) | card / เมนู active |
| Floating | 0 24px 60px rgba(34,73,112,.10) | dropdown, modal |
| Primary button | 0 16px 40px rgba(48,117,255,.28) | ปุ่ม primary |

## Layout

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| App shell | grid 272px + minmax(0,1fr) | sidebar + เนื้อหา |
| Header | sticky, blur 18px, border-bottom | ตัวกรองทั้งหมด |
| Breakpoints | 980px / 1080px | sidebar → drawer / ตัวกรอง → ปุ่ม |
| KPI | 2 คอลัมน์ → 1 คอลัมน์ | เมื่อพื้นที่ไม่พอ |
| Transition | 160ms ease (bg, border, color, shadow, transform) | ทุก interactive element |

## เมนูและการนำทาง

Sidebar 272px แบ่งกลุ่ม

Sidebar กว้าง 272px มีโลโก้กล่องมนด้านบน แบ่งเมนูเป็นกลุ่ม 'เมนูหลัก' และ 'จัดการระบบ' เมนูที่เลือกเป็นกล่องมนมีเส้นขอบ + แถบ primary ด้านซ้ายแบบ inset ตัวกรองทั้งหมดอยู่บน header แนวนอน บนจอ ≤980px sidebar กลายเป็น drawer และตัวกรองยุบเป็นปุ่มที่ ≤1080px

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| ความกว้าง | 272px | padding 20px 14px |
| โลโก้ | กล่อง 42px radius 14px | ชื่อระบบ 0.96rem/900 + ชื่อบริษัทสี accent-text |
| หัวกลุ่ม | 0.76rem / 900 uppercase tracking .1em | เช่น เมนูหลัก, จัดการระบบ |
| เมนู | radius 14px, padding 10px 12px | icon 18px ในกล่อง 28px |
| Active | border-strong + primary-soft + inset 2px primary | มีเงา 0 10px 24px |
| Hover | shell-hover + translateX(2px) | เลื่อนขวานิดเดียว |
| Drawer มือถือ | ≤980px, overlay + blur | ตัวกรองยุบเป็นปุ่มที่ ≤1080px |

### เมนูหลัก

- Dashboard (CPAC) (icon: LayoutGrid)
- Dashboard (QMIX) (icon: TrendingUp)

### จัดการระบบ

- Admin (icon: Shield)

### Section ในหน้า Dashboard

- ภาพรวม (icon: Gauge)
- กราฟแนวโน้ม (icon: LineChart)
- แนวโน้มรายโครงการ (icon: FolderKanban)
- Project table (icon: Table)

- Header sticky มี blur 18px รวมตัวกรอง Baseline, วันที่เริ่ม-ถึง, Division/FC, Segment, Channel, Discount และปุ่มล้าง
- ปุ่มสลับ dark/light อยู่มุมขวาของหัวข้อหน้า

## กติกาดีไซน์

### ควรทำ

- ใช้ CSS variables เป็นแหล่งสีเดียว เพิ่มสีใหม่เป็น token ก่อนใช้
- เพิ่ม component ใหม่ต้องกำหนดทั้ง dark และ light พร้อมกัน
- ทุก interactive element มี default / hover / focus-visible / active / disabled / loading
- Empty state ต้องมีทั้งหัวข้อและคำแนะนำ action ถัดไป
- ข้อความ loading สั้นและตรงบริบท เช่น 'กำลังเตรียมข้อมูล...'
- บนมือถือให้ตารางเลื่อนแนวนอนภายใน wrapper เท่านั้น

### ควรเลี่ยง

- Hard-code สีใน component โดยไม่จำเป็น
- ใช้ gradient ฉูดฉาดนอกพื้นหลังหลัก
- ใช้ animation กระพริบหรือเคลื่อนไหวต่อเนื่องกับข้อมูล dashboard
- สื่อความหมายด้วยสีอย่างเดียว ไม่มีข้อความหรือ icon
- ทำให้หน้าว่างทั้งหน้าขณะโหลด ถ้ามีข้อมูล cache อยู่

### Responsive checklist

- ≥320px ไม่มีเนื้อหาถูกตัดด้านข้าง
- ≤980px sidebar เป็น drawer
- ≤1080px ตัวกรองยุบเป็นปุ่ม 'ตัวกรอง'
- Chart controls wrap ได้, ตาราง scroll ใน wrapper
- Modal บนมือถือ: padding น้อยลง ปุ่มเรียงเต็มความกว้าง

### Chart

- เส้นหลัก stroke 3px
- Grid เส้นประบาง ไม่แย่งความสนใจ
- Tooltip พื้น surface-strong radius 18px
- Legend บอกชื่อ series ชัดเจน
- กราฟรายวันที่ยาวเกินจอให้ scroll ในกล่องกราฟ

## ธีม CSS


```css
:root {
  --background: #ffffff;
  --foreground: #12233f;
  --card: #ffffff;
  --card-foreground: #12233f;
  --muted: #f5f8fc;
  --muted-foreground: #55708f;
  --surface: #ffffff;
  --surface-muted: #ffffff;
  --surface-strong: #ffffff;
  --border: rgba(108, 137, 172, 0.20);
  --border-strong: rgba(14, 116, 144, 0.36);
  --input: rgba(108, 137, 172, 0.20);
  --primary: #0f7fb7;
  --primary-strong: #0b6694;
  --primary-soft: #eef8ff;
  --primary-foreground: #eff6ff;
  --secondary: #f5f8fc;
  --secondary-strong: #e8eef7;
  --secondary-foreground: #16325c;
  --accent: #eef8ff;
  --accent-foreground: #0f6f9f;
  --destructive: #dc2626;
  --destructive-strong: #b91c1c;
  --ring: rgba(14, 116, 144, 0.24);
  --overlay: rgba(15, 23, 42, 0.36);
  --shell-panel: #ffffff;
  --shell-sidebar: #ffffff;
  --shell-header: rgba(255, 255, 255, 0.92);
  --shell-hover: #f5f9fd;
  --shadow-color: rgba(34, 73, 112, 0.10);
  --accent-text: #0f6f9f;
  --section-eyebrow: #0f6f86;
  --radius: 16px;
}
```


### ผูกตัวแปรกับ Tailwind v4


```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-surface: var(--surface);
  --color-surface-muted: var(--surface-muted);
  --color-surface-strong: var(--surface-strong);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --color-input: var(--input);
  --color-primary: var(--primary);
  --color-primary-strong: var(--primary-strong);
  --color-primary-soft: var(--primary-soft);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-strong: var(--secondary-strong);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-strong: var(--destructive-strong);
  --color-ring: var(--ring);
  --color-overlay: var(--overlay);
  --color-shell-panel: var(--shell-panel);
  --color-shell-sidebar: var(--shell-sidebar);
  --color-shell-header: var(--shell-header);
  --color-shell-hover: var(--shell-hover);
  --color-accent-text: var(--accent-text);
  --color-section-eyebrow: var(--section-eyebrow);
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
| sidebar | Sidebar (grouped) | Sidebar 272px แบ่งกลุ่มเมนู active มีแถบ inset ด้านซ้าย |
| summary-card | Summary Card | การ์ด KPI มุมมน 20px ตัวเลขใหญ่ + ปุ่ม 'วิธีคำนวณ' |
| button | Button | ปุ่ม 6 แบบ รวม chip สำหรับตัวกรอง (data-active) |
| segmented | Segmented Control | สลับ Daily / Weekly ตัวที่เลือกเป็นสี primary ทึบ |
| filter-bar | Header Filter Bar | แถวตัวกรองบน header: baseline, ช่วงวันที่, dropdown chips, ปุ่มล้าง |
| panel | Panel + Dark mode | Panel หลัก radius 28px ใช้ตัวแปรธีม สลับ dark/light ได้ |
| data-table | Data Table | ตารางมุมมน 22px หัวตาราง uppercase ตัวเล็ก tracking กว้าง |
| alert | Alert / Empty State | แจ้งเตือน error/success และกล่องว่างที่มี action ถัดไป |

Package ที่ใช้ในชุดนี้ (เลือกติดตั้งเฉพาะที่นำไปใช้): `class-variance-authority`, `clsx`, `lucide-react`, `tailwind-merge`

## โค้ด component

### sidebar — Sidebar (grouped)

Sidebar 272px แบ่งกลุ่มเมนู active มีแถบ inset ด้านซ้าย

ตำแหน่งไฟล์แนะนำ: `components/pricing-monitor/sidebar.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useState } from "react";
import { LayoutGrid, Shield, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type MenuItem = { key: string; label: string; icon: LucideIcon };
type MenuGroup = { title: string; items: MenuItem[] };

const GROUPS: MenuGroup[] = [
  {
    title: "เมนูหลัก",
    items: [
      { key: "dashboard-cpac", label: "Dashboard (CPAC)", icon: LayoutGrid },
      { key: "dashboard-qmix", label: "Dashboard (QMIX)", icon: TrendingUp },
    ],
  },
  { title: "จัดการระบบ", items: [{ key: "admin", label: "Admin", icon: Shield }] },
];

// ใช้ตัวแปรธีม: --shell-sidebar --border --border-strong --primary --primary-soft --shell-hover --shadow-color
export function Sidebar({
  groups = GROUPS,
  defaultActive = "dashboard-cpac",
  title = "CPAC Dashboard",
  company = "CPAC",
}: {
  groups?: MenuGroup[];
  defaultActive?: string;
  title?: string;
  company?: string;
}) {
  const [active, setActive] = useState(defaultActive);

  return (
    <aside className="flex h-full w-[272px] flex-col gap-6 border-r border-[var(--border)] bg-[var(--shell-sidebar)] px-[14px] py-5">
      <div className="grid grid-cols-[auto_1fr] items-center gap-3 px-[6px]">
        <span className="flex size-[42px] items-center justify-center rounded-[14px] bg-[var(--surface-strong)] text-[1.05rem] font-black text-[var(--foreground)] shadow-[0_10px_24px_var(--shadow-color)]">
          {title.charAt(0)}
        </span>
        <div className="min-w-0">
          <strong className="block truncate text-[0.96rem] font-black text-[var(--foreground)]">{title}</strong>
          <span className="block truncate text-[0.8rem] font-extrabold text-[var(--accent-text)]">{company}</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-auto">
        {groups.map((group) => (
          <div key={group.title} className="space-y-2">
            <p className="px-[6px] text-[0.76rem] font-black uppercase tracking-[0.1em] text-[var(--muted-foreground)]">{group.title}</p>
            <div className="space-y-[6px]">
              {group.items.map((item) => {
                const isActive = active === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActive(item.key)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-[14px] border px-3 py-[10px] text-left transition duration-150",
                      isActive
                        ? "border-[var(--border-strong)] bg-[var(--primary-soft)] shadow-[inset_2px_0_0_var(--primary),0_10px_24px_var(--shadow-color)]"
                        : "border-transparent hover:translate-x-[2px] hover:border-[var(--border)] hover:bg-[var(--shell-hover)]",
                    )}
                  >
                    <span className="flex size-7 items-center justify-center rounded-[9px] text-[var(--muted-foreground)]">
                      <item.icon className="size-[18px]" />
                    </span>
                    <strong className="text-[0.94rem] font-extrabold text-[var(--foreground)]">{item.label}</strong>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
```


### summary-card — Summary Card

การ์ด KPI มุมมน 20px ตัวเลขใหญ่ + ปุ่ม 'วิธีคำนวณ'

ตำแหน่งไฟล์แนะนำ: `components/pricing-monitor/summary-card.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import type { ReactNode } from "react";

// การ์ด KPI: label เล็ก → ตัวเลข 1.7rem/900 → คำอธิบาย ปุ่มเสริมมุมขวาบน
export function SummaryCard({ label, value, description, action }: { label: string; value: string; description: string; action?: ReactNode }) {
  return (
    <article className="rounded-[20px] border border-[var(--border)] bg-[var(--shell-panel)] p-4 shadow-[0_18px_40px_var(--shadow-color)]">
      <div className="relative">
        {action ? <div className="absolute right-0 top-0">{action}</div> : null}
        <span className="block max-w-[calc(100%-88px)] text-sm text-[var(--muted-foreground)]">{label}</span>
        <strong className="mt-1 block text-[1.7rem] font-black leading-tight text-[var(--foreground)] [font-feature-settings:'tnum']">{value}</strong>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{description}</p>
    </article>
  );
}
```


### button — Button

ปุ่ม 6 แบบ รวม chip สำหรับตัวกรอง (data-active)

ตำแหน่งไฟล์แนะนำ: `components/pricing-monitor/button.tsx`

Package เพิ่มเติม: class-variance-authority


```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_16px_40px_rgba(48,117,255,0.28)] hover:-translate-y-0.5 hover:bg-[var(--primary-strong)]",
        secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:-translate-y-0.5 hover:bg-[var(--secondary-strong)]",
        outline: "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-strong)]",
        ghost: "text-[var(--foreground)] hover:bg-[var(--shell-hover)]",
        destructive: "bg-[var(--destructive)] text-white shadow-[0_16px_32px_rgba(220,38,38,0.26)] hover:-translate-y-0.5 hover:bg-[var(--destructive-strong)]",
        // ใช้กับตัวกรอง: ใส่ data-active="true" เมื่อเลือก
        chip: "rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)] data-[active=true]:border-[var(--primary)] data-[active=true]:bg-[var(--primary-soft)] data-[active=true]:text-[var(--foreground)]",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 rounded-xl px-3 text-xs",
        lg: "h-12 px-5 text-base",
        icon: "size-11 rounded-2xl",
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


### segmented — Segmented Control

สลับ Daily / Weekly ตัวที่เลือกเป็นสี primary ทึบ

ตำแหน่งไฟล์แนะนำ: `components/pricing-monitor/segmented.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
"use client";

import { cn } from "@/lib/utils";

// สลับมุมมองกราฟ เช่น Daily / Weekly — ตัวที่เลือกเป็น primary ทึบ มุมมนเต็ม
export function Segmented<T extends string>({ value, onChange, options, ariaLabel }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[]; ariaLabel?: string }) {
  return (
    <div role="group" aria-label={ariaLabel} className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 shadow-[0_10px_24px_var(--shadow-color)]">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "h-9 min-w-[68px] rounded-full px-4 text-xs font-bold transition-colors duration-150",
            value === o.value ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "text-[var(--foreground)] hover:bg-[var(--shell-hover)]",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
```


### filter-bar — Header Filter Bar

แถวตัวกรองบน header: baseline, ช่วงวันที่, dropdown chips, ปุ่มล้าง

ตำแหน่งไฟล์แนะนำ: `components/pricing-monitor/filter-bar.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const control = "flex h-10 items-center gap-2 rounded-[14px] border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--foreground)] transition-colors duration-150 hover:border-[var(--border-strong)]";

function DateField({ label, value }: { label: string; value: string }) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-xs text-[var(--muted-foreground)]">{label}</span>
      <span className={cn(control, "min-w-[140px] justify-between font-medium")}>
        {value}
        <CalendarDays className="size-3.5 text-[var(--muted-foreground)]" />
      </span>
    </label>
  );
}

function DropdownChip({ label, selected }: { label: string; selected?: string }) {
  return (
    <button type="button" className={cn(control, "max-w-[160px] font-medium text-[var(--muted-foreground)]", selected && "border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--foreground)]")}>
      <span className="truncate">{selected ?? label}</span>
      <ChevronDown className="size-3.5 shrink-0" />
    </button>
  );
}

// แถวตัวกรองบน header (sticky + blur) — ใช้ตัวแปรธีมทั้งหมด
export function FilterBar({ onToggleMenu }: { onToggleMenu?: () => void }) {
  const [segment, setSegment] = useState<string | undefined>("Segment: M, L");
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] bg-[var(--shell-header)] px-4 py-3 backdrop-blur-[18px]">
      <button type="button" aria-label="แสดงเมนูหลัก" onClick={onToggleMenu} className={cn(control, "w-10 justify-center px-0")}>
        <Menu className="size-4" />
      </button>
      <button type="button" className={control}>Baseline</button>
      <DateField label="เริ่ม" value="01/03/2026" />
      <DateField label="ถึง" value="24/03/2026" />
      <DropdownChip label="Division / FC" />
      <DropdownChip label="Segment" selected={segment} />
      <DropdownChip label="Channel" />
      <DropdownChip label="Discount" />
      <button type="button" onClick={() => setSegment(undefined)} className={cn(control, "font-bold")}>
        ล้าง
      </button>
    </div>
  );
}
```


### panel — Panel + Dark mode

Panel หลัก radius 28px ใช้ตัวแปรธีม สลับ dark/light ได้

ตำแหน่งไฟล์แนะนำ: `components/pricing-monitor/panel.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Panel หลักของ section (กราฟ, ตาราง, admin) radius 28px
export function Panel({ eyebrow, title, description, actions, children, className }: { eyebrow?: string; title: string; description?: string; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-[28px] border border-[var(--border)] bg-[var(--shell-panel)] p-5 shadow-[0_18px_40px_var(--shadow-color)] backdrop-blur-[18px]", className)}>
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow ? <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-[var(--section-eyebrow)]">{eyebrow}</p> : null}
          <h3 className="text-[1.5rem] font-semibold leading-tight text-[var(--foreground)]">{title}</h3>
          {description ? <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </header>
      {children}
    </section>
  );
}

/** กล่องกราฟ: radius 24px พื้น surface-muted สูงอย่างน้อย 320px */
export function ChartBox({ children }: { children: ReactNode }) {
  return <div className="min-h-[320px] overflow-x-auto rounded-[24px] border border-[var(--border)] bg-[var(--surface-muted)] p-3">{children}</div>;
}
```


### data-table — Data Table

ตารางมุมมน 22px หัวตาราง uppercase ตัวเล็ก tracking กว้าง

ตำแหน่งไฟล์แนะนำ: `components/pricing-monitor/data-table.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Column<T> = { key: string; header: string; align?: "left" | "right"; render: (row: T) => ReactNode };

// ตาราง: wrapper มุมมน 22px หัวตาราง uppercase 0.72rem tracking .16em บนมือถือ scroll ใน wrapper
export function DataTable<T>({ columns, rows, rowKey }: { columns: Column<T>[]; rows: T[]; rowKey: (r: T) => string }) {
  return (
    <div className="overflow-x-auto rounded-[22px] border border-[var(--border)] bg-[var(--shell-panel)]">
      <table className="w-full min-w-[560px] border-collapse text-sm [font-feature-settings:'tnum']">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={cn("border-b border-[var(--border)] bg-[var(--surface-strong)] p-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[var(--muted-foreground)]", c.align === "right" ? "text-right" : "text-left")}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)} className="transition-colors hover:bg-[var(--shell-hover)]">
              {columns.map((c) => (
                <td key={c.key} className={cn("border-b border-[var(--border)] p-3 text-[var(--foreground)]", c.align === "right" && "text-right")}>
                  {c.render(r)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Badge แบบ pill สีพื้นโปร่ง ข้อความสี semantic */
export function Badge({ tone, children }: { tone: "success" | "warning" | "error" | "info"; children: ReactNode }) {
  const map = {
    success: "bg-[#16a34a]/12 text-[#15803d]",
    warning: "bg-[#f59e0b]/15 text-[#b45309]",
    error: "bg-[#dc2626]/12 text-[#b91c1c]",
    info: "bg-[#0ea5e9]/12 text-[#0369a1]",
  };
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold", map[tone])}>{children}</span>;
}
```


### alert — Alert / Empty State

แจ้งเตือน error/success และกล่องว่างที่มี action ถัดไป

ตำแหน่งไฟล์แนะนำ: `components/pricing-monitor/alert.tsx`

Package เพิ่มเติม: lucide-react


```tsx
import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, SearchX } from "lucide-react";

// Alert: พื้นโปร่งสี semantic + เส้นขอบอ่อน ถ้าต้องให้ผู้ใช้ทำอะไรให้ใส่ปุ่ม action
export function Alert({ tone, title, children, action }: { tone: "error" | "success"; title: string; children?: ReactNode; action?: ReactNode }) {
  const isError = tone === "error";
  return (
    <div
      role={isError ? "alert" : "status"}
      className={
        isError
          ? "flex items-start gap-3 rounded-[18px] border border-[#fda4af] bg-[#fff1f2] p-4 text-[#9f1239]"
          : "flex items-start gap-3 rounded-[18px] border border-[#86efac] bg-[#ecfdf5] p-4 text-[#166534]"
      }
    >
      {isError ? <AlertTriangle className="mt-0.5 size-5 shrink-0" /> : <CheckCircle2 className="mt-0.5 size-5 shrink-0" />}
      <div className="min-w-0 flex-1">
        <p className="font-bold">{title}</p>
        {children ? <div className="mt-1 text-sm leading-6 opacity-90">{children}</div> : null}
      </div>
      {action}
    </div>
  );
}

// Empty state: ต้องมีหัวข้อ + คำแนะนำ action ถัดไปเสมอ
export function EmptyState({ title, hint, action }: { title: string; hint: string; action?: ReactNode }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center">
      <SearchX className="mb-3 size-8 text-[var(--muted-foreground)]" />
      <p className="font-bold text-[var(--foreground)]">{title}</p>
      <p className="mt-1 max-w-sm text-sm leading-6 text-[var(--muted-foreground)]">{hint}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
```

