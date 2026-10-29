import { highlight } from "@/lib/files";
import { CopyButton } from "./copy-button";

// กล่องโค้ดพร้อมปุ่มคัดลอก (render ฝั่ง server)
export async function CodeBlock({ code, lang = "tsx", title, maxHeight = 520 }: { code: string; lang?: "tsx" | "css" | "bash" | "json"; title?: string; maxHeight?: number }) {
  const html = await highlight(code.trimEnd(), lang);
  return (
    <div className="overflow-hidden rounded-lg border bg-zinc-50/60">
      <div className="flex items-center justify-between border-b bg-white px-3 py-1.5">
        <span className="truncate font-mono text-xs text-zinc-500">{title ?? lang}</span>
        <CopyButton text={code} label="คัดลอก" />
      </div>
      <div className="code-block overflow-auto" style={{ maxHeight }} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
