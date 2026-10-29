# Stock (SyncDrop) — คู่มือดีไซน์พร้อมโค้ด

ไฟล์นี้ใช้ได้ด้วยตัวเอง มีสเปกดีไซน์ ธีม และโค้ด component ครบ ไม่ต้องเปิดเว็บคลัง ไม่ต้องใช้ shadcn CLI

## ใช้กับโปรเจคของคุณใน 3 ขั้นตอน

1. ดาวน์โหลดไฟล์ .md นี้เก็บไว้ในโปรเจคของคุณ
2. แนบไฟล์ให้ AI ที่ช่วยเขียนโค้ด หรือให้ AI อ่านไฟล์ในโฟลเดอร์
3. บอกชื่อส่วนที่อยากใช้ แล้วตรวจผลในโปรเจคของคุณ

### ข้อความพร้อมส่งให้ AI

> อ่านไฟล์นี้ แล้วนำดีไซน์ Stock (SyncDrop) มาใช้กับโปรเจคของฉัน โดยเลือกเฉพาะ [ระบุ เช่น เมนู / ปุ่ม / ตาราง / ธีมสี] ตรวจ framework และ CSS ของโปรเจคก่อน ปรับโค้ดให้เข้ากัน คงการทำงาน API และสิทธิ์เดิมไว้ พร้อมตรวจหน้าจอมือถือและเดสก์ท็อป

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

ระบบจัดการงานขนส่ง PO → สร้างงาน → ห้องคนขับสแกนขึ้นรถ/ส่งของ โทนเทาฟ้าอ่อน มีแบนเนอร์หัวหน้าเป็นภาพคลังสินค้าทับด้วย gradient น้ำเงินเข้ม ใช้งานบนมือถือ (คนขับ) ได้ดี มีมาสคอตกระรอกที่มุม sidebar

แนวเทคโนโลยีต้นแบบ: Next.js 15, React 19, Tailwind CSS 3, shadcn/Radix, next-auth (RMC SSO), lucide-react

### บุคลิกของดีไซน์

- พื้นเทาฟ้าอ่อน (#f4f7fb) + ภาพคลังสินค้าจางๆ
- หัวหน้าเป็นแบนเนอร์มืดภาพจริง ตัวหนังสือขาว
- เมนู active สีฟ้า sky-100 / blue-700 มุมมน 14px
- ตาราง header จางมาก เน้นข้อมูลแถว

### เหมาะกับงาน

- ระบบปฏิบัติการ/โลจิสติกส์ที่มีขั้นตอนชัดเจน
- หน้าที่คนหน้างานใช้บนมือถือ เช่น สแกน QR, ยืนยันส่งของ
- อยากได้หัวหน้าที่มีภาพจริงให้รู้ว่าอยู่หน้าไหน

## สี

### Base (จากเว็บจริง)

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Page background | #f4f7fb | พื้นหลัง + ภาพคลังสินค้าจาง |
| Surface | #ffffff | card, sidebar, header |
| Text | #162337 | ข้อความหลัก |
| Text strong | #0f172a | ข้อมูลในตาราง |
| Muted | #94a3b8 | หัวตาราง, รหัสงาน |
| Nav text | #475569 | เมนูปกติ |
| Border | #dae2ec | เส้นขอบทั่วไป |
| Button border | #cdd8e4 | ปุ่ม outline |
| Header border | #d8dde6 | เส้นใต้ header |
| Row hover | #fafbfc | แถวตาราง |

### Accent

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Blue 700 | #1d4ed8 | เมนู active, ปุ่มหลัก |
| Sky 100 | #e0f2fe | พื้นเมนู active |
| Sky 50 | #f0f9ff | chip +PO, hover |
| Sky 700 | #0369a1 | ข้อความ chip |
| Navy | #104c88 | ข้อความปุ่มขาวบนแบนเนอร์ |
| Banner overlay | #071c39 | gradient → #0b2e55 |

### Status

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| พร้อมเริ่มงาน | #e0f2fe | ข้อความ #1d4ed8 |
| กำลังขนส่ง | #fffbeb | ข้อความ #b45309 ขอบ #fde68a |
| ส่งครบแล้ว | #ecfdf5 | ข้อความ #047857 |
| ยกเลิก / ผิดพลาด | #fef2f2 | ข้อความ #b91c1c |

## ฟอนต์และตัวอักษร

Font family: `var(--font-sarabun), Arial, Helvetica, sans-serif`

Sarabun, Arial, Helvetica body 14px เปิด tabular numbers (tnum)

| รายการ | ขนาด | น้ำหนัก | การใช้งาน |
| --- | --- | --- | --- |
| Banner title | 28px | 700 | ชื่อหน้าในแบนเนอร์ |
| Card title | 1.1rem ≈ 18px | 700 | หัวการ์ด (compact-page h2) |
| Body | 14px | 400 | ทั่วไป |
| Menu | 13px | 400 / 500 active | sidebar |
| Table cell | 12.5px | 400–600 | ข้อมูลตาราง |
| Table header | 11px | 600 | slate-400 |
| Section label | 10px | 500 | หัวกลุ่มเมนู tracking .12em |

## ระยะห่าง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Header | 60px, px 20–32px |  |
| Content gap | 20px (space-y-5) | ระหว่างแบนเนอร์กับตาราง |
| Table cell | 8px 12px | px-3 py-2 |
| Card | px 16–20px, py 12–14px | CardHeader / CardContent |

## มุมโค้ง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Menu | 14px | sidebar |
| Button | 12px | ปุ่มทั่วไป |
| Banner / Card | 16px | rounded-2xl |
| Chip | 12px | +PO |

## เงา

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Banner | 0 10px 30px -16px rgba(18,58,100,.63) | แบนเนอร์หัวหน้า |
| Button | 0 1px 2px rgba(15,23,42,.02) | แทบไม่มี |
| Card | none | การ์ดใช้เส้นขอบแทนเงา |

## Layout

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Shell | sidebar ~224px + content | มาสคอตมุมล่างซ้าย |
| Page heading | แบนเนอร์ภาพ + gradient + เส้น accent สีฟ้าด้านล่างซ้าย | ทุกหน้า |
| Mobile | safe-area-inset-bottom, การ์ดเต็มความกว้าง | ห้องคนขับ |

## เมนูและการนำทาง

Sidebar แบ่ง section + มาสคอต

Sidebar สีขาวแบ่งเป็น 2 กลุ่ม 'งานขนส่ง' และ 'จัดการงาน' หัวกลุ่มตัวเล็ก 10px สีจาง เมนูสูง 40px มุมมน 14px เมนูที่เลือกพื้น sky-100 ตัวอักษร blue-700 ด้านล่างมีมาสคอต Header สูง 60px มีปุ่มย่อเมนู + breadcrumb (Workspace › หน้า) และข้อมูลผู้ใช้/ออกจากระบบด้านขวา

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Header | สูง 60px, พื้นขาว, border-b #d8dde6 | ปุ่มเมนู + breadcrumb |
| หัวกลุ่ม | 10px / 500 tracking .12em slate-400 | งานขนส่ง, จัดการงาน |
| เมนู | h-10, radius 14px, px-3, 13px | ปกติ slate-600 |
| Hover | bg sky-50 / text blue-700 |  |
| Active | bg sky-100 (#e0f2fe) / text blue-700 (#1d4ed8) / 500 | aria-current=page |
| มือถือ | sidebar เป็น drawer, header มีปุ่มผู้ใช้และออกจากระบบ |  |

### งานขนส่ง

- นำเข้า PO (icon: Upload)
- PO รอจัดส่ง (icon: FileText)
- สร้างงาน (icon: FilePlus2)
- ห้องคนขับ (icon: QrCode)

### จัดการงาน

- รายการงาน (icon: Truck)
- ประวัติงาน (icon: FileSpreadsheet)

- โค้ดในเครื่อง (branch Release/main) ยังเป็นเมนู active สีเขียว #0d7a5f แต่เว็บที่ deploy ใช้สีฟ้าแล้ว หน้านี้ยึดตามเว็บจริง

## กติกาดีไซน์

### ควรทำ

- ทุกหน้ามีแบนเนอร์หัวหน้า: ชื่อหน้า + คำอธิบาย 1 บรรทัด + ปุ่ม action ด้านขวา
- ตารางแสดงข้อมูลหลัก + รหัสอ้างอิงตัวเล็กสีจางบรรทัดล่าง
- รายการ PO ที่ยาวให้ย่อเป็น chip '+N PO' กดดูต่อได้
- หน้าคนขับ: บอก 'ขั้นตอนต่อไป' ชัดๆ และตัวเลข ต้องสแกน / ขึ้นรถแล้ว / ส่งแล้ว
- ปุ่มกดลงได้ 1px (active:translate-y-px) ให้รู้สึกว่ากดแล้ว
- รองรับ safe-area บนมือถือ (notch / home indicator)

### ควรเลี่ยง

- ใช้หัวตารางสีเข้มหรือตัวหนา (ให้จางและเล็ก)
- ใส่ข้อความยาวบนแบนเนอร์จนบังภาพ
- ใช้เงาหนักกับการ์ด ใช้เส้นขอบแทน
- ให้ปุ่มบนมือถือเล็กกว่า 36px

### Flow หลักของระบบ

- นำเข้า PO (Excel)
- PO รอจัดส่ง → เลือก PO
- สร้างงาน (ห้องงาน + คนขับ + รถ)
- ห้องคนขับ: สแกนขึ้นรถ → ส่งของ → ยืนยัน
- รายการงาน / ประวัติงาน

## ธีม CSS


```css
:root {
  --background: #f4f7fb;
  --foreground: #162337;
  --card: #ffffff;
  --card-foreground: #162337;
  --popover: #ffffff;
  --popover-foreground: #162337;
  --primary: #1d4ed8;
  --primary-foreground: #ffffff;
  --secondary: #f1f5f9;
  --secondary-foreground: #162337;
  --muted: #eef2f6;
  --muted-foreground: #64748b;
  --accent: #e0f2fe;
  --accent-foreground: #1d4ed8;
  --destructive: #b91c1c;
  --border: #dae2ec;
  --input: #cdd8e4;
  --ring: #93c5fd;
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
| sidebar | Sidebar (sections) | Sidebar แบ่งกลุ่ม หัวกลุ่มตัวเล็ก active สีฟ้า |
| page-heading | Page Heading Banner | แบนเนอร์หัวหน้า ภาพพื้นหลัง + gradient น้ำเงินเข้ม + ปุ่ม action |
| button | Button | ปุ่มมุมมน 12px กดลง 1px มีแบบบนพื้นมืด (glass / white) |
| status-pill | Job Status Pill | สถานะงานขนส่ง: พร้อมเริ่มงาน / กำลังขนส่ง / ส่งครบ / ยกเลิก |
| job-table | Job Table | ตารางงาน หัวจาง ข้อมูล 2 บรรทัด chip +N PO และปุ่มจัดการ |
| driver-card | Driver Step Card | การ์ดห้องคนขับบนมือถือ: ข้อมูลรถ ขั้นตอนต่อไป และตัวนับ |
| quantity-stepper | Quantity Stepper | ปุ่ม − / + สำหรับแก้จำนวนที่สแกน ขนาดใหญ่กดง่ายบนมือถือ |

Package ที่ใช้ในชุดนี้ (เลือกติดตั้งเฉพาะที่นำไปใช้): `class-variance-authority`, `clsx`, `lucide-react`, `tailwind-merge`

## โค้ด component

### sidebar — Sidebar (sections)

Sidebar แบ่งกลุ่ม หัวกลุ่มตัวเล็ก active สีฟ้า

ตำแหน่งไฟล์แนะนำ: `components/stock/sidebar.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useState } from "react";
import { FilePlus2, FileSpreadsheet, FileText, QrCode, Truck, Upload, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { name: string; href: string; icon: LucideIcon };
type Section = { title: string; items: Item[] };

const SECTIONS: Section[] = [
  {
    title: "งานขนส่ง",
    items: [
      { name: "นำเข้า PO", href: "/po/import", icon: Upload },
      { name: "PO รอจัดส่ง", href: "/po", icon: FileText },
      { name: "สร้างงาน", href: "/jobs/new", icon: FilePlus2 },
      { name: "ห้องคนขับ", href: "/driver", icon: QrCode },
    ],
  },
  {
    title: "จัดการงาน",
    items: [
      { name: "รายการงาน", href: "/jobs", icon: Truck },
      { name: "ประวัติงาน", href: "/reports", icon: FileSpreadsheet },
    ],
  },
];

export function Sidebar({ sections = SECTIONS, defaultActive = "/jobs", appName = "SyncDrop" }: { sections?: Section[]; defaultActive?: string; appName?: string }) {
  const [active, setActive] = useState(defaultActive);

  return (
    <aside className="flex h-full w-[224px] flex-col border-r border-[#d8dde6] bg-white">
      <div className="flex h-[60px] shrink-0 items-center gap-3 border-b border-[#d8dde6] px-4">
        <span className="flex size-9 items-center justify-center rounded-xl bg-sky-100 text-sm font-bold text-blue-700">SD</span>
        <p className="truncate text-sm font-semibold text-slate-900">{appName}</p>
      </div>

      <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto px-2.5 py-3">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="mb-2 px-3 text-[10px] font-medium tracking-[0.12em] text-slate-400">{section.title}</div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = active === item.href;
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => setActive(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative flex h-10 w-full items-center gap-3 rounded-[14px] px-3 text-[13px] transition-colors duration-200 focus-visible:outline-blue-600",
                      isActive ? "bg-sky-100 font-medium text-blue-700" : "text-slate-600 hover:bg-sky-50 hover:text-blue-700",
                    )}
                  >
                    <item.icon className="size-4 shrink-0" />
                    <span className="truncate">{item.name}</span>
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


### page-heading — Page Heading Banner

แบนเนอร์หัวหน้า ภาพพื้นหลัง + gradient น้ำเงินเข้ม + ปุ่ม action

ตำแหน่งไฟล์แนะนำ: `components/stock/page-heading.tsx`

Package เพิ่มเติม: lucide-react


```tsx
import type { ReactNode } from "react";

// แบนเนอร์หัวหน้า: ภาพพื้นหลัง (ถ้ามี) + gradient น้ำเงินเข้ม + เส้น accent ด้านล่างซ้าย
export function PageHeading({ title, description, image, actions }: { title: string; description?: string; image?: string; actions?: ReactNode }) {
  return (
    <div className="page-heading relative isolate overflow-hidden rounded-2xl bg-slate-950 text-white shadow-[0_10px_30px_-16px_rgba(18,58,100,0.63)]">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_58%]" />
      ) : (
        // ไม่มีภาพ: ใช้ลายเส้นแทนให้ยังดูมีมิติ
        <div className="absolute inset-0 -z-20 bg-[repeating-linear-gradient(115deg,#1e3a5f_0_2px,transparent_2px_22px)] opacity-60" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071c39]/95 via-[#0b2e55]/85 to-[#0b2e55]/60" />
      <div className="flex flex-wrap items-center justify-between gap-4 px-7 py-6">
        <div className="min-w-0">
          <h1 className="text-[28px] font-bold leading-tight">{title}</h1>
          {description ? <p className="mt-1.5 text-sm text-white/80">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
      <span className="absolute bottom-0 left-3 h-[3px] w-32 rounded-full bg-sky-400" />
    </div>
  );
}
```


### button — Button

ปุ่มมุมมน 12px กดลง 1px มีแบบบนพื้นมืด (glass / white)

ตำแหน่งไฟล์แนะนำ: `components/stock/button.tsx`

Package เพิ่มเติม: class-variance-authority


```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#1d4ed8] text-white shadow-[0_1px_2px_rgba(30,58,138,0.15)] hover:bg-[#1e40af]",
        outline: "border border-[#cdd8e4] bg-white text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.02)] hover:bg-slate-50",
        ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        destructive: "border border-red-200 bg-white text-red-700 hover:bg-red-50 hover:text-red-800",
        // ใช้บนแบนเนอร์มืด
        glass: "border border-white/30 bg-white/12 text-white hover:bg-white/20",
        white: "border border-white bg-white text-[#104c88] shadow-[0_1px_2px_rgba(30,58,138,0.15)] hover:bg-sky-50",
      },
      size: {
        default: "h-9 px-3 text-[13px]",
        lg: "h-11 px-4 text-sm", // ปุ่มหลักบนมือถือ
        icon: "size-9",
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


### status-pill — Job Status Pill

สถานะงานขนส่ง: พร้อมเริ่มงาน / กำลังขนส่ง / ส่งครบ / ยกเลิก

ตำแหน่งไฟล์แนะนำ: `components/stock/status-pill.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import { cn } from "@/lib/utils";

export type JobStatus = "ready" | "in-transit" | "delivered" | "cancelled";

const map: Record<JobStatus, { label: string; className: string }> = {
  ready: { label: "พร้อมเริ่มงาน", className: "border-sky-200 bg-sky-100 text-blue-700" },
  "in-transit": { label: "กำลังขนส่ง", className: "border-amber-200 bg-amber-50 text-amber-700" },
  delivered: { label: "ส่งครบแล้ว", className: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  cancelled: { label: "ยกเลิก", className: "border-red-200 bg-red-50 text-red-700" },
};

export function StatusPill({ status, className }: { status: JobStatus; className?: string }) {
  const s = map[status];
  return <span className={cn("inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[12px] font-semibold", s.className, className)}>{s.label}</span>;
}
```


### job-table — Job Table

ตารางงาน หัวจาง ข้อมูล 2 บรรทัด chip +N PO และปุ่มจัดการ

ตำแหน่งไฟล์แนะนำ: `components/stock/job-table.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { StatusPill, type JobStatus } from "./status-pill";

export type Job = {
  id: string;
  room: string;
  route: string;
  pos: string[];
  driver: string;
  plate: string;
  loaded: string;
  delivered: string;
  status: JobStatus;
};

// ตารางงาน: หัวตารางเล็กและจาง, ข้อมูลหลัก + รหัสอ้างอิงบรรทัดล่าง, PO ที่เกินย่อเป็น chip
export function JobTable({ jobs, onManage }: { jobs: Job[]; onManage?: (job: Job) => void }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#dae2ec] bg-white">
      <table className="w-full min-w-[820px] text-left">
        <thead className="border-b border-[#eef2f6]">
          <tr>
            {["ห้องงาน", "เส้นทาง / PO", "คนขับ", "ขึ้นรถ", "ส่งแล้ว", "สถานะ", "จัดการ"].map((h) => (
              <th key={h} className="whitespace-nowrap px-3 py-2 text-[11px] font-semibold text-slate-400">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef2f6] text-[12.5px] text-slate-900">
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-[#fafbfc]">
              <td className="px-3 py-2.5">
                <span className="block max-w-64 break-words font-semibold">{job.room}</span>
                <span className="mt-0.5 block text-[11px] text-slate-400">{job.id}</span>
              </td>
              <td className="px-3 py-2.5">
                <span className="block">{job.route}</span>
                <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                  {job.pos.slice(0, 2).join(", ")}
                  {job.pos.length > 2 ? (
                    <button type="button" className="inline-flex shrink-0 items-center gap-1 rounded-md bg-sky-50 px-1.5 py-0.5 font-medium text-sky-700 transition-colors hover:bg-sky-100">
                      +{job.pos.length - 2} PO <ChevronRight className="size-3" />
                    </button>
                  ) : null}
                </span>
              </td>
              <td className="px-3 py-2.5">
                <span className="block">{job.driver}</span>
                <span className="mt-0.5 block text-[11px] text-slate-400">{job.plate}</span>
              </td>
              <td className="px-3 py-2.5 font-semibold [font-feature-settings:'tnum']">{job.loaded}</td>
              <td className="px-3 py-2.5 font-semibold [font-feature-settings:'tnum']">{job.delivered}</td>
              <td className="px-3 py-2.5"><StatusPill status={job.status} /></td>
              <td className="px-3 py-2.5">
                <button type="button" onClick={() => onManage?.(job)} className="inline-flex h-9 items-center gap-1 rounded-xl border border-[#cdd8e4] bg-white px-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 active:translate-y-px">
                  จัดการ <ChevronDown className="size-3.5" />
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


### driver-card — Driver Step Card

การ์ดห้องคนขับบนมือถือ: ข้อมูลรถ ขั้นตอนต่อไป และตัวนับ

ตำแหน่งไฟล์แนะนำ: `components/stock/driver-card.tsx`

Package เพิ่มเติม: lucide-react


```tsx
import { MapPin, ScanLine, Truck, User } from "lucide-react";

// การ์ดห้องคนขับ (มือถือ): ข้อมูลงาน → ขั้นตอนต่อไป → ตัวนับ
export function DriverCard({
  room,
  jobId,
  phase,
  truck,
  driver,
  origin,
  nextStep,
  counts,
}: {
  room: string;
  jobId: string;
  phase: string;
  truck: string;
  driver: string;
  origin: string;
  nextStep: string;
  counts: { toScan: number; loaded: number; delivered: number };
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#dae2ec] bg-white">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[19px] font-bold text-slate-900">{room}</h3>
          <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">{phase}</span>
        </div>
        <p className="mt-0.5 text-[11px] text-slate-400">{jobId}</p>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
          {[
            { icon: Truck, label: "รถขนส่ง", value: truck },
            { icon: User, label: "คนขับ", value: driver },
            { icon: MapPin, label: "สถานะต้นทาง", value: origin },
          ].map((f) => (
            <div key={f.label} className="flex gap-2">
              <f.icon className="mt-0.5 size-4 shrink-0 text-slate-400" />
              <div>
                <dt className="text-xs text-slate-500">{f.label}</dt>
                <dd className="font-semibold text-slate-900">{f.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      <div className="border-t border-[#eef2f6] bg-[#f8fafc] p-4">
        <div className="flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">
            <ScanLine className="size-4" />
          </span>
          <div>
            <p className="text-[11px] font-medium text-blue-700">ขั้นตอนต่อไป</p>
            <p className="text-sm font-bold text-slate-900">{nextStep}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 divide-x divide-[#e2e8f0] text-left">
          {[
            { label: "ต้องสแกน", value: counts.toScan, className: "text-slate-900" },
            { label: "ขึ้นรถแล้ว", value: counts.loaded, className: "text-blue-700" },
            { label: "ส่งแล้ว", value: counts.delivered, className: "text-sky-700" },
          ].map((c) => (
            <div key={c.label} className="px-3 first:pl-0">
              <p className="text-[11px] text-slate-500">{c.label}</p>
              <p className={`text-xl font-bold [font-feature-settings:'tnum'] ${c.className}`}>{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```


### quantity-stepper — Quantity Stepper

ปุ่ม − / + สำหรับแก้จำนวนที่สแกน ขนาดใหญ่กดง่ายบนมือถือ

ตำแหน่งไฟล์แนะนำ: `components/stock/quantity-stepper.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { Minus, Plus } from "lucide-react";

// ปุ่ม −/+ ขนาด 40px กดง่ายบนมือถือ ตัวเลขตรงกลางพิมพ์แก้ได้
export function QuantityStepper({ value, onChange, min = 0, max, unit }: { value: number; onChange: (v: number) => void; min?: number; max?: number; unit?: string }) {
  const clamp = (v: number) => Math.max(min, max !== undefined ? Math.min(max, v) : v);
  const btn = "flex size-10 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 active:translate-y-px disabled:opacity-40";
  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border border-[#cdd8e4] bg-white">
      <button type="button" aria-label="ลดจำนวน" className={btn} disabled={value <= min} onClick={() => onChange(clamp(value - 1))}>
        <Minus className="size-4" />
      </button>
      <input
        inputMode="numeric"
        aria-label="จำนวน"
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value.replace(/\D/g, "")) || 0))}
        className="h-10 w-14 border-x border-[#e2e8f0] text-center text-sm font-bold text-slate-900 outline-none [font-feature-settings:'tnum'] focus:bg-sky-50"
      />
      <button type="button" aria-label="เพิ่มจำนวน" className={btn} disabled={max !== undefined && value >= max} onClick={() => onChange(clamp(value + 1))}>
        <Plus className="size-4" />
      </button>
      {unit ? <span className="pr-3 text-xs text-slate-500">{unit}</span> : null}
    </div>
  );
}
```

