export interface PseoPageData {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  primaryKeyword: string;
  category: "district" | "package" | "aeo-question" | "subject" | "news" | "marathi";
  contextBanner: {
    badge: string;
    heading: string;
    subheading: string;
    callout?: string;
  };
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

// 36 Districts of Maharashtra with bilingual mapping
export const MAHARASHTRA_DISTRICTS = [
  { slug: "pune", nameEn: "Pune", nameMr: "पुणे" },
  { slug: "mumbai", nameEn: "Mumbai", nameMr: "मुंबई" },
  { slug: "nashik", nameEn: "Nashik", nameMr: "नाशिक" },
  { slug: "chhatrapati-sambhajinagar", nameEn: "Chhatrapati Sambhajinagar", nameMr: "छत्रपती संभाजीनगर" },
  { slug: "kolhapur", nameEn: "Kolhapur", nameMr: "कोल्हापूर" },
  { slug: "nagpur", nameEn: "Nagpur", nameMr: "नागपूर" },
  { slug: "thane", nameEn: "Thane", nameMr: "ठाणे" },
  { slug: "solapur", nameEn: "Solapur", nameMr: "सोलापूर" },
  { slug: "amravati", nameEn: "Amravati", nameMr: "अमरावती" },
  { slug: "latur", nameEn: "Latur", nameMr: "लातूर" },
  { slug: "nanded", nameEn: "Nanded", nameMr: "नांदेड" },
  { slug: "satara", nameEn: "Satara", nameMr: "सातारा" },
  { slug: "sangli", nameEn: "Sangli", nameMr: "सांगली" },
  { slug: "ahilyanagar", nameEn: "Ahilyanagar", nameMr: "अहिल्यानगर" },
  { slug: "ahmednagar", nameEn: "Ahmednagar", nameMr: "अहमदनगर" },
  { slug: "jalgaon", nameEn: "Jalgaon", nameMr: "जळगाव" },
  { slug: "akola", nameEn: "Akola", nameMr: "अकोला" },
  { slug: "dhule", nameEn: "Dhule", nameMr: "धुळे" },
  { slug: "chandrapur", nameEn: "Chandrapur", nameMr: "चंद्रपूर" },
  { slug: "beed", nameEn: "Beed", nameMr: "बीड" },
  { slug: "buldhana", nameEn: "Buldhana", nameMr: "बुलढाणा" },
  { slug: "dharashiv", nameEn: "Dharashiv", nameMr: "धाराशिव" },
  { slug: "osmanabad", nameEn: "Osmanabad", nameMr: "उस्मानाबाद" },
  { slug: "jalna", nameEn: "Jalna", nameMr: "जालना" },
  { slug: "parbhani", nameEn: "Parbhani", nameMr: "परभणी" },
  { slug: "raigad", nameEn: "Raigad", nameMr: "रायगड" },
  { slug: "ratnagiri", nameEn: "Ratnagiri", nameMr: "रत्नागिरी" },
  { slug: "sindhudurg", nameEn: "Sindhudurg", nameMr: "सिंधुदुर्ग" },
  { slug: "palghar", nameEn: "Palghar", nameMr: "पालघर" },
  { slug: "wardha", nameEn: "Wardha", nameMr: "वर्धा" },
  { slug: "washim", nameEn: "Washim", nameMr: "वाशिम" },
  { slug: "yavatmal", nameEn: "Yavatmal", nameMr: "यवतमाळ" },
  { slug: "gondia", nameEn: "Gondia", nameMr: "गोंदिया" },
  { slug: "bhandara", nameEn: "Bhandara", nameMr: "भंडारा" },
  { slug: "gadchiroli", nameEn: "Gadchiroli", nameMr: "गडचिरोली" },
  { slug: "hingoli", nameEn: "Hingoli", nameMr: "हिंगोली" },
  { slug: "nandurbar", nameEn: "Nandurbar", nameMr: "नंदुरबार" },
];

// High-Intent Commercial Packages
export const COMMERCIAL_PACKAGES = [
  {
    slug: "mpsc-group-c-test-series-199",
    primaryKeyword: "mpsc group c test series 199 rupees",
    title: "MPSC Group C Test Series 199 Rupees | tcs9 MASTER25 Mock Tests",
    description: "Get official MPSC Group C 2026-2027 Test Series at just ₹199. 25 Full Length Mock Tests, 2500+ syllabus concepts, bilingual explanations & exact -0.25 negative marking.",
    keywords: ["mpsc group c test series 199 rupees", "mpsc group c test series ₹199", "mpsc group c test series under 200", "master25 199", "mpsc test series 199 rupees"],
    badge: "विशेष सवलत • ₹१९९ ऑफर",
    heading: "MPSC Group C Test Series ₹199 | tcs9 MASTER25",
    subheading: "२५ परिपूर्ण फुल-लेंथ टेस्ट्स, २५००+ संकल्पना आणि अचूक -०.२५ निगेटिव्ह मार्किंगसह सराव सुरू करा.",
    callout: "पहिल्या १००० विद्यार्थ्यांसाठी विशेष सवलत — अंतिम मोजक्या सीट्स शिल्लक!",
  },
  {
    slug: "master25-mpsc",
    primaryKeyword: "master25 mpsc",
    title: "tcs9 MASTER25 MPSC Test Series | 25 Full Length Mock Tests",
    description: "Enroll in tcs9 MASTER25 MPSC Test Series. 25 Full-Length simulated tests covering 2,500+ core concepts for MPSC Group C Preliminary Exam.",
    keywords: ["master25 mpsc", "master25 test series", "tcs9 master25", "mpsc group c master25", "tcs9 mpsc test series"],
    badge: "अधिकृत पॅकेज • tcs9 MASTER25",
    heading: "tcs9 MASTER25 MPSC Group C पूर्व परीक्षा सराव सिरीज",
    subheading: "राज्यभरातील हजारो विद्यार्थ्यांचा विश्वास. २५ फुल-लेंथ पेपर्सद्वारे कट-ऑफ सुरक्षित करा.",
    callout: "परीक्षा दिनांक: ३ जानेवारी २०२७ साठी अद्ययावत अभ्यासक्रम.",
  },
  {
    slug: "mpsc-group-c-prelims-25-test-series",
    primaryKeyword: "mpsc group c prelims 25 test series",
    title: "MPSC Group C Prelims 25 Test Series | 2500 Concepts Covered",
    description: "25 Full Length Mock Tests with 2500+ concept coverage for MPSC Group C Prelims. Detailed Marathi and English explanations with All Maharashtra Rank.",
    keywords: ["mpsc group c prelims 25 test series", "mpsc 25 full length tests", "mpsc 2500 concepts test series", "mpsc group c 2026 25 test series"],
    badge: "२५ टेस्ट्स • २५०० संकल्पना",
    heading: "MPSC Group C Prelims: २५ फुल लेंथ टेस्ट सिरीज",
    subheading: "प्रत्येक प्रश्नाचे सविस्तर मराठी स्पष्टीकरण व राज्यस्तरीय रँकिंग विश्लेषण.",
    callout: "६० मिनिटांत १०० प्रश्न सोडवण्याचा आत्मविश्वास मिळवा.",
  },
  {
    slug: "mpsc-clerk-typist-test-series",
    primaryKeyword: "best test series for clerk typist",
    title: "Best Test Series for MPSC Clerk Typist 2026-2027 | tcs9 MASTER25",
    description: "Targeting MPSC Clerk Typist? Practice 25 full length papers specifically weighted for Clerk Typist cutoff marks. Instant result analysis with negative marking.",
    keywords: ["best test series for clerk typist", "mpsc clerk typist test series", "mpsc clerk typist mock test marathi", "mpsc clerk typist test series 199 rupees"],
    badge: "लिपिक टंकलेखक विशेष",
    heading: "MPSC लिपिक टंकलेखक (Clerk Typist) टेस्ट सिरीज २०२६-२०२७",
    subheading: "टायपिंग पात्रता उमेदवारांसाठी कट-ऑफ पार पाडण्याची परिपूर्ण रणनीती.",
    callout: "मागील वर्षाच्या कट-ऑफ विश्लेषणावर आधारित संभाव्य प्रश्नसंच.",
  },
  {
    slug: "mpsc-tax-assistant-test-series",
    primaryKeyword: "best test series for tax assistant",
    title: "MPSC Tax Assistant Test Series 2026-2027 | tcs9 MASTER25",
    description: "Crack MPSC Tax Assistant exam with 25 simulated mock tests. Comprehensive coverage of Economy, Math, Marathi and GS.",
    keywords: ["best test series for tax assistant", "mpsc tax assistant test series", "mpsc tax assistant test series 199 rupees", "mpsc tax assistant mock test in marathi"],
    badge: "कर सहायक विशेष",
    heading: "MPSC कर सहायक (Tax Assistant) सराव परीक्षा सिरीज",
    subheading: "अर्थशास्त्र, गणित-बुद्धिमत्ता आणि सामान्य अध्ययनावर विशेष भर देणारी २५ टेस्ट्स सिरीज.",
    callout: "अचूक -०.२५ गुण वजावटीसह रियल-टाइम परीक्षा अनुभव.",
  },
  {
    slug: "mpsc-test-series-under-200",
    primaryKeyword: "best mpsc test series under 200 rupees",
    title: "Best MPSC Test Series Under 200 Rupees | tcs9 MASTER25 ₹199",
    description: "Looking for an affordable, high quality MPSC test series under ₹200? tcs9 MASTER25 gives 25 tests for just ₹199 with KaTeX formulas and detailed solutions.",
    keywords: ["best mpsc test series under 200 rupees", "mpsc test series under 200", "cheapest mpsc test series", "mpsc best affordable test series", "mpsc low budget preparation"],
    badge: "सर्वात किफायतशीर • ₹१९९",
    heading: "महाराष्ट्रातील सर्वात विश्वासार्ह टेस्ट सिरीज — फक्त ₹१९९ मध्ये",
    subheading: "ग्रामीण व आर्थिकदृष्ट्या गरजू विद्यार्थ्यांसाठी सर्वोत्तम दर्जाचे २५ सराव पेपर्स.",
    callout: "दर्जाशी कोणतीही तडजोड नाही — १००% MPSC आयोग पॅटर्न.",
  },
];

// AEO / Intent Questions
export const INTENT_QUESTIONS = [
  {
    slug: "can-12th-pass-apply-for-mpsc-group-c",
    primaryKeyword: "can 12th pass apply for mpsc group c",
    title: "Can 12th Pass Apply for MPSC Group C? Qualification Rules 2026",
    description: "Find out if 12th pass students can apply for MPSC Group C (Clerk Typist, Tax Assistant). Official MPSC educational qualification requirements explained.",
    keywords: ["can 12th pass apply for mpsc group c", "can 12th pass apply for mpsc clerk typist", "mpsc group c eligibility", "mpsc after 12th"],
    badge: "पात्रता निकष • Official Rules",
    heading: "Can 12th Pass Apply for MPSC Group C?",
    subheading: "आयोगाच्या नियमांनुसार १२ वी उत्तीर्ण विद्यार्थी गट क परीक्षेसाठी पात्र आहेत का?",
    callout: "थेट उत्तर: नाही, गट क (लिपिक व कर सहायक) पदांसाठी मान्यताप्राप्त विद्यापीठाची पदवी (Graduation) आवश्यक आहे.",
    faqs: [
      {
        question: "Can 12th pass apply for MPSC Group C?",
        answer: "No, candidates must possess a Bachelor's Degree (Graduation) in any stream from a recognized university. 12th pass candidates are not eligible for Group C Combined exams.",
      },
      {
        question: "Is typing certificate mandatory for MPSC Clerk Typist?",
        answer: "Yes, GCC-TBC typing certificate (Marathi 30 wpm OR English 40 wpm) is mandatory at the time of document verification.",
      },
    ],
  },
  {
    slug: "how-to-avoid-negative-marking-in-mpsc-group-c",
    primaryKeyword: "how to avoid negative marking in mpsc group c",
    title: "How to Avoid Negative Marking in MPSC Group C | Cutoff Strategy",
    description: "Master the 1/4th (-0.25) negative marking in MPSC Group C prelims exam. Learn accuracy tactics, round-wise question selection, and score booster methods.",
    keywords: ["how to avoid negative marking in mpsc group c", "how to calculate mpsc group c marks", "mpsc group c negative marking", "how to solve mpsc group c paper fast"],
    badge: "निगेटिव्ह मार्किंग नियंत्रण",
    heading: "How to Avoid Negative Marking in MPSC Group C (-0.25)",
    subheading: "१/४ वजावटीमुळे कट-ऑफ हुकणाऱ्या विद्यार्थ्यांसाठी ३-फेरी सोडवणूक रणनीती.",
    callout: "सराव पेपर सोडवताना अचूकता (Accuracy) ७५%+ ठेवण्यासाठी tcs9 MASTER25 चा वापर करा.",
    faqs: [
      {
        question: "What is the negative marking ratio in MPSC Group C?",
        answer: "MPSC Group C Preliminary Exam follows a 1/4th negative marking scheme: 0.25 marks are deducted for every incorrect response.",
      },
      {
        question: "How to avoid negative marking during the 60-minute exam?",
        answer: "Follow a 2-Round strategy: in Round 1, solve only 100% certain questions (aiming for 50-55 marks). In Round 2, attempt only those questions where you have eliminated at least 2 options.",
      },
    ],
  },
  {
    slug: "what-is-mpsc-tax-assistant-salary",
    primaryKeyword: "what is mpsc tax assistant salary",
    title: "MPSC Tax Assistant Salary 2026 | In-Hand Pay & Allowances",
    description: "Detailed salary structure of MPSC Tax Assistant in Maharashtra. Basic pay, HRA, DA, in-hand monthly salary, and career growth promotions.",
    keywords: ["what is mpsc tax assistant salary", "mpsc tax assistant in hand salary", "mpsc tax assistant salary and allowances", "mpsc tax assistant career growth"],
    badge: "वेतन व भत्ते • Salary Details",
    heading: "MPSC Tax Assistant Salary, In-Hand Pay & Allowances",
    subheading: "महाराष्ट्र शासन वित्त विभागातील कर सहायक पदाचे सुधारित ७ व्या वेतन आयोगानुसार वेतनश्रेणी.",
    callout: "साधारण इन-हँड वेतन: ₹३४,००० ते ₹३९,००० दरमहा (HRA व DA समाविष्ट).",
    faqs: [
      {
        question: "What is the starting in-hand salary of MPSC Tax Assistant?",
        answer: "Under 7th Pay Commission Pay Matrix Level S-8 (₹25,500 - ₹81,100), the starting in-hand monthly salary is approximately ₹34,000 to ₹39,000 depending on the city tier.",
      },
    ],
  },
  {
    slug: "mpsc-clerk-typist-eligibility-criteria",
    primaryKeyword: "mpsc clerk typist eligibility criteria",
    title: "MPSC Clerk Typist Eligibility Criteria 2026 | Age, Degree, Typing",
    description: "Complete eligibility guide for MPSC Clerk Typist. Age limits, educational qualification, category-wise relaxations, and typing certificates required.",
    keywords: ["mpsc clerk typist eligibility criteria", "mpsc clerk typist educational qualification", "mpsc clerk typist age limit", "mpsc clerk typist typing test"],
    badge: "पात्रता व वय • Full Criteria",
    heading: "MPSC Clerk Typist Eligibility Criteria (वय, पदवी, टंकलेखन)",
    subheading: "लिपिक टंकलेखक भरतीसाठी वयोमर्यादा, पदवी व GCC-TBC प्रमाणपत्र अटी.",
    callout: "खुला प्रवर्ग: १९ ते ३८ वर्षे | मागास प्रवर्ग: कमाल ४३ वर्षांपर्यंत.",
    faqs: [
      {
        question: "What is the age limit for MPSC Clerk Typist?",
        answer: "Minimum age is 19 years. Maximum age is 38 years for Open/General category and 43 years for Reserved (OBC/SC/ST/EWS) categories.",
      },
    ],
  },
];

// News Jacking Hubs
export const NEWS_JACKING_HUBS = [
  {
    slug: "mpsc-group-c-exam-postponed-to-3-january-2027",
    primaryKeyword: "mpsc group c exam postponed to 3 january 2027",
    title: "MPSC Group C Exam Postponed to 3 January 2027 | Official Notice",
    description: "MPSC Group C Preliminary Exam date postponed to 3 January 2027. Check official schedule, revised timing 10:30 AM to 11:30 AM, and preparation strategy.",
    keywords: ["mpsc group c exam postponed to 3 january 2027", "mpsc group c new exam schedule", "mpsc group c prelims new date 2027", "mpsc exam date 2026 postponed"],
    badge: "सुधारित वेळापत्रक • 3 JAN 2027",
    heading: "MPSC गट क पूर्व परीक्षा: ३ जानेवारी २०२७ सुधारित दिनांक",
    subheading: "आयोगाने २५ ऑक्टोबर २०२६ ची परीक्षा पुढे ढकलून ३ जानेवारी २०२७ रोजी सकाळी १०:३० ते ११:३० निश्चित केली आहे.",
    callout: "मिळालेल्या अतिरिक्त वेळेचा सदुपयोग करा — tcs9 MASTER25 सराव चाचण्यांसह अंतिम रिव्हिजन पूर्ण करा!",
  },
  {
    slug: "mpsc-group-c-hall-ticket-2026",
    primaryKeyword: "mpsc group c hall ticket 2026",
    title: "MPSC Group C Hall Ticket 2026 Download | Admit Card Direct Link",
    description: "Download MPSC Group C Prelims Hall Ticket 2026. Step by step process to login with mobile number/OTP and download admit card PDF.",
    keywords: ["mpsc group c hall ticket 2026", "mpsc hall ticket 2026", "mpsc group c admit card 2026", "how to download mpsc group c hall ticket"],
    badge: "प्रवेशपत्र अपडेट • Admit Card",
    heading: "MPSC Group C Hall Ticket (प्रवेशपत्र) डाउनलोड मार्गदर्शक",
    subheading: "अधिकृत mpsconline.gov.in पोर्टलवरून परीक्षा हॉल तिकीट डाऊनलोड करण्याची सविस्तर पद्धत.",
    callout: "परीक्षेपूर्वी प्रवेशपत्रावरील परीक्षा केंद्र व मार्गदर्शक सूचना काळजीपूर्वक तपासा.",
  },
  {
    slug: "mpsc-combine-answer-key-2026",
    primaryKeyword: "mpsc combine answer key 2026",
    title: "MPSC Combine Answer Key 2026 | First & Final Key PDF Download",
    description: "MPSC Combine Group B and Group C Answer Key 2026 download. Question paper analysis, objection window dates, and score calculation.",
    keywords: ["mpsc combine answer key 2026", "mpsc answer key 2026", "mpsc group c answer key 2026", "mpsc answer key"],
    badge: "उत्तरतालिका • Answer Key",
    heading: "MPSC Combine Answer Key २०२६ व गुण मोजणी",
    subheading: "आयोगाची प्रथम व अंतिम उत्तरतालिका, आक्षेप नोंदणी प्रक्रिया व अचूक गुण विश्लेषण.",
    callout: "tcs9 MASTER25 मॉडेल आन्सर की द्वारे तात्काळ संभाव्य गुणांची पडताळणी करा.",
  },
  {
    slug: "mpsc-group-c-cut-off-2026",
    primaryKeyword: "mpsc group c cut off 2026",
    title: "MPSC Group C Cut Off 2026 (Expected & Previous Years)",
    description: "Category-wise MPSC Group C Expected Cut Off marks for Clerk Typist, Tax Assistant, Excise SI. Check safe score target for Open, OBC, SC, ST, EWS.",
    keywords: ["mpsc group c cut off 2026", "mpsc group c cut off", "mpsc clerk typist cut off", "mpsc group c cut off marks safe score"],
    badge: "अपेक्षित कट-ऑफ • Safe Score",
    heading: "MPSC Group C Cut Off २०२६: प्रवर्गनिहाय अपेक्षित कट-ऑफ",
    subheading: "लिपिक टंकलेखक, कर सहायक व दुय्यम निरीक्षक पदांसाठी सुरक्षित गुणांचे लक्ष्य.",
    callout: "सुरक्षित लक्ष्य: खुल्या प्रवर्गासाठी ५५+ गुण मिळवण्यासाठी २५ फुल-लेंथ सराव अनिवार्य आहे.",
  },
];

// Topic-Wise Notes & MCQs
export const TOPIC_PAGES = [
  {
    slug: "mpsc-polity-73rd-74th-amendment-mcq",
    primaryKeyword: "73rd 74th amendment mcq in marathi for mpsc",
    title: "73rd & 74th Amendment MCQ in Marathi for MPSC | Polity Notes",
    description: "Important practice questions and notes on 73rd and 74th Constitutional Amendments (Panchayati Raj & Municipalities) in Marathi for MPSC Group C & Rajyaseva.",
    keywords: ["73rd 74th amendment mcq in marathi for mpsc", "Indian polity 73rd 74th amendment mpsc", "panchayati raj mcq in marathi for mpsc"],
    badge: "भारतीय राज्यघटना • पंचायत राज",
    heading: "७३ वी व ७४ वी घटनादुरुस्ती: महत्त्वाचे सराव प्रश्न व नोट्स",
    subheading: "स्थानिक स्वराज्य संस्था, ७३ वी घटनादुरुस्ती (१९९२) आणि ७४ वी घटनादुरुस्तीवरील वारंवार विचारले जाणारे प्रश्न.",
    callout: "mpscexam tcs9 MASTER25 मध्ये राज्यघटनेवरील २५०+ संकल्पनांचा परिपूर्ण सराव समाविष्ट आहे.",
  },
  {
    slug: "mpsc-economics-gst-rbi-mcq",
    primaryKeyword: "Economics GST mpsc group c questions",
    title: "MPSC Economics GST & RBI MCQs in Marathi | Group C Prelims",
    description: "Most expected MPSC questions on GST, RBI Monetary Policy, Banking, and Budget in Marathi with detailed explanations.",
    keywords: ["Economics GST mpsc", "Economics RBI mpsc", "GST mcq in marathi for mpsc", "RBI mcq in marathi for mpsc"],
    badge: "अर्थशास्त्र • GST व RBI",
    heading: "MPSC अर्थशास्त्र: GST, RBI व बँकिंग महत्त्वाचे प्रश्न",
    subheading: "वस्तू व सेवा कर (GST), रिझर्व्ह बँक ऑफ इंडियाचे पतधोरण आणि भारतीय अर्थव्यवस्थेवरील संभाव्य प्रश्नसंच.",
    callout: "अर्थशास्त्रातील १५ पैकी १२+ गुण निश्चित करण्यासाठी २५ सराव पेपर्स सोडवा.",
  },
  {
    slug: "mpsc-marathi-grammar-prayog-samas-alankar",
    primaryKeyword: "Marathi grammar prayog mpsc questions",
    title: "MPSC Marathi Grammar MCQs | Prayog, Samas, Alankar Notes",
    description: "Comprehensive Marathi Grammar question bank for MPSC. Practice Kartari, Karmani, Bhave Prayog, Samas, and Alankar with explanations.",
    keywords: ["Marathi grammar prayog mpsc", "Marathi grammar samas mpsc", "Marathi grammar alankar mpsc", "एमपीएससी मराठी व्याकरण"],
    badge: "मराठी व्याकरण • सराव प्रश्नसंच",
    heading: "MPSC मराठी व्याकरण: प्रयोग, समास, अलंकार सराव प्रश्न",
    subheading: "मराठी भाषेतील सर्व प्रमुख व्याकरणाच्या घटकांवर आधारित आयोगाच्या धर्तीवरील वस्तुनिष्ठ प्रश्न.",
    callout: "गट क मुख्य परीक्षेत पैकीच्या पैकी गुणांसाठी tcs9 MASTER25 मराठी विभाग सोडवा.",
  },
];

// Helper to look up any slug
export async function getPseoData(slug: string): Promise<PseoPageData | null> {
  // Check districts
  if (slug.startsWith("mpsc-test-series-")) {
    const districtSlug = slug.replace("mpsc-test-series-", "");
    const district = MAHARASHTRA_DISTRICTS.find((d) => d.slug === districtSlug);
    if (district) {
      return {
        slug,
        title: `MPSC Test Series in ${district.nameEn} (${district.nameMr}) | tcs9 MASTER25 ₹199`,
        description: `Best MPSC Group C & Combined Test Series for students in ${district.nameEn} (${district.nameMr}). 25 full length tests, 2500 concepts, KaTeX bilingual questions, and -0.25 negative marking.`,
        keywords: [
          `mpsc test series ${district.nameEn}`,
          `best mpsc test series for ${district.nameEn} students`,
          `mpsc group c test series in ${district.nameEn}`,
          `एमपीएससी टेस्ट सिरीज ${district.nameMr}`,
          `mpsc mock test ${district.nameEn}`,
        ],
        primaryKeyword: `mpsc test series ${district.nameEn}`,
        category: "district",
        contextBanner: {
          badge: `जिल्हा विशेष • ${district.nameMr} (${district.nameEn})`,
          heading: `${district.nameMr} मधील विद्यार्थ्यांसाठी MPSC टेस्ट सिरीज — tcs9 MASTER25`,
          subheading: `${district.nameEn} जिल्ह्यातील हजारो गंभीर MPSC उमेदवारांची पहिली पसंती. २५ फुल-लेंथ सराव पेपर्सद्वारे कट-ऑफ सुरक्षित करा.`,
          callout: `All Maharashtra Rank द्वारे ${district.nameEn} व संपूर्ण महाराष्ट्रातील इतर विद्यार्थ्यांशी आपल्या अभ्यासाची तुलना करा.`,
        },
        faqs: [
          {
            question: `${district.nameMr} मधील विद्यार्थ्यांना ही टेस्ट सिरीज कशी उपयोगी पडेल?`,
            answer: `tcs9 MASTER25 टेस्ट सिरीज १००% ऑनलाईन स्वरूपात असून मोबाईल व लॅपटॉपवर कधीही देता येते. ${district.nameMr} मधील विद्यार्थी घरबसल्या राज्यस्तरीय रँक व सविस्तर मराठी स्पष्टीकरण तपासू शकतात.`,
          },
          {
            question: `What is the fee for students in ${district.nameEn}?`,
            answer: `The full 25-Test Series package is available at a special launch discount price of just ₹199 for the first 1,000 enrolled students.`,
          },
        ],
      };
    }
  }

  // Check Commercial Packages
  const pkg = COMMERCIAL_PACKAGES.find((p) => p.slug === slug);
  if (pkg) {
    return {
      slug: pkg.slug,
      title: pkg.title,
      description: pkg.description,
      keywords: pkg.keywords,
      primaryKeyword: pkg.primaryKeyword,
      category: "package",
      contextBanner: {
        badge: pkg.badge,
        heading: pkg.heading,
        subheading: pkg.subheading,
        callout: pkg.callout,
      },
      faqs: [
        {
          question: "tcs9 MASTER25 मध्ये काय समाविष्ट आहे?",
          answer: "tcs9 MASTER25 टेस्ट सिरीजमध्ये MPSC गट क पूर्व परीक्षेसाठी २५ परिपूर्ण सराव पेपर, २५००+ महत्त्वाच्या संकल्पनांचे सखोल मराठी स्पष्टीकरण, आणि अचूक -०.२५ निगेटिव्ह मार्किंगसह रिअल-टाईम रँक विश्लेषण समाविष्ट आहे.",
        },
        {
          question: "टेस्ट सिरीजची वैधता (Validity) किती दिवस राहील?",
          answer: "सर्व २५ टेस्ट्सची वैधता सुधारित परीक्षा दिनांक ३ जानेवारी २०२७ पर्यंत अमर्यादित वेळा सोडवण्यासाठी राहील.",
        },
      ],
    };
  }

  // Check Intent Questions
  const q = INTENT_QUESTIONS.find((item) => item.slug === slug);
  if (q) {
    return {
      slug: q.slug,
      title: q.title,
      description: q.description,
      keywords: q.keywords,
      primaryKeyword: q.primaryKeyword,
      category: "aeo-question",
      contextBanner: {
        badge: q.badge,
        heading: q.heading,
        subheading: q.subheading,
        callout: q.callout,
      },
      faqs: q.faqs,
    };
  }

  // Check News Jacking Hubs
  const news = NEWS_JACKING_HUBS.find((item) => item.slug === slug);
  if (news) {
    return {
      slug: news.slug,
      title: news.title,
      description: news.description,
      keywords: news.keywords,
      primaryKeyword: news.primaryKeyword,
      category: "news",
      contextBanner: {
        badge: news.badge,
        heading: news.heading,
        subheading: news.subheading,
        callout: news.callout,
      },
      faqs: [
        {
          question: "नवीन परीक्षा दिनांक काय आहे?",
          answer: "MPSC गट क संयुक्त पूर्व परीक्षा ३ जानेवारी २०२७ रोजी सकाळी १०:३० ते ११:३० या वेळेत होणार आहे.",
        },
      ],
    };
  }

  // Check Topic Pages
  const topic = TOPIC_PAGES.find((item) => item.slug === slug);
  if (topic) {
    return {
      slug: topic.slug,
      title: topic.title,
      description: topic.description,
      keywords: topic.keywords,
      primaryKeyword: topic.primaryKeyword,
      category: "subject",
      contextBanner: {
        badge: topic.badge,
        heading: topic.heading,
        subheading: topic.subheading,
        callout: topic.callout,
      },
      faqs: [
        {
          question: "या घटकावर MPSC मध्ये किती प्रश्न विचारले जातात?",
          answer: "मागील वर्षांच्या प्रश्नपत्रिकांनुसार या घटकावर पूर्व व मुख्य परीक्षेत दरवर्षी २ ते ४ प्रश्न निश्चितपणे विचारले जातात.",
        },
      ],
    };
  }

  return null;
}

// Get all slugs for build-time static generation (SSG)
export async function getAllPseoSlugs(): Promise<string[]> {
  const districtSlugs = MAHARASHTRA_DISTRICTS.map((d) => `mpsc-test-series-${d.slug}`);
  const packageSlugs = COMMERCIAL_PACKAGES.map((p) => p.slug);
  const questionSlugs = INTENT_QUESTIONS.map((q) => q.slug);
  const newsSlugs = NEWS_JACKING_HUBS.map((n) => n.slug);
  const topicSlugs = TOPIC_PAGES.map((t) => t.slug);

  return [
    ...districtSlugs,
    ...packageSlugs,
    ...questionSlugs,
    ...newsSlugs,
    ...topicSlugs,
  ];
}
