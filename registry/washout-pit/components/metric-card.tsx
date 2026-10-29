import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MetricTone = "teal" | "purple" | "blue" | "orange";

const tones: Record<MetricTone, { bg: string; value: string; icon: string }> = {
  teal: { bg: "bg-[linear-gradient(145deg,#f0fcfb_0%,#d9f5f2_100%)]", value: "text-[#0f766e]", icon: "text-[#0f9f75]" },
  purple: { bg: "bg-[linear-gradient(145deg,#faf8ff_0%,#eee9ff_100%)]", value: "text-[#6d28d9]", icon: "text-[#7c3aed]" },
  blue: { bg: "bg-[linear-gradient(145deg,#f8fbff_0%,#edf4ff_100%)] border border-[#cfe2ff]", value: "text-[#1d4ed8]", icon: "text-[#2563eb]" },
  orange: { bg: "bg-[linear-gradient(145deg,#fff9f4_0%,#ffede1_100%)]", value: "text-[#c2410c]", icon: "text-[#ea580c]" },
};

// การ์ด KPI พื้นไล่สีอ่อนตามหมวด + icon ในวงกลมขาวโปร่งมุมขวาล่าง
export function MetricCard({ label, value, unit, tone, icon }: { label: string; value: string | number; unit?: string; tone: MetricTone; icon: ReactNode }) {
  const t = tones[tone];
  return (
    <div className={cn("relative min-h-[132px] overflow-hidden rounded-xl p-5 pl-12", t.bg)}>
      <p className="text-[22px] font-semibold leading-tight text-[#334155]">{label}</p>
      <p className={cn("mt-1 text-[32px] font-bold leading-none [font-feature-settings:'tnum']", t.value)}>{typeof value === "number" ? value.toLocaleString() : value}</p>
      {unit ? <p className="mt-3 text-[13px] text-[#53738b]">{unit}</p> : null}
      <span className={cn("absolute -bottom-6 -right-6 flex size-28 items-start justify-start rounded-full bg-white/45 pl-7 pt-7 [&_svg]:size-8", t.icon)}>{icon}</span>
    </div>
  );
}
