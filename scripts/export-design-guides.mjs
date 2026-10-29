import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'design-guides');
const fence = (lang, code) => `\n\`\`\`${lang}\n${code.trimEnd()}\n\`\`\`\n`;
const bullets = (items = []) => items.map(x => `- ${x}`).join('\n');
const cell = value => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', '<br>');
const table = (headers, rows) => [headers, headers.map(() => '---'), ...rows].map(row => `| ${row.map(cell).join(' | ')} |`).join('\n');
const scales = rows => table(['รายการ', 'ค่า', 'การใช้งาน'], rows.map(r => [r.name, r.value, r.usage]));
const utils = await readFile(path.join(root, 'lib/utils.ts'), 'utf8');
const slugs = (await readdir(path.join(root, 'registry'), { withFileTypes: true })).filter(d => d.isDirectory()).map(d => d.name).sort();
await mkdir(out, { recursive: true });
const index = [];
for (const slug of slugs) {
  const source = await readFile(path.join(root, 'registry', slug, 'project.ts'), 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  const { project: p } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
  const deps = [...new Set(['clsx', 'tailwind-merge', ...p.components.flatMap(c => c.dependencies ?? [])])].sort();
  const sections = [
    `# ${p.title} — คู่มือดีไซน์พร้อมโค้ด`,
    'ไฟล์นี้ใช้ได้ด้วยตัวเอง มีสเปกดีไซน์ ธีม และโค้ด component ครบ ไม่ต้องเปิดเว็บคลัง ไม่ต้องใช้ shadcn CLI',
    '## ใช้กับโปรเจคของคุณใน 3 ขั้นตอน',
    '1. ดาวน์โหลดไฟล์ .md นี้เก็บไว้ในโปรเจคของคุณ\n2. แนบไฟล์ให้ AI ที่ช่วยเขียนโค้ด หรือให้ AI อ่านไฟล์ในโฟลเดอร์\n3. บอกชื่อส่วนที่อยากใช้ แล้วตรวจผลในโปรเจคของคุณ',
    '### ข้อความพร้อมส่งให้ AI',
    `> อ่านไฟล์นี้ แล้วนำดีไซน์ ${p.title} มาใช้กับโปรเจคของฉัน โดยเลือกเฉพาะ [ระบุ เช่น เมนู / ปุ่ม / ตาราง / ธีมสี] ตรวจ framework และ CSS ของโปรเจคก่อน ปรับโค้ดให้เข้ากัน คงการทำงาน API และสิทธิ์เดิมไว้ พร้อมตรวจหน้าจอมือถือและเดสก์ท็อป`,
    '## คำแนะนำสำหรับผู้พัฒนาและ AI',
    bullets([
      'ใช้ข้อมูลทั้งหมดในไฟล์นี้ได้โดยไม่ต้องเปิด localhost:4000 หรือเข้าถึง repo ต้นทางเพิ่มเติม',
      'โค้ดตัวอย่างเป็น React + TypeScript + Tailwind CSS ถ้าใช้ framework อื่น ให้ใช้สเปกดีไซน์แล้วเขียนใหม่ให้ตรงกับโปรเจคปลายทาง',
      'เลือกเฉพาะ component ที่ต้องการ ไม่จำเป็นต้องคัดลอกทั้งหมด ตรวจ import ที่อ้างไฟล์ข้างเคียงและนำไฟล์นั้นไปด้วย (โค้ดทุก component อยู่ท้ายไฟล์นี้)',
      'ติดตั้งเฉพาะ package ที่ component ที่เลือก import และยังไม่มีในโปรเจค; การอ่านไฟล์นี้ไม่ต้องติดตั้งอะไร',
      'ใช้ cn เดิมของโปรเจคถ้ามี มิฉะนั้นใช้โค้ด lib/utils.ts ด้านล่าง และปรับ alias @/ ให้ตรงกับปลายทาง',
      'ธีม CSS ด้านล่างเป็นตัวแปรพื้นฐาน สำหรับ Tailwind v4 ให้ผูกผ่าน @theme inline; สำหรับ v3 ให้ผูกใน tailwind.config ของปลายทาง',
      'ตรวจฟอนต์ที่ใช้จริง: var(--font-...) ต้องตั้งค่า font ในโปรเจคปลายทางก่อน ไฟล์นี้ไม่ได้ฝังไฟล์ฟอนต์หรือรูปภาพ',
      'บาง component ใช้สีที่กำหนดใน class โดยตรง เปลี่ยนธีมอย่างเดียวอาจไม่เปลี่ยนสีทั้งหมด',
      'เมนูและข้อมูลเป็นตัวอย่าง ต้องต่อ routing, state, API และสิทธิ์กับระบบปลายทาง พร้อมตรวจ keyboard, focus และ responsive',
      'อย่าทับ global CSS หรือ component เดิมทั้งไฟล์ ให้รวมเฉพาะส่วนที่เลือกและตรวจผลกระทบกับหน้าเดิม',
    ]),
    '## ภาพรวม', p.summary,
    `แนวเทคโนโลยีต้นแบบ: ${p.stack.join(', ')}`,
    '### บุคลิกของดีไซน์', bullets(p.tone),
    '### เหมาะกับงาน', bullets(p.useWhen),
    '## สี', ...p.colors.flatMap(g => [`### ${g.title}`, g.description ?? '', table(['ชื่อ', 'ค่าสี', 'การใช้งาน'], g.tokens.map(t => [t.name, t.value, t.usage]))]),
    '## ฟอนต์และตัวอักษร', `Font family: \`${p.fontFamily}\``, p.typography.fontNote,
    table(['รายการ', 'ขนาด', 'น้ำหนัก', 'การใช้งาน'], p.typography.rows.map(r => [r.name, r.size, r.weight, r.usage])),
    '## ระยะห่าง', scales(p.spacing), '## มุมโค้ง', scales(p.radius), '## เงา', scales(p.shadows), '## Layout', scales(p.layout),
    '## เมนูและการนำทาง', p.menu.type, p.menu.description, scales(p.menu.specs),
    ...p.menu.groups.flatMap(g => [`### ${g.title}`, bullets(g.items.map(i => `${i.label}${i.icon ? ` (icon: ${i.icon})` : ''}${i.note ? ` — ${i.note}` : ''}`))]),
    bullets(p.menu.notes),
    '## กติกาดีไซน์', '### ควรทำ', bullets(p.guidelines.do), '### ควรเลี่ยง', bullets(p.guidelines.dont),
    ...(p.guidelines.sections ?? []).flatMap(s => [`### ${s.title}`, bullets(s.items)]),
    '## ธีม CSS', fence('css', `:root {\n${Object.entries(p.cssVars).map(([k,v]) => `  --${k}: ${v};`).join('\n')}\n}`),
    '### ผูกตัวแปรกับ Tailwind v4',
    fence('css', `@theme inline {\n${Object.keys(p.cssVars).filter(k => k !== 'radius' && !k.startsWith('shadow') && !k.startsWith('font')).map(k => `  --color-${k}: var(--${k});`).join('\n')}\n  --radius-lg: var(--radius);\n  --radius-md: calc(var(--radius) - 2px);\n  --radius-sm: calc(var(--radius) - 4px);\n}`),
    '## โค้ดตัวช่วย lib/utils.ts', fence('tsx', utils),
    '## รายการ component', table(['ID ที่บอก AI ได้', 'ชื่อ', 'หน้าที่'], p.components.map(c => [c.id, c.name, c.description])),
    `Package ที่ใช้ในชุดนี้ (เลือกติดตั้งเฉพาะที่นำไปใช้): ${deps.map(d => `\`${d}\``).join(', ')}`,
    '## โค้ด component',
  ];
  for (const c of p.components) {
    const code = await readFile(path.join(root, 'registry', slug, 'components', c.file), 'utf8');
    sections.push(`### ${c.id} — ${c.name}`, c.description, `ตำแหน่งไฟล์แนะนำ: \`components/${slug}/${c.file}\``, `Package เพิ่มเติม: ${(c.dependencies ?? []).join(', ') || 'ไม่มี (ตรวจ React และ utils ตาม import)'}`, fence('tsx', code));
  }
  await writeFile(path.join(out, `${slug}.md`), sections.filter(Boolean).join('\n\n') + '\n');
  index.push([`[${p.title}](./${slug}.md)`, p.summary]);
}
await writeFile(path.join(out, 'README.md'), `# เลือกดีไซน์แล้วดาวน์โหลดไฟล์เดียว\n\nไม่ต้อง clone repo ไม่ต้องรันเว็บ และไม่ต้องใช้ shadcn CLI\n\n1. เลือกดีไซน์จากตารางด้านล่าง\n2. เปิดไฟล์ .md แล้วกด **Download raw file** ที่มุมบนของไฟล์ (หากแสดงเป็นไอคอน ให้มองหารูปลูกศรดาวน์โหลด)\n3. แนบไฟล์ให้ AI ในโปรเจคของคุณ แล้วบอกส่วนที่อยากใช้\n\nตัวอย่างข้อความ:\n\n> อ่านไฟล์นี้ แล้วนำเมนู side-nav ของ nong-wang-jai มาใช้กับโปรเจคนี้ ปรับให้เข้ากับโครงสร้างเดิมและคงการทำงานเดิมไว้\n\n${table(['เลือกไฟล์ดีไซน์', 'หน้าตา / เหมาะกับงาน'], index)}\n\nแต่ละไฟล์รวมสี ฟอนต์ Layout กติกา ธีม และโค้ด component ครบ ใช้ออฟไลน์หลังดาวน์โหลดได้ โค้ดเป็น React + Tailwind; AI ต้องปรับให้เข้ากับโปรเจคปลายทาง รูปภาพและไฟล์ฟอนต์ไม่ได้ฝังอยู่ใน .md\n\nRepository นี้เป็น Private สมาชิกต้องได้รับสิทธิ์และล็อกอิน GitHub ก่อนดาวน์โหลด\n\nสำหรับผู้ดูแล: เมื่อแก้ registry ให้รัน \`npm run export:guides\` แล้ว commit ไฟล์ .md ที่อัปเดตไปด้วย\n`);
console.log(`Exported ${slugs.length} standalone design guides to design-guides/`);
