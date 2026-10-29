// รายการหน้าที่จะเก็บภาพหน้าจอของแต่ละโปรเจค
// path = เปิด URL ตรงๆ, click = กดปุ่มที่มีข้อความนี้ (เช่นเปิด dropdown เมนู) หลังเปิดหน้า
// mobile: true = เก็บภาพมือถือด้วย
export const capturePlan = [
  {
    slug: "nong-wang-jai",
    base: "https://rmc.cipcloud.net/nong-wang-jai",
    pages: [
      { id: "dashboard", label: "Dashboard", path: "/dashboard", mobile: true },
      { id: "dealer-network", label: "Dealer Network", path: "/dealer-network", mobile: true },
      { id: "dealer-analysis", label: "Dealer Analysis", path: "/dealer-analysis" },
      { id: "top-dealers", label: "Top N Dealers", path: "/top-dealers" },
      { id: "top-products", label: "Top N Products", path: "/top-products" },
      { id: "orders", label: "Orders", path: "/orders", mobile: true },
    ],
  },
  {
    slug: "pricing-monitor",
    base: "https://salespark.cipcloud.net/s-and-op-pricing-monitor",
    pages: [
      { id: "dashboard-cpac", label: "Dashboard (CPAC)", path: "/", mobile: true },
      { id: "dashboard-qmix", label: "Dashboard (QMIX)", path: "/", click: "Dashboard (QMIX)" },
      { id: "admin", label: "Admin", path: "/", click: "Admin" },
    ],
  },
  {
    slug: "rmc-salesupport",
    base: "https://salespark.cipcloud.net/s-and-op",
    pages: [
      { id: "home", label: "หน้าหลัก", path: "/", mobile: true },
      { id: "inhand-m-l-mega", label: "Inhand M/L/MEGA", path: "/inhand/m-l-mega", mobile: true },
      { id: "inhand-tiny-small", label: "Inhand Tiny/Small", path: "/inhand/tiny-small" },
      { id: "dashboard-inhand", label: "Dashboard Inhand", path: "/dashboard/inhand" },
      { id: "dashboard-demand-supply", label: "Demand & Supply", path: "/dashboard/demand-supply" },
      { id: "follow-up-table", label: "FollowUp ตาราง", path: "/follow-up/table", mobile: true },
      { id: "dashboard-follow-up", label: "FollowUp Dashboard", path: "/dashboard/follow-up" },
      { id: "admin-user-permissions", label: "Admin: ผู้ใช้งานและสิทธิ์", path: "/admin/user-permissions" },
      { id: "menu-admin-open", label: "เมนู Admin (เปิด dropdown)", path: "/", click: "Admin" },
      { id: "menu-inhand-open", label: "เมนู Inhand (เปิด dropdown)", path: "/", click: "Inhand" },
    ],
  },
  {
    slug: "stock",
    base: "https://store.cipcloud.net/syncdrop",
    pages: [
      { id: "po-import", label: "นำเข้า PO", path: "/po/import" },
      { id: "po", label: "PO รอจัดส่ง", path: "/po", mobile: true },
      { id: "jobs-new", label: "สร้างงาน", path: "/jobs/new" },
      { id: "driver", label: "ห้องคนขับ", path: "/driver", mobile: true },
      { id: "jobs", label: "รายการงาน", path: "/jobs", mobile: true },
      { id: "reports", label: "ประวัติงาน", path: "/reports" },
    ],
  },
  {
    slug: "suea-safety",
    base: "https://safety.cipcloud.net",
    pages: [
      { id: "home", label: "Home", path: "/", mobile: true },
      { id: "safety-effort", label: "Safety Effort", path: "/category", mobile: true },
      { id: "safety-culture", label: "Safety Culture", path: "/safety-culture", mobile: true },
      { id: "leaderboard", label: "Leaderboard", path: "/safety-culture/leaderboard" },
      { id: "plant-manager", label: "Plant Manager", path: "/manager" },
      { id: "dashboard", label: "Dashboard & Report", path: "/dashboard" },
      { id: "safety-admin", label: "Admin", path: "/safety-admin" },
      { id: "super-admin", label: "SuperAdmin", path: "/super-admin" },
      { id: "notifications", label: "Notice", path: "/notifications" },
      { id: "profile", label: "Profile", path: "/profile" },
      { id: "menu-dashboard-open", label: "เมนู Dashboard & Report (เปิด dropdown)", path: "/", click: "Dashboard & Report" },
      { id: "menu-admin-open", label: "เมนู Admin (เปิด dropdown)", path: "/", click: "Admin" },
    ],
  },
  {
    slug: "cpac-dealer",
    base: "https://salespark.cipcloud.net/cpac-dealer/scg",
    pages: [
      { id: "dashboard", label: "Dashboard", path: "", mobile: true },
      { id: "rank", label: "อันดับ", path: "/rank", mobile: true },
      { id: "plants", label: "แผนที่", path: "/plants" },
      { id: "docs", label: "โบรชัวร์", path: "/docs", mobile: true },
      { id: "contact", label: "ติดต่อพนักงาน", path: "/contact" },
    ],
  },
  {
    slug: "washout-pit",
    base: "https://plant.cipcloud.net/cwp",
    pages: [
      { id: "home", label: "หน้าหลัก", path: "/home", mobile: true },
      { id: "requests-new", label: "สร้างคำขอ", path: "/requests/new", mobile: true },
      { id: "data", label: "รายการคำขอ", path: "/data", mobile: true },
      { id: "dashboard", label: "Dashboard", path: "/dashboard" },
      { id: "admin", label: "จัดการสิทธิ์", path: "/admin" },
      { id: "admin-roles", label: "จัดการตารางสิทธิ์", path: "/admin/roles" },
      { id: "admin-activity", label: "Activity Log", path: "/admin/activity" },
    ],
  },
];
