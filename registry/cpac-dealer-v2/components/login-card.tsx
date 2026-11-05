import { ShieldCheck } from "lucide-react";

// หน้า login: พื้นฟ้าอ่อนมีวงกลมฟ้าจางๆ, การ์ดขาวมุม 28px กลางจอ, มาสคอตโผล่หัวเหนือการ์ด, ปุ่ม SSO หลัก (ฟ้าทึบ) + ปุ่มรอง (ขอบ)
export function LoginCard({
  mascot,
  title = "เข้าสู่ระบบ",
  subtitle = "สำหรับพนักงาน SCG",
  description = "เชื่อมต่อข้อมูลการขาย และดูแลร้านค้าในกิจการของคุณ",
  onPrimary,
  onSecondary,
}: {
  mascot?: React.ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
}) {
  return (
    <div className="relative flex min-h-[560px] w-full items-center justify-center overflow-hidden bg-[#f2f6f9] px-4 py-12">
      <span aria-hidden className="absolute -right-24 -top-24 size-[420px] rounded-full bg-[#dff0fb]" />
      <span aria-hidden className="absolute -bottom-32 -left-24 size-[360px] rounded-full bg-[#dff0fb]" />
      <div className="relative w-full max-w-[420px] pt-16">
        <div className="absolute left-1/2 top-0 grid size-24 -translate-x-1/2 place-items-center">
          {mascot ?? <span className="grid size-20 place-items-center rounded-full bg-[#00a1e5] font-[family-name:var(--font-prompt)] text-sm font-bold text-white">CPAC</span>}
        </div>
        <div className="rounded-[28px] border border-[#dce6ed] bg-white px-8 pb-6 pt-10 text-center shadow-[0_12px_40px_rgba(9,41,67,0.08)]">
          <h1 className="font-[family-name:var(--font-prompt)] text-[32px] font-bold leading-tight text-[#092943]">{title}</h1>
          <p className="mt-1 font-[family-name:var(--font-prompt)] text-lg font-semibold text-[#00a1e5]">{subtitle}</p>
          <p className="mx-auto mt-3 max-w-[260px] text-[15px] leading-6 text-[#577189]">{description}</p>
          <div className="mt-7 space-y-3">
            <button type="button" onClick={onPrimary} className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#00a1e5] text-[17px] font-semibold text-white transition-colors hover:bg-[#008ccb]">
              <span className="grid size-8 place-items-center rounded-full bg-white text-[9px] font-black text-[#e3000f]">SCG</span>
              เข้าสู่ระบบด้วยบัญชี SCG
            </button>
            <button type="button" onClick={onSecondary} className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-[#b8d2e3] bg-white text-[15px] font-semibold text-[#092943] transition-colors hover:bg-[#f8fafc]">
              <span className="rounded bg-[#0072b8] px-1.5 text-xs font-black text-white">CPAC</span>
              เข้าสู่ระบบด้วยบัญชีคู่ธุรกิจ
            </button>
          </div>
          <p className="mt-5 inline-flex items-center gap-1 text-xs text-[#7890a1]"><ShieldCheck className="size-3.5" />เชื่อมต่ออย่างปลอดภัย</p>
        </div>
        <p className="mt-6 text-center text-xs text-[#7890a1]">© SCG · CPAC</p>
      </div>
    </div>
  );
}
