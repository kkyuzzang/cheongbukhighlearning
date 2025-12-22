
export interface LessonStep {
  title: string;
  description: string;
}

export interface LessonModel {
  id: number;
  name: string;
  category: string;
  steps: LessonStep[];
}

export interface GenerationParams {
  subject: string;
  topic: string;
  achievementStandard: string;
  model: LessonModel;
}

export interface StructuredLessonPlan {
  title: string;
  subject: string;
  topic: string;
  achievementStandards: string[];
  learningObjectives: string[];
  procedure: {
    stepName: string;
    teacherActivity: string;
    studentActivity: string;
    edutechTips: string;
  }[];
}
