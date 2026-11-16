import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Download } from "lucide-react";
import { featureGuides, getFeatureGuide } from "@/lib/feature-guides";
import { renderFeatureGuide } from "@/lib/feature-guide-files";

export function generateStaticParams() {
  return featureGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const g = getFeatureGuide((await params).slug);
  return { title: g?.title ?? "คู่มือฟีเจอร์" };
}

export default async function FeatureGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getFeatureGuide((await params).slug);
  if (!guide) notFound();
  const html = await renderFeatureGuide(guide);

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/features" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900">
          <ChevronLeft className="size-4" /> คู่มือฟีเจอร์ทั้งหมด
        </Link>
        <a href={`/features/${guide.slug}/raw`} className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-zinc-50">
          <Download className="size-4" /> ดาวน์โหลด .md
        </a>
      </div>
      <article className="md-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
