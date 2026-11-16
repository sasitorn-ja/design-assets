import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { featureGuides } from "@/lib/feature-guides";

export const metadata = { title: "คู่มือฟีเจอร์" };

export default function FeatureGuides() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight">คู่มือฟีเจอร์</h1>
      <p className="mt-2 text-[15px] leading-7 text-zinc-600">
        คู่มือ implement ฟีเจอร์ฝั่งระบบ (auth, session, สิทธิ์, audit) ที่ทีมทำไว้แล้ว และอยากให้โปรเจคอื่นนำไปใช้ซ้ำ
        อ่านบนเว็บ หรือดาวน์โหลดไฟล์ .md ไปแนบให้ AI ในโปรเจคของคุณ
      </p>

      <div className="mt-8 space-y-4">
        {featureGuides.map((g) => (
          <div key={g.slug} className="rounded-xl border p-5">
            <p className="text-xs font-medium text-zinc-500">ต้นแบบ {g.source} · อัปเดต {g.updated}</p>
            <h2 className="mt-1 text-lg font-semibold">{g.title}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{g.summary}</p>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
              {g.tags.map((t) => (
                <span key={t} className="rounded-md bg-zinc-100 px-2 py-0.5">{t}</span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={`/features/${g.slug}`} className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-800">
                อ่านคู่มือ <ArrowRight className="size-4" />
              </Link>
              <a href={`/features/${g.slug}/raw`} className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-zinc-50">
                <Download className="size-4" /> ดาวน์โหลด .md
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
