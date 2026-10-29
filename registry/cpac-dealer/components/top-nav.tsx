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
