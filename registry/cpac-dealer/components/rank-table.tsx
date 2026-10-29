import { ChevronRight, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export type RankRow = { name: string; sub?: string; value: number; share?: number; color?: string };

const medal = ["bg-[#f59e0b] text-white", "bg-[#94a3b8] text-white", "bg-[#b45309] text-white"];

// ตาราง Top N: วงกลมอันดับ ทอง/เงิน/ทองแดง, อันดับ 1 มีมงกุฎ, แถบสัดส่วนถ้ามี share
export function RankTable({ title, subtitle, valueLabel, rows, showShare = false }: { title: string; subtitle?: string; valueLabel: string; rows: RankRow[]; showShare?: boolean }) {
  return (
    <section className="rounded-2xl border border-[#dce6ed] bg-white p-5 shadow-[0_2px_12px_rgb(9_41_67/0.04)]">
      <header className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-[17px] font-extrabold text-[#092943]">
          {title} {subtitle ? <span className="text-xs font-medium text-[#7890a1]">{subtitle}</span> : null}
        </h3>
        <button type="button" className="inline-flex h-8 items-center gap-1 rounded-full border border-[#dce6ed] px-3 text-xs font-bold text-[#2c4a63] hover:bg-[#f8fafc]">
          ดูทั้งหมด <ChevronRight className="size-3.5" />
        </button>
      </header>
      <table className="w-full text-[13px] [font-feature-settings:'tnum']">
        <thead>
          <tr className="bg-[#f8fafc] text-left text-xs text-[#577189]">
            <th className="w-10 rounded-l-lg px-2 py-2 font-semibold">#</th>
            <th className="px-2 py-2 font-semibold">ชื่อ</th>
            <th className="px-2 py-2 text-right font-semibold">{valueLabel}</th>
            {showShare ? <th className="rounded-r-lg px-2 py-2 text-right font-semibold">สัดส่วน</th> : <th className="rounded-r-lg" />}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.name} className="border-b border-[#edf3f7] last:border-0">
              <td className="px-2 py-2.5">
                <span className={cn("flex size-6 items-center justify-center rounded-full text-[11px] font-bold", medal[i] ?? "bg-[#edf3f7] text-[#577189]")}>{i + 1}</span>
              </td>
              <td className="px-2 py-2.5 font-medium text-[#092943]">
                <span className="flex items-center gap-1">
                  {i === 0 ? <Crown className="size-3.5 text-[#f59e0b]" /> : null}
                  {r.name}
                </span>
                {r.sub ? <span className="text-xs text-[#7890a1]">{r.sub}</span> : null}
              </td>
              <td className="px-2 py-2.5 text-right font-bold text-[#092943]">{r.value.toLocaleString()}</td>
              <td className="px-2 py-2.5">
                {showShare && typeof r.share === "number" ? (
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-1.5 w-28 overflow-hidden rounded-full bg-[#edf3f7]">
                      <div className="h-full rounded-full" style={{ width: `${Math.max(r.share, 1)}%`, background: r.color ?? "#00a1e5" }} />
                    </div>
                    <span className="w-12 text-right text-xs text-[#7890a1]">{r.share.toFixed(1)}%</span>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
