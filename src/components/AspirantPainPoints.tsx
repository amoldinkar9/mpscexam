import { CheckCircle2, XCircle, Zap, ShieldAlert } from "lucide-react";

export function AspirantPainPoints() {
  const points = [
    {
      problem: "परीक्षेत वेळेचे नियोजन न झाल्यामुळे शेवटचे 15-20 प्रश्न वाचायचे राहून जातात?",
      solution: "आमच्या अचूक 60 मिनिटांच्या ऑनलाइन टाइमर सिम्युलेटरद्वारे 15 वेळा वेगाचा सराव करा आणि वेळेचे अचूक नियोजन शिका."
    },
    {
      problem: "अंदाजे उत्तरे दिल्यामुळे निगेटिव्ह मार्किंगमध्ये (-0.25) गुण कट होतात आणि 2-3 गुणांनी कटऑफ हुकतो?",
      solution: "कोणते प्रश्न सोडवायचे आणि कोणते सोडायचे (Skip) याची अचूक स्ट्रॅटेजी प्रत्येक टेस्टच्या ॲनालिटिक्समधून शिका."
    },
    {
      problem: "चालू घडामोडींचा अथांग पसारा कुठून आणि किती वाचायचा याचा ताळमेळ लागत नाही?",
      solution: "मागील 1 वर्षाच्या केवळ परीक्षाभिमुख व थेट येण्याची शक्यता असलेल्या 500 प्रश्नांचा विशेष सराव संच मिळवा."
    },
    {
      problem: "पुस्तकी स्पष्टीकरणे क्लिष्ट असल्यामुळे चुकीचे उत्तर का आले हे समजत नाही?",
      solution: "प्रत्येक प्रश्नासोबत चारही पर्यायांचे सोप्या व अस्खलित मराठीत मुद्देसूद स्पष्टीकरण आणि शॉर्टकट ट्रिक्स मिळवा."
    }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      </div>
    </section>
  );
}
