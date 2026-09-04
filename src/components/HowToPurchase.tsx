"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, ChevronLeft, ChevronRight, ShoppingCart, CreditCard, PlayCircle, Smartphone, ArrowRight, ShieldCheck } from "lucide-react";
import siteData from "@/data/siteContent.json";

const ICON_MAP: Record<string, any> = {
  ShoppingCart,
  CreditCard,
  Smartphone,
  PlayCircle,
};

export function HowToPurchase({ initialData }: { initialData?: typeof siteData.howToPurchase } = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const stepsData = initialData || siteData.howToPurchase;
  const purchaseSteps = stepsData.map((step) => ({
    ...step,
    icon: ICON_MAP[step.iconName] || ShoppingCart,
  }));

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % purchaseSteps.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, purchaseSteps.length]);

  // Sync scroll position when currentSlide changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      if (currentSlide === 0) {
        container.scrollTo({
          left: 0,
          behavior: "smooth"
        });
        return;
      }
      const slideElement = container.children[currentSlide] as HTMLElement;
      if (slideElement) {
        const style = window.getComputedStyle(container);
        const paddingLeft = parseFloat(style.paddingLeft) || 0;
        container.scrollTo({
          left: Math.max(0, slideElement.offsetLeft - paddingLeft),
          behavior: "smooth"
        });
      }
    }
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? purchaseSteps.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % purchaseSteps.length);
  };

  const scrollToPricing = () => {
    document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <ShoppingCart className="w-4 h-4" />
            <span>प्रवेश कसा मिळवाल? (How to Purchase)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            फक्त सोप्या स्टेप्समध्ये <span className="text-[#9B3A32]">टेस्ट सिरीज अनलॉक करा</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            खालील स्टेप्स पहा आणि अवघ्या 2 मिनिटांत तुमचा अभ्यास सुरू करा.
          </p>
        </div>

        {/* 9:16 Image Slider Flow */}
        <div
          className="relative max-w-4xl mx-auto mb-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slider Container with 9:16 Aspect Ratio Cards */}
          <div
            ref={scrollContainerRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="flex gap-6 overflow-x-auto pb-6 pt-4 px-6 sm:px-10 md:px-12 scroll-pl-6 sm:scroll-pl-10 md:scroll-pl-12 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0 no-scrollbar"
          >
            {purchaseSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === currentSlide;
              return (
                <div
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-64 sm:w-72 shrink-0 snap-start rounded-3xl p-4 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${isActive
                    ? "bg-white border-[#9B3A32] shadow-xl ring-2 ring-[#9B3A32]/30 scale-102"
                    : "bg-[#fafbfc] border-slate-200 shadow-sm opacity-80 hover:opacity-100"
                    }`}
                >
                  {/* 9:16 Image Skeleton / Screenshot Area */}
                  <div className="w-full aspect-[9/16] rounded-2xl bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center relative overflow-hidden group">
                    {step.imageUrl ? (
                      <img
                        src={step.imageUrl}
                        alt={step.title}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="p-4 flex flex-col items-center justify-center text-center">
                        {/* Placeholder Icon & Tag */}
                        <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center shadow-xs mb-3 border`}>
                          <Icon className="w-7 h-7" />
                        </div>

                        <span className="text-xs font-extrabold text-[#1F2A5C] mb-1">
                          {step.step}
                        </span>
                        <p className="text-sm font-bold text-slate-800 leading-snug">
                          {step.title}
                        </p>
                        <span className="text-[11px] text-slate-400 font-medium mt-3 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
                          {step.skeletonText}
                        </span>
                      </div>
                    )}

                    {/* Active pulse ring */}
                    {isActive && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#9B3A32] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs z-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span>लाइव्ह</span>
                      </div>
                    )}
                  </div>

                  {/* Step Description */}
                  <div className="pt-4 text-center space-y-1">
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={handlePrev}
              aria-label="मागील स्टेप"
              className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:border-[#9B3A32] shadow-xs cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slide Dots */}
            <div className="flex items-center gap-2">
              {purchaseSteps.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentSlide(dotIdx)}
                  aria-label={`स्टेप ${dotIdx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${dotIdx === currentSlide
                    ? "w-8 bg-[#9B3A32]"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="पुढील स्टेप"
              className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:border-[#9B3A32] shadow-xs cursor-pointer transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center mt-2 font-medium">
            (प्रत्येक 5 सेकंदांनी आपोआप स्लाइड होते)
          </p>
        </div>

        {/* Primary CTA Block */}
        <div className="flex flex-col items-center justify-center pt-6 pb-2 space-y-3 text-center">
          <button
            onClick={scrollToPricing}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#9B3A32] hover:bg-[#822f28] active:bg-[#6b251f] text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-lg shadow-[#9B3A32]/25 hover:shadow-xl hover:shadow-[#9B3A32]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>आत्ताच ₹199 मध्ये टेस्ट सिरीज सुरू करा</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="text-xs sm:text-sm text-slate-500 flex items-center justify-center gap-1.5 font-medium flex-wrap px-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 inline-block" />
            <span>⚡ 80% सवलत केवळ पहिल्या 500 विद्यार्थ्यांसाठी • 100% सुरक्षित पेमेंट • झटपट ॲक्टिव्हेशन</span>
          </div>
        </div>

        {/* WhatsApp Theme Support Action Button Under How to Purchase */}
        <div className="flex justify-center pt-2">
          <a
            href="https://wa.me/919579616908?text=Hello%20MPSC%20Group%20C%20Test%20Series%20खरेदी%20करण्याबाबत%20काही%20शंका%20आहेत"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa51] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
            <span>Any Questions? / काही शंका आहेत? थेट व्हॉट्सॲपवर विचारा</span>
          </a>
        </div>

      </div>
    </section>
  );
}
