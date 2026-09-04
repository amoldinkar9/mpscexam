"use client";

import { useState, useEffect } from "react";
import { Flame } from "lucide-react";

export function Header() {
  const targetDate = new Date("2026-10-25T23:59:59+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 51, hours: 13, minutes: 14, seconds: 47 });
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-[#fbf4f3]/95 backdrop-blur-md border-b border-[#f3dedc] py-3 sm:py-4 transition-shadow duration-200 ${
        isScrolled ? "shadow-md" : "shadow-xs"
      }`}
    >
      {/* Top decorative gradient bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#9B3A32] via-[#d97706] to-[#1F2A5C]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Top Row: Logo Card + Exam Countdown Timer (Side-by-side in one line) */}
        <div className="flex flex-row items-stretch justify-between gap-3 sm:gap-6">

          {/* 1. Header Logo Rounded Rectangle */}
          <div className="flex-1 sm:flex-initial bg-white/95 backdrop-blur-md rounded-[20px] px-3 sm:px-10 border border-slate-200/90 shadow-sm flex items-center justify-center gap-2 sm:gap-5 py-2.5 sm:py-3.5 min-h-[88px] sm:min-h-[106px]">
            {/* TCS9 Logo */}
            <div className="flex items-center justify-center shrink-0">
              <img
                src="https://media.tcs9.in/current_affairs_images/tcs9logo4_4x_1788436732855_f1609608-4829-4780-a8d2-9970abd66b22.webp"
                alt="TCS9 Logo"
                className="h-11 sm:h-[70px] w-auto object-contain"
                loading="eager"
              />
            </div>

            {/* "+" Divider */}
            <span className="text-slate-300 font-bold select-none shrink-0 text-xl sm:text-3xl">
              +
            </span>

            {/* MPSC Logo with same height */}
            <div className="flex items-center justify-center shrink-0">
              <img
                src="https://mpsc.gov.in/static/media/logo.7a984172.png"
                alt="MPSC Logo"
                className="h-11 sm:h-[70px] w-auto object-contain"
                loading="eager"
              />
            </div>
          </div>

          {/* 2. Exam Countdown Timer */}
          <div className="flex-1 sm:flex-initial bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-2 border-amber-500/40 rounded-[20px] px-2.5 sm:px-6 shadow-sm flex flex-col items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 min-h-[88px] sm:min-h-[106px]">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1 bg-[#8b2d26] text-white text-[9px] sm:text-xs font-bold px-2.5 sm:px-4 py-0.5 rounded-full shadow-xs whitespace-nowrap">
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
      </div>
    </header>
  );
}

function HeaderTimeBox({ val, unit }: { val: number; unit: string }) {
  return (
    <div className="bg-white border-2 border-amber-400/80 shadow-xs rounded-lg sm:rounded-xl px-1.5 sm:px-3 py-1 sm:py-1.5 min-w-[32px] sm:min-w-[54px] flex flex-col items-center justify-center">
      <span className="font-black text-[#9B3A32] leading-none english-numerals text-sm sm:text-xl">
        {String(val).padStart(2, "0")}
      </span>
      <span className="text-[7px] sm:text-[10px] text-[#1F2A5C] font-bold mt-0.5 uppercase tracking-wider">
        {unit}
      </span>
    </div>
  );
}
