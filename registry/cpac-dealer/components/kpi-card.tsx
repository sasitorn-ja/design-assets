import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// KPI: icon ในกล่องฟ้าอ่อน + ชื่อ + chip % → ตัวเลขใหญ่ + หน่วย → คำอธิบาย
export function KpiCard({ icon, title, value, unit, delta, hint, action }: { icon: ReactNode; title: string; value: string; unit?: string; delta?: number; hint?: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#dce6ed] bg-white p-5 shadow-[0_2px_12px_rgb(9_41_67/0.04)]">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f6fd] text-[#00a1e5] [&_svg]:size-[18px]">{icon}</span>
        <p className="min-w-0 flex-1 truncate text-[15px] font-bold text-[#092943]">{title}</p>
        {typeof delta === "number" ? (
          <span className={cn("inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold", delta >= 0 ? "bg-[#e7f7f1] text-[#0baa76]" : "bg-[#fef2f2] text-[#dc2626]")}>
            {delta >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {delta >= 0 ? "+" : ""}
            {delta}%
          </span>
        ) : null}
        {action}
      </div>
      <p className="mt-4 text-[30px] font-extrabold leading-none text-[#092943] [font-feature-settings:'tnum']">
        {value}
        {unit ? <span className="ml-1.5 text-base font-semibold text-[#577189]">{unit}</span> : null}
      </p>
      {hint ? <p className="mt-2 truncate text-xs text-[#7890a1]">{hint}</p> : null}
    </div>
  );
}
