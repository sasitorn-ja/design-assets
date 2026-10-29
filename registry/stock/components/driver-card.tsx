import { MapPin, ScanLine, Truck, User } from "lucide-react";

// การ์ดห้องคนขับ (มือถือ): ข้อมูลงาน → ขั้นตอนต่อไป → ตัวนับ
export function DriverCard({
  room,
  jobId,
  phase,
  truck,
  driver,
  origin,
  nextStep,
  counts,
}: {
  room: string;
  jobId: string;
  phase: string;
  truck: string;
  driver: string;
  origin: string;
  nextStep: string;
  counts: { toScan: number; loaded: number; delivered: number };
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#dae2ec] bg-white">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[19px] font-bold text-slate-900">{room}</h3>
          <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">{phase}</span>
        </div>
        <p className="mt-0.5 text-[11px] text-slate-400">{jobId}</p>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
          {[
            { icon: Truck, label: "รถขนส่ง", value: truck },
            { icon: User, label: "คนขับ", value: driver },
            { icon: MapPin, label: "สถานะต้นทาง", value: origin },
          ].map((f) => (
            <div key={f.label} className="flex gap-2">
              <f.icon className="mt-0.5 size-4 shrink-0 text-slate-400" />
              <div>
                <dt className="text-xs text-slate-500">{f.label}</dt>
                <dd className="font-semibold text-slate-900">{f.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      <div className="border-t border-[#eef2f6] bg-[#f8fafc] p-4">
        <div className="flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50/70 p-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">
            <ScanLine className="size-4" />
          </span>
          <div>
            <p className="text-[11px] font-medium text-blue-700">ขั้นตอนต่อไป</p>
            <p className="text-sm font-bold text-slate-900">{nextStep}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 divide-x divide-[#e2e8f0] text-left">
          {[
            { label: "ต้องสแกน", value: counts.toScan, className: "text-slate-900" },
            { label: "ขึ้นรถแล้ว", value: counts.loaded, className: "text-blue-700" },
            { label: "ส่งแล้ว", value: counts.delivered, className: "text-sky-700" },
          ].map((c) => (
            <div key={c.label} className="px-3 first:pl-0">
              <p className="text-[11px] text-slate-500">{c.label}</p>
              <p className={`text-xl font-bold [font-feature-settings:'tnum'] ${c.className}`}>{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
