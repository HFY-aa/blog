import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  name: "黄芳艳 (Huang Fangyan)",
  title: "AI 产品经理 / 数字化产品实习生",
  bio: "关注 AI 技术在业务场景的实际落地，致力于将复杂逻辑转化为易用的数字化产品。拥有知名车企产品实习经验，具备扎实的 PRD 编写与跨部门协作能力，热衷于通过技术普惠缩减数字鸿沟。",
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
      company: "蔚来 (NIO) - AI 产品实习生",
      role: "TO B 数字化产品岗位",
      period: "2026.01 - 2026.04",
      description: [
        "负责 PPAP Audit Agent 业务场景落地。通过对接业务端需求，主导撰写并产出 24万字 数字化产品手册及用户指南。",
        "从 0 到 1 设计并搭建智能对话客服 Agent。梳理业务解答路径，构建结构化 RAG 知识库，实现了业务咨询的自动化应答。",
        "协助建立痛点捕捉机制，统筹研发与业务端的信息同步，持续优化内部 AI 产品的迭代链路。"
      ],
    },
    {
      company: "智咖教育科技有限公司",
      role: "AI 产品运营实习生",
      period: "2024.10 - 2025.01",
      description: [
        "负责 AI 行业资讯的追踪与结构化梳理，产出多篇深度技术综述与 Prompt 使用技巧指南。",
        "优化产品教育内容的排版与逻辑结构，助力内容平均点击率 (CTR) 提升 10%。",
      ],
    },
  ],
  projects: [
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
};
