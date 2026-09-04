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
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl md:hidden">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        
        {/* Price & Scarcity Tag */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 line-through font-semibold english-numerals">₹999</span>
            <span className="text-2xl font-black text-[#9B3A32] leading-none english-numerals">₹199</span>
          </div>
          <span className="text-[10px] text-[#9B3A32] font-extrabold flex items-center gap-0.5 mt-0.5 animate-pulse">
            <Zap className="w-3 h-3 fill-[#9B3A32] text-[#9B3A32]" />
            <span>केवळ {scarcity.remaining} सीट्स शिल्लक!</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/919579616908?text=Hello%20MPSC%20Group%20C%20Test%20Series%20बद्दल%20माहिती%20हवी%20आहे"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center hover:bg-emerald-100 transition-colors"
            title="WhatsApp Support"
          >
            <MessageCircle className="w-5 h-5 fill-emerald-600 text-emerald-600" />
          </a>

          <button
            onClick={scrollToPricing}
            className="px-5 py-3 rounded-xl bg-[#9B3A32] active:bg-[#7e2b24] text-white font-extrabold text-sm shadow-md flex items-center gap-1.5 shrink-0"
          >
            <span>सुरुवात करा</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
