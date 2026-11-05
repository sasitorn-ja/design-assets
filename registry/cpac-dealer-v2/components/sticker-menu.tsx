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
