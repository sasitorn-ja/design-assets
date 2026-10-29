"use client";

import { demoRegistry } from "@/lib/demos";

export function DemoRender({ slug, id }: { slug: string; id: string }) {
  const Demo = demoRegistry[slug]?.[id];
  return Demo ? <Demo /> : <p className="text-sm text-zinc-500">ยังไม่มีตัวอย่าง</p>;
}
