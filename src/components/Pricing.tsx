"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Lock, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import siteData from "@/data/siteContent.json";
import { getScarcityData } from "@/lib/scarcity";

export function Pricing({ initialData }: { initialData?: typeof siteData.finalCta } = {}) {
  const cta = initialData || siteData.finalCta;
  const [scarcity, setScarcity] = useState(getScarcityData());

  useEffect(() => {
    const updateScarcity = () => setScarcity(getScarcityData());
    updateScarcity();
    const interval = setInterval(updateScarcity, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleEnroll = () => {
    alert("पेमेंट गेटवे सुरू होत आहे... कृपया प्रतीक्षा करा.");
  };

  return (
    <section id="pricing-section" className="py-16 sm:py-20 bg-[#fafbfc] border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <Zap className="w-4 h-4" />
            <span>{cta.badgeText || "विशेष सवलत ऑफर"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            {cta.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {cta.subheadline}
          </p>
        </div>

        {/* Center-Aligned Final CTA Box (No Value Breakdown Table) */}
        <div className="max-w-xl mx-auto relative">
          
          {/* Scarcity Tag */}
          <div className="absolute -top-4 inset-x-0 mx-auto w-fit bg-amber-400 text-[#78350f] text-xs font-black px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider z-10 border-2 border-white">
            पहिले 500 विद्यार्थी विशेष सवलत
          </div>

          <div className="bg-gradient-to-b from-white to-[#fbf4f3] rounded-3xl p-7 sm:p-10 border-2 border-[#9B3A32] shadow-2xl text-center space-y-6">
            
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{cta.packageName}</p>
              <div className="flex items-center justify-center gap-3 pt-1">
                <span className="text-lg sm:text-xl text-slate-400 line-through font-semibold english-numerals">₹{cta.originalPrice}</span>
                <span className="text-5xl sm:text-6xl font-black text-[#9B3A32] tracking-tight english-numerals">₹{cta.offerPrice}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#9B3A32] font-extrabold pt-1">
                ({cta.discountText})
              </p>
              <div className="pt-2">
                <span className="inline-block text-[11px] sm:text-xs font-bold bg-[#fbeae8] text-[#9B3A32] px-3.5 py-1 rounded-full border border-[#f3c8c4] animate-pulse">
                  🔥 {scarcity.booked} सीट्स बुक झाल्या • केवळ {scarcity.remaining} शिल्लक
                </span>
              </div>
            </div>

            {/* Inclusions checklist */}
            <div className="bg-white p-5 rounded-2xl border border-[#f3c8c4] text-xs sm:text-sm text-left space-y-3 text-[#1F2A5C]">
              {cta.checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <button
              onClick={handleEnroll}
              className="w-full py-4.5 px-6 bg-[#9B3A32] hover:bg-[#822f28] active:bg-[#6b251f] text-white font-extrabold text-base sm:text-lg rounded-xl shadow-lg shadow-[#9B3A32]/25 hover:shadow-xl hover:shadow-[#9B3A32]/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>{cta.buttonText}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Price Lock Alert */}
            <p className="text-[11px] text-slate-500 font-medium">
              *58 सीट्स संपल्यानंतर मूळ किंमत ₹999 लागू होईल.
            </p>

            {/* Risk-Reversal Callout */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-left">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-900 leading-[1.6] font-medium">
                <strong>100% समाधान किंवा सपोर्ट:</strong> कोणतीही तांत्रिक अडचण आल्यास व्हॉट्सॲप सपोर्टद्वारे त्वरित निराकरण केले जाईल.
              </p>
            </div>

            {/* Payment Security Badges */}
            <div className="pt-2 border-t border-slate-200">
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
    </section>
  );
}
