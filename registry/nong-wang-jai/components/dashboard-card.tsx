import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// กล่องเนื้อหาหลัก: 1 กล่องต่อ 1 ตาราง/กราฟ ห้ามซ้อน card ในนี้
export function DashboardCard({
  title,
  description,
  unit,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  unit?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-lg border border-[#dfe7ef] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]", className)}>
      <header className="flex items-start justify-between gap-3 border-b border-[#d9e3e6] px-4 py-3">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-bold text-[#07142b]">{title}</h3>
          {description ? <p className="mt-0.5 truncate text-xs text-[#94a3b8]">{description}</p> : null}
        </div>
        {action ?? (unit ? <span className="shrink-0 text-[11px] font-medium text-[#94a3b8]">หน่วย : {unit}</span> : null)}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
