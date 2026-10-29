import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { varsToCss, themeInlineCss } from "@/lib/tokens";
import { ProjectHeader, Section, SpecTable } from "@/components/docs/page-header";
import { Swatch } from "@/components/docs/swatch";
import { CodeBlock } from "@/components/docs/code-block";
import { ProjectFrame } from "@/components/docs/project-frame";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  return { title: `Foundations · ${p?.title}` };
}

function parsePx(size: string) {
  const m = size.match(/(\d+(?:\.\d+)?)px/);
  return m ? Math.min(Number(m[1]), 34) : 14;
}

export default async function Foundations({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <div className="max-w-5xl">
      <ProjectHeader project={project} section="/foundations" title="Foundations" description="สี ฟอนต์ ระยะห่าง ความโค้ง และเงา ที่ใช้ในโปรเจคนี้ กดที่สีเพื่อคัดลอกค่าได้" />

      <nav className="mb-10 flex flex-wrap gap-2 text-sm">
        {["สี", "ตัวอักษร", "ระยะห่าง", "ความโค้ง", "เงา", "Layout", "ก๊อปธีม"].map((t, i) => (
          <a key={t} href={`#f-${i}`} className="rounded-full border px-3 py-1 text-zinc-600 hover:bg-zinc-50">{t}</a>
        ))}
      </nav>

      <Section id="f-0" title="สี (Colors)">
        <div className="space-y-8">
          {project.colors.map((g) => (
            <div key={g.title}>
              <h3 className="font-semibold">{g.title}</h3>
              {g.description && <p className="mt-0.5 text-sm text-zinc-500">{g.description}</p>}
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {g.tokens.map((t) => <Swatch key={t.name + t.value} {...t} />)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="f-1" title="ตัวอักษร (Typography)" description={project.typography.fontNote}>
        <ProjectFrame project={project} className="overflow-hidden rounded-lg border bg-white">
          {project.typography.rows.map((r) => (
            <div key={r.name} className="grid items-baseline gap-2 border-b px-4 py-3 last:border-b-0 sm:grid-cols-[1fr_200px]">
              <p className="truncate" style={{ fontSize: parsePx(r.size), fontWeight: Number(r.weight.split(/[–-]/)[0]) || 400 }}>
                {r.name} — ภาษาไทยอ่านง่าย 1,234.5
              </p>
              <p className="font-mono text-xs text-zinc-500" style={{ fontFamily: "ui-monospace, monospace" }}>
                {r.size} / {r.weight} · {r.usage}
              </p>
            </div>
          ))}
        </ProjectFrame>
      </Section>

      <Section id="f-2" title="ระยะห่าง (Spacing)">
        <SpecTable rows={project.spacing} />
      </Section>

      <Section id="f-3" title="ความโค้งมุม (Radius)">
        <div className="mb-4 flex flex-wrap gap-4">
          {project.radius.map((r) => {
            const px = r.value.match(/(\d+)px/)?.[1] ?? (r.value.includes("9999") || r.value.includes("999") ? "999" : "8");
            return (
              <div key={r.name} className="text-center">
                <div className="size-20 border-2 border-zinc-300 bg-zinc-50" style={{ borderRadius: Number(px) }} />
                <p className="mt-1.5 text-xs font-medium">{r.name}</p>
                <p className="font-mono text-[11px] text-zinc-500">{r.value}</p>
              </div>
            );
          })}
        </div>
        <SpecTable rows={project.radius} />
      </Section>

      <Section id="f-4" title="เงา (Shadow)">
        <div className="mb-4 grid gap-4 rounded-lg bg-zinc-50 p-6 sm:grid-cols-3">
          {project.shadows.map((s) => (
            <div key={s.name} className="rounded-lg bg-white p-4 text-sm" style={{ boxShadow: s.value.includes("rgba") || s.value.includes("rgb") ? s.value : undefined }}>
              <p className="font-medium">{s.name}</p>
              <p className="mt-1 font-mono text-[11px] text-zinc-500">{s.value}</p>
            </div>
          ))}
        </div>
        <SpecTable rows={project.shadows} />
      </Section>

      <Section id="f-5" title="Layout">
        <SpecTable rows={project.layout} />
      </Section>

      <Section
        id="f-6"
        title="ก๊อปธีมไปใช้"
        description="วางในไฟล์ globals.css ของโปรเจคคุณ (Tailwind v4 + shadcn) แล้ว class เช่น bg-primary, text-muted-foreground, border-border จะเป็นสีของโปรเจคนี้ทันที"
      >
        <div className="space-y-4">
          <CodeBlock code={varsToCss(project.cssVars)} lang="css" title="globals.css — ตัวแปรสี" />
          <CodeBlock code={themeInlineCss(project.cssVars)} lang="css" title="globals.css — ผูกกับ Tailwind v4" />
          <CodeBlock code={`npx shadcn@latest add http://localhost:4000/r/${project.slug}-theme.json`} lang="bash" title="หรือติดตั้งผ่าน shadcn CLI" />
        </div>
      </Section>
    </div>
  );
}
