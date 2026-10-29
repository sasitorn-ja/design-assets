"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type SheetRow = {
  site: string;
  name: string;
  months: (number | null)[];
  completed?: boolean;
  stolenMonths?: number[]; // index ของเดือนที่โดนแย่งงาน
};

// ตารางแบบ spreadsheet ของ RMC: หัวสองชั้น, เลือก cell ได้, คอลัมน์ action sticky ขวา
export function ProjectSheet({ months, rows, onAction }: { months: string[]; rows: SheetRow[]; onAction?: (row: SheetRow) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto rounded-xl border border-[#DADCE0] bg-white">
      <table className="w-full min-w-[640px] border-collapse text-sm [font-feature-settings:'tnum']">
        <thead>
          <tr className="bg-[#F8F9FA] text-xs text-[#3C4043]">
            <th colSpan={2} className="border border-[#DADCE0] px-3 py-1.5 text-left font-bold">ข้อมูล Site</th>
            <th colSpan={months.length} className="border border-[#DADCE0] px-3 py-1.5 font-bold">ปริมาณ (คิว)</th>
            <th className="sticky right-0 border border-[#DADCE0] bg-[#F8F9FA] px-3 py-1.5" />
          </tr>
          <tr className="bg-[#0B57D0] text-xs text-white">
            <th className="border border-[#0B57D0] px-3 py-2 text-left font-bold">Site</th>
            <th className="border border-[#0B57D0] px-3 py-2 text-left font-bold">ชื่อโครงการ</th>
            {months.map((m) => (
              <th key={m} className="border border-[#0B57D0] px-3 py-2 text-right font-bold">{m}</th>
            ))}
            <th className="sticky right-0 border border-[#0B57D0] bg-[#0B57D0] px-3 py-2 font-bold shadow-[-6px_0_10px_-6px_rgba(15,35,65,.4)]">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.site} className={cn(row.completed && "bg-[#E6F4EA]")}>
              <td className="border border-[#DADCE0] px-3 py-2 font-semibold text-[#0B57D0]">{row.site}</td>
              <td className="max-w-[220px] truncate border border-[#DADCE0] px-3 py-2 text-[#202124]">{row.name}</td>
              {row.months.map((v, i) => {
                const key = `${row.site}-${i}`;
                const stolen = row.stolenMonths?.includes(i);
                return (
                  <td
                    key={key}
                    tabIndex={0}
                    onClick={() => setSelected(key)}
                    onFocus={() => setSelected(key)}
                    className={cn(
                      "cursor-cell border border-[#DADCE0] px-3 py-2 text-right text-[#202124] outline-none",
                      stolen && "bg-[#FFF8F8] font-semibold text-[#BE123C]",
                      selected === key && "bg-[#E8F0FE] outline outline-2 -outline-offset-2 outline-[#1A73E8]",
                    )}
                  >
                    {v ?? "–"}
                  </td>
                );
              })}
              <td className="sticky right-0 border border-[#DADCE0] bg-white px-2 py-1.5 text-center shadow-[-6px_0_10px_-6px_rgba(15,35,65,.25)]">
                <button type="button" onClick={() => onAction?.(row)} className="h-7 rounded-md border border-[#CFE0F6] bg-white px-2.5 text-xs font-bold text-[#17384D] hover:bg-[#F4F8FD]">
                  บันทึก
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
