"use client";

import { CalendarDays, Newspaper, ShieldCheck, Upload } from "lucide-react";
import { TopNavbar } from "./components/top-navbar";
import { BottomNav } from "./components/bottom-nav";
import { Hero } from "./components/hero";
import { CoinCard } from "./components/coin-card";
import { StreakCalendar } from "./components/streak-calendar";
import { SectionCard } from "./components/section-card";
import { Button } from "./components/button";

const days = [
  { weekday: "ส.", date: 24, state: "missed" as const },
  { weekday: "อา.", date: 25, state: "missed" as const },
  { weekday: "จ.", date: 26, state: "missed" as const },
  { weekday: "อ.", date: 27, state: "missed" as const },
  { weekday: "พ.", date: 28, state: "done" as const },
  { weekday: "พฤ.", date: 29, state: "today" as const },
  { weekday: "ศ.", date: 30, state: "upcoming" as const },
  { weekday: "ส.", date: 31, state: "upcoming" as const },
];

export const demos: Record<string, () => React.ReactNode> = {
  "top-navbar": () => (
    <div className="w-full overflow-hidden rounded-[18px] border border-[#D7EAFE]">
      <TopNavbar />
    </div>
  ),
  "bottom-nav": () => (
    <div className="w-[375px] overflow-hidden rounded-[28px] border-[6px] border-[#0B2F6B] bg-[#EEF7FF]">
      <div className="flex h-[260px] items-center justify-center text-sm text-[#55739B]">เนื้อหาหน้า</div>
      <BottomNav unread={12} />
    </div>
  ),
  hero: () => (
    <div className="w-full max-w-5xl">
      <Hero
        eyebrow="ยินดีต้อนรับครับ"
        title="ระบบ Safety Caring"
        description="ศูนย์กลางสำหรับการสื่อสาร ติดตาม และยกระดับความปลอดภัยในการทำงานของทีม"
        left={<p className="rounded-2xl bg-white/80 p-4 text-sm font-bold">พื้นที่ซ้าย: เช่น Coin card</p>}
        mascot={<div className="flex size-40 items-center justify-center rounded-full bg-white/50 text-xs font-bold text-[#0B82F0]">มาสคอต</div>}
      />
      <p className="mt-2 text-center text-xs text-[#55739B]">เว็บจริงใช้ภาพเมืองและไซต์ก่อสร้างผ่าน prop image</p>
    </div>
  ),
  "coin-card": () => (
    <div className="w-[340px]">
      <CoinCard coins={887} weeklyDelta={13} />
    </div>
  ),
  "streak-calendar": () => (
    <div className="w-full max-w-2xl">
      <StreakCalendar days={days} streak={2} />
    </div>
  ),
  "section-card": () => (
    <div className="grid w-full max-w-3xl gap-3 md:grid-cols-2">
      <SectionCard icon={<ShieldCheck />} title="Safety Awareness" badge={<span className="rounded-full bg-[#FFF7ED] px-2 py-0.5 text-[11px] font-bold text-[#EA580C]">🔥 2 วัน</span>}>
        <p className="text-sm text-[#55739B]">เปอร์เซ็นต์การเข้าร่วม</p>
        <p className="text-3xl font-black text-[#0B2F6B]">42%</p>
        <div className="mt-2 h-2 rounded-full bg-[#E0F0FF]"><div className="h-2 w-[42%] rounded-full bg-[#0B82F0]" /></div>
      </SectionCard>
      <SectionCard icon={<Newspaper />} title="ข่าวสาร Safety Culture" linkLabel="ดูทั้งหมด">
        <div className="flex h-24 items-center justify-center rounded-xl bg-[#E0F0FF] text-xs font-bold text-[#0B82F0]">ภาพข่าว</div>
      </SectionCard>
    </div>
  ),
  button: () => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button><Upload className="size-4" />อัปโหลดภาพ KYT</Button>
      <Button variant="outline" size="lg"><CalendarDays className="size-4" />ปฏิทิน Safety Awareness</Button>
      <Button variant="ghost">ยกเลิก</Button>
      <Button variant="primary" size="sm">ดูของรางวัล</Button>
      <Button variant="danger">ลบโพสต์</Button>
    </div>
  ),
};
