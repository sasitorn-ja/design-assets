import type { ReactNode } from "react";

// แบนเนอร์หัวหน้า: ภาพพื้นหลัง (ถ้ามี) + gradient น้ำเงินเข้ม + เส้น accent ด้านล่างซ้าย
export function PageHeading({ title, description, image, actions }: { title: string; description?: string; image?: string; actions?: ReactNode }) {
  return (
    <div className="page-heading relative isolate overflow-hidden rounded-2xl bg-slate-950 text-white shadow-[0_10px_30px_-16px_rgba(18,58,100,0.63)]">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_58%]" />
      ) : (
        // ไม่มีภาพ: ใช้ลายเส้นแทนให้ยังดูมีมิติ
        <div className="absolute inset-0 -z-20 bg-[repeating-linear-gradient(115deg,#1e3a5f_0_2px,transparent_2px_22px)] opacity-60" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071c39]/95 via-[#0b2e55]/85 to-[#0b2e55]/60" />
      <div className="flex flex-wrap items-center justify-between gap-4 px-7 py-6">
        <div className="min-w-0">
          <h1 className="text-[28px] font-bold leading-tight">{title}</h1>
          {description ? <p className="mt-1.5 text-sm text-white/80">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
      <span className="absolute bottom-0 left-3 h-[3px] w-32 rounded-full bg-sky-400" />
    </div>
  );
}
