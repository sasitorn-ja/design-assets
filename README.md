# Design Assets

คลัง UI/UX design ของทีม เลือกดีไซน์แล้วดาวน์โหลดไฟล์ .md ไปให้ AI ใช้กับโปรเจคของคุณได้เลย

## วิธีใช้ที่ง่ายที่สุด — ดาวน์โหลดไฟล์เดียว

**ไม่ต้อง clone ไม่ต้องรัน localhost และไม่ต้องใช้ shadcn CLI**

1. เปิด [รายการไฟล์ดีไซน์](./design-guides/README.md) แล้วเลือกโปรเจคที่ชอบ
2. เปิดไฟล์ .md → กด **Download raw file** (ไอคอนดาวน์โหลดบนไฟล์)
3. แนบไฟล์ให้ AI ที่ใช้เขียนโค้ด แล้วสั่ง เช่น:

> อ่านไฟล์นี้ แล้วเอาเมนู side-nav ของ nong-wang-jai มาใช้กับโปรเจคนี้ ปรับให้เข้ากับโครงสร้างเดิมและคงการทำงานเดิมไว้

แต่ละไฟล์รวมสี ฟอนต์ Layout กติกา ธีม CSS และโค้ด component ครบ เลือกใช้บางส่วนหรือทั้งชุดได้ โค้ดเป็น React + Tailwind; ถ้าโปรเจคใช้เทคโนโลยีอื่น ให้ AI แปลงตามสเปกดีไซน์ รูปภาพและไฟล์ฟอนต์ไม่ได้ฝังอยู่ใน .md

Repo เป็น **Private** ต้องได้รับสิทธิ์และล็อกอิน GitHub ก่อนดาวน์โหลด

หากอยากดูตัวอย่างแบบเว็บ สามารถเปิดในเครื่องตามวิธีด้านล่างได้ เป็นทางเลือกเพิ่มเติม

## ทางเลือก: เปิดเว็บดูตัวอย่างในเครื่อง

```bash
npm install
npm run dev        # http://localhost:4000
```

ติดตั้ง component ลงโปรเจคของคุณ (ต้องเปิดเว็บนี้ค้างไว้):

```bash
npx shadcn@latest add http://localhost:4000/r/nong-wang-jai-metric-card.json
npx shadcn@latest add http://localhost:4000/r/rmc-salesupport-theme.json
```

## โปรเจคที่มี

| slug | โปรเจค | เว็บจริง |
| --- | --- | --- |
| nong-wang-jai | Project_NongWangJai | https://rmc.cipcloud.net/nong-wang-jai/ |
| pricing-monitor | Pricing Monitor | https://salespark.cipcloud.net/s-and-op-pricing-monitor |
| rmc-salesupport | Project_Rmc-salesupport | https://salespark.cipcloud.net/s-and-op |
| stock | Project_Stock (SyncDrop) | https://store.cipcloud.net/syncdrop/ |
| suea-safety | Project_SUEASafety | https://safety.cipcloud.net/ |
| cpac-dealer | SaleSpark_cpac-dealer | https://salespark.cipcloud.net/cpac-dealer/scg |
| washout-pit | Washout_Pit | https://plant.cipcloud.net/cwp/login |

## โครงสร้าง

```
registry/<slug>/
  project.ts       สี ฟอนต์ เมนู กติกา รายการ component
  components/      โค้ดที่ให้คนอื่นก๊อป/ติดตั้ง
  demos.tsx        ตัวอย่างในแท็บ Preview
  screenshots/     ภาพหน้าจอจริง + manifest.json
app/               หน้าเว็บคู่มือ (Next.js)
app/r/[name]       endpoint สำหรับ shadcn CLI
scripts/           สคริปต์ login และเก็บภาพหน้าจอ
```

เพิ่มโปรเจคใหม่: ก๊อปโฟลเดอร์ใน `registry/` เป็น slug ใหม่ แล้วเพิ่มใน `lib/projects.ts` และ `lib/demos.ts`

## อัปเดตภาพหน้าจอ

```bash
npm run browser          # เปิด Chrome แล้ว login SSO เอง (ค้างไว้)
npm run capture          # เก็บภาพทุกโปรเจค
npm run capture stock    # หรือเฉพาะโปรเจคเดียว
```

รายการหน้าที่เก็บอยู่ใน `scripts/capture-pages.mjs` · session login อยู่ใน `.auth/` (อยู่ใน .gitignore ห้าม commit)

> ภาพหน้าจอมีข้อมูลจริงของบริษัท ใช้ภายในทีมเท่านั้น

## สำหรับผู้ดูแลไฟล์ Markdown

หลังแก้ข้อมูลหรือ component ใน registry/ ให้รัน `npm run export:guides` แล้ว commit ไฟล์ใน design-guides/ ไปด้วย สมาชิกที่ดาวน์โหลดไว้แล้วต้องดาวน์โหลดเวอร์ชันใหม่เมื่อต้องการอัปเดต
