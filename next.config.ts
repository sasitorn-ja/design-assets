import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ให้ server อ่านไฟล์ใน registry/ (โค้ด component, ภาพหน้าจอ) ได้ตอน build
  outputFileTracingIncludes: { "/**": ["./registry/**/*"] },
};

export default nextConfig;
