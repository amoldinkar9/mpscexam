"use client";

import { useState } from "react";
import { 
  FileText, 
  HelpCircle, 
  Clock, 
  TrendingDown, 
  CheckCircle, 
  Sparkles, 
  BarChart2, 
  Award, 
  BookOpenCheck, 
  Calendar,
  Layers,
  FileCheck2
} from "lucide-react";

export function OfferBreakdown() {
  const [activeTab, setActiveTab] = useState<"full" | "current">("full");

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <Layers className="w-4 h-4" />
            <span>संपूर्ण पॅकेज तपशील</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            या टेस्ट सिरीजमध्ये तुम्हाला <span className="text-[#9B3A32]">काय काय मिळेल?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            MPSC गट-क पूर्व परीक्षेच्या प्रत्यक्ष अनुभवासाठी आवश्यक असलेल्या सर्व घटकांचा समावेश.
          </p>
        </div>

        {/* Main Tabbed Card Container */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden max-w-4xl mx-auto">
          
          {/* Tab Switcher Headers */}
          <div className="grid grid-cols-2 bg-slate-200/70 p-2 gap-2 border-b border-slate-200">
            <button
              onClick={() => setActiveTab("full")}
              className={`flex items-center justify-center gap-2.5 py-4 px-4 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
                activeTab === "full"
                  ? "bg-white text-[#9B3A32] shadow-sm border border-slate-200/80"
                  : "text-[#1F2A5C] hover:text-[#9B3A32] hover:bg-white/50"
              }`}
            >
              <FileCheck2 className="w-5 h-5 text-[#9B3A32]" />
              <span>15 फुल-लेंथ पॅटर्न टेस्ट्स</span>
            </button>

            <button
              onClick={() => setActiveTab("current")}
              className={`flex items-center justify-center gap-2.5 py-4 px-4 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
                activeTab === "current"
                  ? "bg-white text-[#9B3A32] shadow-sm border border-slate-200/80"
                  : "text-[#1F2A5C] hover:text-[#9B3A32] hover:bg-white/50"
              }`}
            >
              <Calendar className="w-5 h-5 text-[#9B3A32]" />
              <span>10 चालू घडामोडी स्पेशल टेस्ट्स</span>
            </button>
          </div>

          {/* Tab 1 Content: 15 Full-length Tests with Exam Spec Table */}
          {activeTab === "full" && (
            <div className="p-7 sm:p-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-200">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1F2A5C]">
                    15 संपूर्ण अभ्यासक्रम मॉक टेस्ट्स (MPSC Pattern)
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    इतिहास, भूगोल, राज्यशास्त्र, अर्थशास्त्र, सामान्य विज्ञान, गणित व बुद्धिमत्ता, चालू घडामोडी.
                  </p>
                </div>
                <div className="inline-flex items-center self-start sm:self-auto px-4 py-2 rounded-xl bg-[#fbeae8] text-[#9B3A32] font-extrabold text-sm border border-[#f3c8c4] shrink-0">
                  एकूण 1,500 प्रश्न
                </div>
              </div>

              {/* Exact Exam-Spec Table with spacious rows */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-sm sm:text-base">
                  <thead className="bg-[#1F2A5C] text-white">
                    <tr>
                      <th className="py-4 px-5 font-semibold">परीक्षेचा घटक</th>
                      <th className="py-4 px-5 font-semibold">आयोगाचे निकष</th>
                      <th className="py-4 px-5 font-semibold">आमच्या टेस्ट सिरीजमध्ये</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[#1F2A5C]">
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-5 font-medium flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-[#9B3A32] shrink-0" />
                        <span>एकूण प्रश्न (Total Questions)</span>
                      </td>
                      <td className="py-4 px-5 font-bold english-numerals">100 प्रश्न</td>
                      <td className="py-4 px-5 text-emerald-700 font-semibold english-numerals">✓ तंतोतंत 100 प्रश्न प्रति टेस्ट</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-5 font-medium flex items-center gap-3">
                        <Award className="w-5 h-5 text-[#9B3A32] shrink-0" />
                        <span>एकूण गुण (Total Marks)</span>
                      </td>
                      <td className="py-4 px-5 font-bold english-numerals">100 गुण</td>
                      <td className="py-4 px-5 text-emerald-700 font-semibold english-numerals">✓ 1 प्रश्न = 1 गुण</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-5 font-medium flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[#9B3A32] shrink-0" />
                        <span>वेळ मर्यादा (Time Limit)</span>
                      </td>
                      <td className="py-4 px-5 font-bold english-numerals">60 मिनिटे (1 तास)</td>
                      <td className="py-4 px-5 text-emerald-700 font-semibold english-numerals">✓ लाइव्ह 60 मिनिटे टाइमर</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-5 font-medium flex items-center gap-3">
                        <TrendingDown className="w-5 h-5 text-[#9B3A32] shrink-0" />
                        <span>निगेटिव्ह मार्किंग (Negative Marking)</span>
                      </td>
                      <td className="py-4 px-5 font-bold english-numerals">-0.25 (1/4th)</td>
                      <td className="py-4 px-5 text-emerald-700 font-semibold english-numerals">✓ अचूक -0.25 सिस्टीम कपात</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bullet Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 text-sm text-[#1F2A5C] leading-relaxed">
                  <CheckCircle className="w-5 h-5 text-[#9B3A32] shrink-0 mt-0.5" />
                  <span>आयोगाच्या 2024 व 2025 काठिण्यपातळीशी तंतोतंत सुसंगत प्रश्न रचना</span>
                </div>
                <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 text-sm text-[#1F2A5C] leading-relaxed">
                  <CheckCircle className="w-5 h-5 text-[#9B3A32] shrink-0 mt-0.5" />
                  <span>प्रत्येक चुकीच्या व बरोबर उत्तराचे 4 पर्यायांसह परिपूर्ण स्पष्टीकरण</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2 Content: 10 Current Affairs Tests */}
          {activeTab === "current" && (
            <div className="p-7 sm:p-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-200">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1F2A5C]">
                    10 विशेष चालू घडामोडी टेस्ट्स (वर्ष 2025-2026)
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    मागील 1 वर्षातील परीक्षाभिमुख सर्व राज्य, राष्ट्रीय व आंतरराष्ट्रीय महत्त्वाच्या घटना.
                  </p>
                </div>
                <div className="inline-flex items-center self-start sm:self-auto px-4 py-2 rounded-xl bg-[#fbeae8] text-[#9B3A32] font-extrabold text-sm border border-[#f3c8c4] shrink-0">
                  एकूण 500 चालू घडामोडी प्रश्न
                </div>
              </div>

              {/* Topics Included Grid with open padding */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3.5 space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-[#fbeae8] flex items-center justify-center text-[#9B3A32] font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#1F2A5C]">महाराष्ट्र राज्य विशेष घडामोडी</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">शासकीय निर्णय, नव्या योजना, समित्या व राजकीय घडामोडी.</p>
                  </div>
                </div>

                <div className="p-4.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3.5 space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-[#fbeae8] flex items-center justify-center text-[#9B3A32] font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#1F2A5C]">आर्थिक पाहणी व बजेट 2025-26</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">महाराष्ट्र व केंद्र शासनाचा अर्थसंकल्प, आकडेवारी व निर्देशांक.</p>
                  </div>
                </div>

                <div className="p-4.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3.5 space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-[#fbeae8] flex items-center justify-center text-[#9B3A32] font-bold text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#1F2A5C]">पुरस्कार, सन्मान व क्रीडा जगतात घडामोडी</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">ऑलिम्पिक, राष्ट्रीय पुरस्कार, साहित्य पुरस्कार, महत्वाच्या व्यक्ती.</p>
                  </div>
                </div>

                <div className="p-4.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3.5 space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-[#fbeae8] flex items-center justify-center text-[#9B3A32] font-bold text-sm shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#1F2A5C]">विज्ञान, पर्यावरण व तंत्रज्ञान</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">ISRO मोहीम, पर्यावरण संमेलने, चक्रीवादळे व नवे शोध.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 4-Icon Feature Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          
          <div className="bg-slate-50 hover:bg-[#fbf4f3] transition-all p-6 rounded-2xl border border-slate-200 hover:border-[#9B3A32]/30 shadow-xs hover:shadow-md flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#fbeae8] text-[#9B3A32] flex items-center justify-center mb-2">
              <BookOpenCheck className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-base sm:text-lg text-[#1F2A5C]">जलद रिव्हिजन टेस्ट्स</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">परीक्षेच्या शेवटच्या दिवसांत आत्मविश्वासाने उजळणी करण्यासाठी परिपूर्ण.</p>
          </div>

          <div className="bg-slate-50 hover:bg-[#fbf4f3] transition-all p-6 rounded-2xl border border-slate-200 hover:border-[#9B3A32]/30 shadow-xs hover:shadow-md flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#fbeae8] text-[#9B3A32] flex items-center justify-center mb-2">
              <Sparkles className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-base sm:text-lg text-[#1F2A5C]">सविस्तर स्पष्टीकरणे</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">केवळ उत्तर नाही, तर चारही पर्यायांचे अचूक संदर्भ व स्पष्टीकरण PDF.</p>
          </div>

          <div className="bg-slate-50 hover:bg-[#fbf4f3] transition-all p-6 rounded-2xl border border-slate-200 hover:border-[#9B3A32]/30 shadow-xs hover:shadow-md flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#fbeae8] text-[#9B3A32] flex items-center justify-center mb-2">
              <BarChart2 className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-base sm:text-lg text-[#1F2A5C]">स्मार्ट ॲनालिटिक्स</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">कोणत्या विषयात गुण कमी होतात व वेळ कुठे वाया जातो याचे अचूक विश्लेषण.</p>
          </div>

          <div className="bg-slate-50 hover:bg-[#fbf4f3] transition-all p-6 rounded-2xl border border-slate-200 hover:border-[#9B3A32]/30 shadow-xs hover:shadow-md flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#fbeae8] text-[#9B3A32] flex items-center justify-center mb-2">
              <Award className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-base sm:text-lg text-[#1F2A5C]">राज्यस्तरीय रँकिंग</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">हजारो विद्यार्थ्यांमध्ये तुमचा खरा नंबर आणि पर्सेंटाईल स्कोर लगेच समजेल.</p>
          </div>

        </div>

      </div>
    </section>
  );
}
