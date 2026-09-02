"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "ही टेस्ट सिरीज कोणासाठी उपयुक्त आहे?",
      a: "ही टेस्ट सिरीज MPSC महाराष्ट्र गट-क सेवा संयुक्त पूर्व परीक्षा 2026 देणाऱ्या सर्व नवीन व अनुभवी विद्यार्थ्यांसाठी अत्यंत उपयुक्त आहे."
    },
    {
      q: "टेस्ट्स सोडवण्यासाठी लॅपटॉप आवश्यक आहे का?",
      a: "नाही! तुम्ही तुमच्या मोबाईल, टॅबलेट किंवा लॅपटॉप/कॉम्प्युटरवर कधीही आणि कुठूनही सहजपणे या टेस्ट्स देऊ शकता."
    },
    {
      q: "मी एका टेस्टचा सराव किती वेळा करू शकतो?",
      a: "तुम्ही प्रत्येक टेस्ट अमर्यादित (Unlimited) वेळा सोडवू शकता. जितक्या जास्त वेळा सराव कराल, तितका तुमचा आत्मविश्वास आणि अचूकता वाढेल."
    },
    {
      q: "टेस्ट सिरीजची वैधता (Validity) किती दिवस राहील?",
      a: "या टेस्ट सिरीजची वैधता परीक्षा होईपर्यंत म्हणजेच 25 ऑक्टोबर 2026 पर्यंत वैध राहील. तोपर्यंत तुम्ही सर्व टेस्ट्स व स्पष्टीकरणे कधीही पाहू शकता."
    },
    {
      q: "पेमेंट केल्यानंतर टेस्ट्स लगेच सुरू होतील का?",
      a: "होय! ऑनलाइन पेमेंट यशस्वी होताच एका सेकंदात तुमचे खाते ॲक्टिव्हेट होईल आणि सर्व टेस्ट्स त्वरित उपलब्ध होतील."
    },
    {
      q: "प्रत्येक प्रश्नाचे सविस्तर स्पष्टीकरण कसे मिळेल?",
      a: "टेस्ट सबमिट केल्यावर लगेचच तुमचा स्कोअरकार्ड, राज्यस्तरीय रँक आणि प्रत्येक प्रश्नाचे 4 पर्यायांसह सविस्तर मराठी स्पष्टीकरण व PDF उपलब्ध होते."
    }
  ];

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
