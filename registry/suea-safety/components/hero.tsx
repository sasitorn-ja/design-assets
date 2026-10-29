import type { ReactNode } from "react";

// Hero: ภาพพื้นหลัง (ทับฟ้าอ่อนบางๆ) + การ์ดแก้วโปร่ง + พื้นที่มาสคอตด้านขวา
export function Hero({ image, eyebrow, title, description, left, mascot }: { image?: string; eyebrow: string; title: string; description: string; left?: ReactNode; mascot?: ReactNode }) {
  return (
    <section
      className="relative min-h-[212px] overflow-hidden rounded-[18px] border border-[rgba(215,234,254,.72)] bg-cover bg-center text-[#0B2F6B] lg:min-h-[280px]"
      style={{
        backgroundImage: image
          ? `linear-gradient(rgba(226,241,255,.26), rgba(226,241,255,.26)), url("${image}")`
          : "linear-gradient(160deg,#cfe7ff 0%,#eaf5ff 45%,#b9dcff 100%)",
      }}
    >
      <div className="relative grid gap-4 p-4 md:grid-cols-[minmax(0,320px)_1fr_auto] md:items-center md:p-6">
        <div>{left}</div>
        <div className="max-w-sm rounded-2xl border border-white/70 bg-white/55 p-5 shadow-[0_8px_22px_rgba(14,62,125,0.08)] backdrop-blur-md md:justify-self-end">
          <p className="text-[11px] font-bold tracking-[0.12em] text-[#0B82F0]">{eyebrow}</p>
          <h2 className="mt-1 text-[24px] font-extrabold leading-tight">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#3b5b86]">{description}</p>
        </div>
        {mascot ? <div className="hidden md:block">{mascot}</div> : null}
      </div>
    </section>
  );
}
