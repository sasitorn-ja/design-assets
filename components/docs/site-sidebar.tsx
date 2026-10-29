"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { projectSections } from "@/lib/projects";

type NavProject = { slug: string; title: string; color: string; components: { id: string; name: string }[] };

function SidebarLinks({ projects, onNavigate }: { projects: NavProject[]; onNavigate?: () => void }) {
  const pathname = usePathname();
  const link = (href: string, label: string, depth = 0) => {
    const active = pathname === href;
    return (
      <Link
        key={href}
        href={href}
        onClick={onNavigate}
        className={cn(
          "block truncate rounded-md px-2 py-1.5 text-[13px] transition-colors",
          depth === 1 && "pl-4",
          depth === 2 && "pl-7 text-[12.5px]",
          active ? "bg-zinc-100 font-medium text-zinc-900" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="space-y-6 pb-10">
      <div>
        <p className="mb-1 px-2 text-xs font-semibold text-zinc-900">เริ่มต้น</p>
        {link("/", "หน้าแรก")}
        {link("/guide", "วิธีนำไปใช้ในโปรเจค")}
        {link("/compare", "เปรียบเทียบ 7 โปรเจค")}
      </div>
      <div>
        <p className="mb-1 px-2 text-xs font-semibold text-zinc-900">โปรเจค</p>
        {projects.map((p) => {
          const base = `/projects/${p.slug}`;
          const open = pathname.startsWith(base);
          return (
            <div key={p.slug}>
              <Link
                href={base}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition-colors",
                  open ? "font-semibold text-zinc-900" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
                )}
              >
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: p.color }} />
                <span className="flex-1 truncate">{p.title}</span>
                <ChevronRight className={cn("size-3.5 text-zinc-400 transition-transform", open && "rotate-90")} />
              </Link>
              {open && (
                <div className="mb-2 mt-0.5 border-l border-zinc-200 ml-3">
                  {projectSections.map((s) => (
                    <div key={s.href}>
                      {link(base + s.href, s.label, 1)}
                      {s.href === "/components" &&
                        pathname.startsWith(`${base}/components`) &&
                        p.components.map((c) => link(`${base}/components/${c.id}`, c.name, 2))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SiteSidebar({ projects }: { projects: NavProject[] }) {
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r px-3 py-6 lg:block">
      <SidebarLinks projects={projects} />
    </aside>
  );
}

export function MobileNav({ projects }: { projects: NavProject[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <button type="button" aria-label="เปิดเมนู" onClick={() => setOpen(true)} className="flex size-9 items-center justify-center rounded-md hover:bg-zinc-100 lg:hidden">
        <Menu className="size-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-white px-3 py-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between px-2">
              <span className="font-semibold">Design Assets</span>
              <button type="button" aria-label="ปิดเมนู" onClick={() => setOpen(false)} className="flex size-8 items-center justify-center rounded-md hover:bg-zinc-100">
                <X className="size-4" />
              </button>
            </div>
            <SidebarLinks projects={projects} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
