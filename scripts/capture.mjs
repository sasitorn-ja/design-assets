// เก็บภาพหน้าจอเว็บจริงตาม scripts/capture-pages.mjs
// ต้องเปิด scripts/browser.mjs และ login ไว้ก่อน
// ใช้: node scripts/capture.mjs [slug]   (ไม่ใส่ slug = ทุกโปรเจค)
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { capturePlan } from "./capture-pages.mjs";

const only = process.argv[2];
const root = new URL("../registry/", import.meta.url).pathname;
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

const browser = await chromium.connectOverCDP("http://127.0.0.1:9333");
const context = browser.contexts()[0];

async function settle(page) {
  await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(2000);
}

async function shoot(page, url, item, size, file) {
  await page.setViewportSize(size);
  await page.goto(url, { waitUntil: "load", timeout: 45000 });
  await settle(page);
  // ปิด pop-up ที่เด้งตอนเปิดหน้า (กด Esc เท่านั้น ไม่กดบันทึกอะไร)
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  if (item.clickSelector) {
    // สำหรับปุ่มที่ไม่มีข้อความ เช่น hamburger (เลือกด้วย CSS selector)
    await page.locator(item.clickSelector).filter({ visible: true }).first().click({ timeout: 8000 });
    await page.waitForTimeout(800);
  }
  if (item.click) {
    const target = page
      .locator("header button, nav button, aside button, header a, nav a, aside a")
      .filter({ hasText: new RegExp(`^\\s*${item.click.replace(/[()]/g, "\\$&")}\\s*$`) })
      .filter({ visible: true })
      .first();
    await target.click({ timeout: 8000 });
    await settle(page);
  }
  // ซ่อนลายน้ำ "FOR TEST ONLY" ของเว็บทดสอบ (แค่ในภาพ ไม่ได้แก้เว็บจริง)
  await page.addStyleTag({ content: ".test-watermark{display:none!important}" }).catch(() => {});
  await page.screenshot({ path: file });
}

for (const project of capturePlan) {
  if (only && project.slug !== only) continue;
  if (project.frozen) {
    console.log(`ข้าม ${project.slug} (frozen: เก็บภาพดีไซน์เดิมไว้)`);
    continue;
  }
  const dir = `${root}${project.slug}/screenshots`;
  await mkdir(dir, { recursive: true });
  const page = await context.newPage();
  const manifest = [];

  for (const item of project.pages) {
    const url = project.base + item.path;
    const entry = { id: item.id, label: item.label, url, desktop: null, mobile: null };
    // loggedOut: ใช้หน้าต่างใหม่ที่ไม่มี cookie เพื่อเก็บภาพหน้า login
    const guest = item.loggedOut ? await browser.newContext() : null;
    const target = guest ? await guest.newPage() : page;
    try {
      if (!item.mobileOnly) {
        await shoot(target, url, item, DESKTOP, `${dir}/${item.id}-desktop.png`);
        entry.desktop = `${item.id}-desktop.png`;
      }
      if (item.mobile || item.mobileOnly) {
        await shoot(target, url, item, MOBILE, `${dir}/${item.id}-mobile.png`);
        entry.mobile = `${item.id}-mobile.png`;
      }
      // ถ้าโดนเด้งไปหน้า login ให้เตือน
      if (!guest && /login|signin|microsoftonline/i.test(target.url())) entry.warning = `redirected to ${target.url()}`;
      console.log(`✓ ${project.slug}/${item.id}${entry.warning ? "  ⚠ " + entry.warning : ""}`);
    } catch (e) {
      entry.error = e.message.split("\n")[0];
      console.log(`✗ ${project.slug}/${item.id}: ${entry.error}`);
    } finally {
      await guest?.close();
    }
    manifest.push(entry);
  }

  await writeFile(`${dir}/manifest.json`, JSON.stringify({ capturedAt: new Date().toISOString(), pages: manifest }, null, 2));
  await page.close();
}
await browser.close().catch(() => {});
