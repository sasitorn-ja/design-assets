"use client";

import { useState, type CSSProperties } from "react";
import { MoonStar, RotateCcw, SunMedium, Trash2 } from "lucide-react";
import { Sidebar } from "./components/sidebar";
import { SummaryCard } from "./components/summary-card";
import { Button } from "./components/button";
import { Segmented } from "./components/segmented";
import { FilterBar } from "./components/filter-bar";
import { Panel, ChartBox } from "./components/panel";
import { DataTable, Badge } from "./components/data-table";
import { Alert, EmptyState } from "./components/alert";
import { pricingMonitorDark } from "./project";

const darkStyle = Object.fromEntries(Object.entries(pricingMonitorDark).map(([k, v]) => [`--${k}`, v])) as CSSProperties;
const darkBg =
  "radial-gradient(circle at top left, rgba(61,94,255,.28), transparent 24%), radial-gradient(circle at top right, rgba(30,178,166,.20), transparent 22%), linear-gradient(180deg,#081121 0%,#111d34 54%,#0b1424 100%)";

function MiniChart() {
  const pts = [20, 22, 21, 40, 33, 30, 38, 68, 74, 72, 98, 105, 126, 118];
  const path = pts.map((y, i) => `${i === 0 ? "M" : "L"}${20 + i * 40},${180 - y}`).join(" ");
  return (
    <svg viewBox="0 0 580 200" className="h-[200px] w-full min-w-[480px]">
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="20" x2="560" y1={180 - i * 40} y2={180 - i * 40} stroke="var(--border)" strokeDasharray="4 4" />
      ))}
      <path d={path} fill="none" stroke="#fb7185" strokeWidth="3" />
      {pts.map((y, i) => (
        <circle key={i} cx={20 + i * 40} cy={180 - y} r="4" fill="var(--surface)" stroke="#fb7185" strokeWidth="2" />
      ))}
    </svg>
  );
}

export const demos: Record<string, () => React.ReactNode> = {
  sidebar: () => (
    <div className="h-[420px] overflow-hidden rounded-[20px] border border-[var(--border)]">
      <Sidebar />
    </div>
  ),
  "summary-card": () => (
    <div className="grid w-full max-w-3xl gap-3 md:grid-cols-2">
      <SummaryCard label="Avg increase" value="312.23 บาท B/CU" description="คำนวณจากข้อมูล ณ วันที่ 28 ต.ค." action={<Button variant="outline" size="sm">วิธีคำนวณ</Button>} />
      <SummaryCard label="Average to target" value="26.09%" description="สัดส่วนโครงการที่ขึ้นถึง 300 บาท B/CU ขึ้นไป" action={<Button variant="outline" size="sm">วิธีคำนวณ</Button>} />
    </div>
  ),
  button: function Demo() {
    const [active, setActive] = useState("M");
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button>บันทึก</Button>
          <Button variant="secondary">ยกเลิก</Button>
          <Button variant="outline">วิธีคำนวณ</Button>
          <Button variant="ghost">ล้าง</Button>
          <Button variant="destructive"><Trash2 className="size-4" />ลบ</Button>
          <Button variant="outline" size="icon" aria-label="รีเฟรช"><RotateCcw className="size-4" /></Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {["M", "L", "MEGA", "Tiny"].map((s) => (
            <Button key={s} variant="chip" size="sm" data-active={active === s} onClick={() => setActive(s)}>{s}</Button>
          ))}
        </div>
      </div>
    );
  },
  segmented: function Demo() {
    const [v, setV] = useState<"daily" | "weekly">("daily");
    return <Segmented ariaLabel="ช่วงเวลา" value={v} onChange={setV} options={[{ value: "daily", label: "Daily" }, { value: "weekly", label: "Weekly" }]} />;
  },
  "filter-bar": () => (
    <div className="w-full overflow-hidden rounded-[20px] border border-[var(--border)]">
      <FilterBar />
    </div>
  ),
  panel: function Demo() {
    const [dark, setDark] = useState(false);
    const [v, setV] = useState<"daily" | "weekly">("daily");
    return (
      <div className="w-full rounded-[24px] p-4 transition-colors" style={dark ? { ...darkStyle, background: darkBg, color: "#eef4ff" } : undefined}>
        <Panel
          eyebrow="Trend"
          title="ค่าเฉลี่ยการขึ้นราคาเทียบ Baseline รายวัน"
          description="เส้นนี้ช่วยดู momentum ว่าค่าเฉลี่ยการขึ้นราคาเคลื่อนไปทางไหน"
          actions={
            <>
              <Segmented value={v} onChange={setV} options={[{ value: "daily", label: "Daily" }, { value: "weekly", label: "Weekly" }]} />
              <Button variant="outline" size="icon" aria-label="สลับธีม" onClick={() => setDark((d) => !d)}>
                {dark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
              </Button>
            </>
          }
        >
          <ChartBox>
            <MiniChart />
          </ChartBox>
        </Panel>
        <p className="mt-3 text-center text-xs opacity-70">กดปุ่มพระจันทร์เพื่อสลับ dark / light — component เดิม แค่เปลี่ยนค่าตัวแปร</p>
      </div>
    );
  },
  "data-table": () => (
    <div className="w-full max-w-3xl">
      <DataTable
        rowKey={(r) => r.code}
        rows={[
          { code: "P-1029", name: "คอนโด The Line สาทร", division: "BKK", inc: "512.40", status: "success" as const },
          { code: "P-1033", name: "โรงงาน AMATA C2", division: "EAST", inc: "286.00", status: "warning" as const },
          { code: "P-1101", name: "สะพานข้ามแยกบางนา", division: "BKK", inc: "88.50", status: "error" as const },
        ]}
        columns={[
          { key: "code", header: "Project", render: (r) => <span className="font-semibold">{r.code}</span> },
          { key: "name", header: "ชื่อโครงการ", render: (r) => r.name },
          { key: "division", header: "Division", render: (r) => r.division },
          { key: "inc", header: "Increase (บาท)", align: "right", render: (r) => <span className="font-bold">{r.inc}</span> },
          { key: "status", header: "สถานะ", render: (r) => <Badge tone={r.status}>{r.status === "success" ? "ถึงเป้า" : r.status === "warning" ? "ใกล้เป้า" : "ต่ำกว่าเป้า"}</Badge> },
        ]}
      />
    </div>
  ),
  alert: () => (
    <div className="grid w-full max-w-2xl gap-3">
      <Alert tone="error" title="Token Data Ocean หมดอายุ" action={<Button size="sm">เปลี่ยน token</Button>}>ข้อมูลล่าสุดจะไม่อัปเดตจนกว่าจะเปลี่ยน token ใหม่</Alert>
      <Alert tone="success" title="บันทึกการตั้งค่าแล้ว" />
      <EmptyState title="ไม่พบโครงการตามตัวกรอง" hint="ลองเลือก Division หรือช่วงวันที่ใหม่ หรือกดล้างตัวกรองทั้งหมด" action={<Button variant="outline" size="sm">ล้างตัวกรอง</Button>} />
    </div>
  ),
};
