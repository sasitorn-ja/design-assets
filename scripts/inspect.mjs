// ดูสถานะทุกแท็บ: URL ปัจจุบัน, ปุ่มที่กดได้, ช่องกรอก และเก็บภาพไว้ดู (ใช้ตอน login)
// ใช้: node scripts/inspect.mjs [outDir]
import { chromium } from "playwright";

const outDir = process.argv[2] ?? "/tmp";
const browser = await chromium.connectOverCDP("http://127.0.0.1:9333");
const pages = browser.contexts()[0].pages();

for (const [i, page] of pages.entries()) {
  await page.waitForLoadState("domcontentloaded").catch(() => {});
  const info = await page.evaluate(() => {
    const visible = (el) => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    const buttons = [...document.querySelectorAll("button, a, [role=button], input[type=submit]")]
      .filter(visible)
      .map((el) => (el.innerText || el.value || el.getAttribute("aria-label") || "").trim().replace(/\s+/g, " "))
      .filter(Boolean)
      .slice(0, 15);
    const inputs = [...document.querySelectorAll("input")]
      .filter(visible)
      .map((el) => `${el.type}:${el.name || el.id || el.placeholder}`);
    return { title: document.title, buttons, inputs };
  }).catch((e) => ({ error: String(e) }));
  await page.screenshot({ path: `${outDir}/tab-${i}.png` }).catch(() => {});
  console.log(JSON.stringify({ tab: i, url: page.url(), ...info }));
}
await browser.close().catch(() => {}); // ตัดการเชื่อมต่อเท่านั้น ไม่ได้ปิด Chrome
