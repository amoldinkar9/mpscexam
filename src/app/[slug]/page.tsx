import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPseoData, getAllPseoSlugs } from "@/lib/pseo";
import LandingPageChassis from "@/components/LandingPageChassis";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getAllPseoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPseoData(slug);
  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: `https://mpscexam.in/${slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://mpscexam.in/${slug}`,
      siteName: "mpscexam",
      locale: "mr_IN",
      type: "website",
      images: [
        {
          url: "https://mpscexam.in/og-image.jpg",
          width: 1672,
          height: 941,
          alt: "mpscexam | tcs9 MASTER25 MPSC गट-क पूर्व परीक्षा टेस्ट सिरीज",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: ["https://mpscexam.in/og-image.jpg"],
    },
  };
}

export default async function PseoSlugPage({ params }: Props) {
  const { slug } = await params;
  const data = await getPseoData(slug);

  if (!data) {
    notFound();
  }

  // Renders the exact same high-converting landing page chassis
  // while tailoring the contextual intent banner & FAQs to the query
  return (
    <LandingPageChassis
      contextBanner={data.contextBanner}
      dynamicFaqs={data.faqs}
      canonicalKeyword={data.primaryKeyword}
      canonicalUrl={`https://mpscexam.in/${slug}`}
      pageTitle={data.title}
      pageDescription={data.description}
    />
  );
}
