"use client";

import { Star, Users, ShieldCheck, ArrowRight, Award } from "lucide-react";

import siteData from "@/data/siteContent.json";

export function HeroSection({ initialData }: { initialData?: typeof siteData.hero } = {}) {
  const heroData = initialData || siteData.hero;
  const scrollToPricing = () => {
    document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf4f3] via-[#fdfaf9] to-white pt-8 sm:pt-12 pb-16 md:pb-20 border-b border-[#f3dedc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Hero Section (Main Content Area - Left) */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* H1 Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#1F2A5C] leading-[1.25] tracking-tight">
              महाराष्ट्र गट-क सेवा<br />
              <span className="text-[#9B3A32]">संयुक्त पूर्व परीक्षा - 2026</span>
            </h1>

            {/* Hero Subheading */}
            <p className="text-base sm:text-lg text-[#334155] leading-[1.8] font-medium">
              हजारो विद्यार्थी दररोज सराव करत आहेत.<br />
              तुम्ही मागे तर राहत नाही ना?
            </p>

            {/* H2 Sub-headline */}
            <h2 className="text-xl sm:text-2xl lg:text-[1.65rem] font-bold text-[#1F2A5C] leading-[1.5] tracking-tight">
              <span className="text-[#9B3A32] font-extrabold">SMART</span> बना !<br />
              टेस्ट सोडवून आपला<br />
              अभ्यास पूर्ण करा,<br />
              कारण माणूस चुकांमधूनच शिकतो.
            </h2>

            {/* Primary CTA Block */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#9B3A32] hover:bg-[#822f28] active:bg-[#6b251f] text-white font-extrabold text-base sm:text-lg rounded-xl shadow-lg shadow-[#9B3A32]/25 hover:shadow-xl hover:shadow-[#9B3A32]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Start Test</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-[#64748b] flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>⚡ 80% सवलत केवळ पहिल्या 500 विद्यार्थ्यांसाठी • 100% सुरक्षित पेमेंट • झटपट ॲक्टिव्हेशन</span>
              </p>
            </div>

            {/* Trust Indicator Row */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#f0dedc]">
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

          {/* Hero Section (Visual Area - Right) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Clickable Hero Image: 5:6 (Desktop Web) - 16:9 (Mobile Web) */}
              <a
                href={heroData.targetUrl || "#pricing-section"}
                className="group block relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[16/9] lg:aspect-[5/6] cursor-pointer hover:shadow-3xl transition-shadow"
                title="अधिक माहिती व ऑफरसाठी क्लिक करा"
              >
                {/* Desktop Image (5:6 aspect) */}
                <img
                  src={heroData.desktopHeroImage || (heroData as any).heroImage}
                  alt={heroData.heroImageAlt}
                  className="hidden lg:block w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  loading="eager"
                />

                {/* Mobile Image (16:9 aspect) */}
                <img
                  src={heroData.mobileHeroImage || heroData.desktopHeroImage || (heroData as any).heroImage}
                  alt={heroData.heroImageAlt}
                  className="block lg:hidden w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  loading="eager"
                />
              </a>

              {/* Bold Circular Price Badge */}
              <div className="absolute -top-5 -right-3 sm:-top-6 sm:-right-5 z-10">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 p-1.5 shadow-xl border-2 border-white flex flex-col items-center justify-center text-center transform rotate-6 hover:rotate-0 transition-transform">
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-[#78350f] uppercase tracking-wider">विशेष ऑफर</span>
                  <div className="flex items-center gap-1 my-0.5">
                    <span className="text-xs sm:text-sm text-slate-700 line-through font-semibold english-numerals">₹999</span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#9B3A32] leading-none english-numerals">₹199</span>
                  <span className="text-[10px] font-extrabold text-[#78350f] mt-0.5">80% सूट</span>
                </div>
              </div>

              {/* Trust Badges: located just underneath the Hero Image */}
              <div className="mt-4 p-3.5 bg-white/95 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-[#1F2A5C] text-center shadow-xs">
                ( Current + Static GS • मराठीत स्पष्टीकरण • Static GS शी जोडलेले • सविस्तर विश्लेषण )
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

