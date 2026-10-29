import type { CSSProperties } from "react";

// แปลง cssVars ของโปรเจคเป็น style สำหรับกล่อง preview
export function varsToStyle(vars: Record<string, string>): CSSProperties {
  return Object.fromEntries(Object.entries(vars).map(([k, v]) => [`--${k}`, v])) as CSSProperties;
}

// แปลง cssVars เป็นข้อความ CSS พร้อมวางใน globals.css
export function varsToCss(vars: Record<string, string>, selector = ":root") {
  const lines = Object.entries(vars).map(([k, v]) => `  --${k}: ${v};`);
  return `${selector} {\n${lines.join("\n")}\n}`;
}

// ส่วน @theme สำหรับ Tailwind v4 ให้ใช้ class เช่น bg-primary ได้
export function themeInlineCss(vars: Record<string, string>) {
  const lines = Object.keys(vars)
    .filter((k) => k !== "radius" && !k.startsWith("shadow") && !k.startsWith("font"))
    .map((k) => `  --color-${k}: var(--${k});`);
  return `@theme inline {\n${lines.join("\n")}\n  --radius-lg: var(--radius);\n  --radius-md: calc(var(--radius) - 2px);\n  --radius-sm: calc(var(--radius) - 4px);\n}`;
}
