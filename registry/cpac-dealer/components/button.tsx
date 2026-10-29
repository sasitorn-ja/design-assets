import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ใช้สีจากธีม: ก๊อป tokens ของ CPAC Dealer ไปด้วย (มี --primary-hover, --success)
export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-transparent text-sm outline-none transition-all select-none focus-visible:shadow-[0_0_0_3px_rgb(0_161_229/0.2)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] font-bold text-white shadow-sm hover:bg-[var(--primary-hover)]",
        soft: "bg-[var(--accent)] font-bold text-[var(--accent-foreground)] hover:bg-[#d3eefb]",
        outline: "border-[var(--border)] bg-white font-bold text-[#2c4a63] hover:bg-[#f8fafc] hover:text-[var(--foreground)]",
        secondary: "bg-[var(--secondary)] font-semibold text-[var(--secondary-foreground)] hover:bg-[#dce6ed]",
        ghost: "font-semibold text-[#577189] hover:bg-[#edf3f7] hover:text-[var(--foreground)]",
        destructive: "bg-[var(--destructive)] font-bold text-white shadow-sm hover:bg-[#b91c1c]",
        "destructive-soft": "bg-[#fef2f2] font-bold text-[#dc2626] hover:bg-[#fee2e2]",
        success: "bg-[var(--success)] font-bold text-white shadow-sm hover:bg-[#09945f]",
      },
      size: {
        sm: "h-7 rounded-[10px] px-2.5 text-[0.8rem]",
        default: "h-8 px-2.5",
        lg: "h-9 px-3",
        icon: "size-8",
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
