"use client";

import { cn } from "@/lib/utils";

// สลับมุมมองกราฟ เช่น Daily / Weekly — ตัวที่เลือกเป็น primary ทึบ มุมมนเต็ม
export function Segmented<T extends string>({ value, onChange, options, ariaLabel }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[]; ariaLabel?: string }) {
  return (
    <div role="group" aria-label={ariaLabel} className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 shadow-[0_10px_24px_var(--shadow-color)]">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "h-9 min-w-[68px] rounded-full px-4 text-xs font-bold transition-colors duration-150",
            value === o.value ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "text-[var(--foreground)] hover:bg-[var(--shell-hover)]",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
