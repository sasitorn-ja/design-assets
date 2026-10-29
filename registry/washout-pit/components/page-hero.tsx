// แบนเนอร์หัวหน้า: ภาพเต็มกว้าง (หรือ gradient ฟ้า) + การ์ดขาวทางซ้ายที่มีแถบฟ้าแนวตั้ง
export function PageHero({ title, description, image }: { title: string; description?: string; image?: string }) {
  return (
    <section
      className="relative overflow-hidden rounded-lg border border-[#cfeaf5] bg-cover bg-right"
      style={{ backgroundImage: image ? `url("${image}")` : "linear-gradient(100deg,#eaf6ff 0%,#d4ecfb 45%,#9fd4f3 100%)" }}
    >
      <div className="flex min-h-[150px] items-center p-6 md:p-8">
        <div className="relative max-w-[700px] rounded-2xl bg-white/90 py-4 pl-9 pr-6 shadow-[0_8px_24px_rgba(16,24,40,0.08)] backdrop-blur">
          <span className="absolute left-4 top-4 bottom-4 w-1.5 rounded-full bg-[#0284c7]" />
          <h1 className="text-[26px] font-bold leading-tight text-[#111827] md:text-[30px]">{title}</h1>
          {description ? <p className="mt-1.5 text-sm text-[#53738b]">{description}</p> : null}
        </div>
      </div>
    </section>
  );
}
