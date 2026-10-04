import React from "react";
import { getSiteContent } from "@/lib/contentStore";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { UrgencyBanner } from "@/components/UrgencyBanner";
import { SocialProof } from "@/components/SocialProof";
import { SyllabusWeightage } from "@/components/SyllabusWeightage";
import { HowToPurchase } from "@/components/HowToPurchase";
import { AspirantPainPoints } from "@/components/AspirantPainPoints";
import { SampleProof } from "@/components/SampleProof";
import { FAQ } from "@/components/FAQ";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { LiveActivityToast } from "@/components/LiveActivityToast";
import { SeoSchema } from "@/components/SeoSchema";

export interface ContextBannerProps {
  badge: string;
  heading: string;
  subheading: string;
  callout?: string;
}

interface LandingPageChassisProps {
  contextBanner?: ContextBannerProps;
  dynamicFaqs?: Array<{ question: string; answer: string }>;
  canonicalKeyword?: string;
  canonicalUrl?: string;
  pageTitle?: string;
  pageDescription?: string;
}

export default async function LandingPageChassis({
  contextBanner,
  dynamicFaqs,
  canonicalKeyword,
  canonicalUrl = "https://mpscexam.in",
  pageTitle,
  pageDescription,
}: LandingPageChassisProps) {
  const content = await getSiteContent();

  const sections =
    content.sections && content.sections.length > 0
      ? content.sections
      : [
          { id: "hero", enabled: true },
          { id: "urgency", enabled: true },
          { id: "testimonials", enabled: true },
          { id: "syllabus", enabled: true },
          { id: "howToPurchase", enabled: true },
          { id: "painPoints", enabled: true },
          { id: "sampleProof", enabled: true },
          { id: "pricing2", enabled: true },
          { id: "faqs", enabled: true },
          { id: "pricing", enabled: true },
        ];

  // Merge dynamic FAQs if present
  const mergedFaqs =
    dynamicFaqs && dynamicFaqs.length > 0
      ? [
          ...dynamicFaqs.map((df) => ({ q: df.question, a: df.answer })),
          ...(content.faqs || []),
        ]
      : content.faqs;

  const renderSection = (id: string) => {
    switch (id) {
      case "hero":
        return <HeroSection key="hero" initialData={content.hero} />;
      case "urgency":
        return <UrgencyBanner key="urgency" />;
      case "testimonials":
        return <SocialProof key="testimonials" initialData={content.testimonials} />;
      case "syllabus":
        return <SyllabusWeightage key="syllabus" initialData={content.syllabus} />;
      case "howToPurchase":
        return (
          <HowToPurchase
            key="howToPurchase"
            initialData={content.howToPurchase}
            ctaData={(content as any).howToPurchaseCta}
          />
        );
      case "painPoints":
        return (
          <AspirantPainPoints
            key="painPoints"
            initialData={{
              painPoints: content.painPoints,
              cutoffGap: (content as any).cutoffGap,
              cutoffContrast: (content as any).cutoffContrast,
            }}
          />
        );
      case "sampleProof":
        return <SampleProof key="sampleProof" initialData={content.sampleProof} />;
      case "pricing2":
        return <Pricing key="pricing2" id="pricing-section-2" initialData={content.finalCta} />;
      case "faqs":
        return <FAQ key="faqs" initialData={mergedFaqs} />;
      case "pricing":
        return <Pricing key="pricing" id="pricing-section" initialData={content.finalCta} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen relative bg-[#fafbfc] pb-16 md:pb-0">
      {/* Search Engine & AI Structured Schema (JSON-LD) */}
      <SeoSchema
        canonicalUrl={canonicalUrl}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        dynamicFaqs={dynamicFaqs}
      />

      {/* 1. Sticky Header with Logos & 3 Jan 2027 Live Countdown Timer */}
      <Header />

      {/* 2. Optional Contextual SEO/AEO Intent Banner for Targeted Keywords & Backlinks */}
      {contextBanner && (
        <section className="bg-gradient-to-r from-[#8b261e] via-[#6d1b14] to-[#450a0a] text-white py-5 px-4 sm:px-6 border-b border-amber-500/30 shadow-md">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left space-y-1.5 flex-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {contextBanner.badge}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-white">
                {contextBanner.heading}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-200 font-medium">
                {contextBanner.subheading}
              </p>
              {contextBanner.callout && (
                <p className="text-xs text-amber-200/90 italic font-semibold">
                  📌 {contextBanner.callout}
                </p>
              )}
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <a
                href={content.finalCta?.buttonUrl || "https://www.tcs9.in/mr/test-series/mpsc-group-c-combined-examination/bundle/super25-19?affiliateId=IRENRX"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-md text-xs sm:text-sm font-black bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-md transition-all active:scale-95"
              >
                नोंदणी करा (₹१९९) →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Main Body Sections (Reorderable & Toggleable via Admin Panel) */}
      {sections.filter((s) => s.enabled !== false).map((s) => renderSection(s.id))}

      {/* Footer */}
      <Footer initialData={content.footer} />

      {/* Sticky Mobile Dock & Full-Width Animated Live Activity Toast */}
      <StickyMobileBar
        initialData={content.finalCta}
        stickyData={(content as any).stickyMobileBar}
      />
      <LiveActivityToast />
    </main>
  );
}
