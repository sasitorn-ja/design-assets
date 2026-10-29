import type { Project } from "./types";
import { project as nongWangJai } from "@/registry/nong-wang-jai/project";
import { project as pricingMonitor } from "@/registry/pricing-monitor/project";
import { project as rmcSalesupport } from "@/registry/rmc-salesupport/project";
import { project as stock } from "@/registry/stock/project";
import { project as sueaSafety } from "@/registry/suea-safety/project";
import { project as cpacDealer } from "@/registry/cpac-dealer/project";
import { project as washoutPit } from "@/registry/washout-pit/project";

// ลำดับในเมนูซ้าย = ลำดับที่นี่
export const projects: Project[] = [nongWangJai, pricingMonitor, rmcSalesupport, stock, sueaSafety, cpacDealer, washoutPit];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// หน้าย่อยของแต่ละโปรเจค (ใช้ทั้งใน sidebar และแท็บด้านบน)
export const projectSections = [
  { href: "", label: "ภาพรวม" },
  { href: "/foundations", label: "Foundations" },
  { href: "/navigation", label: "เมนูและ Layout" },
  { href: "/screens", label: "หน้าจอจริง" },
  { href: "/components", label: "Components" },
  { href: "/guidelines", label: "กติกาและ Do/Don't" },
] as const;
