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
