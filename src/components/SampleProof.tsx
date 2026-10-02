"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb, 
  Pause, 
  Play 
} from "lucide-react";
import siteData from "@/data/siteContent.json";

const SLIDE_DURATION_MS = 5000;
const TICK_INTERVAL_MS = 50;

export function SampleProof({ initialData }: { initialData?: Record<string, any> }) {
  const [sampleData, setSampleData] = useState<Record<string, any>>(initialData || siteData.sampleProof || {});
  const subjectKeys = (Array.isArray(sampleData._order) && sampleData._order.length > 0)
    ? sampleData._order.filter((k: string) => sampleData[k] && k !== "_order")
    : Object.keys(sampleData).filter((k) => k !== "_order");
  const [activeSubject, setActiveSubject] = useState<string>(subjectKeys[0] || "currentAffairs");

  // Auto-slide and pause states
  const [isPaused, setIsPaused] = useState<boolean>(false); // Manual pause by toggle or option click
  const [isHovered, setIsHovered] = useState<boolean>(false); // Desktop hover pause
  const [isTouching, setIsTouching] = useState<boolean>(false); // Mobile touch hold pause
  const [progress, setProgress] = useState<number>(0); // 0 to 100%
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [pausedReason, setPausedReason] = useState<string | null>(null);

  // References for mobile swipe & tabs horizontal scrolling
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Fetch latest content from API to stay live with admin edits
  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.content?.sampleProof) {
          setSampleData(res.content.sampleProof);
        }
      })
      .catch((err) => console.error("Failed to load sampleProof content:", err));
  }, []);

  // Sync active subject if current activeSubject is no longer in keys or order changed
  useEffect(() => {
    if (subjectKeys.length > 0 && !subjectKeys.includes(activeSubject)) {
      setActiveSubject(subjectKeys[0]);
    }
  }, [subjectKeys.join(","), activeSubject]);

  const effectiveSubject = subjectKeys.includes(activeSubject) ? activeSubject : subjectKeys[0] || "";
  const currentIndex = subjectKeys.indexOf(effectiveSubject);
  const current = sampleData[effectiveSubject] || sampleData[subjectKeys[0]] || {};

  // Auto-scroll active subject tab into view horizontally without vertical jump
  useEffect(() => {
    if (tabsContainerRef.current && activeTabRef.current) {
      const container = tabsContainerRef.current;
      const tab = activeTabRef.current;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.clientWidth;
      container.scrollTo({
        left: tabLeft - containerWidth / 2 + tabWidth / 2,
        behavior: "smooth",
      });
    }
  }, [effectiveSubject]);

  // Navigate to specific subject
  const goToSubject = useCallback((key: string, direction: "next" | "prev" = "next") => {
    setSlideDirection(direction);
    setActiveSubject(key);
    setProgress(0);
  }, []);

  // Navigate to next question
  const goToNext = useCallback(() => {
    if (subjectKeys.length <= 1) return;
    const curIdx = subjectKeys.indexOf(effectiveSubject);
    const nextIdx = (curIdx + 1) % subjectKeys.length;
    goToSubject(subjectKeys[nextIdx], "next");
  }, [effectiveSubject, subjectKeys, goToSubject]);

  // Navigate to previous question
  const goToPrev = useCallback(() => {
    if (subjectKeys.length <= 1) return;
    const curIdx = subjectKeys.indexOf(effectiveSubject);
    const prevIdx = (curIdx - 1 + subjectKeys.length) % subjectKeys.length;
    goToSubject(subjectKeys[prevIdx], "prev");
  }, [effectiveSubject, subjectKeys, goToSubject]);

  // Effective pause state: either manually paused, hovered on desktop, or touching on mobile
  const isEffectivelyPaused = isPaused || isHovered || isTouching;

  // 5-second automatic sliding timer with progress bar
  useEffect(() => {
    if (isEffectivelyPaused || subjectKeys.length <= 1) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + (TICK_INTERVAL_MS / SLIDE_DURATION_MS) * 100;
      });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isEffectivelyPaused, subjectKeys.length, goToNext]);

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsTouching(false);
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe if deltaX is dominant over deltaY and exceeds threshold
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Option interaction handler: pause auto-slide so user can read comfortably
  const handleOptionClick = () => {
    setIsPaused(true);
    setPausedReason("option");
  };

  // Toggle play/pause manually (works for both mobile and desktop)
  const togglePlayPause = () => {
    if (isPaused) {
      setIsPaused(false);
      setPausedReason(null);
      setProgress(0);
    } else {
      setIsPaused(true);
      setPausedReason("manual");
    }
  };

  return (
    <section className="py-20 bg-[#fafbfc] border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <Lightbulb className="w-4 h-4" />
            <span>गुणवत्तेचा थेट पुरावा</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            प्रश्नांची व स्पष्टीकरणांची <span className="text-[#9B3A32]">नमुना गुणवत्ता पहा</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            आयोगाच्या पॅटर्न नुसार प्रश्न आणि सविस्तर स्पष्टीकरण
          </p>
        </div>

        {/* Subject Navigation Tabs (Dynamically rendered in exact order from sampleData) */}
        <div 
          ref={tabsContainerRef}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 md:gap-3 mb-6 md:mb-7 overflow-x-auto no-scrollbar py-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {subjectKeys.map((key) => {
            const item = sampleData[key];
            const isTabActive = effectiveSubject === key;
            return (
              <button
                key={key}
                ref={isTabActive ? activeTabRef : null}
                onClick={() => {
                  const clickedIdx = subjectKeys.indexOf(key);
                  const curIdx = subjectKeys.indexOf(effectiveSubject);
                  goToSubject(key, clickedIdx >= curIdx ? "next" : "prev");
                }}
                className={`px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl font-bold text-xs sm:text-sm md:text-base transition-all cursor-pointer ${isTabActive
                  ? "bg-[#9B3A32] text-white shadow-md shadow-[#9B3A32]/25 scale-105"
                  : "bg-white text-[#1F2A5C] hover:bg-slate-100 border border-slate-200"
                  }`}
              >
                {item?.subjectName || key}
              </button>
            );
          })}
        </div>

        {/* Sliding Features Built in Between Spaces of Subject Tabs and Question Block */}
        <div 
          className="max-w-3xl mx-auto mb-5 sm:mb-6 px-1 space-y-2.5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Controls Bar: Pagination Dots, 1-Click Play/Pause, and Prev/Next */}
          <div className="flex items-center justify-between gap-2.5 text-xs sm:text-sm">
            
            {/* Pagination Dots for Quick Navigation */}
            <div className="flex items-center gap-1.5">
              {subjectKeys.map((key, i) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => goToSubject(key, i > currentIndex ? "next" : "prev")}
                  aria-label={`प्रश्न ${i + 1}`}
                  title={`प्रश्न ${i + 1} (${sampleData[key]?.subjectName || key})`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === currentIndex 
                      ? "w-6 bg-[#9B3A32]" 
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Right: Icon-only Play/Pause & Arrow Navigation Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={togglePlayPause}
                aria-label={isPaused ? "ऑटो-स्लाइड सुरू करा" : "ऑटो-स्लाइड थांबवा"}
                title={isPaused ? "ऑटो-स्लाइड सुरू करा (Play)" : "ऑटो-स्लाइड थांबवा (Pause)"}
                className="p-1.5 sm:p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-all cursor-pointer flex items-center justify-center"
              >
                {isPaused ? (
                  <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                ) : (
                  <Pause className="w-4 h-4 text-slate-700 fill-current" />
                )}
              </button>

              <button
                type="button"
                onClick={goToPrev}
                aria-label="मागील प्रश्न"
                title="मागील प्रश्न"
                className="p-1.5 sm:p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-all cursor-pointer flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="पुढील प्रश्न"
                title="पुढील प्रश्न"
                className="p-1.5 sm:p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-all cursor-pointer flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* 5-Second Animated Progress Bar */}
          <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-75 ease-linear ${
                isEffectivelyPaused ? "bg-amber-500" : "bg-[#9B3A32]"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Sample Question & Explanation Preview Card (Exact layout matching Question Box specification) */}
        <div 
          className={`max-w-3xl mx-auto bg-[#f4f4f4] rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md p-5 sm:p-6 md:p-7 lg:p-9 space-y-4 md:space-y-5 transition-all ${
            slideDirection === "next" ? "animate-slide-right" : "animate-slide-left"
          }`}
          key={effectiveSubject}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          {/* Question No. Title */}
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Question No. {current.questionNo || (currentIndex + 1)}
            </h3>
            <span className="text-xs bg-slate-200/80 text-slate-700 px-3 py-1 rounded-md font-semibold border border-slate-300/60">
              {current.tag || current.subjectName}
            </span>
          </div>

          {/* Question Highlight Box (Soft Gray Tint) */}
          <div className="bg-[#f4f4f4] border border-slate-200/80 rounded-xl p-4 sm:p-5 text-slate-900 font-bold text-sm sm:text-base leading-relaxed tracking-tight whitespace-pre-line">
            {current.question ? current.question.replace(/<br\s*\/?>/gi, "\n") : ""}
          </div>

          {/* Vertical Options List with Radio Selectors */}
          <div className="space-y-2.5">
            {current.options && current.options.map((opt: string, idx: number) => {
              const isCorrect = idx === current.correct;
              return (
                <div
                  key={idx}
                  onClick={handleOptionClick}
                  role="button"
                  tabIndex={0}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${isCorrect
                    ? "bg-[#bbf7d0] text-emerald-950 font-bold shadow-2xs"
                    : "text-slate-700 font-medium hover:bg-slate-100/60"
                    }`}
                >
                  {isCorrect ? (
                    <div className="w-4 h-4 rounded-full border-2 border-emerald-700 bg-white flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-emerald-700" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-400 shrink-0 bg-white" />
                  )}
                  <span className="text-sm sm:text-base leading-snug whitespace-pre-line">{opt}</span>
                </div>
              );
            })}
          </div>

          {/* Explanation Area */}
          <div className="pt-2 space-y-3">
            <p className="text-sm font-semibold text-slate-700">Explanation:</p>

            {/* Visual/Infographic Image (e.g. Airport Photo) */}
            {current.image && (
              <div className="rounded-xl overflow-hidden border border-slate-200/90 shadow-xs max-w-2xl my-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.image}
                  alt="स्पष्टीकरण इन्फोग्राफिक"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Answer Heading in Green */}
            <p className="text-sm sm:text-base font-extrabold text-[#15803d]">
              उत्तर : {current.correctAnswer || (current.options && current.options[current.correct])}
            </p>

            {/* Explanation Breakdown: Dynamic Rich HTML first, then Structured, then Plain Text */}
            {current.explanationHtml ? (
              <div
                className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal space-y-2.5 [&_h1]:text-base sm:[&_h1]:text-lg [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h1]:my-2 [&_h2]:text-sm sm:[&_h2]:text-base [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:my-1.5 [&_h3]:text-xs sm:[&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:my-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_li]:my-0.5 [&_blockquote]:border-l-3 [&_blockquote]:border-[#9B3A32] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_code]:bg-slate-100 [&_code]:text-[#9B3A32] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-xs [&_a]:text-[#2563eb] [&_a]:underline [&_a]:font-semibold [&_table]:w-full [&_table]:border-collapse [&_table]:my-3 [&_th]:border [&_th]:border-slate-300 [&_th]:bg-slate-100 [&_th]:px-3 [&_th]:py-2 [&_th]:font-bold [&_th]:text-slate-900 [&_th]:text-left [&_td]:border [&_td]:border-slate-300 [&_td]:px-3 [&_td]:py-2 [&_td]:text-slate-800 [&_tr:nth-child(even)]:bg-slate-50/60 overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: current.explanationHtml }}
              />
            ) : current.structuredExplanation ? (
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                {current.structuredExplanation.bullets?.map((bullet: any, idx: number) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="font-bold shrink-0">•</span>
                    <span>
                      <strong className={`font-bold ${bullet.highlightClass || "text-slate-900"}`}>
                        {bullet.label}
                      </strong>{" "}
                      <span className="text-slate-700">{bullet.text}</span>
                    </span>
                  </p>
                ))}

                {current.structuredExplanation.subsections?.map((sec: any, sIdx: number) => (
                  <div key={sIdx} className="pt-2 space-y-1.5">
                    <p className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{sec.heading}</span>
                    </p>
                    {sec.items?.map((item: string, iIdx: number) => (
                      <p key={iIdx} className="flex items-start gap-2 pl-2 text-slate-700">
                        <span className="font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-normal">
                {current.explanation}
              </p>
            )}
          </div>

          {/* Card Footer Bar */}
          <div className="pt-4 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <span>अशाच पद्धतीचे 2,500+ दर्जेदार प्रश्न व सविस्तर स्पष्टीकरणे टेस्ट सिरीजमध्ये उपलब्ध आहेत.</span>
            <span className="font-bold text-[#9B3A32] flex items-center shrink-0">
              100% MPSC पॅटर्न <ChevronRight className="w-4 h-4 ml-0.5" />
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
