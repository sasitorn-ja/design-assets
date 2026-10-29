"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const REQUEST_STEPS = [
  { id: "general", label: "ข้อมูลทั่วไป" },
  { id: "pond", label: "ข้อมูลรายละเอียดบ่อคาย" },
  { id: "cost", label: "ค่าใช้จ่ายที่ขออนุมัติ" },
  { id: "procurement", label: "วิธีจัดหาและผู้เสนอราคา" },
  { id: "summary", label: "สรุปผลการคัดเลือก" },
  { id: "submit", label: "ส่งคำขอ" },
];

// ขั้นตอนฟอร์ม: ขั้นที่ผ่านแล้วมีเครื่องหมายถูก ขั้นปัจจุบันเป็นสีหลัก กดเพื่อเลื่อนไปยัง section
export function RequestStepper({ steps = REQUEST_STEPS, current, onSelect }: { steps?: { id: string; label: string }[]; current: number; onSelect: (index: number) => void }) {
  return (
    <ol className="flex gap-2 overflow-x-auto rounded-xl border border-[#e2f3f8] bg-white p-3 [scrollbar-width:none]">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.id} className="flex min-w-[150px] flex-1 items-center gap-2">
            <button type="button" onClick={() => onSelect(i)} aria-current={active ? "step" : undefined} className="flex min-w-0 items-center gap-2 rounded-lg p-1.5 text-left hover:bg-[#f9fbfe]">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  done && "bg-[#d9fbea] text-[#0f9f75]",
                  active && "bg-[#0284c7] text-white shadow-[0_0_0_4px_#e0f7ff]",
                  !done && !active && "border border-[#dbe5f0] text-[#9ca3af]",
                )}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </span>
              <span className={cn("truncate text-[13px]", active ? "font-semibold text-[#111827]" : done ? "text-[#0f9f75]" : "text-[#53738b]")}>{s.label}</span>
            </button>
            {i < steps.length - 1 ? <span className={cn("h-px min-w-4 flex-1", done ? "bg-[#0f9f75]" : "bg-[#e2f3f8]")} /> : null}
          </li>
        );
      })}
    </ol>
  );
}
