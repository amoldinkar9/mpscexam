import { ArrowRight, Zap, PlayCircle, ShieldCheck, FileText, Award } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "स्लॉट लॉक करा (₹199)",
      desc: "पहिल्या 500 विद्यार्थ्यांच्या विशेष 80% सवलतीमध्ये त्वरित प्रवेश मिळवा.",
      icon: Zap
    },
    {
      num: "2",
      title: "रोज 1 टाइमर टेस्ट",
      desc: "60 मिनिटांत 100 प्रश्नांचा वेग आणि अचूक परीक्षेचा अनुभव घ्या.",
      icon: PlayCircle
    },
    {
      num: "3",
      title: "निगेटिव्ह मार्किंग ताबा",
      desc: "-0.25 मार्किंगवर नियंत्रण मिळवून 10-15 वाया जाणारे गुण वाचवा.",
      icon: ShieldCheck
    },
    {
      num: "4",
      title: "4 पर्यायांचे विश्लेषण",
      desc: "प्रत्येक प्रश्नाचे सविस्तर मराठी स्पष्टीकरण व शॉर्टकट ट्रिक्स शिका.",
      icon: FileText
    },
    {
      num: "5",
      title: "राज्यस्तरीय रँक & कटऑफ",
      desc: "हजारो स्पर्धकांमध्ये स्वतःची गुणवत्ता तपासून कटऑफ पार करा.",
      icon: Award
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <Zap className="w-4 h-4" />
            <span>स्कोअर बुस्टिंग प्रवाह (Score Acceleration Flow)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            10–15 गुण वाढवून कटऑफ पार करण्याचा <span className="text-[#9B3A32]">अचूक प्रवाह</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            केवळ पुस्तकी वाचनावर विसंबून न राहता या 5 पायऱ्यांचा अवलंब करा आणि पहिल्याच प्रयत्नात निवड यादीत नाव निश्चित करा.
          </p>
        </div>

        {/* 5-Step Stepper Grid with open gaps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative flex flex-col items-center text-center group space-y-3">
                
                {/* Step Circle with English Numeral & Icon */}
                <div className="relative mb-2">
                  <div className="w-18 h-18 rounded-2xl bg-[#9B3A32] text-white flex items-center justify-center shadow-lg shadow-[#9B3A32]/20 group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  {/* Step Number Badge */}
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-400 text-[#78350f] font-black text-sm flex items-center justify-center shadow-md border-2 border-white english-numerals">
                    {step.num}
                  </span>
                </div>

                {/* Step Info with relaxed leading */}
                <h3 className="text-base sm:text-lg font-bold text-[#1F2A5C]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed px-1">
                  {step.desc}
                </p>

                {/* Connector Arrow for Desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-9 -right-4 text-slate-300 pointer-events-none z-0">
                    <ArrowRight className="w-6 h-6 text-slate-300" />
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
