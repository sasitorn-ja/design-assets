"use client";

import { Download, Plus, Store, Truck, Wallet } from "lucide-react";
import { TopNav } from "./components/top-nav";
import { MobileMenu } from "./components/mobile-menu";
import { Button } from "./components/button";
import { PillTabs } from "./components/pill-tabs";
import { StickerCard, StickerCardContent, StickerCardHeader, StickerStat } from "./components/sticker-card";
import { RebateProgress } from "./components/rebate-progress";
import { LoginCard } from "./components/login-card";
import { StickerMenu } from "./components/sticker-menu";
import { DataTable } from "./components/data-table";
import { PageCanvas, PageSkeleton } from "./components/page-canvas";

const tiers = [
  { min: 0, max: 499.99, rate: 0 },
  { min: 500, max: 999.99, rate: 20 },
  { min: 1000, max: 1999.99, rate: 30 },
  { min: 2000, max: null, rate: 40 },
];

export const demos: Record<string, () => React.ReactNode> = {
  "top-nav": () => (
    <PageCanvas className="min-h-[300px] w-full overflow-hidden rounded-2xl border border-[#cfe6f5]">
      <TopNav />
    </PageCanvas>
  ),
  "mobile-menu": () => (
    <div className="h-[560px] w-[375px] overflow-hidden rounded-[28px] border-[6px] border-[#0c2a44] bg-[#f3faff]">
      <MobileMenu defaultOpen />
    </div>
  ),
  button: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button><Plus />สร้างแคมเปญ</Button>
      <Button variant="outline"><Download />ส่งออก</Button>
      <Button variant="soft">ดูรายละเอียด</Button>
      <Button variant="ghost">ยกเลิก</Button>
      <Button variant="destructive">ลบ</Button>
      <Button size="sm">เล็ก</Button>
      <Button size="lg">ใหญ่</Button>
    </div>
  ),
  "pill-tabs": () => (
    <div className="flex flex-col items-center gap-4">
      <PillTabs tabs={[{ id: "daily", label: "รายวัน" }, { id: "monthly", label: "รายเดือน" }]} />
      <PillTabs tabs={[{ id: "all", label: "ทั้งหมด" }, { id: "dp", label: "Dealer Price" }, { id: "small", label: "โม่เล็ก" }, { id: "ep", label: "Easypump" }]} />
    </div>
  ),
  "sticker-card": () => (
    <div className="grid w-full max-w-4xl gap-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <StickerStat icon={<Truck />} label="ยอดสะสมเดือนนี้" value="1,284.5" unit="คิว" hint="เฉลี่ย 42.8 คิว/วัน" />
        <StickerStat icon={<Wallet />} label="Rebate โดยประมาณ" value="38,535" unit="บาท" hint="อัตราปัจจุบัน ฿30/คิว" />
        <StickerStat icon={<Store />} label="ร้านที่มียอด" value="361" unit="ร้าน" />
      </div>
      <StickerCard>
        <StickerCardHeader title="ยอดขายที่ปิดแล้ว" description="ข้อมูลรายเดือน" action={<Button size="sm" variant="outline">ดูทั้งหมด</Button>} />
        <StickerCardContent><p className="text-sm text-[#5a7489]">เนื้อหาการ์ด เช่น กราฟ หรือรายการ</p></StickerCardContent>
      </StickerCard>
    </div>
  ),
  "rebate-progress": () => (
    <StickerCard className="w-full max-w-md">
      <StickerCardHeader title="Rebate · Dealer Price" description="พ.ย. 2569" />
      <StickerCardContent><RebateProgress volume={1284.5} tiers={tiers} /></StickerCardContent>
    </StickerCard>
  ),
  "login-card": () => (
    <div className="w-full overflow-hidden rounded-2xl border border-[#dce6ed]">
      <LoginCard />
    </div>
  ),
  "sticker-menu": () => (
    <div className="flex h-72 w-full items-start justify-center pt-4">
      <StickerMenu
        options={[
          { id: "cpac", label: "CPAC", hint: "คอนกรีตผสมเสร็จ" },
          { id: "qmix", label: "QMIX", hint: "Q-Mix Supply" },
          { id: "all", label: "ทุกกิจการ", hint: "Super Admin เท่านั้น" },
        ]}
      />
    </div>
  ),
  "data-table": () => (
    <div className="w-full max-w-3xl">
      <DataTable
        columns={[
          { key: "rank", header: "อันดับ", align: "center" },
          { key: "store", header: "ร้านค้า" },
          { key: "volume", header: "ยอดขาย (คิว)", align: "right" },
          { key: "rebate", header: "Rebate (บาท)", align: "right" },
        ]}
        rows={[
          { rank: 1, store: "ร้านวัสดุก่อสร้าง A", volume: "2,418.00", rebate: "96,720" },
          { rank: 2, store: "ร้านวัสดุก่อสร้าง B", volume: "1,904.50", rebate: "57,135" },
          { rank: 3, store: "ร้านวัสดุก่อสร้าง C", volume: "1,284.50", rebate: "38,535" },
        ]}
      />
    </div>
  ),
  "page-canvas": () => (
    <PageCanvas className="w-full rounded-2xl border border-[#cfe6f5] p-6">
      <PageSkeleton />
    </PageCanvas>
  ),
};
