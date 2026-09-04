"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import siteData from "@/data/siteContent.json";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = siteData.faqs;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <HelpCircle className="w-4 h-4" />
            <span>वारंवार विचारले जाणारे प्रश्न</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            काही शंका आहेत? <span className="text-[#9B3A32]">येथे उत्तरे मिळतील</span>
          </h2>
          <p className="text-base text-slate-600">
            परीक्षेची तयारी करताना विद्यार्थ्यांच्या मनात येणाऱ्या सर्व प्रश्नांचे स्पष्टीकरण.
          </p>
        </div>

        {/* FAQ Accordion List with generous padding */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-[#fafbfc] border-[#9B3A32]/40 shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-5 font-bold text-[#1F2A5C] text-base sm:text-lg cursor-pointer"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs sm:text-sm font-black flex items-center justify-center shrink-0 english-numerals">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#9B3A32] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#334155] leading-[1.8] border-t border-slate-100">
                    <p className="pl-10.5">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
