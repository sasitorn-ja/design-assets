// กดปุ่ม "เข้าสู่ระบบด้วย SSO" ในทุกแท็บที่ยังอยู่หน้า login (ไม่กรอกรหัสผ่านใดๆ)
// ใช้: node scripts/click-sso.mjs [tabIndex]
import { chromium } from "playwright";

const only = process.argv[2] !== undefined ? Number(process.argv[2]) : null;
const ssoText = /เข้าสู่ระบบ|Sign in with|SSO/i;

const browser = await chromium.connectOverCDP("http://127.0.0.1:9333");
const pages = browser.contexts()[0].pages();

for (const [i, page] of pages.entries()) {
  if (only !== null && i !== only) continue;
  const button = page.locator("button, a, [role=button]").filter({ hasText: ssoText }).first();
  if (!(await button.isVisible().catch(() => false))) {
    console.log(`tab ${i}: ไม่มีปุ่ม SSO (${page.url()})`);
    continue;
  }
  await button.click().catch((e) => console.log(`tab ${i}: click error ${e.message}`));
  await page.waitForLoadState("load", { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2500);
  console.log(`tab ${i}: กดแล้ว → ${page.url()}`);
}
await browser.close().catch(() => {});
