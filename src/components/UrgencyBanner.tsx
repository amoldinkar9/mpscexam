"use client";

import { useEffect, useState } from "react";
import { Timer, AlertTriangle, Flame } from "lucide-react";

export function UrgencyBanner() {
  const targetDate = new Date("2026-10-25T23:59:59+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 53, hours: 14, minutes: 28, seconds: 45 });

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
    <section className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-y-2 border-amber-500/40 py-6 sm:py-8 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Left: Bigger Timer & Clear Text Hierarchy */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 sm:gap-6 text-center sm:text-left">
            
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 bg-[#9B3A32] text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-xs">
                <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
                <span>MPSC Group C पूर्व परीक्षा 2026</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-base sm:text-lg lg:text-xl font-black text-[#1F2A5C]">
                <Timer className="w-5 h-5 text-[#9B3A32]" />
                <span>प्रत्यक्ष परीक्षेसाठी शिल्लक वेळ:</span>
              </div>
            </div>

            {/* Much Bigger Digital Countdown Blocks */}
            <div className="flex items-center gap-2 sm:gap-3">
              <BigTimeBox val={timeLeft.days} unit="दिवस" />
              <span className="font-black text-[#9B3A32] text-2xl sm:text-3xl">:</span>
              <BigTimeBox val={timeLeft.hours} unit="तास" />
              <span className="font-black text-[#9B3A32] text-2xl sm:text-3xl">:</span>
              <BigTimeBox val={timeLeft.minutes} unit="मि." />
              <span className="font-black text-[#9B3A32] text-2xl sm:text-3xl">:</span>
              <BigTimeBox val={timeLeft.seconds} unit="से." />
            </div>

          </div>

          {/* Right: Seat Scarcity Progress Bar */}
          <div className="w-full lg:w-96 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl border-2 border-amber-500/40 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#1F2A5C]">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#9B3A32]" />
                <span>₹199 ऑफर स्लॉट्स</span>
              </span>
              <span className="text-[#9B3A32] font-black english-numerals">88% भरले (442/500)</span>
            </div>
            
            {/* Progress Track */}
            <div className="w-full h-3.5 bg-amber-200/80 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#b8463c] via-[#9B3A32] to-[#7d2620] rounded-full transition-all duration-500"
                style={{ width: "88.4%" }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-slate-700 font-semibold pt-0.5">
              <span>पहिल्या 500 विद्यार्थ्यांसाठी</span>
              <span className="text-[#9B3A32] font-black animate-pulse">केवळ 58 सीट्स शिल्लक!</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function BigTimeBox({ val, unit }: { val: number; unit: string }) {
  return (
    <div className="bg-white border-2 border-amber-400/80 shadow-md rounded-2xl px-3 sm:px-4 py-2 sm:py-3 min-w-[62px] sm:min-w-[76px] flex flex-col items-center">
      <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#9B3A32] leading-none english-numerals">
        {String(val).padStart(2, "0")}
      </span>
      <span className="text-[11px] sm:text-xs text-[#1F2A5C] font-bold mt-1 uppercase tracking-wider">{unit}</span>
    </div>
  );
}
