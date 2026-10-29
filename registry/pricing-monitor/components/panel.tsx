import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Panel หลักของ section (กราฟ, ตาราง, admin) radius 28px
export function Panel({ eyebrow, title, description, actions, children, className }: { eyebrow?: string; title: string; description?: string; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-[28px] border border-[var(--border)] bg-[var(--shell-panel)] p-5 shadow-[0_18px_40px_var(--shadow-color)] backdrop-blur-[18px]", className)}>
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow ? <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-[var(--section-eyebrow)]">{eyebrow}</p> : null}
          <h3 className="text-[1.5rem] font-semibold leading-tight text-[var(--foreground)]">{title}</h3>
          {description ? <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </header>
      {children}
    </section>
  );
}

/** กล่องกราฟ: radius 24px พื้น surface-muted สูงอย่างน้อย 320px */
export function ChartBox({ children }: { children: ReactNode }) {
  return <div className="min-h-[320px] overflow-x-auto rounded-[24px] border border-[var(--border)] bg-[var(--surface-muted)] p-3">{children}</div>;
}
