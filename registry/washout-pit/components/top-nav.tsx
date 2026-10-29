"use client";

import { useState } from "react";
import { BarChart3, ChevronDown, FilePlus2, House, LayoutDashboard, LogOut, ShieldCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Link = { href: string; label: string; short?: string; icon: LucideIcon; dropdown?: boolean };

const LINKS: Link[] = [
  { href: "/home", label: "หน้าหลัก", icon: House },
  { href: "/requests/new", label: "สร้างคำขอขออนุมัติจัดการคอนกรีตเหลือ", short: "สร้างคำขอ", icon: FilePlus2 },
  { href: "/data", label: "รายการคำขอ", icon: BarChart3 },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin", label: "ผู้ดูแลระบบ", icon: ShieldCheck, dropdown: true },
];

export function TopNav({ links = LINKS, user = { name: "ศศิธร จรุงจรรยาพงศ์", role: "SUPER ADMIN", business: "CPAC", region: "Metro" } }: { links?: Link[]; user?: { name: string; role: string; business: string; region: string } }) {
  const [active, setActive] = useState("/home");
  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex h-14 items-center gap-4 border-b border-[#e2f3f8] bg-white px-5">
      <span className="shrink-0 text-xl font-black italic text-[#0284c7]">CWP</span>
      <nav aria-label="Main navigation" className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto [scrollbar-width:none]">
        {links.map((link) => {
          const isActive = active === link.href;
          return (
            <button
              key={link.href}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => setActive(link.href)}
              className={cn(
                "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[9px] px-3 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22d3ee]",
                isActive ? "bg-[#e8f2ff] text-[#075fa8]" : "text-[#32618f] hover:bg-[#f1f7fb]",
              )}
            >
              <link.icon size={18} strokeWidth={1.8} aria-hidden />
              <span className="hidden xl:inline">{link.label}</span>
              <span className="xl:hidden">{link.short ?? link.label}</span>
              {link.dropdown ? <ChevronDown className="size-3.5" /> : null}
            </button>
          );
        })}
      </nav>

      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex shrink-0 items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-[#f1f7fb] focus-visible:outline-2 focus-visible:outline-[#22d3ee]">
        <span className="flex size-8 items-center justify-center rounded-full bg-[#53738b] text-sm font-bold text-white">{user.name.charAt(0)}</span>
        <span className="hidden text-left leading-tight md:block">
          <strong className="block text-[13px] text-[#111827]">{user.name}</strong>
          <small className="text-[10px] font-semibold tracking-[0.12em] text-[#53738b]">{user.role}</small>
        </span>
        <ChevronDown className={cn("size-3.5 text-[#53738b] transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <section role="dialog" aria-label="Account details" className="absolute right-4 top-full z-20 mt-2 w-72 rounded-xl border border-[#cfeaf5] bg-white p-4 shadow-[0_8px_24px_rgba(16,24,40,0.12)]">
          <p className="font-semibold text-[#111827]">{user.name}</p>
          <span className="mt-1 inline-block rounded-full bg-[#e0f7ff] px-2 py-0.5 text-[11px] font-bold text-[#075985]">{user.role}</span>
          <dl className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-[#f9fbfe] p-3 text-xs">
            <dt className="text-[#53738b]">กิจการ</dt>
            <dd className="font-semibold">{user.business}</dd>
            <dt className="text-[#53738b]">ภาค</dt>
            <dd className="font-semibold">{user.region}</dd>
          </dl>
          <button type="button" className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#cfeaf5] text-sm font-semibold text-[#111827] hover:bg-[#f9fbfe]">
            <LogOut size={16} /> ออกจากระบบ
          </button>
        </section>
      )}
    </header>
  );
}
