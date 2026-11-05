import * as React from "react";
import { cn } from "@/lib/utils";

// การ์ดขอบฟ้าอ่อน 1.5px มุม 20px เงาแข็งด้านล่าง 3px (ไม่เบลอ) ให้ดูเหมือนสติกเกอร์
export function StickerCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-[20px] border-[1.5px] border-[#cfe6f5] bg-white text-[#0c2a44] shadow-[0_3px_0_#cfe6f5]", className)} {...props} />;
}

export function StickerCardHeader({ title, description, action, className }: { title: React.ReactNode; description?: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-start justify-between gap-3 p-5 pb-3", className)}>
      <div className="min-w-0">
        <h3 className="font-[family-name:var(--font-prompt)] text-[17px] font-semibold leading-tight text-[#0c2a44]">{title}</h3>
        {description ? <p className="mt-1 text-[13px] text-[#5a7489]">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function StickerCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}

// การ์ดตัวเลข KPI (แถวบนสุดของ Dashboard): ต่างจากการ์ดทั่วไป ใช้มุม 16px ขอบ 1px และเงาเบลอเบาๆ
export function StickerStat({ label, value, unit, hint, icon }: { label: string; value: string; unit?: string; hint?: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#cfe6f5] bg-white p-5 text-[#0c2a44] shadow-[0_6px_20px_rgb(9_41_67/0.05)]">
      <div className="flex items-center gap-2 text-[13px] font-semibold text-[#5a7489]">
        {icon ? <span className="grid size-8 place-items-center rounded-full bg-[#e3f4fd] text-[#0072b8] [&_svg]:size-4">{icon}</span> : null}
        {label}
      </div>
      <p className="mt-3 font-[family-name:var(--font-prompt)] text-[28px] font-bold leading-none tabular-nums text-[#0c2a44]">
        {value}
        {unit ? <span className="ml-1.5 text-sm font-medium text-[#5a7489]">{unit}</span> : null}
      </p>
      {hint ? <p className="mt-2 text-xs text-[#5a7489]">{hint}</p> : null}
    </div>
  );
}
