import { cn } from "@/lib/utils";

export type Column<T> = { key: keyof T & string; header: string; align?: "left" | "right" | "center"; render?: (row: T) => React.ReactNode };

// ตาราง: อยู่ในการ์ดสติกเกอร์, หัวตารางพื้นฟ้า #e1f2fd ตัวหนา, hover แถวเป็นฟ้าจาง 6%
export function DataTable<T extends Record<string, unknown>>({ columns, rows }: { columns: Column<T>[]; rows: T[] }) {
  const align = (a?: string) => (a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left");
  return (
    <div className="overflow-hidden rounded-[20px] border-[1.5px] border-[#cfe6f5] bg-white shadow-[0_3px_0_#cfe6f5]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm tabular-nums text-[#0c2a44]">
          <thead>
            <tr className="bg-[#e1f2fd]">
              {columns.map((c) => (
                <th key={c.key} className={cn("whitespace-nowrap px-5 py-3 text-[11px] font-bold text-[#23435f]", align(c.align))}>{c.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1f2fd]">
            {rows.map((row, i) => (
              <tr key={i} className="transition-colors hover:bg-[rgb(0_161_229/0.06)]">
                {columns.map((c) => (
                  <td key={c.key} className={cn("whitespace-nowrap px-4 py-3", align(c.align))}>{c.render ? c.render(row) : String(row[c.key] ?? "")}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
