# NongWangJai — คู่มือดีไซน์พร้อมโค้ด

ไฟล์นี้ใช้ได้ด้วยตัวเอง มีสเปกดีไซน์ ธีม และโค้ด component ครบ ไม่ต้องเปิดเว็บคลัง ไม่ต้องใช้ shadcn CLI

## ใช้กับโปรเจคของคุณใน 3 ขั้นตอน

1. ดาวน์โหลดไฟล์ .md นี้เก็บไว้ในโปรเจคของคุณ
2. แนบไฟล์ให้ AI ที่ช่วยเขียนโค้ด หรือให้ AI อ่านไฟล์ในโฟลเดอร์
3. บอกชื่อส่วนที่อยากใช้ แล้วตรวจผลในโปรเจคของคุณ

### ข้อความพร้อมส่งให้ AI

> อ่านไฟล์นี้ แล้วนำดีไซน์ NongWangJai มาใช้กับโปรเจคของฉัน โดยเลือกเฉพาะ [ระบุ เช่น เมนู / ปุ่ม / ตาราง / ธีมสี] ตรวจ framework และ CSS ของโปรเจคก่อน ปรับโค้ดให้เข้ากัน คงการทำงาน API และสิทธิ์เดิมไว้ พร้อมตรวจหน้าจอมือถือและเดสก์ท็อป

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

แดชบอร์ดวิเคราะห์ Dealer โทนขาวอมฟ้า สะอาด อ่านตัวเลขได้เร็ว เส้นขอบบาง เงาเบามาก มีมาสคอต 'น้องวางใจ' ช่วยสรุปภาพรวม

แนวเทคโนโลยีต้นแบบ: Vite, React 19, Tailwind CSS 3, shadcn-style UI, lucide-react

### บุคลิกของดีไซน์

- สะอาด โปร่ง
- ขาวอมฟ้า + สีฟ้า sky เป็นจุดเด่นเดียว
- Data-dense แต่ scan ได้ใน 1-2 วินาที
- ไม่มี gradient หนัก ไม่มี card ซ้อน card

### เหมาะกับงาน

- แดชบอร์ด operational ที่เปิดดูทุกวัน
- หน้าที่มี KPI + ตารางข้อมูลเยอะ แต่ไม่อยากให้ดูแน่น
- ระบบที่ผู้ใช้เป็นคนไทย ต้องการ label ภาษาไทยชัดเจนพร้อมหน่วย

## สี

### Base

สีพื้นและตัวอักษร หน้าจอส่วนใหญ่ควรเป็นขาว/เทา slate

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Background | #fbfcfe | พื้นหลังหน้า |
| Surface | #ffffff | Card, sidebar, header |
| Surface Soft | #f7f9fc | หัวตาราง, พื้นหลัง section |
| Border | #dfe7ef | เส้นขอบ card |
| Border Soft | #e8edf3 | เส้นแบ่ง sidebar/header |
| Table Border | #edf1f2 | เส้นแบ่งแถวตาราง |
| Text Strong | #07142b | ชื่อหน้า, ตัวเลขหลัก |
| Text Body | #13213a | เนื้อหาในตาราง |
| Text Muted | #52627a | หัวตาราง, label รอง |
| Text Subtle | #94a3b8 | หน่วย, helper text |

### Accent

ใช้น้อยๆ ให้ทั้งหน้ามีสีฟ้าเป็นสัญญาณหลักแค่จุดเดียว

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Sky | #0284c7 | เมนู active, กราฟหลัก |
| Sky Light | #0ea5e9 | กราฟรอง |
| Emerald | #10b981 | สำเร็จ, ยืนยันแล้ว |
| Amber | #f59e0b | เตือน, ต้องดู |
| Rose | #f43f5e | ยกเลิก, ผิดพลาด |
| Violet | #8b5cf6 | อันดับ, สินค้า |
| Slate | #64748b | icon และข้อความกลางๆ |

### Status Pill

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Confirmed bg | #ecfdf5 | ข้อความ #047857 |
| Pending bg | #fffbeb | ข้อความ #b45309 |
| Cancelled bg | #fff1f2 | ข้อความ #be123c |
| Other bg | #f1f5f9 | ข้อความ #334155 |

### Dark mode (ไม่บังคับ)

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Background | #020617 | พื้นหลัง |
| Card | #0f172a | Card |
| Border | #1e293b | เส้นขอบ |
| Strong text | #e2e8f0 | ตัวอักษรหลัก |
| Muted text | #94a3b8 | ตัวอักษรรอง |

## ฟอนต์และตัวอักษร

Font family: `var(--font-sarabun), ui-sans-serif, system-ui, sans-serif`

Sarabun เป็นหลัก สำรองด้วย system font เปิด font-feature-settings: "tnum" ให้ตัวเลขกว้างเท่ากัน ห้ามใช้ letter-spacing ติดลบ

| รายการ | ขนาด | น้ำหนัก | การใช้งาน |
| --- | --- | --- | --- |
| Page title | 28–32px | 700–800 | ชื่อหน้าใน header |
| KPI number | 24px | 600 | ตัวเลขใน Metric card |
| Body | 14px | 400 | ข้อความทั่วไป |
| Menu | 13px | 600 | เมนู sidebar |
| Table body | 13px | 400–500 | เนื้อหาตาราง |
| Table header | 12px | 600 | หัวคอลัมน์ |
| Helper | 11–12px | 500 | หน่วย, คำอธิบายสั้น, วันที่ 2 บรรทัด |

## ระยะห่าง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Main padding (desktop) | 16px | ขอบเนื้อหา |
| Main padding (mobile) | 12px | ขอบเนื้อหาบนมือถือ/แท็บเล็ต |
| Section gap | 10–12px | ระยะห่างระหว่างกล่อง |
| KPI padding | 16px 12px | ภายใน KPI card |
| Table cell | 8px 12px (หรือ 8px 10px) | ตารางแบบ compact |

## มุมโค้ง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Card | 8px | Dashboard card |
| Button / Menu | 6–8px | ปุ่ม, เมนู |
| Pill | 6px (rounded-md) | Status pill |
| Segmented | 18px / ด้านใน 14px | Toggle group |

## เงา

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Card | 0 1px 2px rgba(15,23,42,.04) | เกือบไม่เห็น ใช้แค่แยกชั้น |
| Panel | 0 16px 40px rgba(22,36,64,.08) | panel ลอย (shadow-panel) |
| Dark mode | 0 16px 36px rgba(2,6,23,.26) | card บน dark mode |

## Layout

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Shell background | linear-gradient(180deg,#fff 0,rgba(249,251,253,.98) 260px), #fbfcfe | พื้นหลังทั้งแอป |
| Header | สูง 72–84px, พื้นขาว, เส้นล่าง #e8edf3 | ชื่อหน้า + ตัวกรองวันที่ |
| KPI row | 3–4 คอลัมน์ | แถว Metric card ด้านบน |

## เมนูและการนำทาง

Sidebar ด้านซ้าย ย่อได้

Sidebar สีขาว ย่อเหลือแค่ icon ได้ ด้านบนมีสวิตช์ Dealer / OSR เปลี่ยนชุดข้อมูล เมนูที่เลือกพื้นฟ้าอ่อนและมีแถบสีฟ้าที่ขอบขวา บนมือถือ sidebar จะเลื่อนทับเนื้อหาพร้อมฉากหลังมืด

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| ความกว้าง (ขยาย) | 224px | แสดง icon + ชื่อเมนู |
| ความกว้าง (ย่อ) | 68px | แสดงเฉพาะ icon มี tooltip เป็นชื่อเมนู |
| ความสูงเมนู | 40px (h-10) | radius 6px, padding 10px, gap icon 10px |
| ตัวอักษร | 13px / 600 | ปกติ slate-600, icon slate-500 |
| Hover | bg #f0f9ff / text #0369a1 | sky-50 / sky-700 |
| Active | bg #f0f9ff + แถบขวา 4×32px #0284c7 | แถบมนด้านซ้าย |
| Overlay มือถือ | rgba(15,23,42,.45) | ฉากหลังตอนเปิด sidebar |

### เมนูหลัก (สลับคำ Dealer ↔ OSR ตามโหมด)

- Dashboard (icon: LayoutDashboard)
- Dealer Network (icon: Layers3)
- Dealer Analysis (icon: BarChart3)
- Top N Dealers (icon: TrendingUp)
- Top N Products (icon: PackageCheck)
- Orders (icon: ClipboardList)

- เปลี่ยนโหมดเป็น OSR แล้วคำว่า Dealer ในเมนูจะเปลี่ยนเป็น OSR ทั้งหมด
- Header มีชื่อหน้าใหญ่ 28-32px, ตัวกรองช่วงเวลา และปุ่มออกจากระบบ

## กติกาดีไซน์

### ควรทำ

- แสดงหน่วยข้างตัวเลขเสมอ เช่น 1.5K คิว, 277 ครั้ง
- ใช้ label ภาษาไทยที่บอกความหมายตรงๆ เช่น 'ปริมาณส่งจริง' ไม่ใช่ 'Volume'
- ตารางสรุปให้มีวันที่ที่มีความหมายแค่คอลัมน์เดียว วันที่ audit ไว้ในหน้ารายละเอียด
- ชื่อยาวให้ตัด 2 บรรทัด (line-clamp-2) แทนการยืดตาราง
- วันที่+เวลาแยก 2 บรรทัดเพื่อลดความกว้างคอลัมน์
- ใช้ table-fixed กับตารางที่คอลัมน์เยอะ

### ควรเลี่ยง

- ใช้ gradient ใหญ่ orb/blob หรือ card ซ้อน card
- ให้ตารางเลื่อนแนวนอนโดยไม่จำเป็น
- รวมวันที่หลายความหมายแบบ fallback (pour ?? updated ?? created) แล้วตั้งชื่อว่า 'เวลาเท'
- ใช้สี accent หลายสีในหน้าเดียวจนไม่รู้ว่าอะไรสำคัญ

### ตัวอย่าง label ภาษาไทยที่แนะนำ

- จำนวนออเดอร์ → หน่วย ครั้ง
- ปริมาณที่สั่ง / ปริมาณส่งจริง → หน่วย คิว
- เวลาเทล่าสุด = last_pour_datetime ของไซต์
- ใช้งานล่าสุด = last_active_at ของ dealer
- วันที่อัปเดตรายการ = updated_at ของออเดอร์

### Checklist ก่อนส่งงาน

- Sidebar กะทัดรัด ไม่แย่งพื้นที่เนื้อหา
- เมนู active เห็นชัดแต่ไม่ฉูดฉาด
- KPI card มีหน่วยข้างตัวเลข
- ช่องนับจำนวนบอกว่าเป็น ครั้ง / รายการ / ราย
- ไม่มีตารางที่ต้องเลื่อนแนวนอน ยกเว้นหน้าตรวจข้อมูลจริงๆ

## ธีม CSS


```css
:root {
  --background: #fbfcfe;
  --foreground: #07142b;
  --card: #ffffff;
  --card-foreground: #07142b;
  --primary: #0284c7;
  --primary-foreground: #ffffff;
  --secondary: #f1f5f9;
  --secondary-foreground: #13213a;
  --muted: #f7f9fc;
  --muted-foreground: #52627a;
  --accent: #f0f9ff;
  --accent-foreground: #0369a1;
  --destructive: #f43f5e;
  --border: #dfe7ef;
  --input: #d5e0e3;
  --ring: #bae6fd;
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
| side-nav | Sidebar Navigation | Sidebar ย่อได้ พร้อมสวิตช์ Dealer/OSR และแถบ active ด้านขวา |
| metric-card | Metric Card (KPI) | การ์ดตัวเลขสรุป มี label, ตัวเลข, คำอธิบาย และ icon |
| status-pill | Status Pill | ป้ายสถานะออเดอร์ 4 แบบ: ยืนยัน / รอ / ยกเลิก / อื่นๆ |
| button | Button | ปุ่ม 4 แบบ default / secondary / outline / ghost |
| toggle-group | Segmented Toggle | ปุ่มสลับช่วงเวลา ทั้งหมด / ปี / เดือน / วัน |
| dashboard-card | Dashboard Card | กล่องเนื้อหาหลัก 1 กล่องต่อ 1 ตาราง/กราฟ มีหัวข้อ คำอธิบาย และหน่วย |
| data-table | Compact Data Table | ตารางแน่นแต่อ่านง่าย ตัวเลขชิดขวา หน่วยเล็ก วันที่ 2 บรรทัด ชื่อยาวตัด 2 บรรทัด |
| progress-list | Ranking Progress List | รายการอันดับพร้อมแถบสัดส่วน ใช้แทนกราฟแท่งในพื้นที่แคบ |
| empty-state | Empty / Loading State | กล่องว่างเส้นประ และข้อความกำลังโหลด |

Package ที่ใช้ในชุดนี้ (เลือกติดตั้งเฉพาะที่นำไปใช้): `class-variance-authority`, `clsx`, `lucide-react`, `tailwind-merge`

## โค้ด component

### side-nav — Sidebar Navigation

Sidebar ย่อได้ พร้อมสวิตช์ Dealer/OSR และแถบ active ด้านขวา

ตำแหน่งไฟล์แนะนำ: `components/nong-wang-jai/side-nav.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useState, type ReactNode } from "react";
import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Layers3,
  PackageCheck,
  PanelLeftClose,
  PanelLeftOpen,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------- เมนู 1 รายการ ----------
export function SideNavItem({
  collapsed,
  icon,
  label,
  onClick,
  selected,
}: {
  collapsed: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <button
      className={cn(
        "relative flex h-10 w-full items-center gap-2.5 rounded-md px-2.5 text-[13px] font-semibold text-slate-600 outline-none transition-colors hover:bg-sky-50 hover:text-sky-700 focus-visible:ring-2 focus-visible:ring-sky-200",
        collapsed && "justify-center px-0",
        selected && "bg-sky-50 text-sky-700",
      )}
      onClick={onClick}
      title={collapsed ? label : undefined}
      type="button"
    >
      <span className={cn("shrink-0", selected ? "text-sky-600" : "text-slate-500")}>{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
      {selected ? <span className="absolute right-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-l-full bg-sky-600" /> : null}
    </button>
  );
}

// ---------- Sidebar ทั้งแถบ ----------
type NavItem = { key: string; label: string; icon: LucideIcon };

const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "network", label: "Dealer Network", icon: Layers3 },
  { key: "details", label: "Dealer Analysis", icon: BarChart3 },
  { key: "topCustomers", label: "Top N Dealers", icon: TrendingUp },
  { key: "topProducts", label: "Top N Products", icon: PackageCheck },
  { key: "orders", label: "Orders", icon: ClipboardList },
];

type Mode = "dealer" | "osr";

export function SideNav({
  items = NAV_ITEMS,
  defaultActive = "dashboard",
  brand = "NongWangJai",
  subtitle = "Dealer Intelligence",
}: {
  items?: NavItem[];
  defaultActive?: string;
  brand?: string;
  subtitle?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(defaultActive);
  const [mode, setMode] = useState<Mode>("dealer");

  // โหมด OSR เปลี่ยนคำว่า Dealer ในเมนูเป็น OSR
  const navItems = mode === "dealer" ? items : items.map((i) => ({ ...i, label: i.label.replaceAll("Dealer", "OSR") }));

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-[#e8edf3] bg-white transition-[width] duration-200",
        collapsed ? "w-[68px]" : "w-[224px]",
      )}
    >
      <div className={cn("flex h-[72px] items-center gap-2.5", collapsed ? "justify-center" : "px-3")}>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-sm font-bold text-white">
          {brand.charAt(0)}
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold text-sky-700">{brand}</p>
            <p className="truncate text-[11px] font-medium text-slate-500">{subtitle}</p>
          </div>
        )}
      </div>

      <div className={collapsed ? "px-1.5 pb-2" : "px-3 pb-2"}>
        <div role="group" aria-label="เลือกกลุ่มข้อมูล" className={cn("flex rounded-lg bg-slate-100", collapsed ? "gap-0.5 p-0.5" : "p-1")}>
          {(["dealer", "osr"] as const).map((m) => (
            <button
              key={m}
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              type="button"
              className={cn(
                "min-w-0 flex-1 rounded-md py-1.5 font-semibold transition",
                collapsed ? "px-0 text-[9px]" : "px-2 text-xs",
                mode === m ? "bg-white text-sky-700 shadow-sm" : "text-slate-500 hover:text-slate-700",
              )}
            >
              {m === "dealer" ? (collapsed ? "D" : "Dealer") : "OSR"}
            </button>
          ))}
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 px-2 py-2.5">
        {navItems.map((item) => (
          <SideNavItem
            key={item.key}
            collapsed={collapsed}
            icon={<item.icon className="size-4" />}
            label={item.label}
            onClick={() => setActive(item.key)}
            selected={active === item.key}
          />
        ))}
      </nav>

      <div className="border-t border-[#e8edf3] p-2">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "ขยายเมนู" : "ย่อเมนู"}
          className="flex h-9 w-full items-center justify-center gap-2 rounded-md text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-700"
        >
          {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          {!collapsed && "ย่อเมนู"}
        </button>
      </div>
    </aside>
  );
}
```


### metric-card — Metric Card (KPI)

การ์ดตัวเลขสรุป มี label, ตัวเลข, คำอธิบาย และ icon

ตำแหน่งไฟล์แนะนำ: `components/nong-wang-jai/metric-card.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  unit?: string;
  detail: string;
  compact?: boolean;
  /** สีพื้น icon แบบอ่อน: sky / emerald / violet / amber / slate */
  tone?: "sky" | "emerald" | "violet" | "amber" | "slate";
};

const toneClass = {
  sky: "bg-sky-50 text-sky-600",
  emerald: "bg-emerald-50 text-emerald-600",
  violet: "bg-violet-50 text-violet-600",
  amber: "bg-amber-50 text-amber-600",
  slate: "border border-slate-200 bg-slate-100 text-slate-700",
};

// การ์ด KPI: label สั้น → ตัวเลขใหญ่ + หน่วยเล็ก → คำอธิบาย
export function MetricCard({ icon, label, value, unit, detail, compact = false, tone = "sky" }: MetricCardProps) {
  return (
    <div className="min-h-[88px] rounded-lg border border-[#dfe7ef] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className={cn(compact ? "p-2.5" : "px-3 py-3.5")}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className={cn("font-semibold text-slate-500", compact ? "text-[11px]" : "text-xs")}>{label}</p>
            <p className={cn("truncate font-semibold leading-none text-slate-950 [font-feature-settings:'tnum']", compact ? "mt-1 text-[20px]" : "mt-1.5 text-[24px]")}>
              {value}
              {unit ? <span className="ml-1 text-xs font-semibold text-slate-400">{unit}</span> : null}
            </p>
          </div>
          <div className={cn("flex shrink-0 items-center justify-center rounded-lg", compact ? "size-8" : "size-9", toneClass[tone])}>{icon}</div>
        </div>
        <p className={cn("truncate font-medium text-slate-500", compact ? "mt-2 text-[11px]" : "mt-3 text-xs")}>{detail}</p>
      </div>
    </div>
  );
}
```


### status-pill — Status Pill

ป้ายสถานะออเดอร์ 4 แบบ: ยืนยัน / รอ / ยกเลิก / อื่นๆ

ตำแหน่งไฟล์แนะนำ: `components/nong-wang-jai/status-pill.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import { cn } from "@/lib/utils";

export type OrderStatus = "confirmed" | "pending" | "cancelled" | "other";

const styles: Record<OrderStatus, string> = {
  confirmed: "bg-[#ecfdf5] text-[#047857] ring-[#a7f3d0]",
  pending: "bg-[#fffbeb] text-[#b45309] ring-[#fde68a]",
  cancelled: "bg-[#fff1f2] text-[#be123c] ring-[#fecdd3]",
  other: "bg-[#f1f5f9] text-[#334155] ring-[#e2e8f0]",
};

const labels: Record<OrderStatus, string> = {
  confirmed: "ยืนยันแล้ว",
  pending: "รอดำเนินการ",
  cancelled: "ยกเลิก",
  other: "อื่นๆ",
};

// แปลงข้อความสถานะจาก API เป็น 4 กลุ่ม (รองรับทั้งไทยและอังกฤษ)
export function getOrderStatusKey(value?: string | null): OrderStatus {
  const v = String(value ?? "").trim().toLowerCase();
  if (v.includes("cancel") || v.includes("ยกเลิก")) return "cancelled";
  if (v.includes("confirm") || v.includes("approved") || v.includes("ยืนยัน")) return "confirmed";
  if (v.includes("pending") || v.includes("wait") || v.includes("รอ")) return "pending";
  return "other";
}

export function StatusPill({ status, children, className }: { status: OrderStatus; children?: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1", styles[status], className)}>
      {children ?? labels[status]}
    </span>
  );
}
```


### button — Button

ปุ่ม 4 แบบ default / secondary / outline / ghost

ตำแหน่งไฟล์แนะนำ: `components/nong-wang-jai/button.tsx`

Package เพิ่มเติม: class-variance-authority


```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ใช้สีจากธีม (bg-primary ฯลฯ) ก๊อป tokens ของโปรเจคไปด้วยเพื่อให้สีตรง
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border border-border bg-white hover:bg-muted",
        ghost: "hover:bg-muted",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
));
Button.displayName = "Button";
```


### toggle-group — Segmented Toggle

ปุ่มสลับช่วงเวลา ทั้งหมด / ปี / เดือน / วัน

ตำแหน่งไฟล์แนะนำ: `components/nong-wang-jai/toggle-group.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
"use client";

import { cn } from "@/lib/utils";

type ToggleGroupProps<T extends string> = {
  ariaLabel?: string;
  onChange: (value: T) => void;
  options: Array<{ label: string; value: T }>;
  value: T;
};

// ปุ่มสลับแบบแคปซูล ตัวที่เลือกเป็นสีทึบ (ใช้สลับช่วงเวลา/มุมมอง)
export function ToggleGroup<T extends string>({ ariaLabel, onChange, options, value }: ToggleGroupProps<T>) {
  return (
    <div aria-label={ariaLabel} role="group" className="inline-flex shrink-0 gap-1 rounded-[18px] border border-[#d9e3e6] bg-white p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "h-9 min-w-16 rounded-[14px] px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100",
            "aria-pressed:bg-[#13213a] aria-pressed:text-white aria-pressed:hover:bg-[#13213a]/90",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
```


### dashboard-card — Dashboard Card

กล่องเนื้อหาหลัก 1 กล่องต่อ 1 ตาราง/กราฟ มีหัวข้อ คำอธิบาย และหน่วย

ตำแหน่งไฟล์แนะนำ: `components/nong-wang-jai/dashboard-card.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// กล่องเนื้อหาหลัก: 1 กล่องต่อ 1 ตาราง/กราฟ ห้ามซ้อน card ในนี้
export function DashboardCard({
  title,
  description,
  unit,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  unit?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-lg border border-[#dfe7ef] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]", className)}>
      <header className="flex items-start justify-between gap-3 border-b border-[#d9e3e6] px-4 py-3">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-bold text-[#07142b]">{title}</h3>
          {description ? <p className="mt-0.5 truncate text-xs text-[#94a3b8]">{description}</p> : null}
        </div>
        {action ?? (unit ? <span className="shrink-0 text-[11px] font-medium text-[#94a3b8]">หน่วย : {unit}</span> : null)}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
```


### data-table — Compact Data Table

ตารางแน่นแต่อ่านง่าย ตัวเลขชิดขวา หน่วยเล็ก วันที่ 2 บรรทัด ชื่อยาวตัด 2 บรรทัด

ตำแหน่งไฟล์แนะนำ: `components/nong-wang-jai/data-table.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  width?: string; // เช่น "28%"
  align?: "left" | "right" | "center";
  render: (row: T) => ReactNode;
};

// ตาราง compact: table-fixed, หัวตารางพื้นเทาอ่อน, ตัวเลขชิดขวา, ไม่ต้องเลื่อนแนวนอน
export function DataTable<T>({ columns, rows, rowKey, empty = "ไม่พบข้อมูล" }: { columns: Column<T>[]; rows: T[]; rowKey: (row: T) => string; empty?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#dfe7ef] bg-white">
      <table className="w-full table-fixed border-collapse text-[13px] [font-feature-settings:'tnum']">
        <colgroup>
          {columns.map((c) => (
            <col key={c.key} style={{ width: c.width }} />
          ))}
        </colgroup>
        <thead>
          <tr className="border-b border-[#d9e3e6] bg-[#f7f9fc]">
            {columns.map((c) => (
              <th key={c.key} className={cn("px-2.5 py-2 text-xs font-semibold text-[#52627a]", c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : "text-left")}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-14 text-center text-sm font-semibold text-slate-500">
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={rowKey(row)} className="border-b border-[#edf1f2] text-[#13213a] transition-colors last:border-b-0 hover:bg-[#f3faf8]">
                {columns.map((c) => (
                  <td key={c.key} className={cn("px-2.5 py-2 align-middle", c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : "text-left")}>
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ---------- ตัวช่วยใน cell ----------

/** ตัวเลข + หน่วยตัวเล็กสีจาง */
export function NumberWithUnit({ value, unit }: { value: string | number; unit: string }) {
  return (
    <span className="whitespace-nowrap font-semibold">
      {value} <span className="text-[11px] font-medium text-[#94a3b8]">{unit}</span>
    </span>
  );
}

/** ชื่อยาวตัด 2 บรรทัด */
export function ClampText({ children }: { children: ReactNode }) {
  return <span className="line-clamp-2 break-words font-medium">{children}</span>;
}

/** วันที่+เวลาแยก 2 บรรทัด ลดความกว้างคอลัมน์ เช่น "29 ต.ค. 2569 14:30 น." */
export function CompactDateTime({ value }: { value: string }) {
  const parts = value.split(" ");
  if (parts.length < 4) return <span>{value}</span>;
  return (
    <span className="block text-[11px] leading-4">
      <span className="block whitespace-nowrap">{parts.slice(0, 3).join(" ")}</span>
      <span className="block whitespace-nowrap text-[#94a3b8]">{parts.slice(3).join(" ")}</span>
    </span>
  );
}
```


### progress-list — Ranking Progress List

รายการอันดับพร้อมแถบสัดส่วน ใช้แทนกราฟแท่งในพื้นที่แคบ

ตำแหน่งไฟล์แนะนำ: `components/nong-wang-jai/progress-list.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
type Row = { label: string; sublabel?: string; value: number; total: number; unit: string };

function TinyProgress({ percent }: { percent: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-[#edf2f4]">
      <div className="h-full rounded-full bg-[#0284c7]" style={{ width: `${Math.max(Math.min(percent, 100), 0)}%` }} />
    </div>
  );
}

// รายการอันดับ + แถบเทียบกับอันดับ 1 ใช้แทนกราฟแท่งในพื้นที่แคบ
export function ProgressList({ rows }: { rows: Row[] }) {
  if (!rows.length) {
    return (
      <div className="flex h-[150px] items-center justify-center rounded-lg border border-dashed border-[#d9e3e6] bg-[#fbfcfc] text-sm font-semibold text-slate-500">
        ไม่มีข้อมูลสำหรับแสดงกราฟ
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {rows.map((row, index) => {
        const percent = row.total ? Math.min(Math.round((row.value / row.total) * 100), 100) : 0;
        return (
          <div key={`${row.label}-${index}`} className="rounded-lg border border-slate-100 bg-white px-3 py-2.5">
            <div className="mb-2 grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-2 text-sm">
              <span className="flex size-6 items-center justify-center rounded-md bg-slate-100 text-[11px] font-bold text-slate-600">{index + 1}</span>
              <span className="min-w-0">
                <span className="block truncate font-semibold text-slate-800" title={row.label}>{row.label}</span>
                {row.sublabel ? <span className="mt-0.5 block truncate text-[10px] font-semibold text-sky-700">{row.sublabel}</span> : null}
              </span>
              <span className="shrink-0 text-right font-bold text-slate-950">
                {row.value.toLocaleString()} <span className="text-[10px] font-semibold text-slate-400">{row.unit}</span>
              </span>
            </div>
            <TinyProgress percent={percent} />
            <div className="mt-1 flex items-center justify-between text-[11px] font-medium text-slate-500">
              <span>เทียบกับอันดับสูงสุด</span>
              <span>{percent}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```


### empty-state — Empty / Loading State

กล่องว่างเส้นประ และข้อความกำลังโหลด

ตำแหน่งไฟล์แนะนำ: `components/nong-wang-jai/empty-state.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import { Inbox, Loader2 } from "lucide-react";

// กล่องว่าง: เส้นประ พื้นเทาอ่อนมาก ข้อความสั้น
export function EmptyState({ title = "ไม่พบข้อมูล", hint }: { title?: string; hint?: string }) {
  return (
    <div className="flex min-h-[150px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#d9e3e6] bg-[#fbfcfc] px-6 py-8 text-center">
      <Inbox className="size-6 text-slate-400" />
      <p className="text-sm font-semibold text-[#64748b]">{title}</p>
      {hint ? <p className="max-w-xs text-xs text-[#94a3b8]">{hint}</p> : null}
    </div>
  );
}

// ข้อความกำลังโหลด: กึ่งกลาง 14px ตัวหนา 600
export function LoadingState({ label = "กำลังโหลดข้อมูล..." }: { label?: string }) {
  return (
    <div className="flex min-h-[150px] items-center justify-center gap-2 text-sm font-semibold text-[#64748b]">
      <Loader2 className="size-4 animate-spin" />
      {label}
    </div>
  );
}
```

