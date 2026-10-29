import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StatusTone = "success" | "warning" | "danger" | "info" | "help" | "neutral";

// สีจาก design.md: ข้อความ / พื้น / เส้นขอบ ใช้คู่กันเสมอ
const tones: Record<StatusTone, string> = {
  success: "text-[#188038] bg-[#E6F4EA] border-[#B7D8BF]",
  warning: "text-[#92400E] bg-[#FEF7E0] border-[#F6D58B]",
  danger: "text-[#BE123C] bg-[#FFF1F2] border-[#F3C2C8]",
  info: "text-[#0B57D0] bg-[#E8F0FE] border-[#B9D2FF]",
  help: "text-[#7E22CE] bg-[#FAF5FF] border-[#E9D5FF]",
  neutral: "text-[#5F6368] bg-[#F8F9FA] border-[#DADCE0]",
};

// ข้อความสั้น อ่านได้ทันที ใส่ icon ได้ถ้าต้องการ
export function StatusBadge({ tone, icon, children, className }: { tone: StatusTone; icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-bold", tones[tone], className)}>
      {icon}
      {children}
    </span>
  );
}
