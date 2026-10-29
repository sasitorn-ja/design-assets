"use client";

import { useState } from "react";
import { Download, Layers3, MapPin, Search, Users } from "lucide-react";
import { SideNav } from "./components/side-nav";
import { MetricCard } from "./components/metric-card";
import { StatusPill } from "./components/status-pill";
import { Button } from "./components/button";
import { ToggleGroup } from "./components/toggle-group";
import { DashboardCard } from "./components/dashboard-card";
import { DataTable, NumberWithUnit, ClampText, CompactDateTime } from "./components/data-table";
import { ProgressList } from "./components/progress-list";
import { EmptyState, LoadingState } from "./components/empty-state";

// ตัวอย่างการใช้งานของแต่ละ component (key ตรงกับ id ใน project.ts)
export const demos: Record<string, () => React.ReactNode> = {
  "side-nav": () => (
    <div className="h-[520px] overflow-hidden rounded-lg border border-[#e8edf3]">
      <SideNav />
    </div>
  ),
  "metric-card": () => (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
      <MetricCard icon={<Users className="size-4" />} label="อัตรา Dealer ที่ใช้งานอยู่" value="12" unit="%" detail="ข้อมูลตามตัวกรองปัจจุบัน" tone="emerald" />
      <MetricCard icon={<Layers3 className="size-4" />} label="Total Groups" value="106" unit="กลุ่ม" detail="ข้อมูลตามตัวกรองปัจจุบัน" tone="violet" />
      <MetricCard icon={<MapPin className="size-4" />} label="Top Region" value="CPAC East" detail="ยอดส่งจริงสูงสุด" tone="sky" />
    </div>
  ),
  "status-pill": () => (
    <div className="flex flex-wrap gap-2">
      <StatusPill status="confirmed" />
      <StatusPill status="pending" />
      <StatusPill status="cancelled" />
      <StatusPill status="other" />
    </div>
  ),
  button: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button>บันทึก</Button>
      <Button variant="secondary">ยกเลิก</Button>
      <Button variant="outline">
        <Download className="size-4" />
        ดาวน์โหลด
      </Button>
      <Button variant="ghost">ล้างตัวกรอง</Button>
      <Button size="icon" variant="outline" aria-label="ค้นหา">
        <Search className="size-4" />
      </Button>
    </div>
  ),
  "toggle-group": function Demo() {
    const [v, setV] = useState<"all" | "year" | "month" | "day">("all");
    return (
      <ToggleGroup
        ariaLabel="ช่วงเวลา"
        value={v}
        onChange={setV}
        options={[
          { label: "ทั้งหมด", value: "all" },
          { label: "ปี", value: "year" },
          { label: "เดือน", value: "month" },
          { label: "วัน", value: "day" },
        ]}
      />
    );
  },
  "dashboard-card": () => (
    <DashboardCard className="w-full max-w-md" title="ปริมาณการขายแยกตามพื้นที่ของ Dealer" description="ปริมาณส่งจริงรวมจาก Order แยกตามพื้นที่ Dealer" unit="คิว">
      <p className="text-sm text-slate-600">ใส่ตาราง หรือกราฟ 1 ชิ้นต่อ 1 กล่อง</p>
    </DashboardCard>
  ),
  "data-table": () => (
    <div className="w-full max-w-3xl">
      <DataTable
        rowKey={(r) => r.id}
        rows={[
          { id: "1", name: "บจ.วีอาร์ คอนสตรัคชั่น แมททีเรียล", region: "CPAC West", ordered: "5", delivered: "0", status: "pending" as const, updated: "29 ต.ค. 2569 14:30 น." },
          { id: "2", name: "บ.เตียฮงฮะ สิริพานิช จก.", region: "CPAC East", ordered: "1,020", delivered: "952.8", status: "confirmed" as const, updated: "28 ต.ค. 2569 09:12 น." },
          { id: "3", name: "บ.เอกภัณฑ์ซีเมนต์ จก.", region: "CPAC East", ordered: "12", delivered: "6", status: "cancelled" as const, updated: "27 ต.ค. 2569 17:45 น." },
        ]}
        columns={[
          { key: "name", header: "Dealer", width: "30%", render: (r) => <ClampText>{r.name}</ClampText> },
          { key: "region", header: "พื้นที่", width: "15%", render: (r) => <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-700">{r.region}</span> },
          { key: "ordered", header: "ปริมาณที่สั่ง", width: "14%", align: "right", render: (r) => <NumberWithUnit value={r.ordered} unit="คิว" /> },
          { key: "delivered", header: "ปริมาณส่งจริง", width: "14%", align: "right", render: (r) => <NumberWithUnit value={r.delivered} unit="คิว" /> },
          { key: "status", header: "สถานะ", width: "13%", align: "center", render: (r) => <StatusPill status={r.status} /> },
          { key: "updated", header: "อัปเดตล่าสุด", width: "14%", render: (r) => <CompactDateTime value={r.updated} /> },
        ]}
      />
    </div>
  ),
  "progress-list": () => (
    <div className="w-full max-w-sm">
      <ProgressList
        rows={[
          { label: "บ.เตียฮงฮะ สิริพานิช จก.", sublabel: "EAST", value: 952.8, total: 952.8, unit: "คิว" },
          { label: "บ.สุทธิพงศ์ค้าวัสดุก่อสร้าง", sublabel: "EAST", value: 213.3, total: 952.8, unit: "คิว" },
          { label: "บ.เอกภัณฑ์อรัญโฮม จก.", sublabel: "EAST", value: 59.3, total: 952.8, unit: "คิว" },
        ]}
      />
    </div>
  ),
  "empty-state": () => (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
      <EmptyState title="ไม่พบ Dealer ตามตัวกรอง" hint="ลองเปลี่ยนภูมิภาคหรือช่วงเวลา" />
      <div className="rounded-lg border border-[#dfe7ef] bg-white">
        <LoadingState />
      </div>
    </div>
  ),
};
