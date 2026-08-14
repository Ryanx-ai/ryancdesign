import type { LocalizedText } from "./i18n";

export type ExperienceItem = {
  organisation: string;
  role: LocalizedText;
  period?: string;
  meta?: LocalizedText;
  description: LocalizedText;
};

export type Achievement = {
  title: string;
  detail: LocalizedText;
  year?: string;
};

export type ToolGroup = { name: LocalizedText; tools: string[] };

export const education: ExperienceItem[] = [
  { organisation: "National University of Singapore", role: { en: "Master of Design in Integrated Design", zh: "整合设计硕士" }, period: "2024–2025", meta: { en: "Design · Strategy · Systems", zh: "设计 · 策略 · 系统" }, description: { en: "Advanced study connecting design practice, strategy and complex systems.", zh: "将设计实践、策略思维与复杂系统相连接的进阶学习。" } },
  { organisation: "National University of Singapore", role: { en: "Bachelor of Industrial Design · Honours with Merit", zh: "工业设计学士 · 荣誉优等" }, period: "2016–2020", meta: { en: "Industrial Design", zh: "工业设计" }, description: { en: "A foundation in product, service and experience design grounded in making.", zh: "以实践为基础，建立产品、服务与体验设计能力。" } },
  { organisation: "MAGES Institute", role: { en: "Certificate in Game Design & Game Development", zh: "游戏设计与游戏开发证书" }, meta: { en: "Interactive Media", zh: "互动媒体" }, description: { en: "Applied study in interactive systems, game design and development.", zh: "专注互动系统、游戏设计与开发的应用学习。" } },
];

export const work: ExperienceItem[] = [
  { organisation: "The Global Citizen Education Group", role: { en: "Regional Growth Manager (SEA)", zh: "东南亚区域增长经理" }, period: "2025–Present", meta: { en: "Southeast Asia · Growth · Partnerships", zh: "东南亚 · 增长 · 合作伙伴" }, description: { en: "Building regional growth systems and cross-border partnerships across education markets.", zh: "在教育市场中建立区域增长体系，并推动跨境合作伙伴关系。" } },
  { organisation: "National University of Singapore — Department of Design", role: { en: "Lead Industry Outreach & Instructor", zh: "产业拓展负责人兼讲师" }, period: "2021–2024", meta: { en: "Education · Industry · Design", zh: "教育 · 产业 · 设计" }, description: { en: "Connected design education with industry while teaching visual communication, branding and design practice.", zh: "连接设计教育与产业实践，并教授视觉传达、品牌与设计方法。" } },
  { organisation: "Alpha Electrics Pte Ltd.", role: { en: "Co-Founder / Product Lead", zh: "联合创办人 / 产品负责人" }, period: "2020–2022", meta: { en: "Mobility · Product · Venture", zh: "移动出行 · 产品 · 创业" }, description: { en: "Led product, service and digital design for a battery-swapping mobility ecosystem.", zh: "主导电池换电移动生态的产品、服务与数字体验设计。" } },
  { organisation: "NTUitive Pte Ltd.", role: { en: "Innovation & Venture Builder", zh: "创新与创业孵化" }, period: "2020–2021", meta: { en: "Innovation · Venture Building", zh: "创新 · 创业孵化" }, description: { en: "Helped shape early ventures by translating emerging technologies into clearer propositions and paths to market.", zh: "将新兴技术转化为清晰的价值主张与市场路径，推动早期项目成形。" } },
  { organisation: "Singapore Airlines", role: { en: "UI/UX & Product Innovation Intern", zh: "UI/UX 与产品创新实习生" }, period: "2019–2020", meta: { en: "Aviation · Digital Product · Service", zh: "航空 · 数字产品 · 服务" }, description: { en: "Explored digital journeys and product innovation within a complex global service environment.", zh: "在复杂的全球服务环境中探索数字旅程与产品创新。" } },
];

export const achievements: Achievement[] = [
  { title: "Motion Design Education Summit (MODE’23)", detail: { en: "Co-author — “The Emerging Medium of Posters in Motion”", zh: "共同作者——《动态海报：正在兴起的媒介》" }, year: "2023" },
  { title: "Huawei Tech4City Competition", detail: { en: "4th Place · Team Lead / Product Designer — Project Isolert", zh: "第四名 · 团队负责人 / 产品设计师——Isolert 项目" }, year: "2022" },
  { title: "NUS GRIP Run 6", detail: { en: "Research Grant & Startup Accelerator — Alpha Electrics", zh: "研究资助与创业加速计划——Alpha Electrics" } },
  { title: "NUS Resilience & Growth Grant", detail: { en: "Awarded to Alpha Electrics", zh: "Alpha Electrics 获资助项目" } },
  { title: "Five-Continent Student Symposium — Tokyo", detail: { en: "NUS Division of Industrial Design representative / nominee", zh: "新加坡国立大学工业设计系代表 / 提名人选" }, year: "2019" },
];

export const toolGroups: ToolGroup[] = [
  { name: { en: "Design", zh: "设计" }, tools: ["Figma", "Illustrator", "Photoshop", "After Effects", "Premiere Pro", "InDesign", "Rhino", "KeyShot", "AutoCAD"] },
  { name: { en: "Product / Prototyping", zh: "产品 / 原型" }, tools: ["Unity", "Unreal Engine", "Miro"] },
  { name: { en: "Development", zh: "开发" }, tools: ["TypeScript", "JavaScript", "React", "Next.js", "HTML", "CSS", "Python", "C++", "Git", "GitHub", "Vercel"] },
];
