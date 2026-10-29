import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, SearchX } from "lucide-react";

// Alert: พื้นโปร่งสี semantic + เส้นขอบอ่อน ถ้าต้องให้ผู้ใช้ทำอะไรให้ใส่ปุ่ม action
export function Alert({ tone, title, children, action }: { tone: "error" | "success"; title: string; children?: ReactNode; action?: ReactNode }) {
  const isError = tone === "error";
  return (
    <div
      role={isError ? "alert" : "status"}
      className={
        isError
          ? "flex items-start gap-3 rounded-[18px] border border-[#fda4af] bg-[#fff1f2] p-4 text-[#9f1239]"
          : "flex items-start gap-3 rounded-[18px] border border-[#86efac] bg-[#ecfdf5] p-4 text-[#166534]"
      }
    >
      {isError ? <AlertTriangle className="mt-0.5 size-5 shrink-0" /> : <CheckCircle2 className="mt-0.5 size-5 shrink-0" />}
      <div className="min-w-0 flex-1">
        <p className="font-bold">{title}</p>
        {children ? <div className="mt-1 text-sm leading-6 opacity-90">{children}</div> : null}
      </div>
      {action}
    </div>
  );
}

// Empty state: ต้องมีหัวข้อ + คำแนะนำ action ถัดไปเสมอ
export function EmptyState({ title, hint, action }: { title: string; hint: string; action?: ReactNode }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center">
      <SearchX className="mb-3 size-8 text-[var(--muted-foreground)]" />
      <p className="font-bold text-[var(--foreground)]">{title}</p>
      <p className="mt-1 max-w-sm text-sm leading-6 text-[var(--muted-foreground)]">{hint}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
