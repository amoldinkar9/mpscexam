"use client";

import { useState, useEffect } from "react";
import { Zap, CheckCircle2, TrendingUp, X } from "lucide-react";

interface ActivityItem {
  id: number;
  name: string;
  location: string;
  action: string;
  timeAgo: string;
  type: "enrolled" | "scored" | "test_completed";
  highlight?: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    name: "अनिकेत काळे",
    location: "पुणे",
    action: "यांनी 25 टेस्ट्स पॅकेज अनलॉक केले",
    timeAgo: "2 मिनिटांपूर्वी",
    type: "enrolled",
    highlight: "₹199 ऑफर"
  },
  {
    id: 2,
    name: "स्वाती पाटील",
    location: "कोल्हापूर",
    action: "यांनी टेस्ट #4 मध्ये 74.5 गुण मिळवले",
    timeAgo: "4 मिनिटांपूर्वी",
    type: "scored",
    highlight: "रँक #12"
  },
  {
    id: 3,
    name: "राहुल देशमुख",
    location: "छत्रपती संभाजीनगर",
    action: "यांनी चालू घडामोडी स्पेशल टेस्ट #3 पूर्ण केली",
    timeAgo: "6 मिनिटांपूर्वी",
    type: "test_completed",
    highlight: "अचूकता 92%"
  },
  {
    id: 4,
    name: "सचिन शिंदे",
    location: "नाशिक",
    action: "यांनी टेस्ट सिरीजमध्ये नावनोंदणी केली",
    timeAgo: "8 मिनिटांपूर्वी",
    type: "enrolled",
    highlight: "शेवटच्या 58 सीट्स"
  },
  {
    id: 5,
    name: "प्रिया मोरे",
    location: "नागपूर",
    action: "यांनी टेस्ट #1 सोडवून 68 गुण मिळवले",
    timeAgo: "11 मिनिटांपूर्वी",
    type: "scored",
    highlight: "कटऑफ पार"
  }
];

export function LiveActivityToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Initial delay before first toast appears
    const initialTimer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 2500);

    return () => clearTimeout(initialTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      // Hide toast smoothly
      setIsVisible(false);

      // Change content and show again after short transition
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 800);
    }, 8500);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = activities[currentIndex];

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 max-w-sm transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border border-[#9B3A32]/25 rounded-2xl p-3.5 shadow-xl shadow-[#1F2A5C]/10 flex items-start gap-3 relative pr-8">
        
        {/* Animated Pulse Icon */}
        <div className="w-9 h-9 rounded-xl bg-[#fbeae8] border border-[#f3c8c4] flex items-center justify-center shrink-0 mt-0.5">
          {current.type === "enrolled" && <Zap className="w-4.5 h-4.5 text-[#9B3A32] fill-[#9B3A32] animate-pulse" />}
          {current.type === "scored" && <TrendingUp className="w-4.5 h-4.5 text-emerald-600" />}
          {current.type === "test_completed" && <CheckCircle2 className="w-4.5 h-4.5 text-[#1F2A5C]" />}
        </div>

        {/* Content */}
        <div className="space-y-0.5 text-left">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-extrabold text-[#1F2A5C]">{current.name}</span>
            <span className="text-[11px] text-slate-500 font-medium">({current.location})</span>
            {current.highlight && (
              <span className="text-[10px] bg-amber-100 text-[#78350f] font-bold px-1.5 py-0.2 rounded border border-amber-300">
                {current.highlight}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-700 font-medium leading-snug">{current.action}</p>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] text-slate-400 font-semibold">{current.timeAgo}</span>
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
