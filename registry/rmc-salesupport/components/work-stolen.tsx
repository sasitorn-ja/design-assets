import { AlertTriangle, Lock } from "lucide-react";

// สถานะ 'โดนแย่งงาน' ระดับ Site: พื้นชมพูอ่อน + ข้อความ rose เข้ม + icon + ล็อก action ที่เกี่ยวข้อง
export function WorkStolenNotice({ site, by, date }: { site: string; by: string; date: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#F3C2C8] bg-[#FFF8F8] p-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#FFE4E8] text-[#BE123C]">
        <AlertTriangle className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-extrabold text-[#BE123C]">โดนแย่งงาน</p>
          <span className="rounded-full border border-[#F3C2C8] bg-white px-2 py-0.5 text-[11px] font-bold text-[#BE123C]">{site}</span>
        </div>
        <p className="mt-1 text-sm text-[#48617F]">
          คู่แข่ง <b className="text-[#17384D]">{by}</b> ได้งานเมื่อ {date} ระบบล็อกการกรอกปริมาณของ Site นี้แล้ว
        </p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-[#DADCE0] bg-[#F8F9FA] px-2 py-1 text-xs font-semibold text-[#5F6368]">
        <Lock className="size-3.5" /> ล็อกแล้ว
      </span>
    </div>
  );
}
