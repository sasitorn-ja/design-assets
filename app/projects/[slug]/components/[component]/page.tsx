import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, projects } from "@/lib/projects";
import { readComponentSource } from "@/lib/files";
import { varsToStyle } from "@/lib/tokens";
import { ProjectHeader, Section } from "@/components/docs/page-header";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";

export function generateStaticParams() {
  return projects.flatMap((p) => p.components.map((c) => ({ slug: p.slug, component: c.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; component: string }> }) {
  const { slug, component } = await params;
  const p = getProject(slug);
  const c = p?.components.find((x) => x.id === component);
  return { title: `${c?.name} · ${p?.title}` };
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string; component: string }> }) {
  const { slug, component } = await params;
  const project = getProject(slug);
  const entry = project?.components.find((c) => c.id === component);
  if (!project || !entry) notFound();

  const source = await readComponentSource(slug, entry.file);
  const idx = project.components.indexOf(entry);
  const prev = project.components[idx - 1];
  const next = project.components[idx + 1];
  const deps = ["clsx", "tailwind-merge", ...(entry.dependencies ?? [])];
  const target = `components/${slug}/${entry.file}`;

  return (
    <div className="max-w-5xl">
      <ProjectHeader project={project} section="/components" title={entry.name} description={entry.description} />

      <ComponentPreview
        slug={slug}
        id={entry.id}
        frameStyle={{ ...varsToStyle(project.cssVars), fontFamily: project.fontFamily, background: project.previewBackground, color: project.cssVars.foreground, fontSize: 14 }}
        code={<CodeBlock code={source} title={target} />}
      />

      <div className="mt-12">
        <Section title="ติดตั้ง">
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-semibold">วิธีที่ 1: ใช้ shadcn CLI (แนะนำ)</h3>
              <p className="mb-2 text-sm text-zinc-600">เปิดเว็บนี้ไว้ (<code className="rounded bg-zinc-100 px-1">npm run dev</code>) แล้วรันในโปรเจคของคุณ ไฟล์จะไปอยู่ที่ <code className="rounded bg-zinc-100 px-1">{target}</code></p>
              <CodeBlock code={`npx shadcn@latest add http://localhost:4000/r/${slug}-${entry.id}.json`} lang="bash" title="terminal" />
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold">วิธีที่ 2: ก๊อปเอง</h3>
              <ol className="list-decimal space-y-1.5 pl-5 text-sm text-zinc-700">
                <li>ติดตั้ง package: <code className="rounded bg-zinc-100 px-1">npm i {deps.join(" ")}</code></li>
                <li>มีไฟล์ <code className="rounded bg-zinc-100 px-1">lib/utils.ts</code> ที่ export ฟังก์ชัน <code className="rounded bg-zinc-100 px-1">cn</code> (โปรเจค shadcn มีอยู่แล้ว)</li>
                <li>กดแท็บ Code ด้านบน → คัดลอก → วางเป็นไฟล์ <code className="rounded bg-zinc-100 px-1">{target}</code></li>
                <li>ถ้า component ใช้ class เช่น <code className="rounded bg-zinc-100 px-1">bg-primary</code> ให้ก๊อปธีมจากหน้า <Link className="text-blue-600 hover:underline" href={`/projects/${slug}/foundations#f-6`}>Foundations</Link> ไปด้วย</li>
              </ol>
            </div>
          </div>
        </Section>

        <Section title="ที่มา">
          <p className="text-sm text-zinc-600">
            ดัดแปลงจาก <code className="rounded bg-zinc-100 px-1">{project.repo}/{entry.origin}</code> ให้ใช้แยกได้โดยไม่ต้องพึ่งโค้ดอื่นของโปรเจค
          </p>
        </Section>
      </div>

      <div className="mt-10 flex justify-between border-t pt-6 text-sm">
        {prev ? (
          <Link href={`/projects/${slug}/components/${prev.id}`} className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 hover:bg-zinc-50"><ArrowLeft className="size-4" />{prev.name}</Link>
        ) : <span />}
        {next && (
          <Link href={`/projects/${slug}/components/${next.id}`} className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 hover:bg-zinc-50">{next.name}<ArrowRight className="size-4" /></Link>
        )}
      </div>
    </div>
  );
}
