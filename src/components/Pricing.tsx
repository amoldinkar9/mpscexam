"use client";

import { Check, ShieldCheck, Lock, ArrowRight, Zap, Gift, CheckCircle2 } from "lucide-react";

export function Pricing() {
  const handleEnroll = () => {
    alert("पेमेंट गेटवे सुरू होत आहे... कृपया प्रतीक्षा करा.");
  };

  return (
    <section id="pricing-section" className="py-20 bg-[#fafbfc] border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <Zap className="w-4 h-4" />
            <span>विशेष सवलत ऑफर</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            परवडणाऱ्या दरात <span className="text-[#9B3A32]">उत्कृष्ट दर्जाची तयारी</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            एका पुस्तकाच्या किमतीपेक्षाही कमी दरात मिळवा 25 संपूर्ण टेस्ट्स आणि सविस्तर स्पष्टीकरणे.
          </p>
        </div>

        {/* Pricing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Value Breakdown Table */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-[#1F2A5C] flex items-center gap-2.5">
              <Gift className="w-6 h-6 text-[#9B3A32]" />
              <span>पॅकेजचे खरे मूल्य (Value Breakdown)</span>
            </h3>

            <div className="divide-y divide-slate-100 text-sm sm:text-base">
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#1F2A5C] font-medium flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>15 MPSC फुल-लेंथ पॅटर्न टेस्ट्स</span>
                </span>
                <span className="text-slate-500 font-semibold english-numerals">मूल्य: ₹499</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#1F2A5C] font-medium flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>10 विशेष चालू घडामोडी टेस्ट्स</span>
                </span>
                <span className="text-slate-500 font-semibold english-numerals">मूल्य: ₹299</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#1F2A5C] font-medium flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>प्रत्येक प्रश्नाचे सविस्तर मराठी स्पष्टीकरण PDF</span>
                </span>
                <span className="text-slate-500 font-semibold english-numerals">मूल्य: ₹149</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#1F2A5C] font-medium flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>राज्यस्तरीय रँकिंग व ॲनालिटिक्स</span>
                </span>
                <span className="text-emerald-700 font-bold">मोफत</span>
              </div>

              <div className="pt-5 flex items-center justify-between text-base sm:text-lg font-extrabold text-[#1F2A5C]">
                <span>एकूण वास्तव मूल्य:</span>
                <span className="text-slate-400 line-through english-numerals">₹999</span>
              </div>
            </div>

            {/* Risk-Reversal Callout with open padding */}
            <div className="p-4.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-emerald-900 leading-[1.7] font-medium">
                <strong>100% समाधान किंवा सपोर्ट:</strong> तुम्हाला टेस्ट सिरीजमध्ये कोणतीही तांत्रिक अडचण आल्यास आमच्या व्हॉट्सॲप सपोर्टद्वारे त्वरित निराकरण केले जाईल.
              </p>
            </div>
          </div>

          {/* Right Column: Pricing CTA Box */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            
            {/* Scarcity Tag */}
            <div className="absolute -top-4 inset-x-0 mx-auto w-fit bg-amber-400 text-[#78350f] text-xs font-black px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider z-10 border-2 border-white">
              केवळ आजची विशेष ऑफर
            </div>

            <div className="bg-gradient-to-b from-white to-[#fbf4f3] rounded-2xl p-7 sm:p-9 border-2 border-[#9B3A32] shadow-2xl text-center space-y-6">
              
              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">संपूर्ण 25 टेस्ट्स पॅकेज</p>
                <div className="flex items-center justify-center gap-3 pt-1">
                  <span className="text-lg text-slate-400 line-through font-semibold english-numerals">₹999</span>
                  <span className="text-5xl sm:text-6xl font-black text-[#9B3A32] tracking-tight english-numerals">₹199</span>
                </div>
                <p className="text-xs sm:text-sm text-[#9B3A32] font-extrabold pt-1">
                  (80% थेट सवलत • एकरकमी फी)
                </p>
              </div>

              {/* Inclusions summary checklist with relaxed line-height */}
              <div className="bg-white p-4.5 rounded-xl border border-[#f3c8c4] text-xs sm:text-sm text-left space-y-2.5 text-[#1F2A5C]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>25 परिपूर्ण मॉक टेस्ट्स (1,500+ प्रश्न)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>वैधता: 25 ऑक्टोबर 2026 पर्यंत</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>अमर्यादित वेळा सराव उपलब्ध</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleEnroll}
                className="w-full py-4.5 px-6 bg-[#9B3A32] hover:bg-[#822f28] active:bg-[#6b251f] text-white font-extrabold text-lg rounded-xl shadow-lg shadow-[#9B3A32]/25 hover:shadow-xl hover:shadow-[#9B3A32]/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>आत्ताच सुरुवात करा — ₹199 मध्ये</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Payment Security Badges */}
              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>256-Bit SSL सुरक्षित</span>
                  </span>
                  <span>•</span>
                  <span>UPI / PhonePe / GPay</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
