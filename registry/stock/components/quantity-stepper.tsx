"use client";

import { Minus, Plus } from "lucide-react";

// ปุ่ม −/+ ขนาด 40px กดง่ายบนมือถือ ตัวเลขตรงกลางพิมพ์แก้ได้
export function QuantityStepper({ value, onChange, min = 0, max, unit }: { value: number; onChange: (v: number) => void; min?: number; max?: number; unit?: string }) {
  const clamp = (v: number) => Math.max(min, max !== undefined ? Math.min(max, v) : v);
  const btn = "flex size-10 items-center justify-center text-slate-600 transition-colors hover:bg-slate-100 active:translate-y-px disabled:opacity-40";
  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border border-[#cdd8e4] bg-white">
      <button type="button" aria-label="ลดจำนวน" className={btn} disabled={value <= min} onClick={() => onChange(clamp(value - 1))}>
        <Minus className="size-4" />
      </button>
      <input
        inputMode="numeric"
        aria-label="จำนวน"
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value.replace(/\D/g, "")) || 0))}
        className="h-10 w-14 border-x border-[#e2e8f0] text-center text-sm font-bold text-slate-900 outline-none [font-feature-settings:'tnum'] focus:bg-sky-50"
      />
      <button type="button" aria-label="เพิ่มจำนวน" className={btn} disabled={max !== undefined && value >= max} onClick={() => onChange(clamp(value + 1))}>
        <Plus className="size-4" />
      </button>
      {unit ? <span className="pr-3 text-xs text-slate-500">{unit}</span> : null}
    </div>
  );
}
