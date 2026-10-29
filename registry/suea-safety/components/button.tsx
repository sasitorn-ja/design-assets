import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all hover:-translate-y-[1px] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35A8FF] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-[linear-gradient(135deg,#35A8FF_0%,#0B82F0_55%,#006AD6_100%)] text-white shadow-[0_8px_20px_rgba(11,130,240,0.22)]",
        outline: "border border-[#C5DCF8] bg-white text-[#0B3572] shadow-[inset_0_1px_0_rgba(255,255,255,.65)] hover:bg-[#F5FAFF]",
        ghost: "text-[#0B2F6B] hover:bg-[#F5FAFF] hover:text-[#0B82F0]",
        danger: "bg-[#E11D48] text-white hover:bg-[#BE123C]",
      },
      size: {
        default: "h-11 rounded-[13px] px-4 text-sm",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "min-h-[54px] rounded-[15px] px-5 text-sm",
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
