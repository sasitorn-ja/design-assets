import type { ReactNode } from "react";

// การ์ด KPI: label เล็ก → ตัวเลข 1.7rem/900 → คำอธิบาย ปุ่มเสริมมุมขวาบน
export function SummaryCard({ label, value, description, action }: { label: string; value: string; description: string; action?: ReactNode }) {
  return (
    <article className="rounded-[20px] border border-[var(--border)] bg-[var(--shell-panel)] p-4 shadow-[0_18px_40px_var(--shadow-color)]">
      <div className="relative">
        {action ? <div className="absolute right-0 top-0">{action}</div> : null}
        <span className="block max-w-[calc(100%-88px)] text-sm text-[var(--muted-foreground)]">{label}</span>
        <strong className="mt-1 block text-[1.7rem] font-black leading-tight text-[var(--foreground)] [font-feature-settings:'tnum']">{value}</strong>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{description}</p>
    </article>
  );
}
