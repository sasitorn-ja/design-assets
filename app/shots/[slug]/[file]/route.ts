import { readFile } from "node:fs/promises";
import path from "node:path";

// ส่งไฟล์ภาพหน้าจอจาก registry/<slug>/screenshots/
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string; file: string }> }) {
  const { slug, file } = await params;
  if (!/^[a-z0-9-]+$/.test(slug) || !/^[a-z0-9-]+\.(png|jpg|jpeg|webp)$/.test(file)) {
    return new Response("Not found", { status: 404 });
  }
  try {
    const data = await readFile(path.join(process.cwd(), "registry", slug, "screenshots", file));
    const type = file.endsWith(".png") ? "image/png" : file.endsWith(".webp") ? "image/webp" : "image/jpeg";
    return new Response(new Uint8Array(data), { headers: { "Content-Type": type, "Cache-Control": "public, max-age=3600" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
