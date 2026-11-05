import { cn } from "@/lib/utils";

// พื้นหลังหน้าแบบ "กระดาษจุด": ฟ้าอ่อน #f3faff + จุดฟ้า 10% ทุก 22px
export function PageCanvas({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-[#f3faff] bg-[radial-gradient(circle_at_1px_1px,rgb(0_161_229/0.10)_1px,transparent_0)] bg-[length:22px_22px] text-[#0c2a44]", className)}
      {...props}
    />
  );
}

// Skeleton ตอนโหลดครั้งแรก: บล็อกฟ้า #d5ecfa มุม 20px มีแสงวิ่ง (shimmer)
export function PageSkeleton({ blocks = [96, 220, 160] }: { blocks?: number[] }) {
  return (
    <div className="grid gap-3" aria-busy="true" aria-label="กำลังโหลด">
      <style>{`@keyframes cpm-shimmer{from{background-position:150% 0,0 0}to{background-position:-50% 0,0 0}}`}</style>
      {blocks.map((h, i) => (
        <div
          key={i}
          style={{ height: h, animation: "cpm-shimmer 1.3s ease-in-out infinite" }}
          className="rounded-[20px] bg-[linear-gradient(100deg,transparent_20%,rgb(255_255_255/0.75)_50%,transparent_80%),linear-gradient(#d5ecfa,#d5ecfa)] bg-[length:200%_100%,100%_100%] bg-no-repeat shadow-[inset_0_0_0_1px_rgb(175_210_234/0.45)] motion-reduce:[animation:none!important]"
        />
      ))}
    </div>
  );
}
