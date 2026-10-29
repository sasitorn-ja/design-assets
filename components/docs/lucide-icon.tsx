import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

// แสดง icon จากชื่อ (ใช้ในหน้าโครงสร้างเมนู)
export function LucideIcon({ name, ...props }: { name?: string } & LucideProps) {
  if (!name) return null;
  const Icon = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
  return Icon ? <Icon {...props} /> : null;
}
