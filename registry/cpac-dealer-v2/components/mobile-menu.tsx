"use client";

import { useState } from "react";
import { FileText, Home, LogOut, Megaphone, Menu, Trophy, UserRound, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; icon: LucideIcon };

const ITEMS: Item[] = [
  { id: "home", label: "หน้าหลัก", icon: Home },
  { id: "rank", label: "อันดับ", icon: Trophy },
  { id: "promo", label: "แคมเปญ", icon: Megaphone },
  { id: "docs", label: "โบรชัวร์", icon: FileText },
  { id: "profile", label: "โปรไฟล์", icon: UserRound },
];

// มือถือ: แถบบนสีฟ้า + ปุ่ม hamburger เปิด sheet ด้านซ้าย เมนูเป็นแคปซูล ตัวที่เลือกเป็นสติกเกอร์ฟ้า
export function MobileMenu({ items = ITEMS, name = "ร้านวัสดุก่อสร้างตัวอย่าง", handle = "DEALER · 100245", defaultOpen = false }: { items?: Item[]; name?: string; handle?: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [active, setActive] = useState(items[0]?.id);

  return (
    <div className="relative h-full overflow-hidden">
      <div className="flex h-14 items-center gap-2 bg-[#5bc4f5] px-3">
        <button type="button" aria-label="เปิดเมนู" onClick={() => setOpen(true)} className="grid size-10 place-items-center rounded-xl text-[#0c2a44] hover:bg-white/40">
          <Menu className="size-5" />
        </button>
        <span className="font-[family-name:var(--font-prompt)] text-base font-bold text-[#0c2a44]">CPAC CPM</span>
      </div>

      {open && <button type="button" aria-label="ปิดเมนู" onClick={() => setOpen(false)} className="absolute inset-0 z-10 bg-[#0c2a44]/30" />}
      <aside
        className={cn(
          "absolute inset-y-0 left-0 z-20 flex w-[min(88%,320px)] flex-col bg-[#f3faff] shadow-[8px_0_30px_rgba(12,42,68,0.14)] transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-[#cfe6f5] px-3">
          <button type="button" aria-label="ปิดเมนู" onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-xl text-[#0072b8] hover:bg-[#e3f4fd]">
            <X className="size-5" />
          </button>
          <span className="font-[family-name:var(--font-prompt)] font-bold text-[#0c2a44]">CPAC CPM</span>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-3">
          <div className="flex items-center gap-3 rounded-[18px] border border-[#cfe6f5] bg-white p-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#d6effc] text-[#0072b8]"><UserRound className="size-5" /></span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-extrabold text-[#0c2a44]">{name}</span>
              <span className="block truncate text-[11px] font-semibold uppercase tracking-wide text-[#5a7489]">{handle}</span>
            </span>
          </div>
          <nav aria-label="เมนูหลักบนมือถือ" className="space-y-2">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "flex h-[46px] w-full items-center gap-3 rounded-[20px] px-4 font-[family-name:var(--font-prompt)] text-[15px] transition-colors",
                    isActive
                      ? "border-2 border-[#0c2a44] bg-[#5bc4f5] font-semibold text-[#0c2a44] shadow-[2px_3px_0_#0c2a44]"
                      : "border-[1.5px] border-[#cfe6f5] bg-white text-[#23435f] shadow-[0_3px_0_#cfe6f5] hover:bg-[#e1f2fd]",
                  )}
                >
                  <item.icon className="size-[18px] shrink-0" />
                  {item.label}
                </button>
              );
            })}
            <button type="button" className="flex h-[46px] w-full items-center gap-3 rounded-[20px] bg-[#fff1f1] px-4 text-[14px] font-bold text-[#e5484d] hover:bg-[#ffe6e6]">
              <LogOut className="size-[18px]" />ออกจากระบบ
            </button>
          </nav>
        </div>
      </aside>
    </div>
  );
}
