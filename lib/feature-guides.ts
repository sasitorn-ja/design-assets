export type FeatureGuide = {
  slug: string;
  file: string;
  title: string;
  source: string;
  summary: string;
  updated: string;
  tags: string[];
};

// คู่มือฟีเจอร์ฝั่งระบบ (ไม่ใช่ดีไซน์) ไฟล์อยู่ใน feature-guides/
export const featureGuides: FeatureGuide[] = [
  {
    slug: "user-impersonation",
    file: "user-impersonation.md",
    title: "ระบบปลอมตัว SSO — เข้าใช้งานแทนผู้ใช้ (User Impersonation)",
    source: "RMC Sale Support (S&OP)",
    summary:
      "ระบบปลอมตัวเป็นผู้ใช้ SSO คนอื่น ให้ Super Admin เปิดแอปในมุมของผู้ใช้อีกคน เพื่อตรวจเมนู ข้อมูล และสิทธิ์ที่ผู้ใช้คนนั้นเห็น มีทั้งพฤติกรรมจริงใน S&OP และสเปกสำหรับโปรเจคใหม่ (actor / effective user, ตาราง PostgreSQL, API, CSRF, audit, UI และ test)",
    updated: "16 พ.ย. 2569",
    tags: ["ปลอมตัว SSO", "Auth", "Session", "RBAC", "Audit", "Next.js"],
  },
];

export function getFeatureGuide(slug: string) {
  return featureGuides.find((g) => g.slug === slug);
}
