# RMC Sale Support — คู่มือดีไซน์พร้อมโค้ด

ไฟล์นี้ใช้ได้ด้วยตัวเอง มีสเปกดีไซน์ ธีม และโค้ด component ครบ ไม่ต้องเปิดเว็บคลัง ไม่ต้องใช้ shadcn CLI

## ใช้กับโปรเจคของคุณใน 3 ขั้นตอน

1. ดาวน์โหลดไฟล์ .md นี้เก็บไว้ในโปรเจคของคุณ
2. แนบไฟล์ให้ AI ที่ช่วยเขียนโค้ด หรือให้ AI อ่านไฟล์ในโฟลเดอร์
3. บอกชื่อส่วนที่อยากใช้ แล้วตรวจผลในโปรเจคของคุณ

### ข้อความพร้อมส่งให้ AI

> อ่านไฟล์นี้ แล้วนำดีไซน์ RMC Sale Support มาใช้กับโปรเจคของฉัน โดยเลือกเฉพาะ [ระบุ เช่น เมนู / ปุ่ม / ตาราง / ธีมสี] ตรวจ framework และ CSS ของโปรเจคก่อน ปรับโค้ดให้เข้ากัน คงการทำงาน API และสิทธิ์เดิมไว้ พร้อมตรวจหน้าจอมือถือและเดสก์ท็อป

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

ระบบภายในสำหรับทีมขายและผู้ดูแล Site ข้อมูลตัวเลขเยอะแบบ spreadsheet ใช้น้ำเงิน #145AF1 เป็นแกนหลัก สีอื่นใช้เมื่อมีความหมายเท่านั้น เมนูอยู่ด้านบน มี dropdown แยกตามบทบาท (Manager / Admin / Super Admin)

แนวเทคโนโลยีต้นแบบ: Next.js 16, React 19, Tailwind CSS 4, shadcn (base-ui), Handsontable, AG Grid, ECharts / Recharts

### บุคลิกของดีไซน์

- Professional น่าเชื่อถือ เหมาะกับข้อมูลธุรกิจ
- Data-dense แต่ไม่อึดอัด
- สีบอกความหมาย ไม่ใช้ประดับ
- สถานะสำคัญต้องเห็นเร็ว: ครบแล้ว / ต้องกรอก / โดนแย่งงาน / จบโครงการ

### เหมาะกับงาน

- ระบบกรอกข้อมูลแบบตาราง (spreadsheet-like) หลาย Site
- ระบบที่มีเมนูเยอะ แยกตามบทบาทผู้ใช้
- งานที่ต้องเน้นสถานะ/การแจ้งเตือนชัดเจน

## สี

### Brand และ Text

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| brand-primary | #145AF1 | ปุ่มหลัก, action, selected |
| brand-deep | #0B57D0 | หัว data grid, link เด่น |
| brand-dark | #17384D | heading, navigation |
| brand-ink | #203D63 | heading รอง |
| text-primary | #202124 | ข้อมูลในตาราง, input |
| text-secondary | #48617F | label |
| text-muted | #60769B | helper text |
| text-soft | #7186A2 | placeholder |
| border-blue | #CFE0F6 | border input/card |
| border-soft | #DBEAF5 | divider |
| canvas | #F8FBFF | พื้นหลังหน้า |
| surface | #FFFFFF | card, table, dialog |

### Semantic

Foreground / Background / Border ใช้คู่กันเสมอ

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Success | #188038 | bg #E6F4EA, border #B7D8BF — ครบแล้ว, จบโครงการ |
| Warning | #92400E | bg #FEF7E0, border #F6D58B — ต้องตรวจสอบ |
| Danger | #BE123C | bg #FFF8F8, border #F3C2C8 — โดนแย่งงาน, error |
| Info | #0B57D0 | bg #E8F0FE, border #B9D2FF — selected cell |
| Help | #7E22CE | bg #FAF5FF, border #E9D5FF — ขอความช่วยเหลือ |
| Neutral | #5F6368 | bg #F8F9FA, border #DADCE0 — disabled |

### Data grid

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Header ชั้นบน | #F8F9FA | text #3C4043 |
| Header หลัก | #0B57D0 | text ขาว |
| Cell border | #DADCE0 | เส้นช่อง |
| Selected cell | #E8F0FE | outline #1A73E8 |
| Completed | #E6F4EA | แถว/ช่องที่กรอกครบ |
| Work stolen | #FFF8F8 | accent rose |

## ฟอนต์และตัวอักษร

Font family: `var(--font-sarabun), sans-serif`

Sarabun ทั้งระบบ ('Press Start 2P' ใช้เฉพาะมาสคอต/Easter egg ห้ามใช้กับข้อมูลธุรกิจ)

| รายการ | ขนาด | น้ำหนัก | การใช้งาน |
| --- | --- | --- | --- |
| Display | 28–32px | 800 | page title สำคัญมาก |
| Heading 1 | 24px | 800 | ชื่อหน้า/dashboard section |
| Heading 2 | 20px | 800 | card group, dialog title |
| Heading 3 | 16–18px | 700–800 | section title |
| Body | 14–16px | 400–600 | เนื้อหาทั่วไป |
| Label | 12–14px | 600–700 | form label, table header |
| Caption | 10–12px | 600 | helper, metadata, badge |

## ระยะห่าง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| space-1…8 | 4 / 8 / 12 / 16 / 20 / 24 / 32px | ฐาน 4px |
| Card padding | 16–20px |  |
| Dialog padding | 20–24px |  |
| Field gap | 12–16px | ระหว่าง field |
| Input height | 32–40px |  |
| Button height | 28–40px | ปุ่มในตาราง 28px / ใน dialog 36–40px |
| Page gutter | 16px มือถือ / 24–32px desktop |  |

## มุมโค้ง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Input / small button | 6–8px |  |
| Card / table section | 12–16px |  |
| Dialog / highlight | 16–24px |  |
| Badge / chip | 9999px |  |

## เงา

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| ds-shadow-sm | 0 1px 3px rgb(32 72 125 / 8%) | element เล็ก |
| ds-shadow-card | 0 4px 16px rgb(32 72 125 / 8%) | card |
| ds-shadow-dialog | 0 16px 48px rgb(15 35 65 / 18%) | dialog |

## Layout

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Page | พื้น #F8FBFF, content เป็น surface ขาว | แบ่งด้วย border อ่อนแทนเส้นเข้ม |
| Desktop | table/grid + action column sticky ขวา | filter และ KPI อยู่บน content |
| Mobile | row → card แนวตั้ง | แสดง Site, status, completion ก่อน |
| Motion | 150–200ms ease, ปุ่มกดลง 1px | รองรับ prefers-reduced-motion |

## เมนูและการนำทาง

Top navbar + dropdown ตามบทบาท

เมนูอยู่แถบบนสูง 56px พื้นขาวโปร่ง blur ด้านซ้ายเป็นโลโก้ ตามด้วยเมนูหลักแบบปุ่มมนเตี้ย (Inhand, FollowUp, Dashboard) และเมนูตามบทบาท (Manager, Admin, Super Admin) ที่เปิดเป็น dropdown แบ่งกลุ่ม แต่ละรายการมี icon ในกล่องฟ้า + ชื่อ + คำอธิบาย ด้านขวามีตัวนับงานรอรับ การแจ้งเตือน และเมนูผู้ใช้

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Header | min-h 56px, border-b #dbeaf5, bg ขาว 90% + blur | เงา 0 2px 12px rgba(31,93,147,.05) |
| เมนูหลัก | h-9, radius 8px, px-3, 14px/500 | สีปกติ #48617f |
| Hover | bg blue-50 / text #145AF1 |  |
| Active | bg #e8f2ff, text #145AF1, 600 + inset ring | inset 0 0 0 1px rgba(30,109,254,.10) |
| Dropdown item | icon tile 32px rounded-lg | ปกติ bg #edf5ff icon #176fea / active bg #176fea icon ขาว |
| มือถือ | เมนูเลื่อนแนวนอนได้ (ซ่อน scrollbar) | แถวที่ 2 ใต้โลโก้ |

### เมนูหลัก

- หน้าหลัก (icon: LayoutDashboard)
- Inhand (M/L/MEGA, Tiny/Small) (icon: Building2) — dropdown
- FollowUp (icon: Phone) — dropdown
- Dashboard (Inhand, Tiny/Small, Demand & Supply, FollowUp) (icon: BarChart3) — dropdown

### Manager

- กำหนดเป้าหมายยอด INHAND (icon: Target)
- กำหนดเป้าหมายยอด Tiny/Small (icon: Target)

### Admin (แบ่งกลุ่ม)

- ข้อมูลและเป้าหมาย: ตั้งค่า Segment, จัดการคู่แข่ง, ตั้งค่า FollowUp (icon: SlidersHorizontal)
- โครงการและทีมงาน: ดูงานตามพื้นที่, ผู้ช่วยเหลือและผู้รับแจ้ง (icon: Building2)
- ผู้ใช้งาน: ตั้งค่าผู้ใช้งานและสิทธิ์ (icon: UserCog)

### Super Admin (แบ่งกลุ่ม)

- ข้อมูลหลักของระบบ (icon: Database)
- ควบคุมระบบและขอบเขต: บทบาทและสิทธิ์, ผังองค์กร, ประกาศ, รับแจ้งปัญหา ฯลฯ (icon: ShieldCheck)
- ตรวจสอบระบบ: Audit Log, ประวัติ Role, % การกรอกข้อมูล (icon: Activity)

- รายการเมนูแสดงตามสิทธิ์ของผู้ใช้ (canSeeNavigationItem)
- ด้านขวา: ปุ่ม 'งานรอรับ' แสดงจำนวน Site, กระดิ่งแจ้งเตือนมีตัวเลข, เมนูผู้ใช้

## กติกาดีไซน์

### ควรทำ

- ใช้สีเพื่อบอกความหมายเท่านั้น สีหลักคือน้ำเงิน
- สถานะต้องมีข้อความหรือ icon คู่กับสีเสมอ
- ทุกปุ่ม/input/cell มี focus ring ที่มองเห็น
- icon-only button ต้องมี aria-label
- Touch target บนมือถืออย่างน้อย 40×40px
- 'โดนแย่งงาน' รายเดือน ลงสีเฉพาะ cell ของเดือนนั้น ไม่ tint ทั้ง Site

### ควรเลี่ยง

- สร้างสีใหม่แบบสุ่มนอก token
- ใช้ gradient/glow/shadow หนักกับทุก component
- ใช้สีแดงกับ warning ทั่วไปจนแยกจาก error ไม่ได้
- ฟอนต์เล็กกว่า 10px กับข้อมูลที่ต้องอ่านหรือกด
- เส้นขอบเข้มทุกช่องจนดูเหมือน spreadsheet แน่น
- ซ่อนสถานะสำคัญบนมือถือ, ข้อความยาวใน badge/button

### ข้อความ badge ที่ใช้

- Success: กรอกครบ, เสร็จแล้ว
- Warning: ต้องตรวจสอบ, รอดำเนินการ
- Danger: โดนแย่งงาน, ผิดเงื่อนไข
- Info: กำลังดำเนินการ, เลือกอยู่
- Help: ขอความช่วยเหลือ, StickyFlow

### Accessibility checklist

- Contrast อย่างน้อย WCAG AA
- Dialog มี title และ description
- ข้อความไทยต้องไม่ถูกตัดจนความหมายหาย โดยเฉพาะ error/status
- รองรับ prefers-reduced-motion

## ธีม CSS


```css
:root {
  --background: #F4F9FC;
  --foreground: #16384B;
  --card: #FFFFFF;
  --card-foreground: #16384B;
  --popover: #FFFFFF;
  --popover-foreground: #16384B;
  --primary: #145AF1;
  --primary-foreground: #FFFFFF;
  --secondary: #F2F6F9;
  --secondary-foreground: #16384B;
  --muted: #F2F6F9;
  --muted-foreground: #6A7886;
  --accent: #E2EBF1;
  --accent-foreground: #16384B;
  --destructive: #BE123C;
  --border: #D6E8F4;
  --input: #CFE0F6;
  --ring: #1689CE;
  --radius: 8px;
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
| top-navbar | Top Navbar + Role Menu | แถบเมนูบน มีเมนูหลักและ dropdown แบ่งกลุ่มตามบทบาท |
| button | Button | Primary #145AF1 / Outline / Destructive / Small ในตาราง |
| status-badge | Status Badge | Pill 6 ความหมาย: success / warning / danger / info / help / neutral |
| card | Card | ds-card มาตรฐาน และ card highlight สำหรับข้อมูลสำคัญ |
| input | Input / Field | ช่องกรอกพร้อม label, helper และ state error/disabled |
| project-sheet | Project Sheet (Data grid) | ตารางรายเดือนแบบ spreadsheet: หัวน้ำเงิน, cell ที่เลือก, ครบแล้ว, โดนแย่งงาน, action sticky |
| work-stolen | Work-stolen Notice | การแสดงสถานะ 'โดนแย่งงาน' ให้เด่นแต่ไม่แดงทั้งหน้า |
| dialog | Dialog | Dialog มี icon บอกประเภทงาน, body scroll, ปุ่มหลักขวา |

Package ที่ใช้ในชุดนี้ (เลือกติดตั้งเฉพาะที่นำไปใช้): `class-variance-authority`, `clsx`, `lucide-react`, `tailwind-merge`

## โค้ด component

### top-navbar — Top Navbar + Role Menu

แถบเมนูบน มีเมนูหลักและ dropdown แบ่งกลุ่มตามบทบาท

ตำแหน่งไฟล์แนะนำ: `components/rmc-salesupport/top-navbar.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  Bell,
  Building2,
  ChevronDown,
  LayoutDashboard,
  Phone,
  ShieldCheck,
  SlidersHorizontal,
  Tag,
  Target,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type MenuLink = { id: string; label: string; description?: string; icon: LucideIcon };
type MenuGroup = { title: string; items: MenuLink[] };
type TopMenu = { id: string; label: string; icon: LucideIcon; groups?: MenuGroup[] };

const MENUS: TopMenu[] = [
  { id: "home", label: "หน้าหลัก", icon: LayoutDashboard },
  {
    id: "inhand",
    label: "Inhand",
    icon: Building2,
    groups: [{ title: "Inhand", items: [{ id: "mlm", label: "M / L / MEGA", description: "Site ขนาดกลาง-ใหญ่", icon: Building2 }, { id: "ts", label: "Tiny / Small", description: "Site ขนาดเล็กแยกตามโรงงาน", icon: Building2 }] }],
  },
  { id: "followup", label: "FollowUp", icon: Phone, groups: [{ title: "FollowUp", items: [{ id: "fu-table", label: "ตาราง FollowUp", icon: Phone }, { id: "fu-dash", label: "Dashboard FollowUp", icon: BarChart3 }] }] },
  { id: "dashboard", label: "Dashboard", icon: BarChart3, groups: [{ title: "Dashboard", items: [{ id: "d-inhand", label: "Inhand", icon: BarChart3 }, { id: "d-ds", label: "Demand & Supply", icon: BarChart3 }] }] },
  {
    id: "admin",
    label: "Admin",
    icon: ShieldCheck,
    groups: [
      {
        title: "ข้อมูลและเป้าหมาย",
        items: [
          { id: "segment", label: "ตั้งค่า Segment", description: "กำหนดช่วงจำนวนคิวสำหรับ M, L และ MEGA", icon: SlidersHorizontal },
          { id: "competitor", label: "จัดการรายการคู่แข่ง", description: "ลบรายการที่ผู้ใช้เพิ่ม โดยไม่กระทบข้อมูลเดิม", icon: Tag },
        ],
      },
      { title: "ผู้ใช้งาน", items: [{ id: "users", label: "ตั้งค่าผู้ใช้งานและสิทธิ์", description: "กำหนดบทบาทและขอบเขตข้อมูลของผู้ใช้", icon: UserCog }] },
      { title: "เป้าหมาย INHAND", items: [{ id: "target", label: "กำหนดเป้าหมายยอด INHAND", description: "ตั้งเป้าหมายรายเดือนตามภาค แผนก และกลุ่มขนาด", icon: Target }] },
    ],
  },
];

const triggerClass =
  "flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 text-sm font-medium text-[#48617f] transition-colors hover:bg-blue-50 hover:text-[#145AF1]";
const activeClass = "bg-[#e8f2ff] font-semibold text-[#145AF1] shadow-[inset_0_0_0_1px_rgba(30,109,254,0.10)]";

function DropdownItem({ item, selected, onSelect }: { item: MenuLink; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left outline-none transition-colors hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-[#9ec5ff] focus-visible:ring-offset-1",
        selected && "bg-[#e8f2ff]",
      )}
    >
      <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", selected ? "bg-[#176fea] text-white" : "bg-[#edf5ff] text-[#176fea]")}>
        <item.icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className={cn("block text-sm font-semibold", selected ? "text-[#145AF1]" : "text-[#17384d]")}>{item.label}</span>
        {item.description ? <span className="mt-0.5 block text-xs leading-5 text-[#60769b]">{item.description}</span> : null}
      </span>
    </button>
  );
}

export function TopNavbar({ menus = MENUS, brand = "RMC Sale Support" }: { menus?: TopMenu[]; brand?: string }) {
  const [activeTop, setActiveTop] = useState("home");
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(null);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <header ref={ref} className="relative flex min-h-14 flex-wrap items-center gap-2 border-b border-[#dbeaf5] bg-white/90 px-3 shadow-[0_2px_12px_rgba(31,93,147,0.05)] backdrop-blur-xl lg:flex-nowrap lg:px-4">
      <div className="flex items-center gap-2 pr-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-[#145AF1] text-xs font-extrabold text-white">RMC</span>
        <span className="hidden whitespace-nowrap text-sm font-extrabold text-[#17384d] sm:block">{brand}</span>
      </div>

      <nav aria-label="เมนูหลัก" className="order-3 flex h-11 min-w-0 basis-full items-center gap-1.5 overflow-x-auto [scrollbar-width:none] lg:order-none lg:h-auto lg:basis-auto">
        {menus.map((menu) => {
          const isActive = activeTop === menu.id;
          if (!menu.groups) {
            return (
              <button key={menu.id} type="button" aria-current={isActive ? "page" : undefined} onClick={() => { setActiveTop(menu.id); setActiveItem(null); }} className={cn(triggerClass, isActive && activeClass)}>
                <menu.icon className="size-4" />
                {menu.label}
              </button>
            );
          }
          return (
            <button key={menu.id} type="button" aria-expanded={open === menu.id} onClick={() => setOpen(open === menu.id ? null : menu.id)} className={cn(triggerClass, (isActive || open === menu.id) && activeClass)}>
              <menu.icon className="size-4" />
              {menu.label}
              <ChevronDown className={cn("size-3.5 transition-transform", open === menu.id && "rotate-180")} />
            </button>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-1.5">
        <button type="button" aria-label="การแจ้งเตือน" className="relative flex size-9 items-center justify-center rounded-lg text-[#48617f] hover:bg-blue-50 hover:text-[#145AF1]">
          <Bell className="size-4" />
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-[#145AF1] px-1 text-center text-xs font-bold leading-5 text-white">5</span>
        </button>
        <span className="flex size-8 items-center justify-center rounded-full bg-[#e8f2ff] text-xs font-bold text-[#145AF1]">SJ</span>
      </div>

      {open && (
        <div className="absolute left-3 right-3 top-full z-20 mt-1 rounded-xl border border-[#dbeaf5] bg-white p-3 shadow-[0_16px_48px_rgb(15_35_65/18%)] lg:left-40 lg:right-auto lg:w-[560px]">
          <div className="grid gap-3 sm:grid-cols-2">
            {menus
              .find((m) => m.id === open)!
              .groups!.map((group) => (
                <div key={group.title}>
                  <p className="px-2 pb-1 text-xs font-bold text-[#60769b]">{group.title}</p>
                  {group.items.map((item) => (
                    <DropdownItem
                      key={item.id}
                      item={item}
                      selected={activeItem === item.id}
                      onSelect={() => {
                        setActiveTop(open);
                        setActiveItem(item.id);
                        setOpen(null);
                      }}
                    />
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}
```


### button — Button

Primary #145AF1 / Outline / Destructive / Small ในตาราง

ตำแหน่งไฟล์แนะนำ: `components/rmc-salesupport/button.tsx`

Package เพิ่มเติม: class-variance-authority


```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-bold transition-[background-color,transform,border-color] duration-150 active:translate-y-px disabled:pointer-events-none disabled:border-[#DADCE0] disabled:bg-[#E2E3E5] disabled:text-[#5F6368] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[rgb(20_90_241/28%)]",
  {
    variants: {
      variant: {
        primary: "border-transparent bg-[#145AF1] text-white hover:bg-[#0F4ED7]",
        outline: "border-[#CFE0F6] bg-white text-[#17384D] hover:bg-[#F4F8FD]",
        ghost: "border-transparent bg-transparent text-[#48617F] hover:bg-blue-50 hover:text-[#145AF1]",
        destructive: "border-transparent bg-[#BE123C] text-white hover:bg-[#9F1239]",
      },
      size: {
        default: "h-9 px-4 text-sm", // ปุ่มใน dialog / ฟอร์ม
        lg: "h-10 px-5 text-sm",
        sm: "h-7 rounded-md px-2.5 text-xs", // ปุ่มเล็กในตาราง (28px)
        icon: "size-9",
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


### status-badge — Status Badge

Pill 6 ความหมาย: success / warning / danger / info / help / neutral

ตำแหน่งไฟล์แนะนำ: `components/rmc-salesupport/status-badge.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StatusTone = "success" | "warning" | "danger" | "info" | "help" | "neutral";

// สีจาก design.md: ข้อความ / พื้น / เส้นขอบ ใช้คู่กันเสมอ
const tones: Record<StatusTone, string> = {
  success: "text-[#188038] bg-[#E6F4EA] border-[#B7D8BF]",
  warning: "text-[#92400E] bg-[#FEF7E0] border-[#F6D58B]",
  danger: "text-[#BE123C] bg-[#FFF1F2] border-[#F3C2C8]",
  info: "text-[#0B57D0] bg-[#E8F0FE] border-[#B9D2FF]",
  help: "text-[#7E22CE] bg-[#FAF5FF] border-[#E9D5FF]",
  neutral: "text-[#5F6368] bg-[#F8F9FA] border-[#DADCE0]",
};

// ข้อความสั้น อ่านได้ทันที ใส่ icon ได้ถ้าต้องการ
export function StatusBadge({ tone, icon, children, className }: { tone: StatusTone; icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-bold", tones[tone], className)}>
      {icon}
      {children}
    </span>
  );
}
```


### card — Card

ds-card มาตรฐาน และ card highlight สำหรับข้อมูลสำคัญ

ตำแหน่งไฟล์แนะนำ: `components/rmc-salesupport/card.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ds-card: ขอบ #DBEAF5, มุม 16px, เงาโทนฟ้าเทา
// highlight: ใช้เฉพาะ card ที่สำคัญมาก ห้ามใช้กับทุก card
export function Card({ title, description, highlight, children, className }: { title?: string; description?: string; highlight?: boolean; children?: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#DBEAF5] bg-white p-5 shadow-[0_4px_16px_rgb(32_72_125/8%)]",
        highlight && "border-[#B9D2FF] bg-[linear-gradient(135deg,#fff_0%,#eef5ff_100%)]",
        className,
      )}
    >
      {title ? <h3 className="text-base font-extrabold text-[#203D63]">{title}</h3> : null}
      {description ? <p className="mt-0.5 text-sm text-[#60769B]">{description}</p> : null}
      {children ? <div className={title || description ? "mt-4" : undefined}>{children}</div> : null}
    </div>
  );
}

/** ตัวเลข KPI ใน card */
export function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-[#48617F]">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-[#17384D] [font-feature-settings:'tnum']">
        {value} {unit ? <span className="text-sm font-semibold text-[#60769B]">{unit}</span> : null}
      </p>
    </div>
  );
}
```


### input — Input / Field

ช่องกรอกพร้อม label, helper และ state error/disabled

ตำแหน่งไฟล์แนะนำ: `components/rmc-salesupport/input.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

// ds-input: ขอบ #CFE0F6, focus ขอบน้ำเงิน + ring โปร่ง, error ขอบ rose พื้นชมพูอ่อน
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-9 w-full rounded-lg border border-[#CFE0F6] bg-white px-3 text-sm text-[#202124] outline-none transition-colors placeholder:text-[#8BA0BA]",
      "focus:border-[#145AF1] focus:outline-[3px] focus:outline-offset-0 focus:outline-[rgb(20_90_241/14%)]",
      "aria-[invalid=true]:border-[#E11D48] aria-[invalid=true]:bg-[#FFF8F8]",
      "disabled:cursor-not-allowed disabled:bg-[#E2E3E5] disabled:text-[#5F6368]",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

// Field: label + input + helper/error ใต้ช่อง
export function Field({ label, htmlFor, helper, error, children }: { label: string; htmlFor: string; helper?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-bold text-[#17384D]">
        {label}
      </label>
      {children}
      {error ? <p className="text-xs font-semibold text-[#BE123C]">{error}</p> : helper ? <p className="text-xs text-[#60769B]">{helper}</p> : null}
    </div>
  );
}
```


### project-sheet — Project Sheet (Data grid)

ตารางรายเดือนแบบ spreadsheet: หัวน้ำเงิน, cell ที่เลือก, ครบแล้ว, โดนแย่งงาน, action sticky

ตำแหน่งไฟล์แนะนำ: `components/rmc-salesupport/project-sheet.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type SheetRow = {
  site: string;
  name: string;
  months: (number | null)[];
  completed?: boolean;
  stolenMonths?: number[]; // index ของเดือนที่โดนแย่งงาน
};

// ตารางแบบ spreadsheet ของ RMC: หัวสองชั้น, เลือก cell ได้, คอลัมน์ action sticky ขวา
export function ProjectSheet({ months, rows, onAction }: { months: string[]; rows: SheetRow[]; onAction?: (row: SheetRow) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto rounded-xl border border-[#DADCE0] bg-white">
      <table className="w-full min-w-[640px] border-collapse text-sm [font-feature-settings:'tnum']">
        <thead>
          <tr className="bg-[#F8F9FA] text-xs text-[#3C4043]">
            <th colSpan={2} className="border border-[#DADCE0] px-3 py-1.5 text-left font-bold">ข้อมูล Site</th>
            <th colSpan={months.length} className="border border-[#DADCE0] px-3 py-1.5 font-bold">ปริมาณ (คิว)</th>
            <th className="sticky right-0 border border-[#DADCE0] bg-[#F8F9FA] px-3 py-1.5" />
          </tr>
          <tr className="bg-[#0B57D0] text-xs text-white">
            <th className="border border-[#0B57D0] px-3 py-2 text-left font-bold">Site</th>
            <th className="border border-[#0B57D0] px-3 py-2 text-left font-bold">ชื่อโครงการ</th>
            {months.map((m) => (
              <th key={m} className="border border-[#0B57D0] px-3 py-2 text-right font-bold">{m}</th>
            ))}
            <th className="sticky right-0 border border-[#0B57D0] bg-[#0B57D0] px-3 py-2 font-bold shadow-[-6px_0_10px_-6px_rgba(15,35,65,.4)]">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.site} className={cn(row.completed && "bg-[#E6F4EA]")}>
              <td className="border border-[#DADCE0] px-3 py-2 font-semibold text-[#0B57D0]">{row.site}</td>
              <td className="max-w-[220px] truncate border border-[#DADCE0] px-3 py-2 text-[#202124]">{row.name}</td>
              {row.months.map((v, i) => {
                const key = `${row.site}-${i}`;
                const stolen = row.stolenMonths?.includes(i);
                return (
                  <td
                    key={key}
                    tabIndex={0}
                    onClick={() => setSelected(key)}
                    onFocus={() => setSelected(key)}
                    className={cn(
                      "cursor-cell border border-[#DADCE0] px-3 py-2 text-right text-[#202124] outline-none",
                      stolen && "bg-[#FFF8F8] font-semibold text-[#BE123C]",
                      selected === key && "bg-[#E8F0FE] outline outline-2 -outline-offset-2 outline-[#1A73E8]",
                    )}
                  >
                    {v ?? "–"}
                  </td>
                );
              })}
              <td className="sticky right-0 border border-[#DADCE0] bg-white px-2 py-1.5 text-center shadow-[-6px_0_10px_-6px_rgba(15,35,65,.25)]">
                <button type="button" onClick={() => onAction?.(row)} className="h-7 rounded-md border border-[#CFE0F6] bg-white px-2.5 text-xs font-bold text-[#17384D] hover:bg-[#F4F8FD]">
                  บันทึก
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```


### work-stolen — Work-stolen Notice

การแสดงสถานะ 'โดนแย่งงาน' ให้เด่นแต่ไม่แดงทั้งหน้า

ตำแหน่งไฟล์แนะนำ: `components/rmc-salesupport/work-stolen.tsx`

Package เพิ่มเติม: lucide-react


```tsx
import { AlertTriangle, Lock } from "lucide-react";

// สถานะ 'โดนแย่งงาน' ระดับ Site: พื้นชมพูอ่อน + ข้อความ rose เข้ม + icon + ล็อก action ที่เกี่ยวข้อง
export function WorkStolenNotice({ site, by, date }: { site: string; by: string; date: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#F3C2C8] bg-[#FFF8F8] p-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#FFE4E8] text-[#BE123C]">
        <AlertTriangle className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-extrabold text-[#BE123C]">โดนแย่งงาน</p>
          <span className="rounded-full border border-[#F3C2C8] bg-white px-2 py-0.5 text-[11px] font-bold text-[#BE123C]">{site}</span>
        </div>
        <p className="mt-1 text-sm text-[#48617F]">
          คู่แข่ง <b className="text-[#17384D]">{by}</b> ได้งานเมื่อ {date} ระบบล็อกการกรอกปริมาณของ Site นี้แล้ว
        </p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-[#DADCE0] bg-[#F8F9FA] px-2 py-1 text-xs font-semibold text-[#5F6368]">
        <Lock className="size-3.5" /> ล็อกแล้ว
      </span>
    </div>
  );
}
```


### dialog — Dialog

Dialog มี icon บอกประเภทงาน, body scroll, ปุ่มหลักขวา

ตำแหน่งไฟล์แนะนำ: `components/rmc-salesupport/dialog.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

// Dialog: overlay เข้มโปร่ง, กล่องขาวมุม 20px, header มี icon บอกประเภทงาน, body scroll ได้, ปุ่มหลักอยู่ขวา
export function Dialog({
  open,
  onClose,
  icon,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  icon?: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0f2341]/45" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="dlg-title" className="relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-[20px] bg-white shadow-[0_16px_48px_rgb(15_35_65/18%)]">
        <div className="flex items-start gap-3 border-b border-[#DBEAF5] p-5">
          {icon ? <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F0FE] text-[#0B57D0]">{icon}</span> : null}
          <div className="min-w-0 flex-1">
            <h2 id="dlg-title" className="text-xl font-extrabold text-[#17384D]">{title}</h2>
            {description ? <p className="mt-0.5 text-sm text-[#60769B]">{description}</p> : null}
          </div>
          <button type="button" aria-label="ปิด" onClick={onClose} className="flex size-8 items-center justify-center rounded-lg text-[#48617F] hover:bg-blue-50">
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer ? <div className="flex flex-col-reverse gap-2 border-t border-[#DBEAF5] p-4 sm:flex-row sm:justify-end">{footer}</div> : null}
      </div>
    </div>
  );
}
```

