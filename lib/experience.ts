import type { LocalizedText } from "./i18n";

export type ExperienceMetric = { value: string; label: LocalizedText };

export type ExperienceItem = {
  organisation: string;
  role: LocalizedText;
  period: string;
  meta?: LocalizedText;
  description: LocalizedText;
  metrics?: ExperienceMetric[];
};

export type Achievement = {
  title: string;
  detail: LocalizedText;
  year: string;
  metrics?: ExperienceMetric[];
};

export type ToolGroup = { name: LocalizedText; tools: string[] };

export const education: ExperienceItem[] = [
  { organisation: "National University of Singapore", role: { en: "Master of Design in Integrated Design", zh: "整合设计硕士" }, period: "2024–2025", meta: { en: "Design · Strategy · Systems", zh: "设计 · 策略 · 系统" }, description: { en: "Advanced study connecting design practice, strategy and complex systems.", zh: "将设计实践、策略思维与复杂系统相连接的进阶学习。" } },
  { organisation: "MAGES Institute", role: { en: "Certificate in Game Design & Game Development", zh: "游戏设计与游戏开发证书" }, period: "2021", meta: { en: "Interactive Media", zh: "互动媒体" }, description: { en: "Applied study in interactive systems, game design and development.", zh: "专注于互动系统、游戏设计与开发的应用学习。" } },
  { organisation: "National University of Singapore", role: { en: "Bachelor of Industrial Design · Honours with Merit", zh: "工业设计学士 · 荣誉优等" }, period: "2016–2020", meta: { en: "Industrial Design", zh: "工业设计" }, description: { en: "A foundation in product, service and experience design grounded in research, prototyping and making.", zh: "以研究、原型制作与实践为基础，建立产品、服务和体验设计能力。" } },
];

export const work: ExperienceItem[] = [
  {
    organisation: "The Global Citizen Education Group",
    role: { en: "Regional Growth Manager — SEA", zh: "东南亚区域增长经理" },
    period: "2025–Present",
    meta: { en: "Growth · Partnerships · Education", zh: "增长 · 合作伙伴 · 教育" },
    description: {
      en: "Leading regional growth across Southeast Asia, including market development in the Philippines and Indonesia; localising and launching AI, entrepreneurship and STEM offerings; building partnerships across Indonesia, Vietnam, the UAE and Kazakhstan; and supporting Future Tech, Eureka STEM Academy and internal curriculum and operations systems.",
      zh: "负责东南亚区域增长，包括菲律宾与印度尼西亚市场拓展；推动人工智能、创业与 STEM 课程本地化及发布；在印度尼西亚、越南、阿联酋与哈萨克斯坦建立合作关系；并支持 Future Tech、Eureka STEM Academy 以及内部课程与运营系统开发。",
    },
  },
  {
    organisation: "National University of Singapore — Department of Design",
    role: { en: "Lead Industry Outreach & Instructor", zh: "产业拓展负责人兼讲师" },
    period: "2021–2024",
    meta: { en: "Education · Industry · Visual Communication", zh: "教育 · 产业 · 视觉传达" },
    description: {
      en: "Developed and managed Visual Communication curriculum, led industry outreach, and supported the Minor in Visual Communication programme. Produced three exhibitions with Singapore Science Park and CapitaLand, connecting student work with public and industry audiences.",
      zh: "开发并管理视觉传达课程、主导产业拓展，并支持视觉传达副修课程。与新加坡科学园及凯德集团共同举办三场展览，让学生作品连接公众与业界观众。",
    },
    metrics: [
      { value: "2,000+", label: { en: "Students", zh: "学生" } },
      { value: "3", label: { en: "Exhibitions", zh: "展览" } },
      { value: "~500", label: { en: "Attendees", zh: "参与者" } },
      { value: "+20%", label: { en: "Enrolment", zh: "入学人数" } },
    ],
  },
  {
    organisation: "Alpha Electrics Pte Ltd.",
    role: { en: "Co-Founder / Product Lead", zh: "联合创办人 / 产品负责人" },
    period: "2020–2022",
    meta: { en: "Product · Venture Building · Mobility", zh: "产品 · 创业孵化 · 移动出行" },
    description: { en: "Led product development and venture building for a battery-swapping mobility ecosystem, secured grants and funding, and developed testbeds at Tanah Merah Country Club and Gardens by the Bay Singapore.", zh: "主导电池换电移动生态的产品开发与创业孵化，争取资助与资金，并在丹那美拉乡村俱乐部及新加坡滨海湾花园开展试验。" },
    metrics: [{ value: "$60K", label: { en: "Funding secured", zh: "筹得资金" } }],
  },
  {
    organisation: "NTUitive Pte Ltd.",
    role: { en: "Innovation & Venture Builder", zh: "创新与创业孵化" },
    period: "2020–2021",
    meta: { en: "Research Commercialisation · Innovation", zh: "科研商业化 · 创新" },
    description: { en: "Translated NTU research into product and venture propositions, supporting prototype development and paths to commercialisation during COVID-era development.", zh: "将南洋理工大学研究转化为产品与创业方案，在疫情期间支持原型开发及商业化路径。" },
    metrics: [
      { value: "$20K", label: { en: "Grants", zh: "资助" } },
      { value: "2", label: { en: "Company adoptions", zh: "企业采用 / 测试" } },
    ],
  },
  {
    organisation: "Singapore Airlines",
    role: { en: "UI/UX & Product Innovation Intern", zh: "UI/UX 与产品创新实习生" },
    period: "2019–2020",
    meta: { en: "Innovation Lab · Digital Transformation", zh: "创新实验室 · 数字化转型" },
    description: { en: "Supported the SIA Innovation Lab through innovation workshops, concept development, wireframing and UI/UX exploration for digital-transformation initiatives.", zh: "在新航创新实验室参与创新工作坊、概念构思、线框设计与 UI/UX 探索，支持数字化转型项目。" },
  },
];

export const achievements: Achievement[] = [
  { title: "Motion Design Education Summit — MODE’23", detail: { en: "Co-author — “The Emerging Medium of Posters in Motion”", zh: "共同作者——《动态海报：正在兴起的媒介》" }, year: "2023" },
  { title: "Huawei Tech4City Competition", detail: { en: "4th Place · Team Lead / Product Designer · Project Isolert", zh: "第四名 · 团队负责人 / 产品设计师 · Isolert 项目" }, year: "2022", metrics: [{ value: "$1K", label: { en: "Commendation", zh: "嘉奖奖金" } }] },
  { title: "NUS GRIP Run 6", detail: { en: "Research Grant & Startup Accelerator — Alpha Electrics", zh: "研究资助与创业加速计划——Alpha Electrics" }, year: "2020", metrics: [{ value: "$10K", label: { en: "Raised", zh: "筹得资金" } }] },
  { title: "NUS Resilience & Growth Grant", detail: { en: "NUS CFG × NUS Enterprise — Alpha Electrics", zh: "NUS CFG × NUS Enterprise——Alpha Electrics" }, year: "2020", metrics: [{ value: "$50K", label: { en: "Raised", zh: "筹得资金" } }] },
  { title: "Five-Continent Student Symposium — Tokyo", detail: { en: "NUS Division of Industrial Design representative / nominee", zh: "新加坡国立大学工业设计系代表 / 提名人选" }, year: "2019" },
];

export const toolGroups: ToolGroup[] = [
  { name: { en: "Design", zh: "设计" }, tools: ["Figma", "Adobe Illustrator", "Photoshop", "After Effects", "Premiere Pro", "InDesign", "Rhino", "KeyShot", "AutoCAD"] },
  { name: { en: "Product / Prototyping", zh: "产品 / 原型" }, tools: ["Miro", "Unity", "Unreal Engine", "Prototyping", "Workshop Tools"] },
  { name: { en: "Development", zh: "开发" }, tools: ["TypeScript", "JavaScript", "React", "Next.js", "HTML", "CSS", "Python", "C++", "Git", "GitHub", "Vercel"] },
];
