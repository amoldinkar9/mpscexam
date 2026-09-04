"use client";

import { useState, useEffect } from "react";
import { Star, Users, ShieldCheck, ArrowRight, Award, Flame } from "lucide-react";

import siteData from "@/data/siteContent.json";

export function HeroSection({ initialData }: { initialData?: typeof siteData.hero } = {}) {
  const heroData = initialData || siteData.hero;
  const scrollToPricing = () => {
    document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const targetDate = new Date("2026-10-25T23:59:59+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 51, hours: 13, minutes: 14, seconds: 47 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf4f3] via-[#fdfaf9] to-white pt-6 sm:pt-8 pb-16 md:pb-20 border-b border-[#f3dedc]">
      {/* Top decorative gradient bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#9B3A32] via-[#d97706] to-[#1F2A5C]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Top Row: Logo Card + Exam Countdown Timer (Side-by-side in one line) */}
        <div className="flex flex-row items-stretch justify-between gap-3 sm:gap-6 mb-8 sm:mb-12">

          {/* 1. Header Logo Rounded Rectangle (20px radius - same height as timer, equal padding on all 4 sides) */}
          <div className="flex-1 sm:flex-initial bg-white/95 backdrop-blur-md rounded-[20px] px-3 sm:px-12 py-2.5 sm:py-4 border border-slate-200/90 shadow-sm flex items-center justify-center gap-2 sm:gap-6 min-h-[96px] sm:min-h-[128px]">
            {/* TCS9 Logo */}
            <div className="flex items-center justify-center shrink-0">
              <img
                src="https://media.tcs9.in/current_affairs_images/tcs9logo4_4x_1788436732855_f1609608-4829-4780-a8d2-9970abd66b22.webp"
                alt="TCS9 Logo"
                className="h-12 sm:h-[86px] w-auto object-contain"
                loading="eager"
              />
            </div>

            {/* "+" Divider */}
            <span className="text-slate-300 font-bold text-xl sm:text-3xl select-none shrink-0">
              +
            </span>

            {/* MPSC Logo with same height */}
            <div className="flex items-center justify-center shrink-0">
              <img
                src="https://mpsc.gov.in/static/media/logo.7a984172.png"
                alt="MPSC Logo"
                className="h-12 sm:h-[86px] w-auto object-contain"
                loading="eager"
              />
            </div>
          </div>

          {/* 2. Exam Countdown Timer: In another rounded rectangle (20px radius - same height as logo card) */}
          <div className="flex-1 sm:flex-initial bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-2 border-amber-500/40 rounded-[20px] px-2.5 sm:px-6 py-2.5 sm:py-3.5 shadow-sm flex flex-col items-center justify-center gap-2 sm:gap-2.5 min-h-[96px] sm:min-h-[128px]">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1 bg-[#8b2d26] text-white text-[9px] sm:text-xs font-bold px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-full shadow-xs whitespace-nowrap">
              <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 fill-amber-300 animate-bounce shrink-0" />
              <span>MPSC Group C पूर्व परीक्षा 2026</span>
            </div>

            {/* Digital Countdown Blocks */}
            <div className="flex items-center gap-1 sm:gap-2.5">
              <HeaderTimeBox val={timeLeft.days} unit="Days" />
              <span className="font-black text-[#8b2d26] text-base sm:text-2xl leading-none select-none">:</span>
              <HeaderTimeBox val={timeLeft.hours} unit="Hours" />
              <span className="font-black text-[#8b2d26] text-base sm:text-2xl leading-none select-none">:</span>
              <HeaderTimeBox val={timeLeft.minutes} unit="Min" />
              <span className="font-black text-[#8b2d26] text-base sm:text-2xl leading-none select-none">:</span>
              <HeaderTimeBox val={timeLeft.seconds} unit="Sec" />
            </div>
          </div>

        </div>

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

function HeaderTimeBox({ val, unit }: { val: number; unit: string }) {
  return (
    <div className="bg-white border-2 border-amber-400/80 shadow-xs rounded-lg sm:rounded-xl px-1.5 sm:px-3 py-1 sm:py-2 min-w-[32px] sm:min-w-[56px] flex flex-col items-center justify-center">
      <span className="text-sm sm:text-2xl font-black text-[#9B3A32] leading-none english-numerals">
        {String(val).padStart(2, "0")}
      </span>
      <span className="text-[8px] sm:text-[11px] text-[#1F2A5C] font-bold mt-0.5 sm:mt-1 uppercase tracking-wider">
        {unit}
      </span>
    </div>
  );
}

