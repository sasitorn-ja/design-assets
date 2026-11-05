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
