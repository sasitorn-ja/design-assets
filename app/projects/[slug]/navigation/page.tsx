import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getProject, projects } from "@/lib/projects";
import { getScreenshots, shotUrl } from "@/lib/files";
import { ProjectHeader, Section, SpecTable } from "@/components/docs/page-header";
import { Screenshot } from "@/components/docs/screenshot";
import { LucideIcon } from "@/components/docs/lucide-icon";
import { DemoFrame } from "@/components/docs/demo-frame";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  return { title: `เมนูและ Layout · ${p?.title}` };
}

export default async function Navigation({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { pages } = await getScreenshots(project.slug);
  const menuShots = pages.filter((p) => p.id.startsWith("menu-"));
  const first = pages.find((p) => !p.id.startsWith("menu-"));
  const mobile = pages.find((p) => p.mobile);
  const demoId = project.menu.demoComponentId;

  return (
    <div className="max-w-5xl">
      <ProjectHeader project={project} section="/navigation" title="เมนูและ Layout" description={project.menu.description} />

      <div className="mb-10 inline-flex items-center gap-2 rounded-full border bg-zinc-50 px-3 py-1 text-sm">
        แบบเมนู: <span className="font-semibold">{project.menu.type}</span>
      </div>

      {demoId && (
        <Section title="ลองกดเมนู" description="ตัวอย่างนี้สร้างใหม่จากโค้ดจริงของโปรเจค กดเปลี่ยนเมนู ย่อ/ขยายได้">
          <DemoFrame slug={project.slug} id={demoId} />
          <Link href={`/projects/${project.slug}/components/${demoId}`} className="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
            ดูโค้ดและวิธีติดตั้ง <ArrowRight className="size-3.5" />
          </Link>
        </Section>
      )}

      <Section title="ภาพเมนูบนเว็บจริง">
        <div className="grid gap-4 md:grid-cols-[1fr_200px]">
          <div className="space-y-4">
            {first && <Screenshot src={shotUrl(project.slug, first.desktop!)} alt={first.label} caption={`Desktop — ${first.label}`} href={first.url} />}
            {menuShots.map((m) => (
              <Screenshot key={m.id} src={shotUrl(project.slug, m.desktop!)} alt={m.label} caption={m.label} />
            ))}
          </div>
          {mobile?.mobile && <Screenshot src={shotUrl(project.slug, mobile.mobile)} alt={mobile.label} caption={`มือถือ — ${mobile.label}`} mobile />}
        </div>
      </Section>

      <Section title="โครงสร้างเมนู" description="รายการเมนูทั้งหมดและ icon (จาก lucide-react) ที่ใช้">
        <div className="grid gap-4 md:grid-cols-2">
          {project.menu.groups.map((g) => (
            <div key={g.title} className="rounded-lg border">
              <p className="border-b bg-zinc-50 px-4 py-2 text-sm font-semibold">{g.title}</p>
              <ul className="divide-y">
                {g.items.map((i) => (
                  <li key={i.label} className="flex items-center gap-3 px-4 py-2 text-sm">
                    <span className="flex size-7 items-center justify-center rounded-md bg-zinc-100 text-zinc-600">
                      <LucideIcon name={i.icon} className="size-4" />
                    </span>
                    <span className="flex-1">{i.label}</span>
                    {i.icon && <span className="font-mono text-[11px] text-zinc-400">{i.icon}</span>}
                    {i.note && <span className="text-xs text-zinc-500">{i.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {project.menu.notes && (
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-600">
            {project.menu.notes.map((n) => <li key={n}>{n}</li>)}
          </ul>
        )}
      </Section>

      <Section title="ขนาดและสถานะของเมนู">
        <SpecTable rows={project.menu.specs} />
      </Section>
    </div>
  );
}
