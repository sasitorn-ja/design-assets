"use client";

import { useEffect, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ภาพหน้าจอจริง กดเพื่อดูภาพใหญ่
export function Screenshot({ src, alt, caption, href, className, mobile }: { src: string; alt: string; caption?: string; href?: string; className?: string; mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <figure className={cn("min-w-0", className)}>
      <button type="button" onClick={() => setOpen(true)} className="block w-full overflow-hidden rounded-lg border bg-zinc-50 shadow-sm transition-shadow hover:shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className={cn("w-full object-cover object-top", mobile ? "aspect-[390/844]" : "aspect-[1440/900]")} />
      </button>
      {(caption || href) && (
        <figcaption className="mt-2 flex items-center justify-between gap-2 text-[13px]">
          <span className="truncate font-medium text-zinc-800">{caption}</span>
          {href && (
            <a href={href} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900">
              เปิดเว็บจริง <ExternalLink className="size-3" />
            </a>
          )}
        </figcaption>
      )}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/70 p-4 md:p-10" onClick={() => setOpen(false)}>
          <button type="button" aria-label="ปิด" className="fixed right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/90 text-zinc-800">
            <X className="size-4" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className={cn("rounded-lg shadow-2xl", mobile ? "max-w-[420px]" : "max-w-[1440px]", "w-full")} />
        </div>
      )}
    </figure>
  );
}
