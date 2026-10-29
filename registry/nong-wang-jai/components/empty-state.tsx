import { Inbox, Loader2 } from "lucide-react";

// กล่องว่าง: เส้นประ พื้นเทาอ่อนมาก ข้อความสั้น
export function EmptyState({ title = "ไม่พบข้อมูล", hint }: { title?: string; hint?: string }) {
  return (
    <div className="flex min-h-[150px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#d9e3e6] bg-[#fbfcfc] px-6 py-8 text-center">
      <Inbox className="size-6 text-slate-400" />
      <p className="text-sm font-semibold text-[#64748b]">{title}</p>
      {hint ? <p className="max-w-xs text-xs text-[#94a3b8]">{hint}</p> : null}
    </div>
  );
}

// ข้อความกำลังโหลด: กึ่งกลาง 14px ตัวหนา 600
export function LoadingState({ label = "กำลังโหลดข้อมูล..." }: { label?: string }) {
  return (
    <div className="flex min-h-[150px] items-center justify-center gap-2 text-sm font-semibold text-[#64748b]">
      <Loader2 className="size-4 animate-spin" />
      {label}
    </div>
  );
}
