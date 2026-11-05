import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type RebateTier = { min: number; max: number | null; rate: number };

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 });

// ความคืบหน้า Rebate: แถบบาง 8px ไล่สีฟ้า→เขียว + ข้อความ "อีกเพียง X คิว" + ตารางขั้น (Step) ที่บอกว่าแต่ละขั้นขาดอีกเท่าไร
export function RebateProgress({ volume, tiers }: { volume: number; tiers: RebateTier[] }) {
  const currentIndex = tiers.reduce((idx, t, i) => (volume >= t.min ? i : idx), -1);
  const next = tiers[currentIndex + 1];
  const top = tiers[tiers.length - 1]?.min || 1;
  const percent = Math.min(100, Math.round((volume / top) * 100));
  const currentRate = currentIndex >= 0 ? tiers[currentIndex].rate : 0;
  const increase = next ? Math.max(0, next.min * next.rate - volume * currentRate) : 0;

  return (
    <div className="space-y-3">
      <div className="rounded-[14px] border border-[#cfe6f5] bg-[#f8fcff] p-3">
        <div className="flex items-center gap-3">
          <span className="shrink-0 text-xs font-extrabold text-[#0c2a44]">Progress Rebate</span>
          <div role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-[#dceaf2]">
            <div className="h-full rounded-full bg-gradient-to-r from-[#00a1e5] to-[#0baa76] transition-all duration-300" style={{ width: `${percent}%` }} />
          </div>
        </div>
        <p className="mt-2 text-[11.5px] font-bold">
          {next ? (
            <span className="text-[#0072b8]">อีกเพียง {fmt(next.min - volume)} คิว รับ Rebate เพิ่ม ฿{fmt(increase)}</span>
          ) : (
            <span className="text-[#0baa76]">ถึงขั้นสูงสุดแล้ว · สะสม {fmt(volume)} คิว</span>
          )}
        </p>
      </div>

      <div className="divide-y divide-[#e1f2fd] overflow-hidden rounded-[14px] border border-[#cfe6f5] text-[13px]">
        {tiers.map((tier, i) => {
          const reached = volume >= tier.min;
          const isCurrent = i === currentIndex;
          return (
            <div key={tier.min} className={cn("flex items-center justify-between gap-3 px-3.5 py-2.5", isCurrent ? "bg-[#e3f4fd] font-bold text-[#0072b8]" : reached ? "text-[#0c2a44]" : "text-[#5a7489]")}>
              <span className="flex min-w-0 items-center gap-2">
                <span className={cn("grid size-4 shrink-0 place-items-center rounded-full", reached ? "bg-[#0baa76] text-white" : "border border-[#afd2ea] bg-white")}>
                  {reached ? <Check className="size-2.5" strokeWidth={3} /> : null}
                </span>
                <span className="truncate">{tier.max === null ? `${fmt(tier.min)}+ คิว` : `${fmt(tier.min)} – ${fmt(tier.max)} คิว`}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className={cn("text-[11px] font-bold", reached ? "text-[#0baa76]" : "text-[#5a7489]")}>{reached ? "ได้รับแล้ว" : `อีก ${fmt(tier.min - volume)} คิว`}</span>
                <span className={cn("font-bold", isCurrent ? "text-[#0072b8]" : reached ? "text-[#0baa76]" : "text-[#23435f]")}>฿{tier.rate}/คิว</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
