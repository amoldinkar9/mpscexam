"use client";

import { useState, useEffect } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { BookOpen, CheckCircle, ChevronDown, Layers } from "lucide-react";
import siteData from "@/data/siteContent.json";

interface SyllabusItem {
  num: string;
  title: string;
  subtitle?: string;
  content: string;
  topics?: string[];
}

export function SyllabusWeightage({ initialData }: { initialData?: SyllabusItem[] }) {
  const [syllabusItems, setSyllabusItems] = useState<SyllabusItem[]>(
    initialData || (siteData as any).syllabus || []
  );

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.content?.syllabus)) {
          setSyllabusItems(res.content.syllabus);
        }
      })
      .catch((err) => console.error("Failed to load syllabus content:", err));
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-[#fcf8f7] border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <BookOpen className="w-4 h-4" />
            <span>MPSC अधिकृत अभ्यासक्रम रचना</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            परीक्षा <span className="text-[#9B3A32]">अभ्यासक्रम (Syllabus)</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            आयोगाच्या अधिकृत अभ्यासक्रमातील प्रत्येक घटकानुसार तयार केलेला परिपूर्ण प्रश्नसंच.
          </p>
        </div>

        {/* Radix UI Accordion */}
        <Accordion.Root
          type="single"
          collapsible
          defaultValue="item-1"
          className="space-y-3.5"
        >
          {syllabusItems.map((item) => (
            <Accordion.Item
              key={item.num}
              value={`item-${item.num}`}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all data-[state=open]:border-[#9B3A32]/40 data-[state=open]:shadow-md hover:border-slate-300"
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B3A32]">
                  {/* Left: Number Badge + Title */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#fbeae8] text-[#9B3A32] font-black text-sm sm:text-base flex items-center justify-center shrink-0 border border-[#f3c8c4] group-hover:bg-[#9B3A32] group-hover:text-white transition-colors english-numerals">
                      {item.num}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold text-base sm:text-lg text-[#1F2A5C] group-hover:text-[#9B3A32] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <span className="hidden sm:inline-block text-xs font-medium text-slate-500">
                            • {item.subtitle}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Badge + Animated Chevron */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="hidden xs:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3" />
                      <span>पूर्ण कव्हर</span>
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#fbeae8] flex items-center justify-center transition-colors">
                      <ChevronDown className="w-4 h-4 text-slate-600 group-hover:text-[#9B3A32] transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </div>
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>

              {/* Accordion Content Drawer */}
              <Accordion.Content className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                  <div className="bg-[#fdfaf9] rounded-xl p-4 sm:p-5 border border-[#f3dedc] space-y-3.5 mt-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#9B3A32] flex items-center gap-1.5 mb-1">
                        <Layers className="w-3.5 h-3.5" />
                        <span>अधिकृत अभ्यासक्रम तपशील:</span>
                      </span>
                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">
                        {item.content}
                      </p>
                    </div>

                    {/* Key Subtopics Pill Badges */}
                    {item.topics && item.topics.length > 0 && (
                      <div className="pt-1 border-t border-[#f0dedc]">
                        <span className="text-[11px] font-bold text-slate-500 block mb-2">
                          25 टेस्ट्समध्ये समाविष्ट मुख्य घटक:
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {item.topics.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[11px] sm:text-xs font-semibold bg-white text-[#1F2A5C] px-2.5 py-1 rounded-lg border border-slate-200/90 shadow-2xs hover:border-[#9B3A32]/30 transition-colors"
                            >
                              ✓ {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

      </div>
    </section>
  );
}
