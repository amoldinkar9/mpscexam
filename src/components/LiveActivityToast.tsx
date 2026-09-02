"use client";

import { useState, useEffect, useMemo } from "react";
import { Zap, CheckCircle2, TrendingUp, X } from "lucide-react";
import { STUDENT_NAMES, MAHARASHTRA_DISTRICTS } from "@/data/studentsList";

interface ActivityItem {
  id: number;
  name: string;
  location: string;
  action: string;
  timeAgo: string;
  type: "enrolled" | "scored" | "test_completed";
  highlight?: string;
}

export function LiveActivityToast() {
  const [currentActivity, setCurrentActivity] = useState<ActivityItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Generate a random dynamic activity from the verified student roster
  const generateRandomActivity = (id: number): ActivityItem => {
    const student = STUDENT_NAMES[Math.floor(Math.random() * STUDENT_NAMES.length)];
    const district = MAHARASHTRA_DISTRICTS[Math.floor(Math.random() * MAHARASHTRA_DISTRICTS.length)];
    const timeMinutes = Math.floor(Math.random() * 9) + 1;
    const timeAgo = `${timeMinutes} मिनिटांपूर्वी`;

    const variant = Math.floor(Math.random() * 5);

    switch (variant) {
      case 0:
        return {
          id,
          name: student,
          location: district,
          action: "यांनी 25 टेस्ट्स पॅकेज ₹199 मध्ये अनलॉक केले",
          timeAgo,
          type: "enrolled",
          highlight: "₹199 ऑफर"
        };
      case 1: {
        const testNum = Math.floor(Math.random() * 15) + 1;
        const score = (Math.floor(Math.random() * 26) + 65) + 0.25 * (Math.floor(Math.random() * 4));
        const rank = Math.floor(Math.random() * 45) + 1;
        return {
          id,
          name: student,
          location: district,
          action: `यांनी फुल-लेंथ टेस्ट #${testNum} मध्ये ${score} गुण मिळवले`,
          timeAgo,
          type: "scored",
          highlight: `रँक #${rank}`
        };
      }
      case 2: {
        const currentTestNum = Math.floor(Math.random() * 10) + 1;
        const accuracy = Math.floor(Math.random() * 15) + 84;
        return {
          id,
          name: student,
          location: district,
          action: `यांनी चालू घडामोडी स्पेशल टेस्ट #${currentTestNum} पूर्ण केली`,
          timeAgo,
          type: "test_completed",
          highlight: `अचूकता ${accuracy}%`
        };
      }
      case 3:
        return {
          id,
          name: student,
          location: district,
          action: "यांनी टेस्ट सिरीजमध्ये नावनोंदणी केली",
          timeAgo,
          type: "enrolled",
          highlight: "शेवटच्या 58 सीट्स"
        };
      case 4:
      default: {
        const testNum = Math.floor(Math.random() * 15) + 1;
        return {
          id,
          name: student,
          location: district,
          action: `यांनी टेस्ट #${testNum} सोडवून सविस्तर स्पष्टीकरणे तपासली`,
          timeAgo,
          type: "scored",
          highlight: "कटऑफ तयारी"
        };
      }
    }
  };

  useEffect(() => {
    // Initial activity
    setCurrentActivity(generateRandomActivity(1));

    const initialTimer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 2000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed) return;

    let counter = 2;
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentActivity(generateRandomActivity(counter++));
        setIsVisible(true);
      }, 700);
    }, 8000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed || !currentActivity) return null;

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 max-w-sm transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border border-[#9B3A32]/25 rounded-2xl p-3.5 shadow-xl shadow-[#1F2A5C]/10 flex items-start gap-3 relative pr-8">
        
        {/* Animated Pulse Icon */}
        <div className="w-9 h-9 rounded-xl bg-[#fbeae8] border border-[#f3c8c4] flex items-center justify-center shrink-0 mt-0.5">
          {currentActivity.type === "enrolled" && <Zap className="w-4.5 h-4.5 text-[#9B3A32] fill-[#9B3A32] animate-pulse" />}
          {currentActivity.type === "scored" && <TrendingUp className="w-4.5 h-4.5 text-emerald-600" />}
          {currentActivity.type === "test_completed" && <CheckCircle2 className="w-4.5 h-4.5 text-[#1F2A5C]" />}
        </div>

        {/* Content */}
        <div className="space-y-0.5 text-left">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-extrabold text-[#1F2A5C]">{currentActivity.name}</span>
            <span className="text-[11px] text-slate-500 font-medium">({currentActivity.location})</span>
            {currentActivity.highlight && (
              <span className="text-[10px] bg-amber-100 text-[#78350f] font-bold px-1.5 py-0.2 rounded border border-amber-300">
                {currentActivity.highlight}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-700 font-medium leading-snug">{currentActivity.action}</p>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] text-slate-400 font-semibold">{currentActivity.timeAgo}</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors cursor-pointer"
          title="बंद करा"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
