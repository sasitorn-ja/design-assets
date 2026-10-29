import { readFile } from "node:fs/promises";
import path from "node:path";
import { projects } from "@/lib/projects";

// shadcn registry: npx shadcn@latest add http://localhost:4000/r/<slug>-<component>.json
// และ http://localhost:4000/r/<slug>-theme.json สำหรับธีมสี
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name.replace(/\.json$/, "");

  for (const project of projects) {
    if (name === `${project.slug}-theme`) {
      return Response.json({
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name,
        type: "registry:theme",
        title: `${project.title} theme`,
        description: `ธีมสีของ ${project.title}`,
        cssVars: { light: project.cssVars },
      });
    }

    const entry = project.components.find((c) => name === `${project.slug}-${c.id}`);
    if (entry) {
      const content = await readFile(path.join(process.cwd(), "registry", project.slug, "components", entry.file), "utf8");
      return Response.json({
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name,
        type: "registry:component",
        title: `${entry.name} (${project.title})`,
        description: entry.description,
        dependencies: entry.dependencies ?? [],
        registryDependencies: ["utils"],
        files: [
          {
            path: `registry/${project.slug}/${entry.file}`,
            type: "registry:component",
            target: `components/${project.slug}/${entry.file}`,
            content,
          },
        ],
      });
    }
  }

  return Response.json({ error: "ไม่พบรายการนี้" }, { status: 404 });
}
