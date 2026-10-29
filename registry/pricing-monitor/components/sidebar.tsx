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
