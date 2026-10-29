"use client";

import { useState } from "react";
import { Droplets, FileCheck2, Layers3, Plus, RotateCcw, Search, Wind } from "lucide-react";
import { TopNav } from "./components/top-nav";
import { PageHero } from "./components/page-hero";
import { MetricCard } from "./components/metric-card";
import { StatusTabs } from "./components/status-tabs";
import { RequestTable } from "./components/request-table";
import { RequestStepper } from "./components/request-stepper";
import { Button } from "./components/button";

export const demos: Record<string, () => React.ReactNode> = {
  "top-nav": () => (
    <div className="h-[320px] w-full rounded-xl border border-[#cfeaf5] bg-[#f9fbfe]">
      <TopNav />
      <p className="p-6 text-sm text-[#53738b]">กดที่ชื่อผู้ใช้มุมขวาเพื่อเปิดแผงบัญชี</p>
    </div>
  ),
  "page-hero": () => (
    <div className="w-full max-w-5xl">
      <PageHero title="คำขออนุมัติดำเนินการจัดการคอนกรีตเหลือของฉัน" description="รายการคำขอทั้งหมดของคุณ ทั้งฉบับร่างที่สามารถแก้ไขได้และรายการที่ส่งเรียบร้อยแล้ว" />
      <p className="mt-2 text-center text-xs text-[#53738b]">เว็บจริงใช้ภาพโรงงานและรถโม่ผ่าน prop image</p>
    </div>
  ),
  "metric-card": () => (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <MetricCard tone="teal" label="เอกสารที่ส่งแล้ว" value={8} unit="รายการ" icon={<FileCheck2 />} />
      <MetricCard tone="purple" label="ปริมาตรตามคำขอ" value={2189} unit="หน่วย : ลบ.ม." icon={<Layers3 />} />
      <MetricCard tone="blue" label="ขุดเปียก" value={2} unit="รายการ" icon={<Droplets />} />
      <MetricCard tone="orange" label="ขุดแห้ง" value={6} unit="รายการ" icon={<Wind />} />
    </div>
  ),
  "status-tabs": function Demo() {
    const [tab, setTab] = useState("all");
    const [q, setQ] = useState("");
    return (
      <div className="w-full max-w-5xl">
        <StatusTabs value={tab} onChange={setTab} search={q} onSearch={setQ} />
      </div>
    );
  },
  "request-table": () => (
    <div className="w-full max-w-5xl">
      <RequestTable
        rows={[
          { docNo: null, plant: "คาราบาว", plantCode: "13AL", type: "dry", volume: 4440, status: "draft", updatedAt: "09-ต.ค.-2026 16:21" },
          { docNo: "CWP-2026-0012", plant: "บางนา กม.36/2", plantCode: "11BN", type: "wet", volume: 2000, status: "sent", sentAt: "12-ต.ค.-2026", updatedAt: "12-ต.ค.-2026 10:05" },
          { docNo: "CWP-2026-0009", plant: "ลาดกระบัง", plantCode: "11LK", type: "dry", volume: 189, status: "approved", sentAt: "02-ต.ค.-2026", updatedAt: "05-ต.ค.-2026 08:40" },
        ]}
      />
    </div>
  ),
  "request-stepper": function Demo() {
    const [step, setStep] = useState(2);
    return (
      <div className="w-full max-w-5xl">
        <RequestStepper current={step} onSelect={setStep} />
      </div>
    );
  },
  button: () => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button><Search className="size-4" />ค้นหาข้อมูล</Button>
      <Button variant="strong"><Plus className="size-4" />สร้างคำขอใหม่</Button>
      <Button variant="secondary"><RotateCcw className="size-4" />ล้างตัวกรอง</Button>
      <Button variant="quiet">ดูรายละเอียด</Button>
      <Button variant="danger" size="sm">ลบ</Button>
    </div>
  ),
};
