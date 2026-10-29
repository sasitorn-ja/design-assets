import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { codeToHtml } from "shiki";

const root = process.cwd();

export type ScreenshotEntry = {
  id: string;
  label: string;
  url: string;
  desktop: string | null;
  mobile: string | null;
  warning?: string;
  error?: string;
};

// อ่านรายการภาพหน้าจอที่ scripts/capture.mjs เก็บไว้
export async function getScreenshots(slug: string): Promise<{ capturedAt: string | null; pages: ScreenshotEntry[] }> {
  try {
    const raw = await readFile(path.join(root, "registry", slug, "screenshots", "manifest.json"), "utf8");
    const data = JSON.parse(raw);
    return { capturedAt: data.capturedAt, pages: data.pages.filter((p: ScreenshotEntry) => p.desktop) };
  } catch {
    return { capturedAt: null, pages: [] };
  }
}

export function shotUrl(slug: string, file: string) {
  return `/shots/${slug}/${file}`;
}

export async function readComponentSource(slug: string, file: string) {
  return readFile(path.join(root, "registry", slug, "components", file), "utf8");
}

export async function highlight(code: string, lang: "tsx" | "css" | "bash" | "json" = "tsx") {
  return codeToHtml(code, { lang, theme: "github-light" });
}
