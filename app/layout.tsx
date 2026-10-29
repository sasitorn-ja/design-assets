import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Sans_Thai, Sarabun, Inter } from "next/font/google";
import { Palette } from "lucide-react";
import { SiteSidebar, MobileNav } from "@/components/docs/site-sidebar";
import { projects } from "@/lib/projects";
import "./globals.css";

const plexThai = IBM_Plex_Sans_Thai({ subsets: ["thai", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-plex-thai" });
const sarabun = Sarabun({ subsets: ["thai", "latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-sarabun" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "Design Assets", template: "%s · Design Assets" },
  description: "รวม UI/UX design ของทุกโปรเจคในทีม เลือกโปรเจค หยิบสี เมนู และ component ไปใช้ได้",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    color: p.brand.primary,
    components: p.components.map((c) => ({ id: c.id, name: c.name })),
  }));

  return (
    <html lang="th" className={`${plexThai.variable} ${sarabun.variable} ${inter.variable}`}>
      <body>
        <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4">
            <MobileNav projects={nav} />
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="flex size-7 items-center justify-center rounded-md bg-zinc-900 text-white">
                <Palette className="size-4" />
              </span>
              Design Assets
            </Link>
            <nav className="ml-6 hidden items-center gap-5 text-sm text-zinc-600 md:flex">
              <Link href="/guide" className="hover:text-zinc-900">วิธีนำไปใช้</Link>
              <Link href="/compare" className="hover:text-zinc-900">เปรียบเทียบโปรเจค</Link>
            </nav>
          </div>
        </header>
        <div className="mx-auto flex max-w-[1400px]">
          <SiteSidebar projects={nav} />
          <main className="min-w-0 flex-1 px-4 py-8 md:px-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
