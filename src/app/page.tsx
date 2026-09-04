import { getSiteContent } from "@/lib/contentStore";
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

  return (
    <main className="min-h-screen relative bg-[#fafbfc] pb-16 md:pb-0">
      {/* 1. Header & Top Bar + Hero Section */}
      <HeroSection initialData={content.hero} />

      {/* 2. Bigger Countdown Timer */}
      <UrgencyBanner />

      {/* 3. Horizontally Scrolling Testimonials with Marathi Initials */}
      <SocialProof initialData={content.testimonials} />

      {/* 4. अभ्यासक्रम (Accordion Format) */}
      <SyllabusWeightage initialData={content.syllabus} />

      {/* 5. How to Purchase (9:16 Auto-Slider & WhatsApp Button) */}
      <HowToPurchase initialData={content.howToPurchase} />

      {/* 6. अभ्यास करताना या अडचणी येतात का? + फक्त वाचन करणारे vs. प्रत्यक्ष 25 टेस्ट्स सोडवणारे */}
      <AspirantPainPoints
        initialData={{
          painPoints: content.painPoints,
          cutoffGap: (content as any).cutoffGap,
          cutoffContrast: (content as any).cutoffContrast,
        }}
      />

      {/* 7. प्रश्नांची व स्पष्टीकरणांची नमुना गुणवत्ता पहा */}
      <SampleProof initialData={content.sampleProof} />

      {/* 8. वारंवार विचारले जाणारे प्रश्न */}
      <FAQ initialData={content.faqs} />

      {/* 10. Final Centered CTA (परवडणाऱ्या दरात उत्कृष्ट दर्जाची तयारी) */}
      <Pricing initialData={content.finalCta} />

      {/* 11. Footer */}
      <Footer />

      {/* 12. Sticky Mobile Dock & Full-Width Animated Live Activity Toast */}
      <StickyMobileBar />
      <LiveActivityToast />
    </main>
  );
}
