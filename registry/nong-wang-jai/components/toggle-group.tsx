"use client";

import { cn } from "@/lib/utils";

type ToggleGroupProps<T extends string> = {
  ariaLabel?: string;
  onChange: (value: T) => void;
  options: Array<{ label: string; value: T }>;
  value: T;
};

// ปุ่มสลับแบบแคปซูล ตัวที่เลือกเป็นสีทึบ (ใช้สลับช่วงเวลา/มุมมอง)
export function ToggleGroup<T extends string>({ ariaLabel, onChange, options, value }: ToggleGroupProps<T>) {
  return (
    <div aria-label={ariaLabel} role="group" className="inline-flex shrink-0 gap-1 rounded-[18px] border border-[#d9e3e6] bg-white p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "h-9 min-w-16 rounded-[14px] px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100",
            "aria-pressed:bg-[#13213a] aria-pressed:text-white aria-pressed:hover:bg-[#13213a]/90",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
