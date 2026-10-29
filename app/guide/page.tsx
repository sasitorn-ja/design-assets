import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata = { title: "วิธีนำไปใช้" };

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="relative mb-10 border-l pl-8">
      <span className="absolute -left-3.5 top-0 flex size-7 items-center justify-center rounded-full border bg-white text-sm font-semibold">{n}</span>
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-7 text-zinc-700">{children}</div>
    </section>
  );
}

export default function Guide() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">วิธีนำไปใช้ในโปรเจค</h1>
      <p className="mt-2 text-[15px] leading-7 text-zinc-600">
        เลือกได้ว่าจะเอาทั้งธีม หรือเอาแค่บางชิ้น ทุก component เขียนด้วย React + Tailwind CSS ใช้กับโปรเจค Next.js / Vite ที่ตั้งค่า shadcn ไว้แล้วได้ทันที
      </p>

      <div className="mt-10">
        <Step n={1} title="เปิดเว็บคู่มือในเครื่อง">
          <p>clone repo <code className="rounded bg-zinc-100 px-1">design-assets</code> แล้วรัน:</p>
          <CodeBlock code={"npm install\nnpm run dev"} lang="bash" title="terminal" />
          <p>เปิด <code className="rounded bg-zinc-100 px-1">http://localhost:4000</code> เว็บต้องเปิดค้างไว้ตอนใช้คำสั่ง <code className="rounded bg-zinc-100 px-1">shadcn add</code> ในขั้นต่อไป</p>
        </Step>

        <Step n={2} title="เลือกโปรเจคต้นแบบ">
          <p>
            ดูหน้า <Link href="/compare" className="text-blue-600 hover:underline">เปรียบเทียบโปรเจค</Link> แล้วเลือกโปรเจคที่โทนใกล้งานของคุณ อ่านหน้า <b>กติกาและ Do/Don&apos;t</b> ของโปรเจคนั้นก่อนเริ่ม
          </p>
        </Step>

        <Step n={3} title="ใส่ธีมสี (ทั้งโปรเจค)">
          <p>ไปที่หน้า Foundations ของโปรเจคต้นแบบ → หัวข้อ &quot;ก๊อปธีมไปใช้&quot; แล้วเลือกทางใดทางหนึ่ง:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>คัดลอก CSS ไปวางใน <code className="rounded bg-zinc-100 px-1">globals.css</code></li>
            <li>หรือรันคำสั่ง (ตัวอย่าง RMC Sale Support):</li>
          </ul>
          <CodeBlock code="npx shadcn@latest add http://localhost:4000/r/rmc-salesupport-theme.json" lang="bash" title="terminal" />
        </Step>

        <Step n={4} title="หยิบ component ที่ต้องการ">
          <p>เข้าไปที่ component → แท็บ Preview ดูหน้าตา → ด้านล่างมีคำสั่งติดตั้ง เช่น:</p>
          <CodeBlock code="npx shadcn@latest add http://localhost:4000/r/nong-wang-jai-metric-card.json" lang="bash" title="terminal" />
          <p>
            ไฟล์จะไปอยู่ที่ <code className="rounded bg-zinc-100 px-1">components/&lt;โปรเจค&gt;/&lt;ชื่อไฟล์&gt;.tsx</code> แยกโฟลเดอร์ตามโปรเจค เลยไม่ชนกันถ้าหยิบปุ่มจากหลายโปรเจค
            ถ้าไม่ได้ใช้ shadcn CLI ให้กดแท็บ Code → คัดลอก → วางเอง แล้วติดตั้ง package ตามที่หน้านั้นบอก
          </p>
          <p>ติดตั้งหลายชิ้นพร้อมกันได้:</p>
          <CodeBlock
            code={"npx shadcn@latest add \\\n  http://localhost:4000/r/washout-pit-metric-card.json \\\n  http://localhost:4000/r/washout-pit-request-table.json"}
            lang="bash"
            title="terminal"
          />
        </Step>

        <Step n={5} title="ปรับให้เข้ากับงานของคุณ">
          <ul className="list-disc space-y-1 pl-5">
            <li>component ส่วนใหญ่รับข้อมูลผ่าน props (เช่น รายการเมนู, แถวตาราง) เปลี่ยนข้อมูลได้เลยไม่ต้องแก้ style</li>
            <li>ถ้าจะเปลี่ยนสี ให้แก้ที่ธีม (ตัวแปร CSS) ก่อน ไม่ควรแก้ hex ในไฟล์ทีละจุด</li>
            <li>เมนูตัวอย่างใช้ปุ่ม + state ภายใน เวลาใช้จริงให้เปลี่ยนเป็น <code className="rounded bg-zinc-100 px-1">next/link</code> และเช็ก active จาก pathname</li>
          </ul>
        </Step>
      </div>

      <section className="mt-6 rounded-xl border bg-zinc-50 p-6">
        <h2 className="text-lg font-bold">สำหรับคนดูแลเว็บนี้</h2>
        <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-700">
          <p><b>เพิ่ม/แก้ design ของโปรเจค:</b> แก้ไฟล์ใน <code className="rounded bg-white px-1">registry/&lt;slug&gt;/</code></p>
          <ul className="list-disc space-y-1 pl-5">
            <li><code className="rounded bg-white px-1">project.ts</code> — สี ฟอนต์ เมนู กติกา และรายการ component</li>
            <li><code className="rounded bg-white px-1">components/*.tsx</code> — โค้ดที่คนอื่นจะก๊อปไปใช้</li>
            <li><code className="rounded bg-white px-1">demos.tsx</code> — ตัวอย่างที่แสดงในแท็บ Preview</li>
            <li><code className="rounded bg-white px-1">screenshots/</code> — ภาพหน้าจอจริง (สร้างด้วยสคริปต์)</li>
          </ul>
          <p><b>เพิ่มโปรเจคใหม่:</b> ก๊อปโฟลเดอร์ของโปรเจคที่มีอยู่ไปเป็น slug ใหม่ แล้วเพิ่มชื่อใน <code className="rounded bg-white px-1">lib/projects.ts</code> และ <code className="rounded bg-white px-1">lib/demos.ts</code></p>
          <p><b>อัปเดตภาพหน้าจอ:</b></p>
          <CodeBlock code={"npm run browser          # เปิด Chrome แล้ว login SSO เอง\nnpm run capture          # เก็บภาพทุกโปรเจค\nnpm run capture stock    # หรือเฉพาะโปรเจค"} lang="bash" title="terminal" />
          <p>รายการหน้าที่เก็บภาพอยู่ใน <code className="rounded bg-white px-1">scripts/capture-pages.mjs</code> · session login เก็บใน <code className="rounded bg-white px-1">.auth/</code> (ไม่เข้า git)</p>
        </div>
      </section>
    </div>
  );
}
