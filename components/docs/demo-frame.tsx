import { getProject } from "@/lib/projects";
import { varsToStyle } from "@/lib/tokens";
import { DemoRender } from "./demo-render";

// แสดง demo ของ component ในธีมของโปรเจค (ไม่มีแท็บ code)
export function DemoFrame({ slug, id }: { slug: string; id: string }) {
  const project = getProject(slug)!;
  return (
    <div
      className="flex min-h-[260px] items-center justify-center overflow-x-auto rounded-lg border p-6"
      style={{ ...varsToStyle(project.cssVars), fontFamily: project.fontFamily, background: project.previewBackground, color: project.cssVars.foreground, fontSize: 14 }}
    >
      <DemoRender slug={slug} id={id} />
    </div>
  );
}
