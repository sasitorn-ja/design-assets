import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Marked } from "marked";
import type { FeatureGuide } from "@/lib/feature-guides";
import { highlight } from "@/lib/files";

const langs = new Set(["tsx", "css", "bash", "json"]);
const langAlias: Record<string, string> = { typescript: "tsx", ts: "tsx", sh: "bash" };

export function readFeatureGuide(guide: FeatureGuide) {
  return readFile(path.join(process.cwd(), "feature-guides", guide.file), "utf8");
}

// แปลง Markdown เป็น HTML (เนื้อหามาจากไฟล์ใน repo เอง) code block ที่รู้จักภาษาใช้ shiki
export async function renderFeatureGuide(guide: FeatureGuide) {
  const source = await readFeatureGuide(guide);
  const marked = new Marked({ gfm: true, async: true });
  marked.use({
    async: true,
    async walkTokens(token) {
      if (token.type !== "code") return;
      const lang = langAlias[token.lang] ?? token.lang;
      if (!langs.has(lang)) return;
      const html = await highlight(token.text, lang as "tsx" | "css" | "bash" | "json");
      Object.assign(token, { type: "html", raw: token.raw, text: html, pre: false, block: true });
    },
    renderer: {
      link({ href, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:/.test(href);
        return `<a href="${href}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${text}</a>`;
      },
    },
  });
  return marked.parse(source);
}
