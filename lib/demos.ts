"use client";

import { demos as nongWangJai } from "@/registry/nong-wang-jai/demos";
import { demos as pricingMonitor } from "@/registry/pricing-monitor/demos";
import { demos as rmcSalesupport } from "@/registry/rmc-salesupport/demos";
import { demos as stock } from "@/registry/stock/demos";
import { demos as sueaSafety } from "@/registry/suea-safety/demos";
import { demos as cpacDealer } from "@/registry/cpac-dealer/demos";
import { demos as cpacDealerV2 } from "@/registry/cpac-dealer-v2/demos";
import { demos as washoutPit } from "@/registry/washout-pit/demos";

// ตัวอย่างการใช้งาน component ของทุกโปรเจค: demoRegistry[slug][componentId]
export const demoRegistry: Record<string, Record<string, () => React.ReactNode>> = {
  "nong-wang-jai": nongWangJai,
  "pricing-monitor": pricingMonitor,
  "rmc-salesupport": rmcSalesupport,
  "stock": stock,
  "suea-safety": sueaSafety,
  "cpac-dealer-v2": cpacDealerV2,
  "cpac-dealer": cpacDealer,
  "washout-pit": washoutPit,
};
