import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  name: "黄芳艳 (Huang Fangyan)",
  title: "AI 产品经理 / 数字化产品实习生",
  bio: "一个持续阅读和思考的人，正在 AI 时代里寻找技术、问题与自我成长的连接点。",
  email: "1115451581@qq.com",
  phone: "18087578615",
  location: "上海 / 西安",
  socials: {
    github: "https://github.com/HFY-aa",
    linkedin: "https://www.linkedin.com/",
  },
  skills: {
    product: ["Agent 流程设计", "PRD/SOP 撰写", "用户手册体系建设", "需求挖掘与分析", "跨部门协同"],
    technical: ["Python / SQL", "Vue / React 基础", "Tableau 数据可视化", "NLP 文本分析"],
    ai: ["RAG 知识库构建", "Prompt 工程", "智能助手场景定义", "生成式 AI 工具链"],
  },
  experience: [
    {
      company: "蔚来 (NIO)",
      role: "数字化产品 / 产品运营实习生",
      period: "2026.01 - 2026.05",
      description: [
        "参与供应链质量文件审核场景下 PPAP Audit Agent 的落地，支持文件结构化解析、审核规则校验、问题清单与修改建议输出等能力的 UAT 测试、上线验收与反馈闭环。",
        "对接供应链业务方、技术团队、内部 PIM 及外部合作伙伴，梳理流程需求与高频问题，推动账号开通、数据同步、审核异常等问题定位与解决。",
        "编写并完善 AI Agent 操作手册、FAQ、培训材料及操作视频，沉淀 Agent 相关 FAQ 40+ 条，支持内部员工与外部合作伙伴培训。",
        "参与飞书项目人员自动同步配置与运营看板搭建，跟踪零件开发进度、延期率、合作伙伴注册及系统使用情况，覆盖 3000+ 零件 PIM、300-400 个合作伙伴，并每周整理数据周报。"
      ],
    },
  ],
  projects: [
    {
      title: "HFY_WORLD (个人 AI 博客)",
      description: "基于数字化技术构建的个人博客，集成 AI 小助手可实时交互问答。沉淀关于 AI 产品经理、数字化转型及效率工具的深度思考与实践案例。",
      tags: ["AI_Blog", "RAG_Assistant", "Efficiency"],
      link: "https://blog.hfyworld.top/"
    },
    {
      title: "Avatar Soul Reader (头像洞察应用)",
      description: "基于多模态大模型设计的社交趣味应用。用户通过上传头像获取视觉心理分析报告，全链路负责产品逻辑定义与基础开发实现。",
      tags: ["Gemini 1.5 Flash", "React", "产品定义"],
      link: "http://www.hfyworld.top/",
    },
    {
      title: "多平台教育舆情 AI 分析",
      description: "应用 Python 针对社交平台评论进行数据采集与分析，量化公众对教育政策的关注点，为传播策略提供支撑。",
      tags: ["Python", "NLP", "数据分析"],
    },
  ],
  education: [
    {
      school: "华东师范大学 (硕士)",
      degree: "教育政策学 (教育统计方向)",
      year: "2027",
    },
    {
      school: "西安电子科技大学 (本科)",
      degree: "数据科学与大数据技术",
      year: "2024",
    },
  ],
  volunteer: [
    {
      title: "华东师大数字支教教师",
      category: "digital-teaching",
      period: "2025.03 - 2025.05",
      description: "依托腾讯支教平台，自主研发“生成式 AI 与 Prompt 工程”科普课程。通过线上授课引导乡村学生掌握人机交互能力，致力弥合数字鸿沟。",
      photos: []
    },
    {
      title: "“黄金十年.慧她”县域女大学生职业咨询",
      category: "hui-ta",
      period: "2023.09 - 2023.12",
      description: "作为项目运营骨干，通过提供专业教练资源及成体系的职业课程，帮助县域女大学生弥补职场信息差，完成高质量的职业生涯咨询。",
      photos: []
    },
    {
      title: "“培苗行动”家访志愿者",
      category: "pei-miao",
      period: "2023.12 - 2024.01",
      description: "深入一线开展家访行动，协助公益组织核实受资助学生家庭状况与信息真实性，并为多名学生带去学业辅导与成长鼓励。",
      photos: []
    },
    {
      title: "乡村笔记 - 未来的旅行",
      category: "future-journey",
      period: "2023.06 - 2023.08",
      description: "作为公益项目管理实习生，统筹县乡青少年职业启蒙项目。联动多家企业资源，带领 40 名乡村孩子赴沪开展职业探索与实证调研。",
      photos: []
    }
  ],
};
