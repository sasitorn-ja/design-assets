"use client";

import { useState } from "react";
import { AlertTriangle, Check, ClipboardList, HelpCircle, Plus, Save, UserPlus } from "lucide-react";
import { TopNavbar } from "./components/top-navbar";
import { Button } from "./components/button";
import { StatusBadge } from "./components/status-badge";
import { Card, Stat } from "./components/card";
import { Input, Field } from "./components/input";
import { ProjectSheet } from "./components/project-sheet";
import { WorkStolenNotice } from "./components/work-stolen";
import { Dialog } from "./components/dialog";

export const demos: Record<string, () => React.ReactNode> = {
  "top-navbar": () => (
    <div className="h-[380px] w-full overflow-visible rounded-xl border border-[#DBEAF5] bg-[#F8FBFF]">
      <TopNavbar />
      <p className="p-6 text-sm text-[#60769B]">ลองกด Inhand, FollowUp หรือ Admin เพื่อเปิด dropdown</p>
    </div>
  ),
  button: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button><Save className="size-4" />บันทึก</Button>
      <Button variant="outline">ยกเลิก</Button>
      <Button variant="ghost">ล้างตัวกรอง</Button>
      <Button variant="destructive">ยืนยันคืนสถานะ</Button>
      <Button size="sm" variant="outline">แก้ไข</Button>
      <Button disabled>ปิดใช้งาน</Button>
    </div>
  ),
  "status-badge": () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge tone="success" icon={<Check className="size-3" />}>กรอกครบ</StatusBadge>
      <StatusBadge tone="warning">ต้องตรวจสอบ</StatusBadge>
      <StatusBadge tone="danger" icon={<AlertTriangle className="size-3" />}>โดนแย่งงาน</StatusBadge>
      <StatusBadge tone="info">กำลังดำเนินการ</StatusBadge>
      <StatusBadge tone="help" icon={<HelpCircle className="size-3" />}>ขอความช่วยเหลือ</StatusBadge>
      <StatusBadge tone="neutral">จบโครงการ</StatusBadge>
    </div>
  ),
  card: () => (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
      <Card title="Inhand เดือนนี้" description="รวมทุก Site ที่รับผิดชอบ">
        <Stat label="ปริมาณ" value="2,340" unit="คิว" />
      </Card>
      <Card highlight title="เป้าหมาย INHAND" description="ใช้ highlight เฉพาะ card ที่สำคัญที่สุด">
        <Stat label="ทำได้" value="86" unit="%" />
      </Card>
    </div>
  ),
  input: () => (
    <div className="grid w-full max-w-md gap-4">
      <Field label="ชื่อผู้ติดต่อ" htmlFor="i1" helper="ใส่ชื่อ-นามสกุล">
        <Input id="i1" placeholder="เช่น สมชาย ใจดี" />
      </Field>
      <Field label="ปริมาณ (คิว)" htmlFor="i2" error="ต้องเป็นตัวเลขมากกว่า 0">
        <Input id="i2" defaultValue="-5" aria-invalid="true" />
      </Field>
      <Field label="Site code" htmlFor="i3">
        <Input id="i3" defaultValue="E011707" disabled />
      </Field>
    </div>
  ),
  "project-sheet": () => (
    <div className="w-full max-w-4xl">
      <ProjectSheet
        months={["ต.ค.", "พ.ย.", "ธ.ค.", "ม.ค."]}
        rows={[
          { site: "E011707", name: "ROT นิคม 304 ต.ท่าตูม อ.ศรีมหาโพธิ", months: [120, 80, 60, 40], completed: true },
          { site: "E012083", name: "โรงหล่อไลฟ์แอนด์ลีฟวิ่ง ต.ทับมา", months: [30, null, 45, null], stolenMonths: [2] },
          { site: "E013871", name: "คอนโด Grand Solaire Noble พัทยา", months: [210, 190, null, null] },
        ]}
      />
      <p className="mt-2 text-xs text-[#60769B]">กดที่ช่องตัวเลขเพื่อดู selected cell · แถวเขียว = กรอกครบ · ช่องชมพู = โดนแย่งงานเฉพาะเดือน</p>
    </div>
  ),
  "work-stolen": () => (
    <div className="w-full max-w-xl">
      <WorkStolenNotice site="E012083" by="คู่แข่ง A" date="12 ต.ค. 2569" />
    </div>
  ),
  dialog: function Demo() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}><Plus className="size-4" />เปิด Dialog</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          icon={<UserPlus className="size-5" />}
          title="งานรอผู้รับผิดชอบ · 3 Site"
          description="เลือกผู้รับผิดชอบแล้วกดบันทึก"
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>ยกเลิก</Button>
              <Button onClick={() => setOpen(false)}>บันทึกผู้รับผิดชอบ</Button>
            </>
          }
        >
          <div className="space-y-3">
            {["ROT นิคม 304", "โรงหล่อไลฟ์แอนด์ลีฟวิ่ง", "คอนโด Grand Solaire"].map((s) => (
              <div key={s} className="flex items-center gap-3 rounded-xl border border-[#DBEAF5] p-3">
                <ClipboardList className="size-4 text-[#0B57D0]" />
                <span className="flex-1 text-sm font-semibold text-[#17384D]">{s}</span>
                <StatusBadge tone="warning">รอรับ</StatusBadge>
              </div>
            ))}
          </div>
        </Dialog>
      </>
    );
  },
};
