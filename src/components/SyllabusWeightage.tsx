import { BookOpen, CheckCircle, PieChart } from "lucide-react";

export function SyllabusWeightage() {
  const subjects = [
    { name: "इतिहास (History)", questions: "15 प्रश्न", marks: "15 गुण", desc: "महाराष्ट्राचा विशेष संदर्भ व आधुनिक भारताचा इतिहास" },
    { name: "भूगोल (Geography)", questions: "15 प्रश्न", marks: "15 गुण", desc: "महाराष्ट्राचा विशेष संदर्भासह भूगोल, नद्या व वने" },
    { name: "अर्थशास्त्र (Economics)", questions: "15 प्रश्न", marks: "15 गुण", desc: "भारतीय अर्थव्यवस्था, शासकीय योजना, बँकिंग व बजेट" },
    { name: "सामान्य विज्ञान (General Science)", questions: "15 प्रश्न", marks: "15 गुण", desc: "भौतिकशास्त्र, रसायनशास्त्र, जीवशास्त्र व आरोग्यशास्त्र" },
    { name: "चालू घडामोडी (Current Affairs)", questions: "15 प्रश्न", marks: "15 गुण", desc: "राज्य, राष्ट्रीय व आंतरराष्ट्रीय घडामोडी 2025-26" },
    { name: "अंकगणित व बुद्धिमत्ता (Aptitude)", questions: "15 प्रश्न", marks: "15 गुण", desc: "शॉर्टकट ट्रिक्स, लॉजिकल रिझनिंग व बेसिक मॅथ्स" },
    { name: "राज्यशास्त्र (Polity)", questions: "10 प्रश्न", marks: "10 गुण", desc: "घटना, पंचायतराज, मूलभूत हक्क व राज्यव्यवस्था" },
  ];

  return (
    <section className="py-16 bg-[#fcf8f7] border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <PieChart className="w-4 h-4" />
            <span>MPSC Group C पूर्व परीक्षा विषय रचना</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            विषयनिहाय <span className="text-[#9B3A32]">गुण व प्रश्न विभाजन</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            आमच्या टेस्ट सिरीजमध्ये प्रत्येक विषयाला आयोगाच्या नेमक्या वेटेजनुसार प्रश्न दिलेले आहेत.
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((sub, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#9B3A32]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-extrabold text-base text-[#1F2A5C]">{sub.name}</h3>
                  <span className="bg-[#fbeae8] text-[#9B3A32] text-xs font-extrabold px-2.5 py-1 rounded-lg border border-[#f3c8c4] english-numerals">
                    {sub.questions}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{sub.desc}</p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>100% कव्हर</span>
                </span>
                <span className="text-[#1F2A5C] english-numerals">{sub.marks}</span>
              </div>
            </div>
          ))}

          {/* Total Summary Card */}
          <div className="bg-gradient-to-br from-[#1F2A5C] to-[#161e42] p-5 rounded-2xl text-white flex flex-col justify-between shadow-md">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-300" />
                <h3 className="font-extrabold text-lg text-white">एकूण परीक्षा स्वरूप</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                7 विषय • 100 प्रश्न • 100 गुण • 60 मिनिटे वेळ • -0.25 निगेटिव्ह मार्किंग
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-300">
              <span>MPSC 2026 मानके</span>
              <span className="english-numerals">100 प्रश्न / 100 गुण</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
