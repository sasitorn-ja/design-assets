import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { projectSections } from "@/lib/projects";
import type { Project } from "@/lib/types";

// หัวหน้าของทุกหน้าในโปรเจค + แท็บหัวข้อย่อย
export function ProjectHeader({ project, section, title, description, children }: { project: Project; section: string; title?: string; description?: ReactNode; children?: ReactNode }) {
  const base = `/projects/${project.slug}`;
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
        <span className="size-2.5 rounded-full" style={{ background: project.brand.primary }} />
        <Link href={base} className="hover:text-zinc-900">{project.title}</Link>
        <span>/</span>
        <span className="text-zinc-900">{projectSections.find((s) => s.href === section)?.label}</span>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{title ?? project.title}</h1>
        <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50">
          เปิดเว็บจริง <ExternalLink className="size-3.5" />
        </a>
      </div>
      {description && <p className="mt-2 max-w-3xl text-[15px] leading-7 text-zinc-600">{description}</p>}
      <nav className="mt-6 flex gap-1 overflow-x-auto border-b">
        {projectSections.map((s) => (
          <Link
            key={s.href}
            href={base + s.href}
            className={cn(
              "-mb-px shrink-0 border-b-2 px-3 pb-2 text-sm transition-colors",
              s.href === section ? "border-zinc-900 font-medium text-zinc-900" : "border-transparent text-zinc-500 hover:text-zinc-900",
            )}
          >
            {s.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}

export function Section({ id, title, description, children }: { id?: string; title: string; description?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-20">
      <h2 className="text-xl font-bold">{title}</h2>
      {description && <p className="mt-1 text-sm leading-6 text-zinc-600">{description}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function SpecTable({ rows, cols = ["ชื่อ", "ค่า", "ใช้กับ"] }: { rows: { name: string; value: string; usage: string }[]; cols?: [string, string, string] | string[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs text-zinc-500">
          <tr>
            {cols.map((c) => (
              <th key={c} className="px-3 py-2 font-medium">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name + r.value} className="border-t">
              <td className="px-3 py-2 font-medium">{r.name}</td>
              <td className="px-3 py-2 font-mono text-[12.5px] text-zinc-700">{r.value}</td>
              <td className="px-3 py-2 text-zinc-600">{r.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
