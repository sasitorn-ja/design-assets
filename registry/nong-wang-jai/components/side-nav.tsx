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
