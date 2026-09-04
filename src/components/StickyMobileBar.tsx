"use client";

import { useState, useEffect } from "react";
import { ArrowRight, MessageCircle, Zap } from "lucide-react";
import { getScarcityData } from "@/lib/scarcity";

export function StickyMobileBar() {
  const [scarcity, setScarcity] = useState(getScarcityData());

  useEffect(() => {
    const updateScarcity = () => setScarcity(getScarcityData());
    updateScarcity();
    const interval = setInterval(updateScarcity, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToPricing = () => {
    document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-[#8b261e]/98 backdrop-blur-md border-t border-[#a6362d] p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.3)] md:hidden">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        
        {/* Price & Scarcity Tag */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-white/60 line-through font-semibold english-numerals">₹999</span>
            <span className="text-2xl font-black text-white leading-none english-numerals">₹199</span>
          </div>
          <span className="text-[10px] text-amber-300 font-extrabold flex items-center gap-0.5 mt-0.5 animate-pulse">
            <Zap className="w-3 h-3 fill-amber-300 text-amber-300" />
            <span>केवळ {scarcity.remaining} सीट्स शिल्लक!</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/919579616908?text=Hello%20MPSC%20Group%20C%20Test%20Series%20बद्दल%20माहिती%20हवी%20आहे"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white/10 text-emerald-300 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            title="WhatsApp Support"
          >
            <MessageCircle className="w-5 h-5 fill-emerald-400 text-emerald-400" />
          </a>

          <div className="relative shrink-0">
            {/* Periodic Tap Ripple Ring */}
            <span className="absolute -inset-1 rounded-xl bg-white/40 animate-tap-ripple pointer-events-none" />

            {/* Inverted CTA Button with Simulated Click Motion */}
            <button
              onClick={scrollToPricing}
              className="relative px-5 py-3 rounded-xl bg-white text-[#8b261e] active:scale-90 font-black text-sm shadow-lg flex items-center gap-1.5 shrink-0 hover:bg-slate-100 transition-all animate-tap-click cursor-pointer"
            >
              <span>सुरुवात करा</span>
              <ArrowRight className="w-4 h-4 text-[#8b261e]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
