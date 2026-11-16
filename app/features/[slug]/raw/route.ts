import { featureGuides, getFeatureGuide } from "@/lib/feature-guides";
import { readFeatureGuide } from "@/lib/feature-guide-files";

export function generateStaticParams() {
  return featureGuides.map((g) => ({ slug: g.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const guide = getFeatureGuide((await params).slug);
  if (!guide) return new Response("Not found", { status: 404 });
  return new Response(await readFeatureGuide(guide), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${guide.file}"`,
    },
  });
}
