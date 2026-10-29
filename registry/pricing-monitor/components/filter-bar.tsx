"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const control = "flex h-10 items-center gap-2 rounded-[14px] border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--foreground)] transition-colors duration-150 hover:border-[var(--border-strong)]";

function DateField({ label, value }: { label: string; value: string }) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-xs text-[var(--muted-foreground)]">{label}</span>
      <span className={cn(control, "min-w-[140px] justify-between font-medium")}>
        {value}
        <CalendarDays className="size-3.5 text-[var(--muted-foreground)]" />
      </span>
    </label>
  );
}

function DropdownChip({ label, selected }: { label: string; selected?: string }) {
  return (
    <button type="button" className={cn(control, "max-w-[160px] font-medium text-[var(--muted-foreground)]", selected && "border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--foreground)]")}>
      <span className="truncate">{selected ?? label}</span>
      <ChevronDown className="size-3.5 shrink-0" />
    </button>
  );
}

// แถวตัวกรองบน header (sticky + blur) — ใช้ตัวแปรธีมทั้งหมด
export function FilterBar({ onToggleMenu }: { onToggleMenu?: () => void }) {
  const [segment, setSegment] = useState<string | undefined>("Segment: M, L");
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] bg-[var(--shell-header)] px-4 py-3 backdrop-blur-[18px]">
      <button type="button" aria-label="แสดงเมนูหลัก" onClick={onToggleMenu} className={cn(control, "w-10 justify-center px-0")}>
        <Menu className="size-4" />
      </button>
      <button type="button" className={control}>Baseline</button>
      <DateField label="เริ่ม" value="01/03/2026" />
      <DateField label="ถึง" value="24/03/2026" />
      <DropdownChip label="Division / FC" />
      <DropdownChip label="Segment" selected={segment} />
      <DropdownChip label="Channel" />
      <DropdownChip label="Discount" />
      <button type="button" onClick={() => setSegment(undefined)} className={cn(control, "font-bold")}>
        ล้าง
      </button>
    </div>
  );
}
