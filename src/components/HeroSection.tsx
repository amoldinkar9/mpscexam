"use client";

import { Star, Users, Clock, CheckCircle2, ShieldCheck, ArrowRight, BookOpen, Target, Sparkles, Award } from "lucide-react";

export function HeroSection() {
  const scrollToPricing = () => {
    document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const targetPosts = [
    "लिपिक-टंकलेखक (Clerk Typist)",
    "कर सहाय्यक (Tax Assistant)",
    "दुय्यम निरीक्षक (Excise SI)",
    "उद्योग निरीक्षक (Industry Inspector)",
    "तांत्रिक सहाय्यक (Technical Asst)"
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf4f3] via-[#fdfaf9] to-white pt-10 pb-20 border-b border-[#f3dedc]">
      {/* Top decorative gradient bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#9B3A32] via-[#d97706] to-[#1F2A5C]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar / Trust Anchor */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-[#f2dedb]/90">
          <div className="flex items-center gap-3.5">
            {/* Custom TCS9 Trust Ring Badge */}
            <div className="w-11 h-11 rounded-full border-2 border-[#9B3A32] bg-[#fbf2f1] flex items-center justify-center shadow-xs">
              <span className="text-[#9B3A32] font-black text-xs sm:text-sm tracking-tighter">TCS9</span>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold text-[#1F2A5C] text-lg sm:text-xl tracking-tight">mpscexam</span>
                <span className="bg-[#9B3A32]/10 text-[#9B3A32] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#9B3A32]/25">
                  MPSC पॅटर्न 2026
                </span>
              </div>
              <p className="text-xs text-[#525f7f] font-medium">महाराष्ट्र अराजपत्रित गट-क सेवा संयुक्त पूर्व परीक्षा</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs text-xs sm:text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#1F2A5C] font-bold">नवीन बॅच ॲडमिशन सुरू आहे</span>
          </div>
        </div>

        {/* Target Posts Badge Strip (Highly Aspirant-Friendly) */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
            <Target className="w-3.5 h-3.5 text-[#9B3A32]" />
            <span>लक्ष्य पदे:</span>
          </span>
          {targetPosts.map((post, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold bg-white text-[#1F2A5C] px-3 py-1 rounded-lg border border-slate-200 shadow-2xs hover:border-[#9B3A32]/40 transition-colors"
            >
              {post}
            </span>
          ))}
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Scannable Highlights Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbeae8] border border-[#f3c8c4] text-[#9B3A32] text-xs sm:text-sm font-bold tracking-wide shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#9B3A32]" />
              <span>15 फुल-लेंथ + 10 चालू घडामोडी टेस्ट्स (एकूण 2,000+ प्रश्न)</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#1F2A5C] leading-[1.3] tracking-tight">
              MPSC Group C Pre Exam 2026 मध्ये <span className="text-[#9B3A32] underline decoration-[#9B3A32]/40 decoration-wavy underline-offset-8">पहिल्याच प्रयत्नात</span> कटऑफ पार करा!
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#334155] leading-[1.8]">
              आयोगाच्या 2024–2025 काठिण्यपातळीवर आधारित अस्सल दर्जाच्या टेस्ट्स. प्रत्येक प्रश्नाचे 4 पर्यायांसह सविस्तर मराठी विश्लेषण, शॉर्टकट ट्रिक्स आणि राज्यस्तरीय रँकिंग.
            </p>

            {/* Crisp Benefit Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-sm text-[#1F2A5C]">
              <div className="flex items-center gap-3 bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-[#9B3A32] shrink-0" />
                <span className="font-semibold">100 प्रश्न • 100 गुण • 60 मिनिटे</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-[#9B3A32] shrink-0" />
                <span className="font-semibold">-0.25 अचूक निगेटिव्ह मार्किंग</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-[#9B3A32] shrink-0" />
                <span className="font-semibold">सविस्तर स्पष्टीकरण PDF डाऊनलोड</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-[#9B3A32] shrink-0" />
                <span className="font-semibold">मोबाईल व PC वर अमर्यादित सराव</span>
              </div>
            </div>

            {/* Primary CTA Block */}
            <div className="pt-3 space-y-3.5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4.5 bg-[#9B3A32] hover:bg-[#822f28] active:bg-[#6b251f] text-white font-extrabold text-lg rounded-xl shadow-lg shadow-[#9B3A32]/25 hover:shadow-xl hover:shadow-[#9B3A32]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>आत्ताच सुरुवात करा — ₹199 मध्ये</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-[#64748b] flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% सुरक्षित पेमेंट • त्वरित झटपट ॲक्टिव्हेशन • वैधता: 25 ऑक्टोबर 2026 पर्यंत</span>
              </p>
            </div>

            {/* Trust Indicator Row */}
            <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-[#f0dedc]">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#1F2A5C] english-numerals">4.9/5</span>
                <span className="text-xs text-slate-500">(1,850+ पुनरावलोकने)</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#1F2A5C] font-bold">
                <Users className="w-4 h-4 text-[#9B3A32]" />
                <span className="english-numerals">10,000+</span>
                <span className="text-xs text-slate-500 font-normal">विद्यार्थी सामील</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#1F2A5C] font-bold">
                <Award className="w-4 h-4 text-[#9B3A32]" />
                <span>अमर्यादित री-अटेम्प्ट</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Real Student Photo & Bold Price Badge */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
                  alt="MPSC Aspirant Student Preparing"
                  className="w-full h-88 sm:h-96 object-cover"
                  loading="eager"
                />
                
                {/* Subtle gradient overlay at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A5C]/90 via-[#1F2A5C]/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="bg-[#1F2A5C]/90 backdrop-blur-md p-3.5 rounded-xl border border-white/20 space-y-1">
                    <p className="text-xs font-bold text-amber-300">महाराष्ट्र गट-क संयुक्त पूर्व परीक्षा 2026</p>
                    <p className="text-sm font-bold text-white leading-snug">15 Full Length + 10 चालू घडामोडी स्पेशल टेस्ट्स</p>
                  </div>
                </div>
              </div>

              {/* Bold Circular Price Badge with Strikethrough */}
              <div className="absolute -top-5 -right-3 sm:-top-6 sm:-right-5 z-10">
                <div className="w-30 h-30 sm:w-34 sm:h-34 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 p-1.5 shadow-xl border-2 border-white flex flex-col items-center justify-center text-center transform rotate-6 hover:rotate-0 transition-transform">
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-[#78350f] uppercase tracking-wider">विशेष ऑफर</span>
                  <div className="flex items-center gap-1 my-0.5">
                    <span className="text-xs sm:text-sm text-slate-700 line-through font-semibold english-numerals">₹999</span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#9B3A32] leading-none english-numerals">₹199</span>
                  <span className="text-[10px] font-extrabold text-[#78350f] mt-1">80% सूट</span>
                </div>
              </div>

              {/* Bottom Guarantee Badge */}
              <div className="absolute -bottom-5 -left-3 sm:-left-5 z-10">
                <div className="bg-white px-4 py-2.5 rounded-xl shadow-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                    ✓
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-[#1F2A5C]">MPSC 2026 पॅटर्न</p>
                    <p className="text-[11px] text-slate-500">100% अभ्यासक्रम कव्हरेज</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
