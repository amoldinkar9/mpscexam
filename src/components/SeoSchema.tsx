import React from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface SeoSchemaProps {
  canonicalUrl?: string;
  pageTitle?: string;
  pageDescription?: string;
  dynamicFaqs?: FaqItem[];
}

export function SeoSchema({
  canonicalUrl = "https://mpscexam.in",
  pageTitle = "MPSC Group C Test Series 2026-2027 | tcs9 MASTER25",
  pageDescription = "Official online preparation and mock test series for MPSC examinations. 25 Full Length Mock Tests covering 2,500+ syllabus concepts with -0.25 negative marking.",
  dynamicFaqs,
}: SeoSchemaProps) {
  // 1. Organization Schema (Strictly mpscexam, zero personal names)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://mpscexam.in/#organization",
    name: "mpscexam",
    alternateName: ["mpscexam Platform", "mpscexam Online Preparation"],
    url: "https://mpscexam.in",
    logo: "https://mpscexam.in/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 95796 16908",
      contactType: "Customer Support",
      availableLanguage: ["Marathi", "English"],
      areaServed: "IN",
    },
    sameAs: [
      "https://t.me/mpscexam",
      "https://wa.me/919579616908",
      "https://www.tcs9.in",
    ],
  };

  // 2. Product & Offer Schema for tcs9 MASTER25
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://mpscexam.in/#tcs9-master25",
    name: "tcs9 MASTER25 MPSC Group C Test Series 2026-2027",
    alternateName: "MPSC Group C 25 Full Length Mock Tests",
    image: "https://mpscexam.in/logo.png",
    description:
      "Comprehensive 25 Full Length Test Series covering 2,500+ core syllabus concepts for MPSC Group C Combined Exam with official -0.25 negative marking evaluation and bilingual Marathi & English explanations.",
    brand: {
      "@type": "Brand",
      name: "mpscexam",
    },
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "INR",
      price: "199",
      priceValidUntil: "2027-01-03",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "mpscexam",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1284",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // 3. Educational Course Schema
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": "https://mpscexam.in/#course-group-c",
    name: "MPSC Group C Combined Preliminary Examination Master Preparation",
    description:
      "Full syllabus coverage for MPSC Group C Combined Exam with 25 Full Length simulated tests, subject weightage analysis, and PYQs.",
    provider: {
      "@type": "Organization",
      name: "mpscexam",
      sameAs: "https://mpscexam.in",
    },
    offers: {
      "@type": "Offer",
      price: "199",
      priceCurrency: "INR",
      category: "Subscription",
    },
  };

  // 4. Default FAQs
  const defaultFaqs: FaqItem[] = [
    {
      question: "tcs9 MASTER25 टेस्ट सिरीजमध्ये काय समाविष्ट आहे?",
      answer:
        "tcs9 MASTER25 टेस्ट सिरीजमध्ये MPSC गट क पूर्व परीक्षेसाठी २५ परिपूर्ण सराव पेपर, २५००+ महत्त्वाच्या संकल्पनांचे सखोल मराठी स्पष्टीकरण, आणि अचूक -०.२५ निगेटिव्ह मार्किंगसह रिअल-टाईम रँक विश्लेषण समाविष्ट आहे.",
    },
    {
      question: "एमपीएससी गट क पूर्व परीक्षा २०२६-२०२७ कधी होणार आहे?",
      answer:
        "महाराष्ट्र लोकसेवा आयोगाच्या (MPSC) सुधारित वेळापत्रकानुसार गट क संयुक्त पूर्व परीक्षा रविवार, ३ जानेवारी २०२७ रोजी सकाळी १०:३० ते ११:३० या वेळेत महाराष्ट्रातील विविध परीक्षा केंद्रांवर होणार आहे.",
    },
    {
      question: "Can 12th pass students apply for MPSC Group C?",
      answer:
        "No, a Bachelor's Degree from a recognized university is mandatory for MPSC Group C posts including Clerk Typist and Tax Assistant. For Clerk Typist, GCC-TBC typing certificates are also required.",
    },
    {
      question: "How to avoid negative marking in MPSC Group C?",
      answer:
        "To avoid -0.25 negative marking, attempt questions in 2 rounds: first solve questions with 100% certainty, then apply elimination only when two incorrect options can be ruled out.",
    },
  ];

  const activeFaqs = dynamicFaqs && dynamicFaqs.length > 0 ? [...dynamicFaqs, ...defaultFaqs] : defaultFaqs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: activeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
