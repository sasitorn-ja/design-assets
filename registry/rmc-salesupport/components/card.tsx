import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ds-card: ขอบ #DBEAF5, มุม 16px, เงาโทนฟ้าเทา
// highlight: ใช้เฉพาะ card ที่สำคัญมาก ห้ามใช้กับทุก card
export function Card({ title, description, highlight, children, className }: { title?: string; description?: string; highlight?: boolean; children?: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#DBEAF5] bg-white p-5 shadow-[0_4px_16px_rgb(32_72_125/8%)]",
        highlight && "border-[#B9D2FF] bg-[linear-gradient(135deg,#fff_0%,#eef5ff_100%)]",
        className,
      )}
    >
      {title ? <h3 className="text-base font-extrabold text-[#203D63]">{title}</h3> : null}
      {description ? <p className="mt-0.5 text-sm text-[#60769B]">{description}</p> : null}
      {children ? <div className={title || description ? "mt-4" : undefined}>{children}</div> : null}
    </div>
  );
}

/** ตัวเลข KPI ใน card */
export function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-[#48617F]">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-[#17384D] [font-feature-settings:'tnum']">
        {value} {unit ? <span className="text-sm font-semibold text-[#60769B]">{unit}</span> : null}
      </p>
    </div>
  );
}
