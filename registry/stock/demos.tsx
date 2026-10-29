"use client";

import { useState } from "react";
import { Camera, History, Plus } from "lucide-react";
import { Sidebar } from "./components/sidebar";
import { PageHeading } from "./components/page-heading";
import { Button } from "./components/button";
import { StatusPill } from "./components/status-pill";
import { JobTable } from "./components/job-table";
import { DriverCard } from "./components/driver-card";
import { QuantityStepper } from "./components/quantity-stepper";

export const demos: Record<string, () => React.ReactNode> = {
  sidebar: () => (
    <div className="h-[460px] overflow-hidden rounded-2xl border border-[#d8dde6]">
      <Sidebar />
    </div>
  ),
  "page-heading": () => (
    <div className="w-full max-w-4xl">
      <PageHeading
        title="รายการงาน"
        description="ภาพรวมงานขนส่ง ติดตามความคืบหน้า และจัดการทุกเที่ยวส่ง"
        actions={
          <>
            <span className="rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-xs">3 งาน</span>
            <Button variant="glass"><History className="size-4" />ประวัติงาน</Button>
            <Button variant="white"><Plus className="size-4" />สร้างงาน</Button>
          </>
        }
      />
      <p className="mt-2 text-center text-xs text-slate-500">ใส่ภาพจริงผ่าน prop image (เช่น ภาพคลังสินค้า) ตัวอย่างนี้ใช้ลายเส้นแทน</p>
    </div>
  ),
  button: () => (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button><Plus className="size-4" />สร้างงาน</Button>
        <Button variant="outline">จัดการ</Button>
        <Button variant="ghost">ยกเลิก</Button>
        <Button variant="destructive">ลบ PO</Button>
        <Button size="lg"><Camera className="size-4" />เปิดกล้อง</Button>
      </div>
      <div className="flex gap-2 rounded-2xl bg-[#0b2e55] p-4">
        <Button variant="glass"><History className="size-4" />ประวัติงาน</Button>
        <Button variant="white"><Plus className="size-4" />สร้างงาน</Button>
      </div>
    </div>
  ),
  "status-pill": () => (
    <div className="flex flex-wrap gap-2">
      <StatusPill status="ready" />
      <StatusPill status="in-transit" />
      <StatusPill status="delivered" />
      <StatusPill status="cancelled" />
    </div>
  ),
  "job-table": () => (
    <div className="w-full max-w-5xl">
      <JobTable
        jobs={[
          { id: "JOB-20260611-033024-000012", room: "26/05/69 รอบเช้า", route: "คลังCPAC บางซ่อน -> 1 ปลายทาง", pos: ["4648028161", "4648028162", "4648028163"], driver: "นายB", plate: "466", loaded: "0/3", delivered: "0/3", status: "ready" },
          { id: "JOB-20260611-024558-000011", room: "A123", route: "CPAC บางซ่อน -> 1 ปลายทาง", pos: ["4609014667", "4609014671", ...Array.from({ length: 64 }, (_, i) => `46090${i}`)], driver: "นายB", plate: "1234", loaded: "0/66", delivered: "0/66", status: "ready" },
          { id: "JOB-20260609-020046-000008", room: "9/6/69", route: "CPAC บางซ่อน -> 1 ปลายทาง", pos: ["8030545922", "8030564254"], driver: "คำไส", plate: "78-9909", loaded: "1/2", delivered: "0/2", status: "in-transit" },
        ]}
      />
    </div>
  ),
  "driver-card": () => (
    <div className="w-[360px]">
      <DriverCard room="26/05/69 รอบเช้า" jobId="JOB-20260611-033024-000012" phase="ขึ้นรถ" truck="466" driver="นายB" origin="เช็กอินแล้ว" nextStep="สแกนขึ้นรถให้ครบ" counts={{ toScan: 3, loaded: 0, delivered: 0 }} />
    </div>
  ),
  "quantity-stepper": function Demo() {
    const [v, setV] = useState(12);
    return <QuantityStepper value={v} onChange={setV} max={66} unit="ชิ้น" />;
  },
};
