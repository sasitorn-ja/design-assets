import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// แปลงจาก .button-primary / .button-secondary / .button-quiet ใน globals.css
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent font-semibold transition-[filter,transform,background-color] hover:-translate-y-px hover:brightness-[.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22d3ee] disabled:cursor-not-allowed disabled:opacity-55",
  {
    variants: {
      variant: {
        primary: "bg-[#0284c7] text-white",
        strong: "bg-[#1e40af] text-white shadow-[0_8px_18px_rgba(30,64,175,0.25)]", // ปุ่ม 'สร้างคำขอใหม่'
        secondary: "border-[#cfeaf5] bg-white text-[#111827]",
        quiet: "bg-transparent text-[#0284c7] hover:bg-[#e0f7ff]",
        danger: "border-[#fecaca] bg-[#fff5f5] text-[#dc2626]",
      },
      size: {
        default: "h-10 px-4 text-sm",
        sm: "h-8 px-3 text-xs",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, type = "button", ...props }, ref) => (
  <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";
