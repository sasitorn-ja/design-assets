import { ChevronLeft, ChevronRight, Droplets, Pencil, Trash2, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

export type Request = { docNo: string | null; plant: string; plantCode: string; type: "wet" | "dry"; volume: number; status: "draft" | "sent" | "approved"; sentAt?: string; updatedAt: string };

const typePill = {
  wet: { label: "เปียก", icon: Droplets, className: "bg-[#e8f1ff] text-[#2563eb]" },
  dry: { label: "แห้ง", icon: Wind, className: "bg-[#fff1e6] text-[#ea580c]" },
};
const statusPill = {
  draft: { label: "ฉบับร่าง", className: "bg-[#fef3c7] text-[#b45309]" },
  sent: { label: "ส่งแล้ว", className: "bg-[#e0f7ff] text-[#0284c7]" },
  approved: { label: "อนุมัติแล้ว", className: "bg-[#d9fbea] text-[#0f9f75]" },
};

// ตารางคำขอ: หัวตารางพื้นฟ้าอ่อน, ป้ายประเภท+สถานะ, ปุ่มแก้ไข/ลบเล็ก, แถบนับรายการ + pagination
export function RequestTable({ rows, page = 1 }: { rows: Request[]; page?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e2f3f8] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-[13px] [font-feature-settings:'tnum']">
          <thead>
            <tr className="bg-[#f6fbfe] text-xs font-semibold text-[#53738b]">
              {["เลขที่เอกสาร", "โรงงาน", "ประเภทบ่อ", "ปริมาตร (ลบ.ม.)", "สถานะ", "วันที่ส่งคำขอ", "แก้ไขล่าสุด", "การจัดการ"].map((h, i) => (
                <th key={h} className={cn("border-b border-r border-[#e2f3f8] px-4 py-3 last:border-r-0", i === 3 ? "text-right" : [2, 4, 7].includes(i) ? "text-center" : "text-left")}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => {
              const T = typePill[r.type];
              const S = statusPill[r.status];
              return (
                <tr key={idx} className="hover:bg-[#f9fbfe]">
                  <td className="border-r border-[#e2f3f8] whitespace-nowrap px-4 py-3 font-semibold text-[#0284c7]">{r.docNo ?? "ฉบับร่าง"}</td>
                  <td className="border-r border-[#e2f3f8] px-4 py-3">
                    <span className="block font-medium text-[#111827]">{r.plant}</span>
                    <span className="text-xs text-[#53738b]">{r.plantCode}</span>
                  </td>
                  <td className="border-r border-[#e2f3f8] px-4 py-3 text-center">
                    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold", T.className)}><T.icon className="size-3.5" />{T.label}</span>
                  </td>
                  <td className="border-r border-[#e2f3f8] px-4 py-3 text-right">{r.volume.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="border-r border-[#e2f3f8] px-4 py-3 text-center">
                    <span className={cn("inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold", S.className)}>{S.label}</span>
                  </td>
                  <td className="border-r border-[#e2f3f8] whitespace-nowrap px-4 py-3">{r.sentAt ?? "—"}</td>
                  <td className="border-r border-[#e2f3f8] whitespace-nowrap px-4 py-3">{r.updatedAt}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex gap-1.5">
                      <button type="button" className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#dbe5f0] px-2 text-xs text-[#53738b] hover:bg-[#f9fbfe]"><Pencil className="size-3.5" />แก้ไข</button>
                      <button type="button" className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#fecaca] bg-[#fff5f5] px-2 text-xs text-[#dc2626] hover:bg-[#fee2e2]"><Trash2 className="size-3.5" />ลบ</button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-[#e2f3f8] px-4 py-2.5 text-[13px] text-[#53738b]">
        <span>{rows.length} รายการ / แสดงต่อหน้า <span className="ml-1 rounded-lg border border-[#dbe5f0] px-2 py-1 text-[#111827]">10</span></span>
        <span className="flex items-center gap-1.5">
          <button type="button" aria-label="ก่อนหน้า" className="flex size-7 items-center justify-center rounded-full border border-[#dbe5f0]"><ChevronLeft className="size-3.5" /></button>
          <span className="flex size-7 items-center justify-center rounded-full bg-[#0284c7] text-xs font-bold text-white">{page}</span>
          <button type="button" aria-label="ถัดไป" className="flex size-7 items-center justify-center rounded-full border border-[#dbe5f0]"><ChevronRight className="size-3.5" /></button>
        </span>
      </div>
    </div>
  );
}
