import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, FileText } from "lucide-react";
import { getProject, projects, projectSections } from "@/lib/projects";
import { getScreenshots, shotUrl } from "@/lib/files";
import { ProjectHeader, Section } from "@/components/docs/page-header";
import { Screenshot } from "@/components/docs/screenshot";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  return { title: p?.title };
}

export default async function ProjectOverview({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { pages } = await getScreenshots(project.slug);
  const hero = pages[0];
  const heroMobile = pages.find((p) => p.mobile);

  return (
    <div className="max-w-5xl">
      <ProjectHeader project={project} section="" description={project.summary} />

      {hero && (
        <div className="mb-10 grid gap-4 md:grid-cols-[1fr_180px]">
          <Screenshot src={shotUrl(project.slug, hero.desktop!)} alt={hero.label} caption={`${hero.label} (Desktop)`} href={hero.url} />
          {heroMobile?.mobile && <Screenshot src={shotUrl(project.slug, heroMobile.mobile)} alt={heroMobile.label} caption="มือถือ" mobile className="hidden md:block" />}
        </div>
      )}

      <div className="mb-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-5">
          <h3 className="mb-3 font-semibold">โทนและบุคลิก</h3>
          <ul className="space-y-2 text-sm text-zinc-700">
            {project.tone.map((t) => (
              <li key={t} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border p-5">
          <h3 className="mb-3 font-semibold">เหมาะกับงานแบบไหน</h3>
          <ul className="space-y-2 text-sm text-zinc-700">
            {project.useWhen.map((t) => (
              <li key={t} className="flex gap-2"><ArrowRight className="mt-0.5 size-4 shrink-0 text-zinc-400" />{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <Section title="ข้อมูลโปรเจค">
        <dl className="grid gap-x-8 gap-y-3 rounded-lg border p-5 text-sm sm:grid-cols-[160px_1fr]">
          <dt className="text-zinc-500">Repo</dt>
          <dd className="font-mono text-[13px]">{project.repo}</dd>
          <dt className="text-zinc-500">เว็บจริง</dt>
          <dd><a className="text-blue-600 hover:underline" href={project.url} target="_blank" rel="noreferrer">{project.url}</a></dd>
          <dt className="text-zinc-500">Stack</dt>
          <dd className="flex flex-wrap gap-1.5">{project.stack.map((s) => <span key={s} className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs">{s}</span>)}</dd>
          <dt className="text-zinc-500">แบบเมนู</dt>
          <dd>{project.menu.type}</dd>
          <dt className="text-zinc-500">สีหลัก</dt>
          <dd className="flex items-center gap-2"><span className="size-4 rounded border" style={{ background: project.brand.primary }} /><span className="font-mono text-[13px]">{project.brand.primary}</span></dd>
          <dt className="text-zinc-500">Design doc ใน repo</dt>
          <dd className="flex flex-wrap gap-1.5">{project.designDocs.map((d) => <span key={d} className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-xs"><FileText className="size-3" />{d}</span>)}</dd>
        </dl>
      </Section>

      <Section title="ดูต่อ">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projectSections.slice(1).map((s) => (
            <Link key={s.href} href={`/projects/${project.slug}${s.href}`} className="group rounded-lg border p-4 transition-colors hover:bg-zinc-50">
              <p className="flex items-center justify-between font-medium">{s.label}<ArrowRight className="size-4 text-zinc-400 transition-transform group-hover:translate-x-0.5" /></p>
              <p className="mt-1 text-xs text-zinc-500">
                {s.href === "/foundations" && "สี ฟอนต์ ระยะห่าง ความโค้ง เงา"}
                {s.href === "/navigation" && `${project.menu.type} พร้อมตัวอย่างกดได้`}
                {s.href === "/screens" && `ภาพหน้าจอจริง ${pages.length} หน้า`}
                {s.href === "/components" && `${project.components.length} components พร้อมโค้ด`}
                {s.href === "/guidelines" && "ข้อควรทำ ข้อห้าม และ checklist"}
              </p>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
