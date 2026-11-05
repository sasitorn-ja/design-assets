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
