"use client";

import { useState } from "react";
import { Bell, Home, ShieldCheck, UsersRound, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; icon: LucideIcon; enabled?: boolean };

const ITEMS: Item[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "effort", label: "Safety Effort", icon: ShieldCheck },
  { id: "culture", label: "Safety Culture", icon: UsersRound },
  { id: "notifications", label: "Notice", icon: Bell },
];

// แถบเมนูล่างบนมือถือ (ซ่อนบน desktop ด้วย lg:hidden ในโปรเจคจริง)
// fixed = false เพื่อให้วางในตัวอย่างได้ ในแอปจริงให้ใส่ fixed
export function BottomNav({ items = ITEMS, unread = 0, fixed = false }: { items?: Item[]; unread?: number; fixed?: boolean }) {
  const [current, setCurrent] = useState("home");
  return (
    <nav
      aria-label="Mobile main navigation"
      className={cn(
        "border-t border-[#D7EAFE] bg-white/95 shadow-[0_-10px_28px_rgba(185,223,255,0.45)] backdrop-blur-[16px]",
        fixed && "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
      )}
      style={{ paddingBottom: "calc(5px + env(safe-area-inset-bottom))" }}
    >
      <div className="grid min-h-[60px] w-full px-1 pt-[5px]" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => {
          const enabled = item.enabled !== false;
          const isActive = current === item.id && enabled;
          return (
            <button
              key={item.id}
              type="button"
              disabled={!enabled}
              onClick={() => setCurrent(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex min-h-[54px] select-none flex-col items-center gap-[2px] rounded-[10px] pt-1 text-center text-[8.5px] leading-[1.05] [-webkit-tap-highlight-color:transparent]",
                isActive ? "font-black text-[#0B82F0]" : "font-bold text-[#55739B]",
                !enabled && "cursor-not-allowed opacity-[0.56]",
              )}
            >
              <span className={cn("absolute -top-[1px] left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-[#0B82F0] transition-opacity", isActive ? "opacity-100" : "opacity-0")} />
              <span className={cn("relative flex size-[26px] items-center justify-center rounded-full transition-colors", isActive && "bg-[#0B82F0] text-white shadow-[0_8px_16px_rgba(11,130,240,0.22)]")}>
                <item.icon className="size-[18px]" strokeWidth={isActive ? 2.45 : 2.1} />
                {item.id === "notifications" && unread > 0 ? (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0B82F0] px-[3px] text-[9px] font-black text-white ring-[1.5px] ring-white">{unread > 9 ? "9+" : unread}</span>
                ) : null}
              </span>
              <span className="line-clamp-2 max-w-[52px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
