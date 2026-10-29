"use client";

import { ChevronDown, Clock3, FileText, Search, Send, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusTab = { key: string; label: string; count: number; icon: LucideIcon };

export const DEFAULT_TABS: StatusTab[] = [
  { key: "all", label: "ทั้งหมด", count: 1, icon: FileText },
  { key: "draft", label: "ฉบับร่าง", count: 1, icon: Clock3 },
  { key: "sent", label: "ส่งแล้ว", count: 0, icon: Send },
];

// แท็บนับจำนวน + ค้นหา + ตัวกรองประเภท อยู่ในแถบขาวเดียวกัน
export function StatusTabs({ tabs = DEFAULT_TABS, value, onChange, search, onSearch }: { tabs?: StatusTab[]; value: string; onChange: (key: string) => void; search: string; onSearch: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e2f3f8] bg-white p-2 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)]">
      <div role="tablist" className="flex rounded-xl border border-[#e2f3f8] p-1">
        {tabs.map((t) => {
          const active = value === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => onChange(t.key)}
              className={cn("inline-flex h-9 items-center gap-1.5 rounded-lg px-4 text-[13px] font-semibold transition-colors", active ? "bg-[#0284c7] text-white" : "text-[#53738b] hover:bg-[#f1f7fb]")}
            >
              <t.icon className={cn("size-4", !active && t.key === "draft" && "text-[#b45309]", !active && t.key === "sent" && "text-[#0f9f75]")} />
              {t.label}
              <span className="ml-1.5 font-bold">{t.count}</span>
            </button>
          );
        })}
      </div>
      <div className="ml-auto flex min-w-[260px] flex-1 items-center gap-2 sm:flex-none">
        <label className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-[#dbe5f0] px-3 focus-within:border-[#0284c7] focus-within:ring-2 focus-within:ring-[#e0f7ff] sm:w-[340px]">
          <Search className="size-4 text-[#9ca3af]" />
          <input value={search} onChange={(e) => onSearch(e.target.value)} placeholder="ค้นหาเลขที่เอกสาร หรือชื่อโรงงาน..." className="w-full bg-transparent text-sm outline-none placeholder:text-[#9ca3af]" />
        </label>
        <button type="button" className="inline-flex h-10 items-center gap-6 rounded-lg border border-[#dbe5f0] px-3 text-sm text-[#53738b]">
          เลือกประเภทบ่อ <ChevronDown className="size-4" />
        </button>
      </div>
    </div>
  );
}
