# CPAC CPM Dealer (ใหม่) — คู่มือดีไซน์พร้อมโค้ด

ไฟล์นี้ใช้ได้ด้วยตัวเอง มีสเปกดีไซน์ ธีม และโค้ด component ครบ ไม่ต้องเปิดเว็บคลัง ไม่ต้องใช้ shadcn CLI

## ใช้กับโปรเจคของคุณใน 3 ขั้นตอน

1. ดาวน์โหลดไฟล์ .md นี้เก็บไว้ในโปรเจคของคุณ
2. แนบไฟล์ให้ AI ที่ช่วยเขียนโค้ด หรือให้ AI อ่านไฟล์ในโฟลเดอร์
3. บอกชื่อส่วนที่อยากใช้ แล้วตรวจผลในโปรเจคของคุณ

### ข้อความพร้อมส่งให้ AI

> อ่านไฟล์นี้ แล้วนำดีไซน์ CPAC CPM Dealer (ใหม่) มาใช้กับโปรเจคของฉัน โดยเลือกเฉพาะ [ระบุ เช่น เมนู / ปุ่ม / ตาราง / ธีมสี] ตรวจ framework และ CSS ของโปรเจคก่อน ปรับโค้ดให้เข้ากัน คงการทำงาน API และสิทธิ์เดิมไว้ พร้อมตรวจหน้าจอมือถือและเดสก์ท็อป

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

ดีไซน์ใหม่ของ CPAC Dealer (พ.ย. 2569) เปลี่ยนชื่อเป็น CPM สไตล์สนุกแบบ "สติกเกอร์": แถบ header สีฟ้า #5BC4F5 ขอบล่างเป็นคลื่น เมนูที่เลือกเป็นแคปซูลขาวขอบกรมท่าพร้อมเงาแข็ง พื้นหลังลายจุด หัวข้อใช้ฟอนต์ Prompt ปุ่มแคปซูลมีเงากด ใช้ธีมเดียวทุกบทบาท

แนวเทคโนโลยีต้นแบบ: Next.js 15, React 19, Tailwind CSS 3, shadcn (radix-ui), Prompt + Sarabun, ECharts, lucide-react

### บุคลิกของดีไซน์

- ฟ้าสด #5BC4F5 + กรมท่า #0C2A44 เป็นขอบ/เงา
- เงาแข็งไม่เบลอ (2px 3px 0) ให้ดูเหมือนสติกเกอร์
- ทุกอย่างมุมมนเต็ม (pill) การ์ดมุม 20px
- พื้นลายจุดฟ้าจาง หัวข้อ Prompt ตัวเนื้อหา Sarabun

### เหมาะกับงาน

- Portal สำหรับคู่ค้า/ร้านค้าที่อยากให้ดูเป็นมิตร สนุก
- Dashboard ยอดขาย + Rebate + แคมเปญ
- งานที่มีมาสคอต/แบรนด์สีสด
- อยากได้ธีมเดียวใช้ทุกบทบาท (Dealer / พนักงาน / Admin)

## สี

### Brand (SCG theme)

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Bar | #5BC4F5 | แถบ header, เมนู active บนมือถือ |
| Primary | #0072B8 | ปุ่มหลัก ลิงก์ (ตัวขาวผ่าน AA) |
| Primary dark | #005A92 | hover + เงากดของปุ่มหลัก |
| Primary bright | #00A1E5 | focus ring, แถบ progress |
| Primary soft | #E3F4FD | พื้น badge, แถวที่เลือก |
| Accent soft | #D6EFFC | hover ปุ่ม outline |

### Ink & พื้นผิว

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Ink | #0C2A44 | ตัวอักษรหลัก ขอบ/เงาสติกเกอร์ |
| Ink soft | #23435F | เมนู หัวตาราง |
| Muted | #5A7489 | ข้อความรอง |
| Faint | #93A9BA | placeholder |
| Line | #CFE6F5 | ขอบการ์ด + เงาการ์ด |
| Canvas | #F3FAFF | พื้นหลังหน้า (มีลายจุด) |
| Canvas deep | #E1F2FD | หัวตาราง, รางแท็บ |
| Surface soft | #F8FCFF | กล่องย่อยในการ์ด |

### Semantic

| ชื่อ | ค่าสี | การใช้งาน |
| --- | --- | --- |
| Success | #0BAA76 | ได้รับแล้ว, ยอดเพิ่ม |
| Warning | #F2A500 | เตือน |
| Danger | #DC2626 | ลบ, ผิดพลาด |
| Logout | #E5484D | ปุ่มออกจากระบบ (พื้น #FFF1F1) |

## ฟอนต์และตัวอักษร

Font family: `var(--font-sarabun), 'TH Sarabun New', sans-serif`

หัวข้อ เมนู ปุ่ม แท็บ ใช้ Prompt (400–700) ตัวเนื้อหาและตารางใช้ Sarabun เพื่อไม่ให้ตารางกว้างเกิน ตัวเลขเปิด tabular-nums

| รายการ | ขนาด | น้ำหนัก | การใช้งาน |
| --- | --- | --- | --- |
| Page title (h1) | 22px | 700 Prompt | ภาพรวมยอดขาย |
| Card title | 17px | 600 Prompt | ยอดขายที่ปิดแล้ว |
| KPI value | 28px | 700 Prompt | 1,284.5 คิว |
| Menu | 13px | 500 / 700 active | Prompt (มือถือ 15px) |
| Button / Filter | 12–12.5px | 600–800 |  |
| Body | 14px | 400–600 Sarabun |  |
| Table header | 11px | 700 | สี #23435F พื้น #E1F2FD |
| Helper | 11.5–12px | 400–700 | อีกเพียง X คิว |

## ระยะห่าง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| ระยะใต้เมนู | 8px มือถือ / 12px ≥640px | จอใหญ่ +12px ของคลื่น |
| Card padding | 20px |  |
| Section gap | 12px |  |
| Button | h 32 / 40 / 48px | sm / default / lg |
| ลายจุดพื้นหลัง | 22px | จุด 1px |

## มุมโค้ง

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Base | 18px (1.125rem) | --radius |
| sm / md | 12px / 14px | input, กล่องย่อย |
| Card | 20px | --admin-card-radius |
| Popover / Dialog | 16px / 24px |  |
| ปุ่ม เมนู แท็บ badge | 9999px | pill ทั้งหมด |

## เงา

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Card | 0 3px 0 #CFE6F5 | เงาแข็งด้านล่าง (การ์ดกราฟ ตาราง ตัวกรอง) |
| KPI card | 0 6px 20px rgb(9 41 67 / .05) | แถว KPI บนสุด มุม 16px ขอบ 1px |
| Raised | 0 4px 0 #CFE6F5, 0 8px 20px rgb(12 42 68 / .05) |  |
| Sticker (เมนู active) | 2px 3px 0 #0C2A44 |  |
| Popover / Select | ขอบ #CFE6F5 2px + 4px 4px 0 #0C2A44 | dropdown, select, เมนูผู้ใช้ |
| Dialog | 6px 6px 0 #0C2A44 |  |
| Button press | 0 3px 0 #005A92 → 0 1px 0 ตอนกด | ปุ่มหลักยุบ 2px |
| Focus | 0 0 0 3px rgb(0 161 229 / .28) |  |

## Layout

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| Header | แถบฟ้าเต็มกว้าง + คลื่น sticky |  |
| หน้าหลัก Dealer | การ์ดยอดสะสม + Rebate + ปฏิทินรายวัน/รายเดือน | เต็มความกว้าง responsive |
| Loading | skeleton ฟ้า + แถบ progress บนสุด 3px | ขึ้นหลัง 160ms |
| Mobile | แถบฟ้า 56px + sheet เมนู | ไม่มี tab bar ล่างแล้ว |

## เมนูและการนำทาง

แถบฟ้าขอบคลื่น + เมนูสติกเกอร์ / มือถือใช้เมนู sheet

Header เป็นแถบสีฟ้า #5BC4F5 ไม่มีเส้นขอบ ขอบล่างเป็นคลื่นสูง 12px (CSS mask) โลโก้ CPAC | CPM ซ้าย เมนูเป็นแคปซูลฟอนต์ Prompt ตัวอักษรกรมท่า hover เป็นขาวโปร่ง 55% ตัวที่เลือกเป็นสติกเกอร์ขาว ขอบกรมท่า 2px เงาแข็ง 2px 3px ขวามีปุ่มเลือกกิจการ ช่วงวันที่ และ avatar เป็นแคปซูลขาวขอบกรมท่าเหมือนกัน บนมือถือเป็นแถบฟ้าบาง 56px + ปุ่ม hamburger เปิด sheet ซ้าย เมนูใน sheet เป็นแคปซูลสูง 48px ตัวที่เลือกเป็นสติกเกอร์ฟ้า

| รายการ | ค่า | การใช้งาน |
| --- | --- | --- |
| แถบ header | bg #5BC4F5, ขอบคลื่น 12px | mask radial-gradient 12px ซ้ำทุก 24px |
| แถบสูง | 68px (มือถือ 56px) |  |
| เมนู | h-9, pill, Prompt 13px/500, ขอบใส 2px, px 14px | ตัวอักษร #23435F |
| Hover | bg rgba(255,255,255,.55) | ตัวอักษร #0C2A44 |
| Active | bg ขาว, ขอบ #0C2A44 2px, 700 | เงา 2px 3px 0 #0C2A44 |
| ปุ่มเครื่องมือ | pill ขาว ขอบกรมท่า 2px, 12.5px/800 | เงา 2px 2px 0 #0C2A44 |
| Dropdown เมนู (ตั้งค่า, Super Admin) | การ์ดขาว ขอบ #CFE6F5 1.5px มุม 20px | เงา 0 3px 0 #CFE6F5, รายการมี icon tile + คำอธิบาย |
| เนื้อหา | เริ่มต่ำกว่าคลื่น 12px | จอ ≥1024px |
| มือถือ | แถบฟ้า 56px + sheet 88vw (สูงสุด 360px) | เมนูสูง 46px มุม 20px ตัว 15px |

### Dealer

- หน้าหลัก (icon: Home)
- Dashboard (icon: BarChart3)
- อันดับ (icon: Trophy)
- แคมเปญ (icon: PanelTop)
- โบรชัวร์ (icon: FileText)
- แผนที่ (icon: MapPinned)
- ติดต่อพนักงาน (icon: Headphones)

### พนักงาน SCG / Viewer

- Dashboard (icon: LayoutDashboard)
- อันดับ (icon: Trophy)
- แคมเปญ (icon: PanelTop)
- โบรชัวร์ (icon: FileText)
- แผนที่ (icon: MapPinned)
- ติดต่อพนักงาน (icon: Headphones)

### Admin

- Dashboard (icon: LayoutDashboard)
- อันดับ (icon: Trophy)
- แคมเปญ (icon: Gift)
- ร้านค้า (icon: Store)

- รายการเมนูเหมือนดีไซน์เดิม เปลี่ยนแค่หน้าตา (ดูดีไซน์เดิมที่โปรเจค SaleSpark CPAC Dealer)
- ธีมอยู่ในไฟล์ app/components/admin/scg-theme.css ใส่ class .scg-theme ที่ <html> เพื่อให้เมนู/dialog ที่ render ใน portal ได้ธีมด้วย
- เว็บนี้มีลายน้ำ 'FOR TEST ONLY' เพราะเป็น environment ทดสอบ ภาพหน้าจอในนี้ซ่อนลายน้ำแล้ว

## กติกาดีไซน์

### ควรทำ

- ใช้เงาแข็งกรมท่า (ไม่เบลอ) เฉพาะสิ่งที่กดได้หรือลอยอยู่: เมนู active, ปุ่มเครื่องมือ, popover, dialog
- การ์ดใช้ขอบ #CFE6F5 1.5px + เงา 0 3px 0 สีเดียวกัน ไม่ใช่เงาเบลอ
- หัวข้อ/ปุ่ม/เมนูใช้ Prompt ตัวเนื้อหาและตารางใช้ Sarabun
- ข้อความ progress บอกเป็นตัวเลขที่ทำได้จริง เช่น "อีกเพียง 715.5 คิว รับ Rebate เพิ่ม ฿31,465"
- ใส่ class .scg-theme ที่ <html> เพื่อให้ dropdown/dialog ที่อยู่ใน portal ได้ธีมด้วย
- เคารพ prefers-reduced-motion: ปิดอนิเมชันกดปุ่มและ shimmer

### ควรเลี่ยง

- ใส่เงาสติกเกอร์ให้ทุกการ์ด จะดูรกและแยกไม่ออกว่าอะไรกดได้
- ใช้ #00A1E5 เป็นพื้นปุ่มที่มีตัวขาว (contrast ไม่ผ่าน) ให้ใช้ #0072B8
- ใช้ Prompt กับตารางข้อมูลยาวๆ (ตัวกว้าง ทำให้ตารางล้น)
- วางเนื้อหาชิดใต้ header จนคลื่นทับ ต้องเว้น 12px

### ต่างจากดีไซน์เดิมอย่างไร

- Header จากพื้นขาว → แถบฟ้าขอบคลื่น
- เมนู active จากพื้นฟ้าทึบตัวขาว → สติกเกอร์ขาวขอบกรมท่า
- ปุ่ม/แท็บจากมุม 12px → แคปซูลเต็ม
- เงาเบลอ → เงาแข็ง
- เพิ่มฟอนต์ Prompt สำหรับหัวข้อ
- มือถือเลิกใช้ tab bar ล่าง ใช้เมนู sheet แทน
- Rebate จาก gauge วงกลม → แถบบาง + ตารางขั้น

## ธีม CSS


```css
:root {
  --background: #F3FAFF;
  --foreground: #0C2A44;
  --card: #FFFFFF;
  --card-foreground: #0C2A44;
  --popover: #FFFFFF;
  --popover-foreground: #0C2A44;
  --primary: #0072B8;
  --primary-hover: #005A92;
  --primary-foreground: #FFFFFF;
  --secondary: #E1F2FD;
  --secondary-foreground: #0C2A44;
  --muted: #E1F2FD;
  --muted-foreground: #5A7489;
  --accent: #D6EFFC;
  --accent-foreground: #0C2A44;
  --destructive: #DC2626;
  --success: #0BAA76;
  --warning: #F2A500;
  --border: #CFE6F5;
  --input: #BEDCF0;
  --ring: #00A1E5;
  --radius: 18px;
  --scg-bar: #5BC4F5;
  --scg-ink: #0C2A44;
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
  --color-scg-bar: var(--scg-bar);
  --color-scg-ink: var(--scg-ink);
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
| top-nav | Top Nav (แถบฟ้า + คลื่น) | Header สีฟ้าขอบล่างเป็นคลื่น เมนู active เป็นสติกเกอร์ขาว ปุ่มเครื่องมือขวา |
| mobile-menu | Mobile Menu Sheet | แถบฟ้าบนมือถือ + sheet เมนูแคปซูล การ์ดโปรไฟล์ ปุ่มออกจากระบบ |
| button | Button (pill + เงากด) | default / outline / soft / ghost / destructive ปุ่มหลักยุบลงเมื่อกด |
| pill-tabs | Pill Tabs | แท็บแคปซูล ตัวที่เลือกพื้นกรมท่าตัวฟ้า (รายวัน / รายเดือน) |
| sticker-card | Sticker Card + Stat | การ์ดขอบฟ้า 1.5px เงาแข็งด้านล่าง หัวข้อ Prompt และการ์ดตัวเลข KPI (มุม 16px เงาเบลอ) |
| rebate-progress | Rebate Progress | แถบความคืบหน้าฟ้า→เขียว + ข้อความอีกกี่คิว + ตารางขั้น Rebate |
| login-card | Login Card | หน้าเข้าสู่ระบบ มาสคอตเหนือการ์ด ปุ่ม SSO หลัก + ปุ่มบัญชีคู่ธุรกิจ |
| sticker-menu | Sticker Dropdown | ปุ่มเลือก + เมนูขอบฟ้า 2px เงาแข็งกรมท่า 4px 4px (สูตรเดียวกับ select/popover) |
| data-table | Data Table | ตารางในการ์ดสติกเกอร์ หัวตารางฟ้า hover แถวฟ้าจาง |
| page-canvas | Dotted Canvas + Skeleton | พื้นหลังลายจุดฟ้า และ skeleton ตอนโหลดแบบมีแสงวิ่ง |

Package ที่ใช้ในชุดนี้ (เลือกติดตั้งเฉพาะที่นำไปใช้): `class-variance-authority`, `clsx`, `lucide-react`, `tailwind-merge`

## โค้ด component

### top-nav — Top Nav (แถบฟ้า + คลื่น)

Header สีฟ้าขอบล่างเป็นคลื่น เมนู active เป็นสติกเกอร์ขาว ปุ่มเครื่องมือขวา

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer-v2/top-nav.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Crown,
  FileText,
  Gift,
  Headphones,
  LayoutDashboard,
  Link2,
  MapPinned,
  NotebookTabs,
  ShieldCheck,
  Store,
  Trophy,
  UserCog,
  type LucideIcon,
} from "lucide-react";

type SubItem = { id: string; label: string; description?: string; icon: LucideIcon };
type Item = { id: string; label: string; icon: LucideIcon; children?: SubItem[] };

// ตัวอย่างเมนูมุม Admin / Super Admin (ตรงกับภาพหน้าจอจริง)
const ITEMS: Item[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "rank", label: "อันดับ", icon: Trophy },
  { id: "plants", label: "แผนที่", icon: MapPinned },
  { id: "docs", label: "โบรชัวร์", icon: FileText },
  { id: "contact", label: "ติดต่อพนักงาน", icon: Headphones },
  {
    id: "settings",
    label: "ตั้งค่า",
    icon: NotebookTabs,
    children: [
      { id: "stores", label: "ร้านค้าในกิจการ", description: "รายชื่อร้านค้าและข้อมูลร้านในกิจการ", icon: Store },
      { id: "pairing", label: "จับคู่ร้าน", description: "รวมยอดร้านที่ใช้หลายบัญชีเข้าด้วยกัน", icon: Link2 },
      { id: "rebate", label: "Rebate", description: "ตั้งขั้นและอัตรา Rebate", icon: Gift },
    ],
  },
  {
    id: "super",
    label: "Super Admin",
    icon: ShieldCheck,
    children: [
      { id: "users", label: "ผู้ใช้ SSO", description: "สิทธิ์และบทบาทของผู้ใช้", icon: UserCog },
      { id: "roles", label: "Role Matrix", description: "กำหนดเมนูที่แต่ละบทบาทเห็น", icon: ShieldCheck },
    ],
  },
];

// เมนูบนแถบฟ้า: ตัวหนังสือกรมท่า, hover = ขาวโปร่ง 55%, active = "สติกเกอร์" ขาว ขอบกรมท่า 2px + เงาแข็ง 2px 3px
const linkClass =
  "inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border-2 border-transparent px-3.5 font-[family-name:var(--font-prompt)] text-[13px] font-medium text-[#23435f] transition-colors hover:bg-white/55 hover:text-[#0c2a44] aria-expanded:bg-white/55 data-[active]:border-[#0c2a44] data-[active]:bg-white data-[active]:font-bold data-[active]:text-[#0c2a44] data-[active]:shadow-[2px_3px_0_#0c2a44]";

// ปุ่มเครื่องมือขวา (สลับ role / ผู้ใช้): พื้นขาว ขอบกรมท่า 2px เงาแข็ง 2px 2px
const toolClass =
  "inline-flex h-[38px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full border-2 border-[#0c2a44] bg-white px-3 text-[12.5px] font-extrabold text-[#0c2a44] shadow-[2px_2px_0_#0c2a44] transition-transform active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0_#0c2a44]";

export function TopNav({ items = ITEMS, logo, userName = "สมชาย ใจดี", role = "Super Admin" }: { items?: Item[]; logo?: React.ReactNode; userName?: string; role?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const [open, setOpen] = useState<string | null>(null);
  const [panelLeft, setPanelLeft] = useState(0);
  const ref = useRef<HTMLElement>(null);

  // ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(null);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const openItem = items.find((i) => i.id === open);

  return (
    // relative + z-index เพื่อให้ขอบคลื่นและ dropdown ซ้อนบนเนื้อหา
    <header ref={ref} className="relative z-10 bg-[#5bc4f5]">
      <div className="flex min-h-[68px] items-center gap-3 px-4 py-2">
        <span className="shrink-0">
          {logo ?? (
            <span className="flex items-center gap-1.5 font-[family-name:var(--font-prompt)] text-lg font-bold">
              <span className="rounded bg-[#0072b8] px-1.5 text-white">CPAC</span>
              <span className="text-[#0c2a44]">CPM</span>
            </span>
          )}
        </span>
        <nav aria-label="เมนูหลัก" className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto py-1 pr-1 [scrollbar-width:none]">
          {items.map((item) => {
            const isActive = active === item.id || item.children?.some((c) => c.id === active);
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive && !item.children ? "page" : undefined}
                aria-expanded={item.children ? open === item.id : undefined}
                data-active={isActive ? "" : undefined}
                onClick={(e) => {
                  if (!item.children) {
                    setActive(item.id);
                    setOpen(null);
                    return;
                  }
                  // วาง dropdown ใต้ปุ่มที่กด แต่ไม่ให้ล้นขอบขวาของ header
                  const header = ref.current!.getBoundingClientRect();
                  const btn = e.currentTarget.getBoundingClientRect();
                  setPanelLeft(Math.max(8, Math.min(btn.left - header.left, header.width - Math.min(352, header.width - 16) - 8)));
                  setOpen(open === item.id ? null : item.id);
                }}
                className={linkClass}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
                {item.children ? <ChevronDown className={`size-3.5 transition-transform ${open === item.id ? "rotate-180" : ""}`} /> : null}
              </button>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <button type="button" className={toolClass}><Crown className="size-4" />{role} · สลับ role</button>
          <button type="button" className={toolClass}>
            {/* avatar: พื้นกรมท่า ตัวอักษรสีแถบฟ้า (กลับสีจากแถบ) */}
            <span className="grid size-7 place-items-center rounded-full bg-[#0c2a44] text-[#5bc4f5]"><ShieldCheck className="size-3.5" /></span>
            <span className="text-left leading-tight">
              <span className="block">{userName}</span>
              <span className="block text-[10.5px] font-semibold text-[#5a7489]">{role}</span>
            </span>
            <ChevronDown className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Dropdown ของเมนูหลัก: การ์ดขาว ขอบฟ้า 1.5px มุม 20px เงาแข็งด้านล่าง รายการมี icon tile + คำอธิบาย */}
      {openItem?.children && (
        <div style={{ left: panelLeft }} className="absolute top-[calc(100%-4px)] z-20 w-[min(calc(100%-16px),352px)] rounded-[20px] border-[1.5px] border-[#cfe6f5] bg-white p-1 shadow-[0_3px_0_#cfe6f5]">
          {openItem.children.map((sub) => (
            <button
              key={sub.id}
              type="button"
              onClick={() => {
                setActive(sub.id);
                setOpen(null);
              }}
              className={`flex w-full items-start gap-3 rounded-full p-2.5 text-left text-sm text-[#0c2a44] hover:bg-[#e1f2fd] ${active === sub.id ? "bg-[#e3f4fd]" : ""}`}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#e1f2fd] text-[#0072b8]"><sub.icon className="size-4" /></span>
              <span className="min-w-0">
                <span className="block font-semibold">{sub.label}</span>
                {sub.description ? <span className="block text-xs text-[#5a7489]">{sub.description}</span> : null}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ขอบคลื่นสูง 12px: mask วงกลมรัศมี 12px ซ้ำทุก 24px */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-full -z-10 h-3 bg-[#5bc4f5] [mask:radial-gradient(12px_12px_at_12px_0,#000_98%,transparent)_0_0/24px_12px_repeat-x] [-webkit-mask:radial-gradient(12px_12px_at_12px_0,#000_98%,transparent)_0_0/24px_12px_repeat-x]"
      />
    </header>
  );
}
```


### mobile-menu — Mobile Menu Sheet

แถบฟ้าบนมือถือ + sheet เมนูแคปซูล การ์ดโปรไฟล์ ปุ่มออกจากระบบ

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer-v2/mobile-menu.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useState } from "react";
import { FileText, Home, LogOut, Megaphone, Menu, Trophy, UserRound, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; icon: LucideIcon };

const ITEMS: Item[] = [
  { id: "home", label: "หน้าหลัก", icon: Home },
  { id: "rank", label: "อันดับ", icon: Trophy },
  { id: "promo", label: "แคมเปญ", icon: Megaphone },
  { id: "docs", label: "โบรชัวร์", icon: FileText },
  { id: "profile", label: "โปรไฟล์", icon: UserRound },
];

// มือถือ: แถบบนสีฟ้า + ปุ่ม hamburger เปิด sheet ด้านซ้าย เมนูเป็นแคปซูล ตัวที่เลือกเป็นสติกเกอร์ฟ้า
export function MobileMenu({ items = ITEMS, name = "ร้านวัสดุก่อสร้างตัวอย่าง", handle = "DEALER · 100245", defaultOpen = false }: { items?: Item[]; name?: string; handle?: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [active, setActive] = useState(items[0]?.id);

  return (
    <div className="relative h-full overflow-hidden">
      <div className="flex h-14 items-center gap-2 bg-[#5bc4f5] px-3">
        <button type="button" aria-label="เปิดเมนู" onClick={() => setOpen(true)} className="grid size-10 place-items-center rounded-xl text-[#0c2a44] hover:bg-white/40">
          <Menu className="size-5" />
        </button>
        <span className="font-[family-name:var(--font-prompt)] text-base font-bold text-[#0c2a44]">CPAC CPM</span>
      </div>

      {open && <button type="button" aria-label="ปิดเมนู" onClick={() => setOpen(false)} className="absolute inset-0 z-10 bg-[#0c2a44]/30" />}
      <aside
        className={cn(
          "absolute inset-y-0 left-0 z-20 flex w-[min(88%,320px)] flex-col bg-[#f3faff] shadow-[8px_0_30px_rgba(12,42,68,0.14)] transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-[#cfe6f5] px-3">
          <button type="button" aria-label="ปิดเมนู" onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-xl text-[#0072b8] hover:bg-[#e3f4fd]">
            <X className="size-5" />
          </button>
          <span className="font-[family-name:var(--font-prompt)] font-bold text-[#0c2a44]">CPAC CPM</span>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-3">
          <div className="flex items-center gap-3 rounded-[18px] border border-[#cfe6f5] bg-white p-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#d6effc] text-[#0072b8]"><UserRound className="size-5" /></span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-extrabold text-[#0c2a44]">{name}</span>
              <span className="block truncate text-[11px] font-semibold uppercase tracking-wide text-[#5a7489]">{handle}</span>
            </span>
          </div>
          <nav aria-label="เมนูหลักบนมือถือ" className="space-y-2">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "flex h-[46px] w-full items-center gap-3 rounded-[20px] px-4 font-[family-name:var(--font-prompt)] text-[15px] transition-colors",
                    isActive
                      ? "border-2 border-[#0c2a44] bg-[#5bc4f5] font-semibold text-[#0c2a44] shadow-[2px_3px_0_#0c2a44]"
                      : "border-[1.5px] border-[#cfe6f5] bg-white text-[#23435f] shadow-[0_3px_0_#cfe6f5] hover:bg-[#e1f2fd]",
                  )}
                >
                  <item.icon className="size-[18px] shrink-0" />
                  {item.label}
                </button>
              );
            })}
            <button type="button" className="flex h-[46px] w-full items-center gap-3 rounded-[20px] bg-[#fff1f1] px-4 text-[14px] font-bold text-[#e5484d] hover:bg-[#ffe6e6]">
              <LogOut className="size-[18px]" />ออกจากระบบ
            </button>
          </nav>
        </div>
      </aside>
    </div>
  );
}
```


### button — Button (pill + เงากด)

default / outline / soft / ghost / destructive ปุ่มหลักยุบลงเมื่อกด

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer-v2/button.tsx`

Package เพิ่มเติม: class-variance-authority


```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ปุ่มแคปซูลหัวมน ฟอนต์ Prompt ปุ่มหลักมี "เงากด" 3px ใต้ปุ่ม กดแล้วยุบลง 2px
export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-transparent font-[family-name:var(--font-prompt)] font-semibold outline-none transition-[background-color,transform,box-shadow] select-none focus-visible:shadow-[0_0_0_3px_rgb(0_161_229/0.28)] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#0072b8] text-white shadow-[0_3px_0_#005a92] hover:bg-[#005a92] active:translate-y-[2px] active:shadow-[0_1px_0_#005a92]",
        outline: "border-[1.5px] border-[#0c2a44] bg-white text-[#0c2a44] hover:bg-[#d6effc]",
        soft: "bg-[#e3f4fd] text-[#0072b8] hover:bg-[#d6effc]",
        ghost: "text-[#23435f] hover:bg-[#e1f2fd] hover:text-[#0c2a44]",
        destructive:
          "bg-[#dc2626] text-white shadow-[0_3px_0_#991b1b] hover:bg-[#b91c1c] active:translate-y-[2px] active:shadow-[0_1px_0_#991b1b]",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        default: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, type = "button", ...props }, ref) => (
  <button ref={ref} type={type} data-variant={variant ?? "default"} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";
```


### pill-tabs — Pill Tabs

แท็บแคปซูล ตัวที่เลือกพื้นกรมท่าตัวฟ้า (รายวัน / รายเดือน)

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer-v2/pill-tabs.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = { id: string; label: string };

// แท็บแคปซูล: ราง bg #e1f2fd, แท็บที่เลือกพื้นกรมท่า ตัวอักษรสีแถบฟ้า (เช่น รายวัน / รายเดือน)
export function PillTabs({ tabs, value, onChange, className }: { tabs: Tab[]; value?: string; onChange?: (id: string) => void; className?: string }) {
  const [inner, setInner] = useState(tabs[0]?.id);
  const current = value ?? inner;
  return (
    <div role="tablist" className={cn("inline-flex items-center gap-1 rounded-full bg-[#e1f2fd] p-1", className)}>
      {tabs.map((tab) => {
        const selected = current === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => {
              setInner(tab.id);
              onChange?.(tab.id);
            }}
            className={cn(
              "h-8 whitespace-nowrap rounded-full px-4 font-[family-name:var(--font-prompt)] text-[13px] font-medium transition-colors",
              selected ? "bg-[#0c2a44] text-[#5bc4f5]" : "text-[#23435f] hover:bg-white/70",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
```


### sticker-card — Sticker Card + Stat

การ์ดขอบฟ้า 1.5px เงาแข็งด้านล่าง หัวข้อ Prompt และการ์ดตัวเลข KPI (มุม 16px เงาเบลอ)

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer-v2/sticker-card.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

// การ์ดขอบฟ้าอ่อน 1.5px มุม 20px เงาแข็งด้านล่าง 3px (ไม่เบลอ) ให้ดูเหมือนสติกเกอร์
export function StickerCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-[20px] border-[1.5px] border-[#cfe6f5] bg-white text-[#0c2a44] shadow-[0_3px_0_#cfe6f5]", className)} {...props} />;
}

export function StickerCardHeader({ title, description, action, className }: { title: React.ReactNode; description?: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-start justify-between gap-3 p-5 pb-3", className)}>
      <div className="min-w-0">
        <h3 className="font-[family-name:var(--font-prompt)] text-[17px] font-semibold leading-tight text-[#0c2a44]">{title}</h3>
        {description ? <p className="mt-1 text-[13px] text-[#5a7489]">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function StickerCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}

// การ์ดตัวเลข KPI (แถวบนสุดของ Dashboard): ต่างจากการ์ดทั่วไป ใช้มุม 16px ขอบ 1px และเงาเบลอเบาๆ
export function StickerStat({ label, value, unit, hint, icon }: { label: string; value: string; unit?: string; hint?: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#cfe6f5] bg-white p-5 text-[#0c2a44] shadow-[0_6px_20px_rgb(9_41_67/0.05)]">
      <div className="flex items-center gap-2 text-[13px] font-semibold text-[#5a7489]">
        {icon ? <span className="grid size-8 place-items-center rounded-full bg-[#e3f4fd] text-[#0072b8] [&_svg]:size-4">{icon}</span> : null}
        {label}
      </div>
      <p className="mt-3 font-[family-name:var(--font-prompt)] text-[28px] font-bold leading-none tabular-nums text-[#0c2a44]">
        {value}
        {unit ? <span className="ml-1.5 text-sm font-medium text-[#5a7489]">{unit}</span> : null}
      </p>
      {hint ? <p className="mt-2 text-xs text-[#5a7489]">{hint}</p> : null}
    </div>
  );
}
```


### rebate-progress — Rebate Progress

แถบความคืบหน้าฟ้า→เขียว + ข้อความอีกกี่คิว + ตารางขั้น Rebate

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer-v2/rebate-progress.tsx`

Package เพิ่มเติม: lucide-react


```tsx
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type RebateTier = { min: number; max: number | null; rate: number };

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 });

// ความคืบหน้า Rebate: แถบบาง 8px ไล่สีฟ้า→เขียว + ข้อความ "อีกเพียง X คิว" + ตารางขั้น (Step) ที่บอกว่าแต่ละขั้นขาดอีกเท่าไร
export function RebateProgress({ volume, tiers }: { volume: number; tiers: RebateTier[] }) {
  const currentIndex = tiers.reduce((idx, t, i) => (volume >= t.min ? i : idx), -1);
  const next = tiers[currentIndex + 1];
  const top = tiers[tiers.length - 1]?.min || 1;
  const percent = Math.min(100, Math.round((volume / top) * 100));
  const currentRate = currentIndex >= 0 ? tiers[currentIndex].rate : 0;
  const increase = next ? Math.max(0, next.min * next.rate - volume * currentRate) : 0;

  return (
    <div className="space-y-3">
      <div className="rounded-[14px] border border-[#cfe6f5] bg-[#f8fcff] p-3">
        <div className="flex items-center gap-3">
          <span className="shrink-0 text-xs font-extrabold text-[#0c2a44]">Progress Rebate</span>
          <div role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-[#dceaf2]">
            <div className="h-full rounded-full bg-gradient-to-r from-[#00a1e5] to-[#0baa76] transition-all duration-300" style={{ width: `${percent}%` }} />
          </div>
        </div>
        <p className="mt-2 text-[11.5px] font-bold">
          {next ? (
            <span className="text-[#0072b8]">อีกเพียง {fmt(next.min - volume)} คิว รับ Rebate เพิ่ม ฿{fmt(increase)}</span>
          ) : (
            <span className="text-[#0baa76]">ถึงขั้นสูงสุดแล้ว · สะสม {fmt(volume)} คิว</span>
          )}
        </p>
      </div>

      <div className="divide-y divide-[#e1f2fd] overflow-hidden rounded-[14px] border border-[#cfe6f5] text-[13px]">
        {tiers.map((tier, i) => {
          const reached = volume >= tier.min;
          const isCurrent = i === currentIndex;
          return (
            <div key={tier.min} className={cn("flex items-center justify-between gap-3 px-3.5 py-2.5", isCurrent ? "bg-[#e3f4fd] font-bold text-[#0072b8]" : reached ? "text-[#0c2a44]" : "text-[#5a7489]")}>
              <span className="flex min-w-0 items-center gap-2">
                <span className={cn("grid size-4 shrink-0 place-items-center rounded-full", reached ? "bg-[#0baa76] text-white" : "border border-[#afd2ea] bg-white")}>
                  {reached ? <Check className="size-2.5" strokeWidth={3} /> : null}
                </span>
                <span className="truncate">{tier.max === null ? `${fmt(tier.min)}+ คิว` : `${fmt(tier.min)} – ${fmt(tier.max)} คิว`}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className={cn("text-[11px] font-bold", reached ? "text-[#0baa76]" : "text-[#5a7489]")}>{reached ? "ได้รับแล้ว" : `อีก ${fmt(tier.min - volume)} คิว`}</span>
                <span className={cn("font-bold", isCurrent ? "text-[#0072b8]" : reached ? "text-[#0baa76]" : "text-[#23435f]")}>฿{tier.rate}/คิว</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```


### login-card — Login Card

หน้าเข้าสู่ระบบ มาสคอตเหนือการ์ด ปุ่ม SSO หลัก + ปุ่มบัญชีคู่ธุรกิจ

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer-v2/login-card.tsx`

Package เพิ่มเติม: lucide-react


```tsx
import { ShieldCheck } from "lucide-react";

// หน้า login: พื้นฟ้าอ่อนมีวงกลมฟ้าจางๆ, การ์ดขาวมุม 28px กลางจอ, มาสคอตโผล่หัวเหนือการ์ด, ปุ่ม SSO หลัก (ฟ้าทึบ) + ปุ่มรอง (ขอบ)
export function LoginCard({
  mascot,
  title = "เข้าสู่ระบบ",
  subtitle = "สำหรับพนักงาน SCG",
  description = "เชื่อมต่อข้อมูลการขาย และดูแลร้านค้าในกิจการของคุณ",
  onPrimary,
  onSecondary,
}: {
  mascot?: React.ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
}) {
  return (
    <div className="relative flex min-h-[560px] w-full items-center justify-center overflow-hidden bg-[#f2f6f9] px-4 py-12">
      <span aria-hidden className="absolute -right-24 -top-24 size-[420px] rounded-full bg-[#dff0fb]" />
      <span aria-hidden className="absolute -bottom-32 -left-24 size-[360px] rounded-full bg-[#dff0fb]" />
      <div className="relative w-full max-w-[420px] pt-16">
        <div className="absolute left-1/2 top-0 grid size-24 -translate-x-1/2 place-items-center">
          {mascot ?? <span className="grid size-20 place-items-center rounded-full bg-[#00a1e5] font-[family-name:var(--font-prompt)] text-sm font-bold text-white">CPAC</span>}
        </div>
        <div className="rounded-[28px] border border-[#dce6ed] bg-white px-8 pb-6 pt-10 text-center shadow-[0_12px_40px_rgba(9,41,67,0.08)]">
          <h1 className="font-[family-name:var(--font-prompt)] text-[32px] font-bold leading-tight text-[#092943]">{title}</h1>
          <p className="mt-1 font-[family-name:var(--font-prompt)] text-lg font-semibold text-[#00a1e5]">{subtitle}</p>
          <p className="mx-auto mt-3 max-w-[260px] text-[15px] leading-6 text-[#577189]">{description}</p>
          <div className="mt-7 space-y-3">
            <button type="button" onClick={onPrimary} className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#00a1e5] text-[17px] font-semibold text-white transition-colors hover:bg-[#008ccb]">
              <span className="grid size-8 place-items-center rounded-full bg-white text-[9px] font-black text-[#e3000f]">SCG</span>
              เข้าสู่ระบบด้วยบัญชี SCG
            </button>
            <button type="button" onClick={onSecondary} className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-[#b8d2e3] bg-white text-[15px] font-semibold text-[#092943] transition-colors hover:bg-[#f8fafc]">
              <span className="rounded bg-[#0072b8] px-1.5 text-xs font-black text-white">CPAC</span>
              เข้าสู่ระบบด้วยบัญชีคู่ธุรกิจ
            </button>
          </div>
          <p className="mt-5 inline-flex items-center gap-1 text-xs text-[#7890a1]"><ShieldCheck className="size-3.5" />เชื่อมต่ออย่างปลอดภัย</p>
        </div>
        <p className="mt-6 text-center text-xs text-[#7890a1]">© SCG · CPAC</p>
      </div>
    </div>
  );
}
```


### sticker-menu — Sticker Dropdown

ปุ่มเลือก + เมนูขอบฟ้า 2px เงาแข็งกรมท่า 4px 4px (สูตรเดียวกับ select/popover)

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer-v2/sticker-menu.tsx`

Package เพิ่มเติม: lucide-react


```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = { id: string; label: string; hint?: string };

// เมนูเลือก (select / dropdown / popover) สไตล์สติกเกอร์: ขอบฟ้าอ่อน #CFE6F5 2px มุม 16px + เงาแข็งกรมท่า 4px 4px
// รายการ hover/ที่เลือกเป็นพื้น #D6EFFC มุม 18px ตัว 13px
export function StickerMenu({ label = "เลือกกิจการ", options, defaultValue }: { label?: string; options: Option[]; defaultValue?: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue ?? options[0]?.id);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const current = options.find((o) => o.id === value);
  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-[#0c2a44] bg-white px-4 text-sm font-semibold text-[#0c2a44] shadow-[2px_2px_0_#0c2a44]"
      >
        {current?.label}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div role="listbox" className="absolute left-0 top-full z-20 mt-2 w-64 rounded-2xl border-2 border-[#cfe6f5] bg-white p-1.5 shadow-[4px_4px_0_#0c2a44]">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              role="option"
              aria-selected={o.id === value}
              onClick={() => {
                setValue(o.id);
                setOpen(false);
              }}
              className={cn("flex w-full items-center gap-2 rounded-[18px] px-3 py-2 text-left text-[13px] text-[#0c2a44] hover:bg-[#d6effc]", o.id === value && "bg-[#d6effc]")}
            >
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{o.label}</span>
                {o.hint ? <span className="block text-xs text-[#5a7489]">{o.hint}</span> : null}
              </span>
              {o.id === value ? <Check className="size-4 text-[#0072b8]" /> : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```


### data-table — Data Table

ตารางในการ์ดสติกเกอร์ หัวตารางฟ้า hover แถวฟ้าจาง

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer-v2/data-table.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import { cn } from "@/lib/utils";

export type Column<T> = { key: keyof T & string; header: string; align?: "left" | "right" | "center"; render?: (row: T) => React.ReactNode };

// ตาราง: อยู่ในการ์ดสติกเกอร์, หัวตารางพื้นฟ้า #e1f2fd ตัวหนา, hover แถวเป็นฟ้าจาง 6%
export function DataTable<T extends Record<string, unknown>>({ columns, rows }: { columns: Column<T>[]; rows: T[] }) {
  const align = (a?: string) => (a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left");
  return (
    <div className="overflow-hidden rounded-[20px] border-[1.5px] border-[#cfe6f5] bg-white shadow-[0_3px_0_#cfe6f5]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm tabular-nums text-[#0c2a44]">
          <thead>
            <tr className="bg-[#e1f2fd]">
              {columns.map((c) => (
                <th key={c.key} className={cn("whitespace-nowrap px-5 py-3 text-[11px] font-bold text-[#23435f]", align(c.align))}>{c.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1f2fd]">
            {rows.map((row, i) => (
              <tr key={i} className="transition-colors hover:bg-[rgb(0_161_229/0.06)]">
                {columns.map((c) => (
                  <td key={c.key} className={cn("whitespace-nowrap px-4 py-3", align(c.align))}>{c.render ? c.render(row) : String(row[c.key] ?? "")}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```


### page-canvas — Dotted Canvas + Skeleton

พื้นหลังลายจุดฟ้า และ skeleton ตอนโหลดแบบมีแสงวิ่ง

ตำแหน่งไฟล์แนะนำ: `components/cpac-dealer-v2/page-canvas.tsx`

Package เพิ่มเติม: ไม่มี (ตรวจ React และ utils ตาม import)


```tsx
import { cn } from "@/lib/utils";

// พื้นหลังหน้าแบบ "กระดาษจุด": ฟ้าอ่อน #f3faff + จุดฟ้า 10% ทุก 22px
export function PageCanvas({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-[#f3faff] bg-[radial-gradient(circle_at_1px_1px,rgb(0_161_229/0.10)_1px,transparent_0)] bg-[length:22px_22px] text-[#0c2a44]", className)}
      {...props}
    />
  );
}

// Skeleton ตอนโหลดครั้งแรก: บล็อกฟ้า #d5ecfa มุม 20px มีแสงวิ่ง (shimmer)
export function PageSkeleton({ blocks = [96, 220, 160] }: { blocks?: number[] }) {
  return (
    <div className="grid gap-3" aria-busy="true" aria-label="กำลังโหลด">
      <style>{`@keyframes cpm-shimmer{from{background-position:150% 0,0 0}to{background-position:-50% 0,0 0}}`}</style>
      {blocks.map((h, i) => (
        <div
          key={i}
          style={{ height: h, animation: "cpm-shimmer 1.3s ease-in-out infinite" }}
          className="rounded-[20px] bg-[linear-gradient(100deg,transparent_20%,rgb(255_255_255/0.75)_50%,transparent_80%),linear-gradient(#d5ecfa,#d5ecfa)] bg-[length:200%_100%,100%_100%] bg-no-repeat shadow-[inset_0_0_0_1px_rgb(175_210_234/0.45)] motion-reduce:[animation:none!important]"
        />
      ))}
    </div>
  );
}
```

