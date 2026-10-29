"use client";

import { useState, type ReactNode } from "react";
import { demoRegistry } from "@/lib/demos";
import { cn } from "@/lib/utils";

// แท็บ Preview / Code แบบ shadcn
export function ComponentPreview({ slug, id, code, frameStyle }: { slug: string; id: string; code: ReactNode; frameStyle: React.CSSProperties }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const Demo = demoRegistry[slug]?.[id];

  return (
    <div>
      <div className="mb-3 flex gap-4 border-b">
        {(["preview", "code"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn("-mb-px border-b-2 px-1 pb-2 text-sm font-medium transition-colors", tab === t ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-500 hover:text-zinc-800")}
          >
            {t === "preview" ? "Preview" : "Code"}
          </button>
        ))}
      </div>
      {tab === "preview" ? (
        <div className="flex min-h-[260px] items-center justify-center overflow-x-auto rounded-lg border p-6 md:p-10" style={frameStyle}>
          {Demo ? <Demo /> : <p className="text-sm text-zinc-500">ยังไม่มีตัวอย่าง</p>}
        </div>
      ) : (
        code
      )}
    </div>
  );
}
