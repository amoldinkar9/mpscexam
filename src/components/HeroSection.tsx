"use client";

import { useState, useEffect } from "react";
import { Star, Users, CheckCircle2, ShieldCheck, ArrowRight, Award, Briefcase, Timer, Flame } from "lucide-react";

import siteData from "@/data/siteContent.json";

export function HeroSection() {
  const heroData = siteData.hero;
  const scrollToPricing = () => {
    document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const targetPosts = [
    "उद्योग निरीक्षक",
    "तांत्रिक सहायक",
    "कर सहायक",
    "सहायक मोटार वाहन निरीक्षक",
    "लिपिक टंकलेखक",
    "ग्राम महसूल अधिकारी (तलाठी)",
    "सहायक मत्स्यव्यवसाय विकास अधिकारी"
  ];

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
        
        {/* Header Top Row: Logo Card + Exam Countdown Timer (Each in its own rounded rectangle) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
          
          {/* 1. Header Logo Rounded Rectangle (20px radius) */}
          <div className="w-fit mr-auto lg:mr-0 bg-white/95 backdrop-blur-md rounded-[20px] px-6 sm:px-8 py-4 sm:py-5 border border-slate-200/90 shadow-sm flex items-center justify-center gap-4 sm:gap-6">
            {/* TCS9 Logo */}
            <div className="flex items-center justify-center shrink-0">
              <img
                src="https://media.tcs9.in/current_affairs_images/tcs9logo4_4x_1788436732855_f1609608-4829-4780-a8d2-9970abd66b22.webp"
                alt="TCS9 Logo"
                className="h-12 sm:h-16 w-auto object-contain"
                loading="eager"
              />
            </div>

            {/* "x" Divider */}
            <span className="text-slate-300 font-bold text-xl sm:text-2xl select-none shrink-0">×</span>

            {/* MPSC Logo with same height */}
            <div className="flex items-center justify-center shrink-0">
              <img
                src="https://mpsc.gov.in/static/media/logo.7a984172.png"
                alt="MPSC Logo"
                className="h-12 sm:h-16 w-auto object-contain"
                loading="eager"
              />
            </div>
          </div>

          {/* 2. Exam Countdown Timer: In another rounded rectangle (20px radius) */}
          <div className="w-fit mr-auto lg:mr-0 lg:ml-auto bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-2 border-amber-500/40 rounded-[20px] px-5 sm:px-6 py-3.5 sm:py-4 shadow-sm flex flex-col items-center justify-center gap-2">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1.5 bg-[#8b2d26] text-white text-[11px] sm:text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
              <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-bounce" />
              <span>MPSC Group C पूर्व परीक्षा 2026</span>
            </div>

            {/* Sub-label */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#78350f]">
              <Timer className="w-4 h-4 text-[#78350f]" />
              <span>प्रत्यक्ष परीक्षेसाठी शिल्लक वेळ:</span>
            </div>

            {/* Digital Countdown Blocks */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <HeaderTimeBox val={timeLeft.days} unit="दिवस" />
              <span className="font-black text-[#8b2d26] text-xl sm:text-2xl leading-none select-none">:</span>
              <HeaderTimeBox val={timeLeft.hours} unit="तास" />
              <span className="font-black text-[#8b2d26] text-xl sm:text-2xl leading-none select-none">:</span>
              <HeaderTimeBox val={timeLeft.minutes} unit="मि." />
              <span className="font-black text-[#8b2d26] text-xl sm:text-2xl leading-none select-none">:</span>
              <HeaderTimeBox val={timeLeft.seconds} unit="से." />
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
              हजारो विद्यार्थी दररोज सराव करत आहेत.<br className="hidden sm:inline" />
              तुम्ही मागे तर राहत नाही ना?
            </p>

            {/* Feature Grid / Icon List (7 Posts in a structured grid) */}
            <div className="pt-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#9B3A32]" />
                <span>समाविष्ट लक्ष्य पदे:</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {targetPosts.map((post, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 bg-white p-2.5 px-3 rounded-xl border border-slate-200/90 shadow-2xs hover:border-[#9B3A32]/40 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#9B3A32] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-[#1F2A5C] leading-snug">
                      {idx + 1}. {post}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary CTA Block */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#9B3A32] hover:bg-[#822f28] active:bg-[#6b251f] text-white font-extrabold text-base sm:text-lg rounded-xl shadow-lg shadow-[#9B3A32]/25 hover:shadow-xl hover:shadow-[#9B3A32]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>आत्ताच ₹199 मध्ये टेस्ट सिरीज सुरू करा</span>
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
    <div className="bg-white border-2 border-amber-400/80 shadow-xs rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-[48px] sm:min-w-[56px] flex flex-col items-center justify-center">
      <span className="text-xl sm:text-2xl font-black text-[#9B3A32] leading-none english-numerals">
        {String(val).padStart(2, "0")}
      </span>
      <span className="text-[10px] sm:text-[11px] text-[#1F2A5C] font-bold mt-1 uppercase tracking-wider">
        {unit}
      </span>
    </div>
  );
}

