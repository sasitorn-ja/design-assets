"use client";

import { useState } from "react";
import { Check } from "lucide-react";

// สี 1 ช่อง กดเพื่อคัดลอกค่าสี
export function Swatch({ name, value, usage }: { name: string; value: string; usage: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      title="กดเพื่อคัดลอกค่าสี"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {}
      }}
      className="group overflow-hidden rounded-lg border text-left transition-shadow hover:shadow-md"
    >
      <div className="relative h-16 border-b" style={{ background: value }}>
        {copied && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-xs font-medium text-white">
            <Check className="mr-1 size-3.5" /> คัดลอกแล้ว
          </span>
        )}
      </div>
      <div className="space-y-0.5 p-2.5">
        <p className="truncate text-[13px] font-medium">{name}</p>
        <p className="truncate font-mono text-[11px] text-zinc-500">{value}</p>
        <p className="line-clamp-2 text-[11px] leading-4 text-zinc-500">{usage}</p>
      </div>
    </button>
  );
}
