import type { CSSProperties, ReactNode } from "react";
import { varsToStyle } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

// กล่องที่ใช้ธีม (สี + ฟอนต์) ของโปรเจคนั้นๆ ทุก preview ต้องอยู่ในนี้
export function ProjectFrame({ project, children, className, style }: { project: Project; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={cn("text-[14px]", className)}
      style={{ ...varsToStyle(project.cssVars), fontFamily: project.fontFamily, background: project.previewBackground, color: project.cssVars.foreground, ...style }}
    >
      {children}
    </div>
  );
}
