import { Gift, Trophy } from "lucide-react";

function Coin({ size = 20 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#d99a00] bg-[radial-gradient(circle_at_35%_30%,#ffe27a,#f5bb00_60%,#c98a00)] font-black text-[#7a4a00]"
      style={{ width: size, height: size, fontSize: size * 0.45 }}
      aria-hidden
    >
      ฿
    </span>
  );
}

// การ์ด Coin: ตัวเลขใหญ่ 900 + ป้ายส่วนต่าง + ปุ่มของรางวัล / Leaderboard
export function CoinCard({ coins, weeklyDelta, onRewards, onLeaderboard }: { coins: number; weeklyDelta: number; onRewards?: () => void; onLeaderboard?: () => void }) {
  return (
    <div className="space-y-3">
      <div className="rounded-[20px] border border-[#d7e6f6] bg-white p-4 shadow-[0_8px_22px_rgba(14,62,125,0.055)]">
        <p className="flex items-center gap-2 text-xs font-bold text-[#0B2F6B]">
          <Coin /> Coin SAFETY ของฉัน
        </p>
        <p className="mt-1 text-[52px] font-black leading-none text-[#0B82F0] [font-feature-settings:'tnum']">
          {coins.toLocaleString()} <span className="text-base font-bold text-[#0B2F6B]">Coin</span>
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#35A8FF_0%,#0B82F0_55%,#006AD6_100%)] px-3 py-1 text-xs font-bold text-white">
          <Coin size={14} /> {weeklyDelta >= 0 ? "+" : ""}
          {weeklyDelta} Coin จากสัปดาห์ที่แล้ว
        </span>
      </div>
      <div className="rounded-[20px] border border-[#d7e6f6] bg-white p-4 shadow-[0_8px_22px_rgba(14,62,125,0.055)]">
        <div className="flex items-center gap-3">
          <Coin size={44} />
          <div>
            <p className="text-[15px] font-extrabold leading-tight text-[#0B2F6B]">Coin ของคุณสามารถนำมาแลกของรางวัลได้</p>
            <p className="text-xs text-[#55739B]">ใช้ Coin Safety เพื่อรับสิทธิ์แลกรางวัล</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={onRewards} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#35A8FF_0%,#0B82F0_55%,#006AD6_100%)] px-4 text-xs font-bold text-white shadow-[0_8px_20px_rgba(11,130,240,0.22)]">
            <Gift className="size-3.5" /> ดูของรางวัลที่นี่
          </button>
          <button type="button" onClick={onLeaderboard} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#C5DCF8] bg-white px-4 text-xs font-bold text-[#0B82F0]">
            <Trophy className="size-3.5" /> ดูอันดับ Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
