"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Lightbulb } from "lucide-react";
import siteData from "@/data/siteContent.json";

export function SampleProof({ initialData }: { initialData?: Record<string, any> }) {
  const [sampleData, setSampleData] = useState<Record<string, any>>(initialData || siteData.sampleProof || {});
  const subjectKeys = Object.keys(sampleData);
  const [activeSubject, setActiveSubject] = useState<string>(subjectKeys[0] || "currentAffairs");

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
  }, [subjectKeys, activeSubject]);

  const effectiveSubject = subjectKeys.includes(activeSubject) ? activeSubject : subjectKeys[0] || "";
  const current = sampleData[effectiveSubject] || sampleData[subjectKeys[0]] || {};

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
            प्रत्यक्ष परीक्षेसारखा फील देणारे प्रश्न आणि संभ्रम दूर करणारे सविस्तर मराठी स्पष्टीकरण.
          </p>
        </div>

        {/* Subject Navigation Tabs (Dynamically rendered in exact order from sampleData) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {subjectKeys.map((key) => {
            const item = sampleData[key];
            const isTabActive = effectiveSubject === key;
            return (
              <button
                key={key}
                onClick={() => setActiveSubject(key)}
                className={`px-5 py-3 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
                  isTabActive
                    ? "bg-[#9B3A32] text-white shadow-md shadow-[#9B3A32]/25 scale-105"
                    : "bg-white text-[#1F2A5C] hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {item?.subjectName || key}
              </button>
            );
          })}
        </div>

        {/* Sample Question & Explanation Preview Card (Exact layout matching Question Box specification) */}
        <div className="max-w-3xl mx-auto bg-[#f4f5f8] rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 md:p-9 space-y-5">
          
          {/* Question No. Title */}
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Question No. {current.questionNo || 6}
            </h3>
            <span className="text-xs bg-slate-200/80 text-slate-700 px-3 py-1 rounded-md font-semibold border border-slate-300/60">
              {current.tag || current.subjectName}
            </span>
          </div>

          {/* Question Highlight Box (Soft Blue/Slate Tint) */}
          <div className="bg-[#dce3f0] rounded-xl p-4 sm:p-5 text-slate-900 font-bold text-sm sm:text-base leading-relaxed tracking-tight">
            {current.question}
          </div>

          {/* Vertical Options List with Radio Selectors */}
          <div className="space-y-2.5">
            {current.options.map((opt: string, idx: number) => {
              const isCorrect = idx === current.correct;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                    isCorrect
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
                  <span className="text-sm sm:text-base leading-snug">{opt}</span>
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
              उत्तर : {current.correctAnswer || current.options[current.correct]}
            </p>

            {/* Explanation Breakdown: Dynamic Rich HTML first, then Structured, then Plain Text */}
            {current.explanationHtml ? (
              <div
                className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal space-y-2.5 [&_h1]:text-base sm:[&_h1]:text-lg [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h1]:my-2 [&_h2]:text-sm sm:[&_h2]:text-base [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:my-1.5 [&_h3]:text-xs sm:[&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:my-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_li]:my-0.5 [&_blockquote]:border-l-3 [&_blockquote]:border-[#9B3A32] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_code]:bg-slate-100 [&_code]:text-[#9B3A32] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-xs [&_a]:text-[#2563eb] [&_a]:underline [&_a]:font-semibold"
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
            <span>अशाच पद्धतीचे 2,000+ दर्जेदार प्रश्न व सविस्तर स्पष्टीकरणे टेस्ट सिरीजमध्ये उपलब्ध आहेत.</span>
            <span className="font-bold text-[#9B3A32] flex items-center shrink-0">
              100% MPSC स्टँडर्ड <ChevronRight className="w-4 h-4 ml-0.5" />
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
