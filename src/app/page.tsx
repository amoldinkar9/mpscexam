import LandingPageChassis from "@/components/LandingPageChassis";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  return (
    <LandingPageChassis
      canonicalUrl="https://mpscexam.in"
      pageTitle="MPSC Group C Test Series 2026-2027 | tcs9 MASTER25"
      pageDescription="MPSC Group C पूर्व परीक्षा २०२६-२०२७ साठी परिपूर्ण टेस्ट सिरीज. २५ फुल-लेंथ सराव पेपर्स, २५००+ संकल्पना आणि अचूक -०.२५ निगेटिव्ह मार्किंग."
    />
  );
}
