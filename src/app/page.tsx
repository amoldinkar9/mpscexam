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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const content = await getSiteContent();

  const sections = content.sections && content.sections.length > 0
    ? content.sections
    : [
        { id: "hero", enabled: true },
        { id: "urgency", enabled: true },
        { id: "testimonials", enabled: true },
        { id: "syllabus", enabled: true },
        { id: "howToPurchase", enabled: true },
        { id: "painPoints", enabled: true },
        { id: "sampleProof", enabled: true },
        { id: "faqs", enabled: true },
        { id: "pricing", enabled: true },
      ];

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
        return <HowToPurchase key="howToPurchase" initialData={content.howToPurchase} />;
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
      case "faqs":
        return <FAQ key="faqs" initialData={content.faqs} />;
      case "pricing":
        return <Pricing key="pricing" initialData={content.finalCta} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen relative bg-[#fafbfc] pb-16 md:pb-0">
      {/* 1. Sticky Header with Logos & Countdown Timer */}
      <Header />

      {/* Dynamic Main Body Sections (Reorderable & Toggleable via Admin Panel) */}
      {sections.filter((s) => s.enabled !== false).map((s) => renderSection(s.id))}

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Dock & Full-Width Animated Live Activity Toast */}
      <StickyMobileBar />
      <LiveActivityToast />
    </main>
  );
}
