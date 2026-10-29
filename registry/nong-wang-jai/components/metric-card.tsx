import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  unit?: string;
  detail: string;
  compact?: boolean;
  /** สีพื้น icon แบบอ่อน: sky / emerald / violet / amber / slate */
  tone?: "sky" | "emerald" | "violet" | "amber" | "slate";
};

const toneClass = {
  sky: "bg-sky-50 text-sky-600",
  emerald: "bg-emerald-50 text-emerald-600",
  violet: "bg-violet-50 text-violet-600",
  amber: "bg-amber-50 text-amber-600",
  slate: "border border-slate-200 bg-slate-100 text-slate-700",
};

// การ์ด KPI: label สั้น → ตัวเลขใหญ่ + หน่วยเล็ก → คำอธิบาย
export function MetricCard({ icon, label, value, unit, detail, compact = false, tone = "sky" }: MetricCardProps) {
  return (
    <div className="min-h-[88px] rounded-lg border border-[#dfe7ef] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className={cn(compact ? "p-2.5" : "px-3 py-3.5")}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className={cn("font-semibold text-slate-500", compact ? "text-[11px]" : "text-xs")}>{label}</p>
            <p className={cn("truncate font-semibold leading-none text-slate-950 [font-feature-settings:'tnum']", compact ? "mt-1 text-[20px]" : "mt-1.5 text-[24px]")}>
              {value}
              {unit ? <span className="ml-1 text-xs font-semibold text-slate-400">{unit}</span> : null}
            </p>
          </div>
          <div className={cn("flex shrink-0 items-center justify-center rounded-lg", compact ? "size-8" : "size-9", toneClass[tone])}>{icon}</div>
        </div>
        <p className={cn("truncate font-medium text-slate-500", compact ? "mt-2 text-[11px]" : "mt-3 text-xs")}>{detail}</p>
      </div>
    </div>
  );
}
