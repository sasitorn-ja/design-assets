// URL ของเว็บจริงแต่ละโปรเจค (ใช้เก็บภาพหน้าจอ)
export const sites = [
  { slug: "nong-wang-jai", name: "Project_NongWangJai", url: "https://rmc.cipcloud.net/nong-wang-jai/" },
  { slug: "pricing-monitor", name: "Pricing Monitor", url: "https://salespark.cipcloud.net/s-and-op-pricing-monitor" },
  { slug: "rmc-salesupport", name: "Project_Rmc-salesupport", url: "https://salespark.cipcloud.net/s-and-op" },
  { slug: "stock", name: "Project_Stock (SyncDrop)", url: "https://store.cipcloud.net/syncdrop/" },
  { slug: "suea-safety", name: "Project_SUEASafety", url: "https://safety.cipcloud.net/" },
  { slug: "cpac-dealer", name: "SaleSpark_cpac-dealer", url: "https://salespark.cipcloud.net/cpac-dealer/scg" },
  { slug: "washout-pit", name: "Washout_Pit", url: "https://plant.cipcloud.net/cwp/login" },
];

// session ที่ login แล้วเก็บไว้ตรงนี้ (อยู่ใน .gitignore ห้าม commit)
export const profileDir = new URL("../.auth/chrome-profile", import.meta.url).pathname;
