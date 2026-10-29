import { cn } from "@/lib/utils";

export type OrderStatus = "confirmed" | "pending" | "cancelled" | "other";

const styles: Record<OrderStatus, string> = {
  confirmed: "bg-[#ecfdf5] text-[#047857] ring-[#a7f3d0]",
  pending: "bg-[#fffbeb] text-[#b45309] ring-[#fde68a]",
  cancelled: "bg-[#fff1f2] text-[#be123c] ring-[#fecdd3]",
  other: "bg-[#f1f5f9] text-[#334155] ring-[#e2e8f0]",
};

const labels: Record<OrderStatus, string> = {
  confirmed: "ยืนยันแล้ว",
  pending: "รอดำเนินการ",
  cancelled: "ยกเลิก",
  other: "อื่นๆ",
};

// แปลงข้อความสถานะจาก API เป็น 4 กลุ่ม (รองรับทั้งไทยและอังกฤษ)
export function getOrderStatusKey(value?: string | null): OrderStatus {
  const v = String(value ?? "").trim().toLowerCase();
  if (v.includes("cancel") || v.includes("ยกเลิก")) return "cancelled";
  if (v.includes("confirm") || v.includes("approved") || v.includes("ยืนยัน")) return "confirmed";
  if (v.includes("pending") || v.includes("wait") || v.includes("รอ")) return "pending";
  return "other";
}

export function StatusPill({ status, children, className }: { status: OrderStatus; children?: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1", styles[status], className)}>
      {children ?? labels[status]}
    </span>
  );
}
