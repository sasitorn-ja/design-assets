// อ่าน computed style ของ element สำคัญจากเว็บจริง (ใช้ตอนโค้ดในเครื่องไม่ตรงกับที่ deploy)
// ใช้: node scripts/inspect-styles.mjs <url> "<selector1>" "<selector2>" ...
import { chromium } from "playwright";

const [url, ...selectors] = process.argv.slice(2);
const browser = await chromium.connectOverCDP("http://127.0.0.1:9333");
const page = await browser.contexts()[0].newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "load" });
await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
await page.waitForTimeout(1500);
await page.keyboard.press("Escape");

const props = ["background-color", "background-image", "color", "border", "border-radius", "box-shadow", "font-size", "font-weight", "font-family", "height", "padding", "width"];
for (const sel of selectors) {
  const out = await page.evaluate(({ sel, props }) => {
    const els = [...document.querySelectorAll(sel)].slice(0, 2);
    return els.map((el) => {
      const cs = getComputedStyle(el);
      return { text: (el.innerText || "").trim().slice(0, 30), class: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 300), ...Object.fromEntries(props.map((p) => [p, cs.getPropertyValue(p)]).filter(([, v]) => v && v !== "none" && v !== "rgba(0, 0, 0, 0)" && v !== "0px none rgb(0, 0, 0)")) };
    });
  }, { sel, props });
  console.log(`## ${sel}\n${JSON.stringify(out, null, 1)}`);
}
await page.close();
await browser.close().catch(() => {});
