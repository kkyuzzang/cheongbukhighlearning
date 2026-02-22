
import { GoogleGenAI, Type } from "@google/genai";
import { GenerationParams, StructuredLessonPlan } from "../types";

export const generateLessonPlan = async (params: GenerationParams): Promise<StructuredLessonPlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelName = "gemini-3.1-pro-preview";
  
  const stepsDescription = params.model.steps
    .map((s, i) => `${i + 1}. ${s.title}: ${s.description}`)
    .join("\n");

  const prompt = `
당신은 대한민국 고등학교의 교육 전문가입니다. 
다음 정보를 바탕으로 학교에서 정의한 특정 수업 모형에 완벽하게 부합하는 세부 수업 지도안을 JSON 형식으로 작성해주세요.

[수업 정보]
- 교과: ${params.subject}
- 수업 주제: ${params.topic}
- 제시된 성취기준: ${params.achievementStandard}
- 선택된 수업 모형: ${params.model.name}

[수업 모형 단계별 가이드라인]
${stepsDescription}

[작성 원칙]
1. **학생 중심 수업**: 수업 전개 내용은 교사의 일방적인 강의보다 학생의 탐구, 토의, 협동 학습, 산출물 제작 등 학생 활동이 중심이 되도록 구성하세요.
2. **성취기준 준수**: 제시된 성취기준("${params.achievementStandard}")을 달성하기 위한 구체적인 활동을 설계하세요.
3. **하이러닝 활용**: '하이러닝' 플랫폼의 구체적인 기능(클래스보드, 모둠 활동, AI 진단 등) 활용법을 'edutechTips'에 상세히 기재하세요.
4. **시간 제외**: 단계별 소요 시간은 포함하지 마세요.

반드시 다음 JSON 구조를 지켜주세요.
`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subject: { type: Type.STRING },
            topic: { type: Type.STRING },
            achievementStandards: { type: Type.ARRAY, items: { type: Type.STRING } },
            learningObjectives: { type: Type.ARRAY, items: { type: Type.STRING } },
            procedure: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stepName: { type: Type.STRING },
                  teacherActivity: { type: Type.STRING },
                  studentActivity: { type: Type.STRING },
                  edutechTips: { type: Type.STRING }
                },
                required: ["stepName", "teacherActivity", "studentActivity", "edutechTips"]
              }
            }
          },
          required: ["title", "subject", "topic", "achievementStandards", "learningObjectives", "procedure"]
        },
        thinkingConfig: { thinkingBudget: 4000 }
      },
    });

    const text = response.text;
    if (!text) throw new Error("응답이 비어있습니다.");
    return JSON.parse(text) as StructuredLessonPlan;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
