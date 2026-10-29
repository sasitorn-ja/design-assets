// เปิด Chrome พร้อมหน้า login ของทุกโปรเจค ให้ผู้ใช้ login เอง
// login ครบแล้วปิดหน้าต่าง Chrome ได้เลย session จะถูกจำไว้ใน .auth/
import { chromium } from "playwright";
import { sites, profileDir } from "./sites.mjs";

const context = await chromium.launchPersistentContext(profileDir, {
  headless: false,
  viewport: null,
  args: ["--start-maximized"],
});

const [first] = context.pages();
for (const [i, site] of sites.entries()) {
  const page = i === 0 && first ? first : await context.newPage();
  page.goto(site.url).catch(() => {});
}

console.log("เปิดหน้า login ครบ 7 แท็บแล้ว ปิดหน้าต่าง Chrome เมื่อ login เสร็จ");
await new Promise((resolve) => context.on("close", resolve));
console.log("ปิดหน้าต่างแล้ว session ถูกบันทึก");
