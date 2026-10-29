"use client";

import { Check, Download, Plus, ShoppingBasket, Store, Truck, Wallet } from "lucide-react";
import { TopNav } from "./components/top-nav";
import { MobileTabBar } from "./components/mobile-tab-bar";
import { KpiCard } from "./components/kpi-card";
import { Button } from "./components/button";
import { Badge } from "./components/badge";
import { ShareBars } from "./components/share-bars";
import { RankTable } from "./components/rank-table";

export const demos: Record<string, () => React.ReactNode> = {
  "top-nav": () => (
    <div className="w-full overflow-hidden rounded-2xl border border-[#dce6ed]">
      <TopNav />
    </div>
  ),
  "mobile-tab-bar": () => (
    <div className="w-[375px] overflow-hidden rounded-[28px] border-[6px] border-[#092943] bg-[#f2f6f9]">
      <div className="flex h-[240px] items-center justify-center text-sm text-[#7890a1]">เนื้อหาหน้า Dealer</div>
      <MobileTabBar />
    </div>
  ),
  "kpi-card": () => (
    <div className="grid w-full max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <KpiCard icon={<Truck />} title="ยอดขายรวมทุกสินค้า (คิว)" value="532,340.91" unit="คิว" delta={1.7} hint="เฉลี่ย 19,012.2 คิว/วัน" />
      <KpiCard icon={<Wallet />} title="ยอดขายรวม (บาท)" value="42,618,240" unit="บาท" delta={-0.8} hint="รีเบต ฿42,618,240" />
      <KpiCard icon={<Store />} title="จำนวนร้านค้า" value="361" unit="ร้าน" hint="ที่มียอด · จากทั้งหมด 442 ร้าน" />
    </div>
  ),
  button: () => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button><Plus />สร้างแคมเปญ</Button>
      <Button variant="soft">ดูรายละเอียด</Button>
      <Button variant="outline"><Download />ส่งออก</Button>
      <Button variant="secondary">ตัวเลือก</Button>
      <Button variant="ghost">ยกเลิก</Button>
      <Button variant="success"><Check />อนุมัติ</Button>
      <Button variant="destructive-soft">ลบ</Button>
      <Button size="lg"><ShoppingBasket />สั่งสินค้า</Button>
    </div>
  ),
  badge: () => (
    <div className="flex flex-wrap gap-2">
      {(["default", "soft", "success", "warning", "destructive", "violet", "teal", "orange", "neutral"] as const).map((v) => (
        <Badge key={v} variant={v}>{v}</Badge>
      ))}
    </div>
  ),
  "share-bars": () => (
    <div className="w-full max-w-md rounded-2xl border border-[#dce6ed] bg-white p-5">
      <h3 className="mb-4 text-[17px] font-extrabold text-[#092943]">สัดส่วนยอดขายตามสินค้า</h3>
      <ShareBars
        items={[
          { name: "Dealer Price", value: 513243.16, color: "#f59e0b" },
          { name: "โม่เล็ก", value: 14085.75, color: "#0ea5e9" },
          { name: "Easypump", value: 2582.75, color: "#10b981" },
          { name: "Superplus", value: 2429.25, color: "#8b5cf6" },
        ]}
      />
    </div>
  ),
  "rank-table": () => (
    <div className="w-full max-w-2xl">
      <RankTable
        title="สินค้า Top 5"
        subtitle="(ตามยอดขาย)"
        valueLabel="ยอดขาย (คิว)"
        showShare
        rows={[
          { name: "Dealer Price", value: 513243.16, share: 96.4, color: "#f59e0b" },
          { name: "โม่เล็ก", value: 14085.75, share: 2.6, color: "#0ea5e9" },
          { name: "Easypump", value: 2582.75, share: 0.5, color: "#10b981" },
          { name: "Superplus", value: 2429.25, share: 0.5, color: "#8b5cf6" },
        ]}
      />
    </div>
  ),
};
