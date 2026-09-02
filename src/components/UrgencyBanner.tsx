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
    <section className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-y border-amber-500/30 py-4 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          
          {/* Left: Exam Countdown Label */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-5">
            <div className="flex items-center gap-2 bg-[#9B3A32] text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full shadow-xs">
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
              <span>MPSC Group C पूर्व परीक्षा 2026</span>
            </div>

            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#1F2A5C]">
              <Timer className="w-5 h-5 text-[#9B3A32]" />
              <span>प्रत्यक्ष परीक्षेसाठी शिल्लक वेळ:</span>
            </div>

            {/* Countdown Blocks */}
            <div className="flex items-center gap-2 text-center">
              <TimeBox val={timeLeft.days} unit="दिवस" />
              <span className="font-extrabold text-[#9B3A32] text-lg">:</span>
              <TimeBox val={timeLeft.hours} unit="तास" />
              <span className="font-extrabold text-[#9B3A32] text-lg">:</span>
              <TimeBox val={timeLeft.minutes} unit="मि." />
              <span className="font-extrabold text-[#9B3A32] text-lg">:</span>
              <TimeBox val={timeLeft.seconds} unit="से." />
            </div>
          </div>

          {/* Right: Seat Scarcity Progress Bar */}
          <div className="w-full md:w-84 bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-amber-500/30 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#1F2A5C]">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#9B3A32]" />
                <span>₹199 ऑफर स्लॉट्स</span>
              </span>
              <span className="text-[#9B3A32] font-extrabold english-numerals">88% भरले (442/500)</span>
            </div>
            
            {/* Progress Track */}
            <div className="w-full h-3 bg-amber-200/80 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#b8463c] to-[#9B3A32] rounded-full transition-all duration-500"
                style={{ width: "88.4%" }}
              />
            </div>
            
            <div className="flex justify-between text-[11px] text-slate-700 font-semibold pt-0.5">
              <span>पहिल्या 500 विद्यार्थ्यांसाठी</span>
              <span className="text-[#9B3A32] font-black animate-pulse">केवळ 58 सीट्स शिल्लक!</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function TimeBox({ val, unit }: { val: number; unit: string }) {
  return (
    <div className="bg-white border border-amber-300 shadow-xs rounded-lg px-2.5 py-1.5 min-w-[46px] flex flex-col items-center">
      <span className="text-base font-black text-[#9B3A32] leading-none english-numerals">
        {String(val).padStart(2, "0")}
      </span>
      <span className="text-[10px] text-[#1F2A5C] font-semibold mt-0.5">{unit}</span>
    </div>
  );
}
