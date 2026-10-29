import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getProject, projects } from "@/lib/projects";
import { ProjectHeader } from "@/components/docs/page-header";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  return { title: `Components · ${p?.title}` };
}

export default async function ComponentsIndex({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <div className="max-w-5xl">
      <ProjectHeader project={project} section="/components" title="Components" description="ชิ้นส่วน UI ที่ดึงจากโค้ดจริงของโปรเจค ทำให้ใช้แยกได้ ทุกชิ้นมีตัวอย่าง โค้ด และคำสั่งติดตั้ง" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {project.components.map((c) => (
          <Link key={c.id} href={`/projects/${project.slug}/components/${c.id}`} className="group flex flex-col rounded-lg border p-4 transition-colors hover:bg-zinc-50">
            <p className="flex items-center justify-between font-medium">
              {c.name}
              <ArrowRight className="size-4 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
            </p>
            <p className="mt-1 flex-1 text-sm text-zinc-500">{c.description}</p>
            <p className="mt-3 truncate font-mono text-[11px] text-zinc-400">{c.file}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
