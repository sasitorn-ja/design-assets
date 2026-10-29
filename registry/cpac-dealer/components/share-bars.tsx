export type ShareItem = { name: string; value: number; color: string };

// สัดส่วนยอดขายตามสินค้า: จุดสี + ชื่อ + ค่า + % แล้วแถบเต็มความกว้าง
export function ShareBars({ items, unit = "คิว" }: { items: ShareItem[]; unit?: string }) {
  const total = items.reduce((s, i) => s + i.value, 0) || 1;
  return (
    <div>
      <div className="space-y-4">
        {items.map((item) => {
          const pct = (item.value / total) * 100;
          return (
            <div key={item.name}>
              <div className="mb-1.5 flex items-center gap-2 text-[13px]">
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: item.color }} />
                <span className="min-w-0 flex-1 truncate font-medium text-[#092943]">{item.name}</span>
                <span className="font-bold text-[#092943] [font-feature-settings:'tnum']">{item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                <span className="w-12 text-right text-xs text-[#7890a1]">{pct.toFixed(1)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#edf3f7]">
                <div className="h-full rounded-full" style={{ width: `${Math.max(pct, 1)}%`, background: item.color }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-between border-t border-[#edf3f7] pt-3 text-[13px]">
        <span className="text-[#7890a1]">รวมทุกสินค้า</span>
        <span className="font-bold text-[#092943]">
          {total.toLocaleString(undefined, { maximumFractionDigits: 2 })} {unit}
        </span>
      </div>
    </div>
  );
}
