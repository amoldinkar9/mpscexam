import { CheckCircle2, XCircle, Zap } from "lucide-react";
import siteData from "@/data/siteContent.json";

export function AspirantPainPoints() {
  const points = siteData.painPoints;
  const cutoffContrast = siteData.cutoffContrast;

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <Zap className="w-4 h-4" />
            <span>अपेक्षित अडचणींवर मात</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            अभ्यास करताना <span className="text-[#9B3A32]">या अडचणी येतात का?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            सामान्य चुका टाळा आणि पहिल्याच प्रयत्नात स्वतःचे नाव निवड यादीत निश्चित करा.
          </p>
        </div>

        {/* 2-Column Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              {/* Problem Statement */}
              <div className="flex items-start gap-3 bg-red-50/80 p-3.5 rounded-xl border border-red-200/80">
                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base font-bold text-red-950 leading-relaxed">
                  {pt.problem}
                </p>
              </div>

              {/* TCS9 Solution */}
              <div className="flex items-start gap-3 bg-emerald-50/90 p-3.5 rounded-xl border border-emerald-200/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-950 leading-relaxed font-medium">
                  <strong className="text-emerald-900">आमचे सोल्यूशन:</strong> {pt.solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* High-Impact FOMO Contrast: The 1-Year Opportunity Cost */}
        <div className="bg-gradient-to-br from-[#1F2A5C] to-[#151d40] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="bg-amber-400/20 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-400/30">
              कटऑफचा खरा फरक
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
              फक्त वाचन करणारे vs. प्रत्यक्ष 25 टेस्ट्स सोडवणारे
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              7.5 लाख विद्यार्थ्यांमध्ये 1-2 गुणांचा फरक ठरवतो तुमचे सिलेक्शन किंवा पुन्हा 1 वर्षाची प्रतीक्षा!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>केवळ पुस्तके वाचणारे विद्यार्थी:</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
                {cutoffContrast.bookReaders.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>ही 25 टेस्ट्स सिरीज सोडवणारे विद्यार्थी:</span>
              </div>
              <ul className="text-xs sm:text-sm text-emerald-100 space-y-1.5 list-disc list-inside">
                {cutoffContrast.testSeries.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
