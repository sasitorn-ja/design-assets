import Link from "next/link";
import { ArrowRight, BookOpen, Columns3, Copy, Image as ImageIcon, LayoutGrid, Palette } from "lucide-react";
import { projects } from "@/lib/projects";
import { getScreenshots, shotUrl } from "@/lib/files";

export default async function Home() {
  const shots = await Promise.all(projects.map((p) => getScreenshots(p.slug)));

  return (
    <div className="max-w-6xl">
      <section className="mb-12">
        <p className="mb-2 text-sm font-medium text-zinc-500">UI/UX Design ของทีม</p>
        <h1 className="text-4xl font-bold tracking-tight">Design Assets</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-zinc-600">
          รวม design ของทุกโปรเจคไว้ที่เดียว เลือกโปรเจคที่ชอบ แล้วหยิบสี ฟอนต์ เมนู หรือ component ไปใช้ในงานของคุณได้เลย
          ใช้สอนน้องใหม่ และใช้เป็นมาตรฐานเวลาเริ่มโปรเจคใหม่
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/guide" className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
            วิธีนำไปใช้ <ArrowRight className="size-4" />
          </Link>
          <Link href="/compare" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-zinc-50">
            <Columns3 className="size-4" /> เปรียบเทียบโปรเจค
          </Link>
        </div>
      </section>

      <section className="mb-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Palette, title: "Foundations", text: "สี ฟอนต์ ระยะห่าง กดคัดลอกค่าได้" },
          { icon: LayoutGrid, title: "เมนูและ Layout", text: "เมนูแต่ละแบบ ลองกดได้จริง" },
          { icon: ImageIcon, title: "หน้าจอจริง", text: "ภาพทุกเมนูจากเว็บจริง desktop + มือถือ" },
          { icon: Copy, title: "Components", text: "โค้ดพร้อมก๊อป หรือติดตั้งด้วย shadcn CLI" },
        ].map((f) => (
          <div key={f.title} className="rounded-lg border p-4">
            <f.icon className="mb-2 size-5 text-zinc-500" />
            <p className="font-medium">{f.title}</p>
            <p className="mt-0.5 text-sm text-zinc-500">{f.text}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">โปรเจคทั้งหมด</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const hero = shots[i].pages[0];
            return (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="group overflow-hidden rounded-xl border transition-shadow hover:shadow-lg">
                <div className="aspect-[16/10] overflow-hidden border-b bg-zinc-50">
                  {hero ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={shotUrl(p.slug, hero.desktop!)} alt={p.title} className="h-full w-full object-cover object-left-top transition-transform duration-300 group-hover:scale-[1.02]" />
                  ) : (
                    <div className="flex h-full items-center justify-center" style={{ background: p.brand.surface }}>
                      <span className="text-2xl font-bold" style={{ color: p.brand.primary }}>{p.title}</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full" style={{ background: p.brand.primary }} />
                    <p className="font-semibold">{p.title}</p>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-500">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="rounded-md bg-zinc-100 px-2 py-0.5">{p.menu.type}</span>
                    <span className="rounded-md bg-zinc-100 px-2 py-0.5">{p.components.length} components</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-14 rounded-xl border bg-zinc-50 p-6">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-0.5 size-5 text-zinc-500" />
          <div className="text-sm leading-6 text-zinc-600">
            <p className="font-medium text-zinc-900">สำหรับน้องใหม่</p>
            เริ่มจากหน้า <Link className="text-blue-600 hover:underline" href="/compare">เปรียบเทียบโปรเจค</Link> เพื่อดูภาพรวมว่าแต่ละโปรเจคต่างกันยังไง
            แล้วเข้าไปที่โปรเจคที่จะทำงานด้วย อ่าน <b>กติกาและ Do/Don&apos;t</b> ก่อนเริ่มเขียนหน้าใหม่
          </div>
        </div>
      </section>
    </div>
  );
}
