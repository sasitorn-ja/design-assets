import * as React from "react";
import { cn } from "@/lib/utils";

// ds-input: ขอบ #CFE0F6, focus ขอบน้ำเงิน + ring โปร่ง, error ขอบ rose พื้นชมพูอ่อน
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-9 w-full rounded-lg border border-[#CFE0F6] bg-white px-3 text-sm text-[#202124] outline-none transition-colors placeholder:text-[#8BA0BA]",
      "focus:border-[#145AF1] focus:outline-[3px] focus:outline-offset-0 focus:outline-[rgb(20_90_241/14%)]",
      "aria-[invalid=true]:border-[#E11D48] aria-[invalid=true]:bg-[#FFF8F8]",
      "disabled:cursor-not-allowed disabled:bg-[#E2E3E5] disabled:text-[#5F6368]",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

// Field: label + input + helper/error ใต้ช่อง
export function Field({ label, htmlFor, helper, error, children }: { label: string; htmlFor: string; helper?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-bold text-[#17384D]">
        {label}
      </label>
      {children}
      {error ? <p className="text-xs font-semibold text-[#BE123C]">{error}</p> : helper ? <p className="text-xs text-[#60769B]">{helper}</p> : null}
    </div>
  );
}
