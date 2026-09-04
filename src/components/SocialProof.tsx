import { Star, CheckCircle2, Award } from "lucide-react";
import siteData from "@/data/siteContent.json";

export function SocialProof() {
  const testimonials = siteData.testimonials;

  return (
    <section className="py-16 sm:py-20 bg-[#fafbfc] border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <Award className="w-4 h-4" />
            <span>विद्यार्थ्यांचा विश्वास</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            Testimonials <span className="text-[#9B3A32]"></span>
          </h2>

        </div>

        {/* Falsifiable Accuracy Claim Banner Strip (Commented Out) */}
        {/*
        <div className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-[#9B3A32] to-[#7e2b24] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[#9B3A32]/40 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-8 h-8 text-amber-300" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                "आमच्या मागील टेस्टमधील प्रश्न प्रत्यक्ष परीक्षेत आले होते!"
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                आयोगाच्या विचारसरणीवर आधारित सखोल अभ्यास करून तयार केलेला विश्वासू प्रश्नसंच.
              </p>
            </div>
          </div>
          <span className="shrink-0 bg-amber-400 text-[#78350f] text-xs sm:text-sm font-extrabold px-4 py-2 rounded-xl uppercase tracking-wider shadow-sm">
            100% प्रामाणिक फीडबॅक
          </span>
        </div>
        */}

        {/* Infinite Looping Testimonials Marquee (Continuous Loop, No Slider) */}
        <div className="relative mb-14 overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
          {/* Edge fade gradient masks for seamless entry and exit */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#fafbfc] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#fafbfc] to-transparent z-10" />

          <div className="flex animate-marquee gap-5 py-3 px-4">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div
                key={idx}
                className="w-[300px] sm:w-[350px] md:w-[380px] shrink-0 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 select-none"
              >
                <div className="space-y-4">
                  {/* Rating Stars & Outcome Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${t.outcomeColor}`}>
                      {t.outcomeTag}
                    </span>
                  </div>

                  {/* Quote text */}
                  <p className="text-xs sm:text-sm text-[#334155] leading-[1.8] font-normal">
                    "{t.quote}"
                  </p>
                </div>

                {/* User Identity with Marathi Initial Avatar */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                  <div className={`w-11 h-11 rounded-full ${t.initialBg} font-black text-base flex items-center justify-center shadow-xs shrink-0 select-none`}>
                    {t.initial}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm sm:text-base text-[#1F2A5C]">{t.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Strip (Commented Out) */}
        {/*
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-center p-3 sm:border-r border-slate-100 last:border-none space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-[#9B3A32] english-numerals">10,000+</p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">सक्रिय विद्यार्थी</p>
          </div>
          <div className="text-center p-3 sm:border-r border-slate-100 last:border-none space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-[#9B3A32] english-numerals">18+</p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">सरासरी गुणवाढ</p>
          </div>
          <div className="text-center p-3 sm:border-r border-slate-100 last:border-none space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-[#9B3A32] english-numerals">92%</p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">विद्यार्थी शिफारस दर</p>
          </div>
          <div className="text-center p-3 last:border-none space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-[#9B3A32] english-numerals">2,000+</p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">अपेक्षित प्रश्न बँक</p>
          </div>
        </div>
        */}

      </div>
    </section>
  );
}
