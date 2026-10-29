import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  width?: string; // เช่น "28%"
  align?: "left" | "right" | "center";
  render: (row: T) => ReactNode;
};

// ตาราง compact: table-fixed, หัวตารางพื้นเทาอ่อน, ตัวเลขชิดขวา, ไม่ต้องเลื่อนแนวนอน
export function DataTable<T>({ columns, rows, rowKey, empty = "ไม่พบข้อมูล" }: { columns: Column<T>[]; rows: T[]; rowKey: (row: T) => string; empty?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#dfe7ef] bg-white">
      <table className="w-full table-fixed border-collapse text-[13px] [font-feature-settings:'tnum']">
        <colgroup>
          {columns.map((c) => (
            <col key={c.key} style={{ width: c.width }} />
          ))}
        </colgroup>
        <thead>
          <tr className="border-b border-[#d9e3e6] bg-[#f7f9fc]">
            {columns.map((c) => (
              <th key={c.key} className={cn("px-2.5 py-2 text-xs font-semibold text-[#52627a]", c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : "text-left")}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-14 text-center text-sm font-semibold text-slate-500">
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={rowKey(row)} className="border-b border-[#edf1f2] text-[#13213a] transition-colors last:border-b-0 hover:bg-[#f3faf8]">
                {columns.map((c) => (
                  <td key={c.key} className={cn("px-2.5 py-2 align-middle", c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : "text-left")}>
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ---------- ตัวช่วยใน cell ----------

/** ตัวเลข + หน่วยตัวเล็กสีจาง */
export function NumberWithUnit({ value, unit }: { value: string | number; unit: string }) {
  return (
    <span className="whitespace-nowrap font-semibold">
      {value} <span className="text-[11px] font-medium text-[#94a3b8]">{unit}</span>
    </span>
  );
}

/** ชื่อยาวตัด 2 บรรทัด */
export function ClampText({ children }: { children: ReactNode }) {
  return <span className="line-clamp-2 break-words font-medium">{children}</span>;
}

/** วันที่+เวลาแยก 2 บรรทัด ลดความกว้างคอลัมน์ เช่น "29 ต.ค. 2569 14:30 น." */
export function CompactDateTime({ value }: { value: string }) {
  const parts = value.split(" ");
  if (parts.length < 4) return <span>{value}</span>;
  return (
    <span className="block text-[11px] leading-4">
      <span className="block whitespace-nowrap">{parts.slice(0, 3).join(" ")}</span>
      <span className="block whitespace-nowrap text-[#94a3b8]">{parts.slice(3).join(" ")}</span>
    </span>
  );
}
