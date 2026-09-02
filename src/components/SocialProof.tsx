import { Star, CheckCircle2, Award } from "lucide-react";

export function SocialProof() {
  const testimonials = [
    {
      name: "अमोल शिंदे",
      location: "पुणे",
      outcomeTag: "कटऑफ पार — 64.5 गुण",
      outcomeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      quote: "मागील प्रयत्नात माझा स्कोर 48 होता. TCS9 टेस्ट सिरीजमधील स्पष्टीकरणे आणि टाईम मॅनेजमेंटमुळे यावर्षी मी सहज 64.5 गुण मिळवून कटऑफ पार केला!",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "प्रियंका पवार",
      location: "छत्रपती संभाजीनगर",
      outcomeTag: "निवड झाली — लिपिक-टंकलेखक",
      outcomeColor: "bg-[#fbeae8] text-[#9B3A32] border-[#f3c8c4]",
      quote: "चालू घडामोडींचे प्रश्न इतके तंतोतंत जुळले की पेपर सोडवताना खूप आत्मविश्वास आला. विशेषतः बजेट आणि योजनांवरील प्रश्न थेट आले होते.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "गणेश मोरे",
      location: "कोल्हापूर",
      outcomeTag: "मुख्य परीक्षेसाठी पात्र",
      outcomeColor: "bg-blue-100 text-blue-800 border-blue-300",
      quote: "निगेटिव्ह मार्किंगमुळे माझे नेहमी 8-10 मार्क जायचे. या 15 टेस्ट्स दिल्यानंतर कुठे अंदाज लावायचा आणि कुठे प्रश्न सोडायचा हे अचूक समजले.",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="py-20 bg-[#fafbfc] border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <Award className="w-4 h-4" />
            <span>विद्यार्थ्यांचा विश्वास</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            विद्यार्थी काय म्हणतात? <span className="text-[#9B3A32]">प्रत्यक्ष निकालाचा पुरावा</span>
          </h2>
        </div>

        {/* Falsifiable Accuracy Claim Banner Strip */}
        <div className="max-w-4xl mx-auto mb-14 bg-gradient-to-r from-[#9B3A32] to-[#7e2b24] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[#9B3A32]/40 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-8 h-8 text-amber-300" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                "आमच्या मागील टेस्टमधील प्रश्न प्रत्यक्ष परीक्षेत आले होते!"
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                आयोगाच्या विचारसरणीवर आधारित सखोल अभ्यास करून तयार केलेला विश्वासू प्रश्नसंच.
              </p>
            </div>
          </div>
          <span className="shrink-0 bg-amber-400 text-[#78350f] text-xs sm:text-sm font-extrabold px-4 py-2 rounded-xl uppercase tracking-wider shadow-sm">
            100% प्रामाणिक फीडबॅक
          </span>
        </div>

        {/* Testimonial Cards Grid with spacious padding & line-height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                {/* Rating Stars & Outcome Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${t.outcomeColor}`}>
                    {t.outcomeTag}
                  </span>
                </div>

                {/* Quote text with generous line-height */}
                <p className="text-sm sm:text-base text-[#334155] leading-[1.8] italic">
                  "{t.quote}"
                </p>
              </div>

              {/* User Identity */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-slate-200"
                />
                <div className="space-y-0.5">
                  <h4 className="font-bold text-base text-[#1F2A5C]">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Metrics Strip */}
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

      </div>
    </section>
  );
}
