import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ปุ่มแคปซูลหัวมน ฟอนต์ Prompt ปุ่มหลักมี "เงากด" 3px ใต้ปุ่ม กดแล้วยุบลง 2px
export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-transparent font-[family-name:var(--font-prompt)] font-semibold outline-none transition-[background-color,transform,box-shadow] select-none focus-visible:shadow-[0_0_0_3px_rgb(0_161_229/0.28)] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#0072b8] text-white shadow-[0_3px_0_#005a92] hover:bg-[#005a92] active:translate-y-[2px] active:shadow-[0_1px_0_#005a92]",
        outline: "border-[1.5px] border-[#0c2a44] bg-white text-[#0c2a44] hover:bg-[#d6effc]",
        soft: "bg-[#e3f4fd] text-[#0072b8] hover:bg-[#d6effc]",
        ghost: "text-[#23435f] hover:bg-[#e1f2fd] hover:text-[#0c2a44]",
        destructive:
          "bg-[#dc2626] text-white shadow-[0_3px_0_#991b1b] hover:bg-[#b91c1c] active:translate-y-[2px] active:shadow-[0_1px_0_#991b1b]",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        default: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, type = "button", ...props }, ref) => (
  <button ref={ref} type={type} data-variant={variant ?? "default"} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";
