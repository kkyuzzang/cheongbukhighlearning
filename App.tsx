
import React, { useState, useRef } from 'react';
import { LESSON_MODELS } from './constants/lessonModels';
import { generateLessonPlan } from './services/geminiService';
import { LessonModel, StructuredLessonPlan } from './types';

// Components
const Header: React.FC = () => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 className="text-sm sm:text-xl font-bold text-gray-900 tracking-tight">청북고 개발 하이러닝 수업 모형 활용 지도안 생성기</h1>
      </div>
      <div className="hidden sm:block text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">청북고등학교 전용 모델</div>
    </div>
  </header>
);

const LoadingState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center p-20 space-y-6">
    <div className="relative">
      <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 bg-indigo-50 rounded-full"></div>
      </div>
    </div>
    <div className="text-center">
      <p className="text-gray-800 font-bold text-lg mb-2">학생 중심 수업을 설계하고 있습니다</p>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed">{message}</p>
    </div>
  </div>
);

const LessonPlanDisplay = React.forwardRef<HTMLDivElement, { plan: StructuredLessonPlan }>(({ plan }, ref) => (
  <div ref={ref} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pdf-content">
    {/* Overview Section */}
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-indigo-600 px-6 py-4">
        <h2 className="text-white font-bold text-xl">{plan.title}</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">교과 및 주제</h3>
          <p className="text-gray-900 font-semibold">{plan.subject} | {plan.topic}</p>
        </div>
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">학습 목표</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {plan.learningObjectives.map((obj, i) => <li key={i}>{obj}</li>)}
          </ul>
        </div>
        <div className="md:col-span-2 border-t border-gray-100 pt-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">성취기준</h3>
          <div className="flex flex-wrap gap-2">
            {plan.achievementStandards.map((std, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1.5 rounded-md border border-gray-200 block w-full">
                {std}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Procedure Section */}
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 px-1">
        <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
        수업 전개 계획 (학생 중심 활동)
      </h3>
      {plan.procedure.map((step, idx) => (
        <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row break-inside-avoid mb-4">
          <div className="md:w-48 bg-gray-50 p-4 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-center items-center text-center">
            <span className="text-indigo-600 font-bold text-xs uppercase mb-1">Step {idx + 1}</span>
            <div className="text-gray-900 font-bold leading-tight">{step.stepName}</div>
          </div>
          <div className="flex-grow p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-500 uppercase flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                교사 활동 (조력 및 안내)
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">{step.teacherActivity}</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-emerald-500 uppercase flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                학생 활동 (탐구 및 수행)
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">{step.studentActivity}</p>
            </div>
            <div className="lg:col-span-2 mt-2 bg-indigo-50 rounded-lg p-3 border border-indigo-100">
              <div className="flex gap-2 items-start">
                <span className="bg-indigo-600 text-[10px] text-white font-bold px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0">하이러닝 TIP</span>
                <p className="text-xs text-indigo-800 leading-relaxed font-medium">{step.edutechTips}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
));

const App: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [achievementStandard, setAchievementStandard] = useState('');
  const [selectedModelId, setSelectedModelId] = useState<number>(1);
  const [result, setResult] = useState<StructuredLessonPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const planRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!subject || !topic || !achievementStandard) {
      alert('교과, 주제, 성취기준을 모두 입력해주세요.');
      return;
    }

    const model = LESSON_MODELS.find(m => m.id === selectedModelId);
    if (!model) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const plan = await generateLessonPlan({ subject, topic, achievementStandard, model });
      setResult(plan);
    } catch (err: any) {
      setError(err.message || '지도안 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!planRef.current || !result) return;
    
    const element = planRef.current;
    const opt = {
      margin: 10,
      filename: `수업지도안_${result.topic}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // @ts-ignore
    html2pdf().set(opt).from(element).save();
  };

  const selectedModel = LESSON_MODELS.find(m => m.id === selectedModelId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              수업 설정
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">수업 모형</label>
                <div className="relative">
                  <select 
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer text-sm"
                  >
                    {LESSON_MODELS.map(m => (
                      <option key={m.id} value={m.id}>
                        [{m.category}] {m.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">교과명</label>
                    <input 
                      type="text"
                      placeholder="예: 지구과학"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">수업 주제</label>
                    <input 
                      type="text"
                      placeholder="예: 별의 진화"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">성취기준</label>
                  <textarea 
                    placeholder="예: [12지구03-03] 다양한 질량을 가진 별의 진화 과정을 H-R도에 나타내고 해석할 수 있다."
                    value={achievementStandard}
                    onChange={(e) => setAchievementStandard(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm resize-none"
                  />
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? '학생 중심 수업 설계 중...' : '지도안 자동 생성'}
                {!isLoading && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
              </button>

              <div className="pt-4 border-t border-gray-100">
                <a 
                  href="https://drive.google.com/file/d/1YmZX9Azz2dQdLK5EzKZDqoPRM_LX9Kl-/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  청북고 하이파이브 수업 모형 및 지도안 예시
                </a>
              </div>
            </div>
          </div>

          {/* Model Preview */}
          {selectedModel && (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                기본 모형 구조
              </h3>
              <div className="space-y-4">
                {selectedModel.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    {idx !== selectedModel.steps.length - 1 && (
                      <div className="absolute left-3 top-7 bottom-0 w-0.5 bg-gray-100"></div>
                    )}
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold flex items-center justify-center border border-indigo-100 z-10">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">{step.title}</div>
                      <div className="text-[11px] text-gray-500 leading-tight mt-0.5">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-8 min-h-[600px]">
          {isLoading ? (
            <div className="bg-white h-full rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center">
              <LoadingState message="선택하신 수업 모형의 핵심 단계를 분석하여 실제 현장에서 바로 사용할 수 있는 학생 중심 지도안을 구성하고 있습니다." />
            </div>
          ) : error ? (
            <div className="bg-white h-full rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 inline-block">
                <p className="font-bold mb-2">오류가 발생했습니다</p>
                <p className="text-sm">{error}</p>
              </div>
              <button 
                onClick={handleGenerate}
                className="block mx-auto mt-6 text-indigo-600 font-semibold hover:underline"
              >
                다시 시도하기
              </button>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className="flex justify-end gap-3">
                <button 
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  PDF로 저장
                </button>
              </div>
              <LessonPlanDisplay ref={planRef} plan={result} />
            </div>
          ) : (
            <div className="bg-white h-full rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center p-12 text-gray-400">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">준비된 지도안이 없습니다</h3>
              <p className="max-w-[280px] text-sm leading-relaxed">
                좌측에서 교과, 주제 및 <span className="text-indigo-600 font-semibold">성취기준</span>을 입력하고<br /> 
                자동 생성 버튼을 눌러주세요.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="space-y-2">
            <p className="text-sm text-gray-700 font-bold">© 2025 경기도교육청 하이러닝 연구학교 청북고등학교</p>
            <p className="text-sm text-gray-600 font-medium">
              연구학교 업무담당자: 청북고 미래교육부장 이윤규, 문의: <a href="https://open.kakao.com/o/s7hVU65h" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">카카오톡 오픈채팅</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
