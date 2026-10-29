"use client";

import { useState } from "react";
import { Bell, ChevronDown, ClipboardList, Heart, Home, LayoutGrid, Shield, ShieldCheck, User, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; icon: LucideIcon; dropdown?: boolean };

const ITEMS: Item[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "effort", label: "Safety Effort", icon: ShieldCheck },
  { id: "culture", label: "Safety Culture", icon: Heart, dropdown: true },
  { id: "manager", label: "Plant Manager", icon: ClipboardList },
  { id: "dashboard", label: "Dashboard & Report", icon: LayoutGrid, dropdown: true },
  { id: "admin", label: "Admin", icon: User, dropdown: true },
  { id: "super", label: "SuperAdmin", icon: Shield },
];

const base =
  "inline-flex h-11 min-w-[100px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[13px] border border-transparent px-[15px] text-[14.5px] font-bold transition-all";
const idle = "bg-transparent text-[#0B2F6B] hover:border-[#D7EAFE] hover:bg-[#F5FAFF] hover:text-[#0B82F0]";
const active = "bg-[linear-gradient(135deg,#35A8FF_0%,#0B82F0_55%,#006AD6_100%)] text-white shadow-[0_8px_20px_rgba(11,130,240,0.22)]";

export function TopNavbar({ items = ITEMS, unread = 3 }: { items?: Item[]; unread?: number }) {
  const [current, setCurrent] = useState("home");
  return (
    <header className="flex h-[66px] items-center gap-3 border-b border-[#D7EAFE] bg-white px-4">
      <span className="shrink-0 text-[22px] font-black italic tracking-tight text-[#0B82F0] [text-shadow:0_2px_0_#0B2F6B]">SAFETY<span className="text-[#0B2F6B]">Caring</span></span>
      <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none]">
        {items.map((item) => (
          <button key={item.id} type="button" aria-current={current === item.id ? "page" : undefined} onClick={() => setCurrent(item.id)} className={cn(base, current === item.id ? active : idle)}>
            <item.icon className="size-4" />
            {item.label}
            {item.dropdown ? <ChevronDown className="size-3.5" /> : null}
          </button>
        ))}
      </nav>
      <button type="button" aria-label="การแจ้งเตือน" className="relative flex size-10 shrink-0 items-center justify-center rounded-full text-[#0B82F0] hover:bg-[#F5FAFF]">
        <Bell className="size-5" />
        {unread > 0 ? (
          <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0B82F0] px-[3px] text-[9px] font-black text-white ring-[1.5px] ring-white">{unread > 9 ? "9+" : unread}</span>
        ) : null}
      </button>
      <span className="size-10 shrink-0 rounded-full border-2 border-[#35A8FF] bg-[#E0F0FF]" />
    </header>
  );
}
