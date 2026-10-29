import { cn } from "@/lib/utils";

export type JobStatus = "ready" | "in-transit" | "delivered" | "cancelled";

const map: Record<JobStatus, { label: string; className: string }> = {
  ready: { label: "พร้อมเริ่มงาน", className: "border-sky-200 bg-sky-100 text-blue-700" },
  "in-transit": { label: "กำลังขนส่ง", className: "border-amber-200 bg-amber-50 text-amber-700" },
  delivered: { label: "ส่งครบแล้ว", className: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  cancelled: { label: "ยกเลิก", className: "border-red-200 bg-red-50 text-red-700" },
};

export function StatusPill({ status, className }: { status: JobStatus; className?: string }) {
  const s = map[status];
  return <span className={cn("inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[12px] font-semibold", s.className, className)}>{s.label}</span>;
}
