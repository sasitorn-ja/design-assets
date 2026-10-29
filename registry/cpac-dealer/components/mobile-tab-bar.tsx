"use client";

import { useState } from "react";
import { FileText, Home, Megaphone, Trophy, UserRound, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; icon: LucideIcon };

const ITEMS: Item[] = [
  { id: "home", label: "หน้าหลัก", icon: Home },
  { id: "rank", label: "อันดับ", icon: Trophy },
  { id: "promo", label: "แคมเปญ", icon: Megaphone },
  { id: "docs", label: "โบรชัวร์", icon: FileText },
  { id: "profile", label: "โปรไฟล์", icon: UserRound },
];

// tab bar มือถือของ Dealer — ในแอปจริงให้ fixed bottom-0 และเว้น safe-area
export function MobileTabBar({ items = ITEMS }: { items?: Item[] }) {
  const [active, setActive] = useState("home");
  return (
    <nav aria-label="เมนูหลัก" className="grid border-t border-[#dce6ed] bg-white/95 px-1 pb-[max(6px,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))` }}>
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button key={item.id} type="button" onClick={() => setActive(item.id)} aria-current={isActive ? "page" : undefined} className="flex flex-col items-center gap-1 py-1">
            <span className={cn("flex h-7 w-12 items-center justify-center rounded-full transition-colors", isActive ? "bg-[#e8f6fd] text-[#00a1e5]" : "text-[#718694]")}>
              <item.icon className="size-[19px]" strokeWidth={isActive ? 2.4 : 2} />
            </span>
            <span className={cn("text-[11px]", isActive ? "font-bold text-[#00a1e5]" : "font-medium text-[#577189]")}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
