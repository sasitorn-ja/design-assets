import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// การ์ดหลักของหน้า: มุม 20px, เงาฟ้าอ่อน, หัวการ์ดมี icon สีฟ้า + ลิงก์ดูทั้งหมด
export function SectionCard({ icon, title, badge, linkLabel, onLink, children, className }: { icon?: ReactNode; title: string; badge?: ReactNode; linkLabel?: string; onLink?: () => void; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-[20px] border border-[#d7e6f6] bg-white p-4 shadow-[0_8px_22px_rgba(14,62,125,0.055)]", className)}>
      <header className="mb-3 flex items-center gap-2">
        {icon ? <span className="text-[#0B82F0] [&_svg]:size-[18px]">{icon}</span> : null}
        <h3 className="text-[16px] font-extrabold text-[#0B2F6B]">{title}</h3>
        {badge}
        {linkLabel ? (
          <button type="button" onClick={onLink} className="ml-auto inline-flex items-center gap-0.5 text-xs font-bold text-[#55739B] hover:text-[#0B82F0]">
            {linkLabel} <ChevronRight className="size-3.5" />
          </button>
        ) : null}
      </header>
      {children}
    </section>
  );
}
