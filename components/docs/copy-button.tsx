"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ text, label, className }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // clipboard อาจถูกบล็อก ไม่ต้องทำอะไร
        }
      }}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-md border bg-white px-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50",
        className,
      )}
      aria-label={label ?? "คัดลอก"}
    >
      {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
      {label ? (copied ? "คัดลอกแล้ว" : label) : null}
    </button>
  );
}
