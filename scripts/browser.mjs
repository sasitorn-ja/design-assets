// เปิด Chrome (profile ที่จำ session ไว้) แบบให้สคริปต์อื่นเชื่อมต่อมาสั่งงานได้ทาง port 9333
// ใช้คู่กับ scripts/auto-login.mjs และ scripts/capture.mjs
import { chromium } from "playwright";
import { sites, profileDir } from "./sites.mjs";

const context = await chromium.launchPersistentContext(profileDir, {
  headless: false,
  viewport: null,
  args: ["--start-maximized", "--remote-debugging-port=9333"],
});

const [first] = context.pages();
for (const [i, site] of sites.entries()) {
  const page = i === 0 && first ? first : await context.newPage();
  page.goto(site.url).catch(() => {});
}

console.log("READY: Chrome เปิดแล้ว (port 9333)");
await new Promise((resolve) => context.on("close", resolve));
console.log("Chrome ถูกปิดแล้ว");
