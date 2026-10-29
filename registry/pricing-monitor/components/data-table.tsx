import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Column<T> = { key: string; header: string; align?: "left" | "right"; render: (row: T) => ReactNode };

// ตาราง: wrapper มุมมน 22px หัวตาราง uppercase 0.72rem tracking .16em บนมือถือ scroll ใน wrapper
export function DataTable<T>({ columns, rows, rowKey }: { columns: Column<T>[]; rows: T[]; rowKey: (r: T) => string }) {
  return (
    <div className="overflow-x-auto rounded-[22px] border border-[var(--border)] bg-[var(--shell-panel)]">
      <table className="w-full min-w-[560px] border-collapse text-sm [font-feature-settings:'tnum']">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={cn("border-b border-[var(--border)] bg-[var(--surface-strong)] p-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[var(--muted-foreground)]", c.align === "right" ? "text-right" : "text-left")}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)} className="transition-colors hover:bg-[var(--shell-hover)]">
              {columns.map((c) => (
                <td key={c.key} className={cn("border-b border-[var(--border)] p-3 text-[var(--foreground)]", c.align === "right" && "text-right")}>
                  {c.render(r)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Badge แบบ pill สีพื้นโปร่ง ข้อความสี semantic */
export function Badge({ tone, children }: { tone: "success" | "warning" | "error" | "info"; children: ReactNode }) {
  const map = {
    success: "bg-[#16a34a]/12 text-[#15803d]",
    warning: "bg-[#f59e0b]/15 text-[#b45309]",
    error: "bg-[#dc2626]/12 text-[#b91c1c]",
    info: "bg-[#0ea5e9]/12 text-[#0369a1]",
  };
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold", map[tone])}>{children}</span>;
}
