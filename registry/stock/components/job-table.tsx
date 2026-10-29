"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { StatusPill, type JobStatus } from "./status-pill";

export type Job = {
  id: string;
  room: string;
  route: string;
  pos: string[];
  driver: string;
  plate: string;
  loaded: string;
  delivered: string;
  status: JobStatus;
};

// ตารางงาน: หัวตารางเล็กและจาง, ข้อมูลหลัก + รหัสอ้างอิงบรรทัดล่าง, PO ที่เกินย่อเป็น chip
export function JobTable({ jobs, onManage }: { jobs: Job[]; onManage?: (job: Job) => void }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#dae2ec] bg-white">
      <table className="w-full min-w-[820px] text-left">
        <thead className="border-b border-[#eef2f6]">
          <tr>
            {["ห้องงาน", "เส้นทาง / PO", "คนขับ", "ขึ้นรถ", "ส่งแล้ว", "สถานะ", "จัดการ"].map((h) => (
              <th key={h} className="whitespace-nowrap px-3 py-2 text-[11px] font-semibold text-slate-400">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef2f6] text-[12.5px] text-slate-900">
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-[#fafbfc]">
              <td className="px-3 py-2.5">
                <span className="block max-w-64 break-words font-semibold">{job.room}</span>
                <span className="mt-0.5 block text-[11px] text-slate-400">{job.id}</span>
              </td>
              <td className="px-3 py-2.5">
                <span className="block">{job.route}</span>
                <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                  {job.pos.slice(0, 2).join(", ")}
                  {job.pos.length > 2 ? (
                    <button type="button" className="inline-flex shrink-0 items-center gap-1 rounded-md bg-sky-50 px-1.5 py-0.5 font-medium text-sky-700 transition-colors hover:bg-sky-100">
                      +{job.pos.length - 2} PO <ChevronRight className="size-3" />
                    </button>
                  ) : null}
                </span>
              </td>
              <td className="px-3 py-2.5">
                <span className="block">{job.driver}</span>
                <span className="mt-0.5 block text-[11px] text-slate-400">{job.plate}</span>
              </td>
              <td className="px-3 py-2.5 font-semibold [font-feature-settings:'tnum']">{job.loaded}</td>
              <td className="px-3 py-2.5 font-semibold [font-feature-settings:'tnum']">{job.delivered}</td>
              <td className="px-3 py-2.5"><StatusPill status={job.status} /></td>
              <td className="px-3 py-2.5">
                <button type="button" onClick={() => onManage?.(job)} className="inline-flex h-9 items-center gap-1 rounded-xl border border-[#cdd8e4] bg-white px-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 active:translate-y-px">
                  จัดการ <ChevronDown className="size-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
