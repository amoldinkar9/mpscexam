"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, HelpCircle, Lightbulb } from "lucide-react";
import siteData from "@/data/siteContent.json";

export function SampleProof() {
  const [activeSubject, setActiveSubject] = useState<"gk" | "math" | "marathi" | "reasoning">("gk");
  const sampleData = siteData.sampleProof;
  const current = sampleData[activeSubject];

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
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            प्रत्यक्ष परीक्षेसारखा फील देणारे प्रश्न आणि संभ्रम दूर करणारे सविस्तर मराठी स्पष्टीकरण.
          </p>
        </div>

        {/* Subject Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {(
            [
              { id: "gk", label: "सामान्य ज्ञान (GS)" },
              { id: "math", label: "अंकगणित (Maths)" },
              { id: "marathi", label: "मराठी व्याकरण" },
              { id: "reasoning", label: "बुद्धिमत्ता चाचणी" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubject(tab.id)}
              className={`px-5 py-3 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
                activeSubject === tab.id
                  ? "bg-[#9B3A32] text-white shadow-md shadow-[#9B3A32]/25 scale-105"
                  : "bg-white text-[#1F2A5C] hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sample Question & Explanation Preview Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Card Header Bar (Exam Simulator UI) */}
          <div className="bg-[#1F2A5C] px-6 py-4 text-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
              <span className="bg-white/10 px-3 py-1 rounded-lg text-amber-300">प्रश्न क्र. 1</span>
              <span>{current.subjectName}</span>
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-400/30 font-medium">
              {current.tag}
            </span>
          </div>

          {/* Question Body */}
          <div className="p-7 sm:p-9 space-y-7">
            <div className="text-lg sm:text-xl font-bold text-[#1F2A5C] leading-[1.7]">
              {current.question}
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.options.map((opt, idx) => {
                const isCorrect = idx === current.correct;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border text-sm sm:text-base font-medium flex items-center justify-between transition-all ${
                      isCorrect
                        ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-400 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-[#1F2A5C]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold english-numerals ${
                        isCorrect ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"
                      }`}>
                        {idx + 1}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {isCorrect && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                        बरोबर उत्तर ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* In-depth Explanation Box */}
            <div className="bg-[#fbeae8] rounded-2xl p-5 sm:p-6 border border-[#f3c8c4] space-y-2">
              <div className="flex items-center gap-2 text-[#9B3A32] font-bold text-sm sm:text-base mb-1">
                <Lightbulb className="w-5 h-5" />
                <span>तपशीलवार स्पष्टीकरण व संदर्भ:</span>
              </div>
              <p className="text-sm sm:text-base text-[#334155] whitespace-pre-line leading-[1.8] font-normal">
                {current.explanation}
              </p>
            </div>
          </div>

          {/* Card Footer Bar */}
          <div className="bg-slate-50 px-7 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-slate-600">
            <span>अशाच पद्धतीचे 2,000+ दर्जेदार प्रश्न टेस्ट सिरीजमध्ये उपलब्ध आहेत.</span>
            <span className="font-bold text-[#9B3A32] flex items-center shrink-0">
              100% MPSC स्टँडर्ड <ChevronRight className="w-4 h-4 ml-0.5" />
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
