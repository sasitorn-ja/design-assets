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
