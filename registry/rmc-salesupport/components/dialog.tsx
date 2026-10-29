"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

// Dialog: overlay เข้มโปร่ง, กล่องขาวมุม 20px, header มี icon บอกประเภทงาน, body scroll ได้, ปุ่มหลักอยู่ขวา
export function Dialog({
  open,
  onClose,
  icon,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  icon?: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0f2341]/45" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="dlg-title" className="relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-[20px] bg-white shadow-[0_16px_48px_rgb(15_35_65/18%)]">
        <div className="flex items-start gap-3 border-b border-[#DBEAF5] p-5">
          {icon ? <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F0FE] text-[#0B57D0]">{icon}</span> : null}
          <div className="min-w-0 flex-1">
            <h2 id="dlg-title" className="text-xl font-extrabold text-[#17384D]">{title}</h2>
            {description ? <p className="mt-0.5 text-sm text-[#60769B]">{description}</p> : null}
          </div>
          <button type="button" aria-label="ปิด" onClick={onClose} className="flex size-8 items-center justify-center rounded-lg text-[#48617F] hover:bg-blue-50">
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer ? <div className="flex flex-col-reverse gap-2 border-t border-[#DBEAF5] p-4 sm:flex-row sm:justify-end">{footer}</div> : null}
      </div>
    </div>
  );
}
