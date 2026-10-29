import Link from "next/link";
import { projects } from "@/lib/projects";
import { getScreenshots, shotUrl } from "@/lib/files";

export const metadata = { title: "เปรียบเทียบโปรเจค" };

export default async function Compare() {
  const shots = await Promise.all(projects.map((p) => getScreenshots(p.slug)));

  const rows: { label: string; render: (i: number) => React.ReactNode }[] = [
    {
      label: "สีหลัก",
      render: (i) => (
        <span className="flex items-center gap-2">
          <span className="size-5 rounded border" style={{ background: projects[i].brand.primary }} />
          <span className="font-mono text-xs">{projects[i].brand.primary}</span>
        </span>
      ),
    },
    {
      label: "พื้นหลัง / ตัวอักษร",
      render: (i) => (
        <span className="flex items-center gap-1.5">
          <span className="size-5 rounded border" style={{ background: projects[i].brand.surface }} />
          <span className="size-5 rounded border" style={{ background: projects[i].brand.ink }} />
        </span>
      ),
    },
    { label: "แบบเมนู", render: (i) => projects[i].menu.type },
    { label: "ฟอนต์", render: (i) => (projects[i].fontFamily.includes("plex") ? "IBM Plex Sans Thai" : "Sarabun") },
    { label: "มุมการ์ด", render: (i) => projects[i].radius.find((r) => /card|panel|surface/i.test(r.name))?.value ?? projects[i].cssVars.radius },
    { label: "โทน", render: (i) => projects[i].tone[0] },
    { label: "เหมาะกับ", render: (i) => projects[i].useWhen[0] },
    { label: "Stack", render: (i) => projects[i].stack.slice(0, 3).join(", ") },
    { label: "Components", render: (i) => `${projects[i].components.length} ชิ้น` },
  ];

  return (
    <div className="max-w-[1200px]">
      <h1 className="text-3xl font-bold tracking-tight">เปรียบเทียบ {projects.length} โปรเจค</h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-7 text-zinc-600">ดูภาพรวมว่าแต่ละโปรเจคใช้สี เมนู และโทนแบบไหน เพื่อเลือกต้นแบบที่ใกล้กับงานของคุณที่สุด</p>

      <div className="mt-8 overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[1100px] text-sm">
          <thead>
            <tr className="bg-zinc-50">
              <th className="sticky left-0 w-36 bg-zinc-50 px-3 py-3 text-left text-xs font-medium text-zinc-500" />
              {projects.map((p, i) => (
                <th key={p.slug} className="px-3 py-3 text-left align-top">
                  <Link href={`/projects/${p.slug}`} className="group block">
                    {shots[i].pages[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={shotUrl(p.slug, shots[i].pages[0].desktop!)} alt="" className="mb-2 aspect-[16/10] w-full rounded-md border object-cover object-left-top" />
                    ) : null}
                    <span className="font-semibold group-hover:underline">{p.title}</span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t">
                <td className="sticky left-0 bg-white px-3 py-3 text-xs font-medium text-zinc-500">{row.label}</td>
                {projects.map((p, i) => (
                  <td key={p.slug} className="px-3 py-3 align-top text-[13px] text-zinc-700">{row.render(i)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-bold">เลือกต้นแบบตามงาน</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {[
          { need: "Dashboard วิเคราะห์ ตัวเลข + ตารางเยอะ อ่านง่าย", pick: ["nong-wang-jai", "pricing-monitor"] },
          { need: "ระบบกรอกข้อมูลแบบ spreadsheet หลายบทบาท", pick: ["rmc-salesupport"] },
          { need: "งานปฏิบัติการหน้างาน ใช้บนมือถือ (สแกน, ยืนยัน)", pick: ["stock", "suea-safety"] },
          { need: "แอปที่อยากให้คนเข้ามาทุกวัน (gamification)", pick: ["suea-safety"] },
          { need: "Portal สำหรับคู่ค้า/ร้านค้า + สลับ role", pick: ["cpac-dealer"] },
          { need: "ฟอร์มขออนุมัติหลายขั้นตอน + Dashboard สรุป", pick: ["washout-pit"] },
          { need: "ต้องมี dark mode", pick: ["pricing-monitor"] },
        ].map((x) => (
          <div key={x.need} className="rounded-lg border p-4">
            <p className="text-sm font-medium">{x.need}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {x.pick.map((s) => {
                const p = projects.find((pp) => pp.slug === s)!;
                return (
                  <Link key={s} href={`/projects/${s}`} className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs hover:bg-zinc-50">
                    <span className="size-2 rounded-full" style={{ background: p.brand.primary }} />
                    {p.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
