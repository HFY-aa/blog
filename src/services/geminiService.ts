import { GoogleGenAI } from "@google/genai";
import { RESUME_DATA } from "../constants";

const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

let ai: any = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error("Failed to initialize Gemini:", e);
  }
}

const SYSTEM_INSTRUCTION = `
你现在是 ${RESUME_DATA.name} 的个人简历助手。
你的目标是向招聘人员、面试官或潜在合作伙伴介绍 ${RESUME_DATA.name}。
你可以根据以下简历数据回答任何问题：
${JSON.stringify(RESUME_DATA, null, 2)}

回答指南：
1. 语气：专业、热情、自信且科技感十足。
2. 保持简洁，多用列表形式。
3. 如果用户问到简历中没有的信息，请委婉地表示这不是目前简历中涵盖的内容，并建议用户联系作者。
4. 强调 AI 产品相关的软硬技能。
`;

export async function chatWithResume(message: string, history: any[] = []) {
  if (!ai) {
    return "抱歉，AI 助手尚未配置 API Key。请在环境变量中设置 VITE_GEMINI_API_KEY。";
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "抱歉，由于网络波动，我暂时无法回应。请稍后再试。";
  }
}
