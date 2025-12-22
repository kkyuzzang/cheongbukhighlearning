
import { LessonModel } from '../types';

export const LESSON_MODELS: LessonModel[] = [
  {
    id: 1,
    name: "학교 대표 모형 (플립러닝)",
    category: "공통",
    steps: [
      { title: "디딤영상", description: "수업 전 영상 시청 및 이론 사전 학습" },
      { title: "진단평가", description: "사전 학습 이해도 확인 및 수준 파악" },
      { title: "모둠활동", description: "협력 학습 및 과제 수행" },
      { title: "형성평가", description: "학습 성취도 확인 및 피드백" },
      { title: "AI진단", description: "누적 데이터를 활용한 맞춤형 문제 제공" }
    ]
  },
  {
    id: 2,
    name: "국어과 플립러닝 모형",
    category: "국어",
    steps: [
      { title: "디딤영상", description: "기본 개념 및 이론 시청" },
      { title: "진단평가", description: "오개념 수정 및 이해도 측정" },
      { title: "학습활동", description: "문학 분석, 말하기/글쓰기 실습 등 협력학습" },
      { title: "형성평가", description: "목표 달성도 확인 및 분석" },
      { title: "AI진단/AI논술형", description: "개별 피드백 및 논술형 평가" }
    ]
  },
  {
    id: 3,
    name: "국어과 강의식 수업 모형",
    category: "국어",
    steps: [
      { title: "진단평가", description: "배경지식 확인 및 동기 유발" },
      { title: "강의활동", description: "판서와 교재를 활용한 개념 내면화" },
      { title: "개별활동", description: "학습지 작성 및 발표 활동" },
      { title: "형성평가", description: "성취기준에 따른 이해도 점검" },
      { title: "AI진단/AI논술형", description: "심화 사례 적용 및 논리적 사고 확장" }
    ]
  },
  {
    id: 4,
    name: "국어과 프로젝트 수업 모형",
    category: "국어",
    steps: [
      { title: "사전활동(계획)", description: "주제 탐색 및 역할 분담" },
      { title: "프로젝트 실행", description: "자료 수집, 분석 및 산출물 제작" },
      { title: "중간발표", description: "진행 상황 공유 및 동료 피드백" },
      { title: "AI논술형/피드백", description: "논리성, 구조 점검 및 자기 점검" },
      { title: "프로젝트 수정", description: "피드백 반영 및 완성도 제고" },
      { title: "공유활동", description: "전시, 발표회 등을 통한 성과 공유" },
      { title: "종합평가", description: "자기/동료/교사 다면 평가" }
    ]
  },
  {
    id: 5,
    name: "영어과 플립러닝 모형",
    category: "영어",
    steps: [
      { title: "디딤영상", description: "EBS 모의고사 영상 및 학습지 작성" },
      { title: "진단평가", description: "지문 이해도 객관식 점검" },
      { title: "모둠활동", description: "답안 근거 토론 및 발표" },
      { title: "형성평가", description: "추론/함축/적용형 심화 문제 풀이" },
      { title: "AI진단", description: "약점 보완 및 수준별 맞춤 학습" }
    ]
  },
  {
    id: 6,
    name: "영어과 강의식 수업 모형",
    category: "영어",
    steps: [
      { title: "사전학습", description: "클래스카드를 이용한 어휘 학습" },
      { title: "진단평가", description: "지문 훑어보기 및 초기 이해도 점검" },
      { title: "강의활동", description: "핵심 구문 설명 및 모니터링" },
      { title: "형성평가", description: "요약문 빈칸 채우기 및 구조도 작성" },
      { title: "AI진단", description: "개인화된 심화 학습 경로 설계" }
    ]
  },
  {
    id: 7,
    name: "영어과 프로젝트 수업 모형",
    category: "영어",
    steps: [
      { title: "사전활동(이론)", description: "주제 제시 및 우수 사례 분석" },
      { title: "프로젝트 활동", description: "브레인스토밍 및 초안 작성" },
      { title: "AI 논술형/피드백", description: "문법, 논리성 1차 피드백 및 수정" },
      { title: "결과물 산출", description: "시각적 발표 자료 및 영작문 완성" },
      { title: "동료평가", description: "상호 피드백 및 성장 중심 평가" }
    ]
  },
  {
    id: 8,
    name: "수학과 플립러닝 모형",
    category: "수학",
    steps: [
      { title: "디딤영상", description: "선수 개념 복습 및 짧은 영상 시청" },
      { title: "진단평가", description: "선수 개념 학습 완료 확인" },
      { title: "개념설명", description: "공학적 도구(지오지브라 등) 활용 설명" },
      { title: "하브루타", description: "모둠별 토론 및 심화 탐구" },
      { title: "형성평가", description: "즉각적인 피드백 및 자동 채점" },
      { title: "AI진단", description: "오답 유형 분석 및 맞춤 과제" }
    ]
  },
  {
    id: 9,
    name: "수학과 강의식 수업 모형",
    category: "수학",
    steps: [
      { title: "진단평가", description: "학습 준비도 점검 및 자동 채점" },
      { title: "개념정리", description: "동적 모델을 활용한 시각적 강의" },
      { title: "피드백(snorkl)", description: "실시간 반응 데이터 수집 및 교정" },
      { title: "유형연습", description: "난이도별 자동 추천 문제 풀이" },
      { title: "하브루타", description: "풀이 과정 및 논리 공유 토론" },
      { title: "AI진단", description: "학습 결과 점검 및 심화/보충 과제" }
    ]
  },
  {
    id: 10,
    name: "수학과 프로젝트 수업 모형",
    category: "수학",
    steps: [
      { title: "주제도입", description: "실생활 연계 문제 제시 및 흥미 유발" },
      { title: "모둠별탐구", description: "데이터 모델링 및 해결 방안 모색" },
      { title: "발표활동", description: "사고 과정 공유 및 논리적 근거 설명" },
      { title: "토의활동", description: "다양한 접근 방식 비교 및 분석" },
      { title: "개별정리", description: "메타인지적 성찰 및 보고서 작성" }
    ]
  },
  {
    id: 11,
    name: "사회과 플립러닝 모형",
    category: "사회",
    steps: [
      { title: "디딤영상", description: "개념 및 사례 사전 학습 (EBS/뉴스)" },
      { title: "진단평가", description: "이해 수준 점검 및 모둠 리더 선정" },
      { title: "모둠활동", description: "사회 이슈 조사 및 제작 활동" },
      { title: "모둠별 발표", description: "결과 공유 및 상호 자료 활용" },
      { title: "형성평가", description: "문제 제작/풀이 및 AI 맞춤 문제" }
    ]
  },
  {
    id: 12,
    name: "사회과 강의식 수업 모형",
    category: "사회",
    steps: [
      { title: "진단평가", description: "마인드맵 등을 활용한 전시 학습 상기" },
      { title: "강의활동", description: "에듀테크 보조 도구 활용 강의" },
      { title: "개별·모둠탐구", description: "탐구 기능을 활용한 내용 정리/심화" },
      { title: "형성평가", description: "수능형 기본 문제 및 이해도 확인" },
      { title: "AI진단", description: "누적 데이터를 통한 개별화 맞춤 학습" }
    ]
  },
  {
    id: 13,
    name: "사회과 프로젝트 수업 모형",
    category: "사회",
    steps: [
      { title: "문제제기", description: "사회 현안 제시 및 문제의식 고취" },
      { title: "사전평가&모둠배정", description: "관심 주제 선택 및 수준별 모둠 구성" },
      { title: "모둠별 프로젝트", description: "인터넷 자료 조사 및 산출물(카드뉴스 등) 제작" },
      { title: "발표활동", description: "함께보기를 통한 결과 공유 및 피드백" },
      { title: "AI진단/논술", description: "분석적 글쓰기 및 AI 피드백" }
    ]
  },
  {
    id: 14,
    name: "과학과 플립러닝 모형 I",
    category: "과학",
    steps: [
      { title: "디딤영상", description: "사전 영상 시청 및 이론 학습" },
      { title: "진단평가", description: "개념 확인 및 모둠 활동 준비" },
      { title: "모둠활동", description: "협력 학습 및 의사소통 활동" },
      { title: "형성평가", description: "성취도 점검 및 성찰노트 작성" },
      { title: "AI진단", description: "단원 마무리 맞춤형 문제 제공" }
    ]
  },
  {
    id: 15,
    name: "과학과 플립러닝 모형 II",
    category: "과학",
    steps: [
      { title: "디딤영상", description: "심화 이론 및 실험 안내 영상 시청" },
      { title: "진단평가", description: "이론 배경 확인 및 수준 파악" },
      { title: "모둠활동", description: "실험 및 데이터 수집 협력" },
      { title: "형성평가", description: "개념 이해 확인 및 AI 분석" },
      { title: "구조화활동", description: "개념 도식화 및 체계적 정리" },
      { title: "AI진단", description: "개별 맞춤형 심화/보충 학습" }
    ]
  },
  {
    id: 16,
    name: "과학과 강의식 수업 모형",
    category: "과학",
    steps: [
      { title: "진단평가", description: "오개념 수정 및 3분 진단" },
      { title: "강의활동", description: "1인 1모둠 스마트 필기 중심 강의" },
      { title: "형성평가", description: "그래프 분석 등 실전 문제 풀이" },
      { title: "AI 진단", description: "중단원별 누적 데이터 기반 과제" },
      { title: "강의활동(연계)", description: "오답률 높은 문항 차시 도입부 보강" }
    ]
  },
  {
    id: 17,
    name: "과학과 프로젝트 수업 모형",
    category: "과학",
    steps: [
      { title: "영상시청", description: "실험 안내 및 안전 교육 영상 시청" },
      { title: "탐구활동", description: "조별 실험 및 무인쇄 보고서 작성" },
      { title: "발표활동", description: "실험 결과 발표 및 실시간 피드백" },
      { title: "결과고찰 & 토의", description: "데이터 비교 분석 및 과학적 사고 확장" },
      { title: "AI서논술형", description: "실험 기반 분석 보고서 작성 및 AI 진단" }
    ]
  },
  {
    id: 18,
    name: "예체능/교양 강의식 수업 모형",
    category: "예체능",
    steps: [
      { title: "진단평가", description: "기초 기능 및 배경지식 점검" },
      { title: "영상학습", description: "시범 영상 및 참고 자료 시청" },
      { title: "개인·모둠활동", description: "연주, 제작, 전략 수립 등 수행" },
      { title: "발표활동", description: "결과물 공유 및 동료 평가" },
      { title: "형성평가", description: "핵심 개념 및 규칙 점검" },
      { title: "공유활동", description: "클래스보드를 통한 전교생 공유" }
    ]
  },
  {
    id: 19,
    name: "예체능/교양 프로젝트 수업 모형",
    category: "예체능",
    steps: [
      { title: "영상시청", description: "참고 영상 시청 및 동기 부여" },
      { title: "개인·모둠탐구", description: "탐구 주제 설정 및 기초 설계" },
      { title: "모둠활동", description: "협력 제작 및 집단 지성 발휘" },
      { title: "형성평가", description: "중간 완성도 점검 및 피드백" },
      { title: "AI진단", description: "개별 역량 기반 맞춤 피드백" }
    ]
  },
  {
    id: 20,
    name: "예체능/교양 실습형 프로젝트 수업 모형",
    category: "예체능",
    steps: [
      { title: "선수학습 진단평가", description: "기초 실습 역량 확인" },
      { title: "시범관찰", description: "교사 시범 관찰 및 절차 숙지" },
      { title: "실습 및 순회지도", description: "개별/모둠 실습 및 즉각 피드백" },
      { title: "형성평가/보고서 작성", description: "성과 성찰 및 구조화된 보고서" },
      { title: "심화활동", description: "AI 데이터를 반영한 수준별 심화 과제" }
    ]
  },
  {
    id: 21,
    name: "창체/담임 학급 활동 모형",
    category: "창체",
    steps: [
      { title: "디딤영상", description: "전문가 강의 시청 및 의문점 기록" },
      { title: "개별탐구 보고서 작성", description: "심화 조사 및 보고서 초안 작성" },
      { title: "AI 서논술형 피드백", description: "논리성 및 타당성 AI 점검" },
      { title: "모둠 토의", description: "탐구 주제 융합 및 나눔 프로젝트 설계" },
      { title: "모둠활동 계획 및 실행", description: "공동체 기여 활동 및 결과 공유" }
    ]
  }
];
