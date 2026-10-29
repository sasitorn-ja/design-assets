import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border border-transparent px-2.5 py-0.5 text-[11px] font-bold [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-[#00a1e5] text-white",
        soft: "border-[#b3e3f7] bg-[#e8f6fd] text-[#008ccb]",
        success: "border-[#b6e9d6] bg-[#e7f7f1] text-[#08905f]",
        warning: "border-[#fbe2a8] bg-[#fef3d6] text-[#b77b00]",
        destructive: "border-[#fecaca] bg-[#fef2f2] text-[#dc2626]",
        violet: "border-violet-200 bg-violet-50 text-violet-600",
        teal: "border-teal-100 bg-teal-50 text-teal-600",
        orange: "border-orange-100 bg-orange-50 text-orange-600",
        neutral: "border-[#dce6ed] bg-[#f8fafc] text-[#577189]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
