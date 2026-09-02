import { ArrowRight, UserPlus, CreditCard, PlayCircle, BarChart3, Award } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "नोंदणी करा",
      desc: "मोबाईल नंबर किंवा ईमेल वापरून 1 मिनिटात मोफत नोंदणी करा.",
      icon: UserPlus
    },
    {
      num: "2",
      title: "सुरुवात करा",
      desc: "केवळ ₹199 चे सुरक्षित ऑनलाइन पेमेंट करा आणि टेस्ट्स ॲक्टिव्हेट करा.",
      icon: CreditCard
    },
    {
      num: "3",
      title: "ऑनलाइन टेस्ट द्या",
      desc: "टायमरसह 60 मिनिटांची टेस्ट देऊन अचूक परीक्षेचा अनुभव घ्या.",
      icon: PlayCircle
    },
    {
      num: "4",
      title: "विश्लेषण तपासा",
      desc: "सविस्तर स्पष्टीकरण PDF डाऊनलोड करा व चुका समजून घ्या.",
      icon: BarChart3
    },
    {
      num: "5",
      title: "कटऑफ पार करा",
      desc: "राज्यस्तरीय रँक तपासा आणि आत्मविश्वासाने यश संपादन करा.",
      icon: Award
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <span>सुलभ प्रक्रिया</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            तयारी सुरू कशी करावी? <span className="text-[#9B3A32]">फक्त 5 सोप्या पायऱ्या</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            कोणतीही किचकट प्रक्रिया नाही. पेमेंट झाल्या झाल्या तत्काळ ॲक्सेस मिळवा.
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
