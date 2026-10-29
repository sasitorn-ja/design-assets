import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type DayState = "missed" | "done" | "today" | "upcoming";
export type Day = { weekday: string; date: number; state: DayState; note?: string };

const style: Record<DayState, string> = {
  missed: "border-[#fecdd3] bg-[#FFF1F2] text-[#E11D48]",
  done: "border-[#bbf7d0] bg-[#ECFDF5] text-[#16A34A]",
  today: "border-[#0B82F0] bg-[#E0F0FF] text-[#0B82F0] shadow-[0_8px_20px_rgba(11,130,240,0.22)] ring-2 ring-[#bfe0ff]",
  upcoming: "border-[#D7EAFE] bg-white text-[#0B2F6B] hover:-translate-y-0.5 hover:shadow-md",
};

const defaultNote: Record<DayState, string> = { missed: "ไม่ได้ทำ", done: "", today: "", upcoming: "มีงาน" };

// ปฏิทินรายวันแบบ streak: ย้อนหลัง → วันนี้ → ล่วงหน้า
export function StreakCalendar({ days, streak }: { days: Day[]; streak?: number }) {
  return (
    <div>
      {streak ? (
        <span className="mb-3 inline-flex items-center gap-1 rounded-full border border-[#fed7aa] bg-[#FFF7ED] px-3 py-1 text-xs font-bold text-[#EA580C]">🔥 ทำต่อเนื่อง {streak} วัน</span>
      ) : null}
      <div className="grid gap-1.5 sm:gap-2" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(44px, 1fr))` }}>
        {days.map((d) => (
          <div key={`${d.weekday}-${d.date}`} className={cn("flex aspect-square flex-col items-center justify-center rounded-xl border p-1.5 text-center font-black transition-all duration-300 sm:rounded-2xl", style[d.state])}>
            <span className="text-[9px] font-bold opacity-80">{d.weekday}</span>
            <span className="text-base leading-tight sm:text-lg">{d.date}</span>
            {d.state === "done" || d.state === "today" ? <CheckCircle2 className="size-3.5" /> : <span className="text-[8.5px] font-bold">{d.note ?? defaultNote[d.state]}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
