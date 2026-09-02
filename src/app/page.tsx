import { HeroSection } from "@/components/HeroSection";
import { UrgencyBanner } from "@/components/UrgencyBanner";
import { SyllabusWeightage } from "@/components/SyllabusWeightage";
import { OfferBreakdown } from "@/components/OfferBreakdown";
import { SampleProof } from "@/components/SampleProof";
import { AspirantPainPoints } from "@/components/AspirantPainPoints";
import { HowItWorks } from "@/components/HowItWorks";
import { SocialProof } from "@/components/SocialProof";
import { FAQ } from "@/components/FAQ";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { LiveActivityToast } from "@/components/LiveActivityToast";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#fafbfc] pb-16 md:pb-0">
      <HeroSection />
      <UrgencyBanner />
      <SyllabusWeightage />
      <OfferBreakdown />
      <SampleProof />
      <AspirantPainPoints />
      <HowItWorks />
      <SocialProof />
      <FAQ />
      <Pricing />
      <Footer />
      <StickyMobileBar />
      <LiveActivityToast />
    </main>
  );
}
