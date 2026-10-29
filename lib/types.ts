// โครงข้อมูล design ของแต่ละโปรเจค ทุกโปรเจคใช้รูปแบบเดียวกันเพื่อให้เทียบกันได้

export type ColorToken = {
  name: string;
  value: string;
  usage: string;
};

export type ColorGroup = {
  title: string;
  description?: string;
  tokens: ColorToken[];
};

export type ScaleRow = {
  name: string;
  value: string;
  usage: string;
};

export type TypeRow = {
  name: string;
  size: string;
  weight: string;
  usage: string;
};

export type MenuItem = {
  label: string;
  icon?: string; // ชื่อ icon จาก lucide-react
  note?: string;
};

export type MenuGroup = {
  title: string;
  items: MenuItem[];
};

export type ComponentEntry = {
  id: string;
  name: string;
  description: string;
  file: string; // ไฟล์ใน registry/<slug>/components/
  origin: string; // ไฟล์ต้นฉบับใน repo ของโปรเจค
  dependencies?: string[]; // npm packages ที่ต้องติดตั้ง
};

export type Project = {
  slug: string;
  name: string; // ชื่อ repo
  title: string; // ชื่อที่แสดง
  url: string;
  repo: string; // path ใน git ของทีม
  stack: string[];
  summary: string;
  tone: string[];
  useWhen: string[];
  brand: { primary: string; surface: string; ink: string };
  previewBackground: string; // พื้นหลังของกล่อง preview
  fontFamily: string;
  menu: {
    type: string; // เช่น "Sidebar ย่อได้"
    demoComponentId?: string; // component ที่เป็นเมนู ใช้แสดงตัวอย่างในหน้าเมนู
    description: string;
    specs: ScaleRow[];
    groups: MenuGroup[];
    notes?: string[];
  };
  colors: ColorGroup[];
  typography: { fontNote: string; rows: TypeRow[] };
  spacing: ScaleRow[];
  radius: ScaleRow[];
  shadows: ScaleRow[];
  layout: ScaleRow[];
  cssVars: Record<string, string>; // ธีมแบบ shadcn สำหรับก๊อปไปใช้
  guidelines: {
    do: string[];
    dont: string[];
    sections?: { title: string; items: string[] }[];
  };
  components: ComponentEntry[];
  designDocs: string[]; // ไฟล์ design doc ใน repo
};
