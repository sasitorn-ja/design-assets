import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { getScreenshots, shotUrl } from "@/lib/files";
import { ProjectHeader } from "@/components/docs/page-header";
import { Screenshot } from "@/components/docs/screenshot";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  return { title: `หน้าจอจริง · ${p?.title}` };
}

export default async function Screens({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { pages, capturedAt } = await getScreenshots(project.slug);
  const date = capturedAt ? new Date(capturedAt).toLocaleDateString("th-TH", { dateStyle: "long" }) : null;

  return (
    <div className="max-w-6xl">
      <ProjectHeader
        project={project}
        section="/screens"
        title="หน้าจอจริง"
        description={
          <>
            ภาพจากเว็บจริงทุกเมนู กดที่ภาพเพื่อดูขนาดเต็ม {date && <span className="text-zinc-400">· เก็บภาพเมื่อ {date}</span>}
            <br />
            <span className="text-sm text-amber-700">ภาพมีข้อมูลจริงของบริษัท ใช้ภายในทีมเท่านั้น</span>
          </>
        }
      />

      {pages.length === 0 ? (
        <p className="rounded-lg border border-dashed p-10 text-center text-sm text-zinc-500">
          ยังไม่มีภาพ รัน <code className="rounded bg-zinc-100 px-1">npm run browser</code> แล้ว <code className="rounded bg-zinc-100 px-1">npm run capture {project.slug}</code>
        </p>
      ) : (
        <div className="space-y-12">
          {pages.map((p) => (
            <section key={p.id} className="scroll-mt-20" id={p.id}>
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <h2 className="text-lg font-semibold">{p.label}</h2>
                <a href={p.url} target="_blank" rel="noreferrer" className="truncate font-mono text-xs text-zinc-400 hover:text-zinc-700">{p.url.replace(/^https?:\/\//, "")}</a>
              </div>
              <div className={!p.desktop ? "max-w-[220px]" : p.mobile ? "grid gap-4 md:grid-cols-[1fr_200px]" : ""}>
                {p.desktop && <Screenshot src={shotUrl(project.slug, p.desktop)} alt={`${p.label} desktop`} />}
                {p.mobile && <Screenshot src={shotUrl(project.slug, p.mobile)} alt={`${p.label} mobile`} mobile />}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
