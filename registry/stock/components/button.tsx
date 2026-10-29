import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#1d4ed8] text-white shadow-[0_1px_2px_rgba(30,58,138,0.15)] hover:bg-[#1e40af]",
        outline: "border border-[#cdd8e4] bg-white text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.02)] hover:bg-slate-50",
        ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        destructive: "border border-red-200 bg-white text-red-700 hover:bg-red-50 hover:text-red-800",
        // ใช้บนแบนเนอร์มืด
        glass: "border border-white/30 bg-white/12 text-white hover:bg-white/20",
        white: "border border-white bg-white text-[#104c88] shadow-[0_1px_2px_rgba(30,58,138,0.15)] hover:bg-sky-50",
      },
      size: {
        default: "h-9 px-3 text-[13px]",
        lg: "h-11 px-4 text-sm", // ปุ่มหลักบนมือถือ
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, type = "button", ...props }, ref) => (
  <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";
