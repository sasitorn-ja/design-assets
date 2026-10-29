import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import { getProject, projects } from "@/lib/projects";
import { ProjectHeader, Section } from "@/components/docs/page-header";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  return { title: `กติกา · ${p?.title}` };
}

export default async function Guidelines({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const g = project.guidelines;

  return (
    <div className="max-w-5xl">
      <ProjectHeader project={project} section="/guidelines" title="กติกาและ Do/Don't" description="สรุปจาก design doc ใน repo ใช้สอนน้องใหม่ และใช้ตรวจงานก่อนส่ง" />

      <div className="mb-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-5">
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-emerald-800"><Check className="size-4" /> ควรทำ</h3>
          <ul className="space-y-2.5 text-sm text-zinc-700">
            {g.do.map((t) => <li key={t} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />{t}</li>)}
          </ul>
        </div>
        <div className="rounded-lg border border-rose-200 bg-rose-50/40 p-5">
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-rose-800"><X className="size-4" /> ไม่ควรทำ</h3>
          <ul className="space-y-2.5 text-sm text-zinc-700">
            {g.dont.map((t) => <li key={t} className="flex gap-2"><X className="mt-0.5 size-4 shrink-0 text-rose-600" />{t}</li>)}
          </ul>
        </div>
      </div>

      {g.sections?.map((s) => (
        <Section key={s.title} title={s.title}>
          <ul className="divide-y rounded-lg border text-sm">
            {s.items.map((i) => <li key={i} className="px-4 py-2.5 text-zinc-700">{i}</li>)}
          </ul>
        </Section>
      ))}
    </div>
  );
}
