import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-bold transition-[background-color,transform,border-color] duration-150 active:translate-y-px disabled:pointer-events-none disabled:border-[#DADCE0] disabled:bg-[#E2E3E5] disabled:text-[#5F6368] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[rgb(20_90_241/28%)]",
  {
    variants: {
      variant: {
        primary: "border-transparent bg-[#145AF1] text-white hover:bg-[#0F4ED7]",
        outline: "border-[#CFE0F6] bg-white text-[#17384D] hover:bg-[#F4F8FD]",
        ghost: "border-transparent bg-transparent text-[#48617F] hover:bg-blue-50 hover:text-[#145AF1]",
        destructive: "border-transparent bg-[#BE123C] text-white hover:bg-[#9F1239]",
      },
      size: {
        default: "h-9 px-4 text-sm", // ปุ่มใน dialog / ฟอร์ม
        lg: "h-10 px-5 text-sm",
        sm: "h-7 rounded-md px-2.5 text-xs", // ปุ่มเล็กในตาราง (28px)
        icon: "size-9",
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
