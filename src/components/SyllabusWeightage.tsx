import { BookOpen, CheckCircle } from "lucide-react";

export function SyllabusWeightage() {
  const syllabusItems = [
    {
      num: "1",
      title: "इतिहास",
      content: "आधुनिक भारताचा विशेषतः महाराष्ट्राचा इतिहास."
    },
    {
      num: "2",
      title: "भूगोल",
      content: "महाराष्ट्राच्या भूगोलाच्या विशेष अभ्यासासह पृथ्वी, जगातील विभाग, हवामान, अक्षांश-रेखांश, महाराष्ट्रातील जमिनीचे प्रकार, पर्जन्यमान, प्रमुख पिके, शहरे, नद्या, उद्योगधंदे, इत्यादी."
    },
    {
      num: "3",
      title: "अर्थव्यवस्था",
      content: "भारतीय अर्थव्यवस्था राष्ट्रीय उत्पन्न, शेती, उद्योग, परकीय व्यापार, बँकिंग, लोकसंख्या, दारिद्रय व बेरोजगारी, मुद्रा आणि राजकोषीय नीति, इत्यादी."
    },
    {
      num: "4",
      title: "शासकीय अर्थव्यवस्था व चालू घडामोडी",
      content: "अर्थसंकल्प, लेखा, लेखापरीक्षण, इत्यादी. चालू घडामोडी जागतिक तसेच महाराष्ट्रासह भारतातील."
    },
    {
      num: "5",
      title: "राज्यशास्त्र",
      content: "भारतीय संविधान, राज्यव्यवस्था, ग्रामप्रशासन, पंचायतराज व घटनात्मक संस्था."
    },
    {
      num: "6",
      title: "सामान्य विज्ञान",
      content: "भौतिकशास्त्र (Physics), रसायनशास्त्र (Chemistry), प्राणिशास्त्र (Zoology), वनस्पतीशास्त्र (Botany), आरोग्यशास्त्र (Hygiene)."
    },
    {
      num: "7",
      title: "अंकगणित",
      content: "बेरीज, वजाबाकी, गुणाकार, भागाकार, दशांश, अपूर्णांक व टक्केवारी इत्यादी."
    },
    {
      num: "8",
      title: "बुध्दिमापन चाचणी",
      content: "उमेदवार किती लवकर व अचूकपणे विचार करु शकतो हे आजमावण्यासाठी प्रश्न."
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#fcf8f7] border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbeae8] text-[#9B3A32] text-xs font-bold border border-[#f3c8c4]">
            <BookOpen className="w-4 h-4" />
            <span>MPSC अधिकृत अभ्यासक्रम रचना</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A5C] tracking-tight">
            परीक्षा <span className="text-[#9B3A32]">अभ्यासक्रम (Syllabus)</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            आयोगाच्या अधिकृत अभ्यासक्रमातील प्रत्येक घटकानुसार तयार केलेला परिपूर्ण प्रश्नसंच.
          </p>
        </div>

        {/* 8-Card Syllabus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {syllabusItems.map((item) => (
            <div
              key={item.num}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#9B3A32]/40 hover:shadow-md transition-all flex items-start gap-4 group"
            >
              {/* Number Badge */}
              <div className="w-10 h-10 rounded-xl bg-[#fbeae8] text-[#9B3A32] font-black text-base flex items-center justify-center shrink-0 border border-[#f3c8c4] group-hover:bg-[#9B3A32] group-hover:text-white transition-colors english-numerals">
                {item.num}
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-extrabold text-base sm:text-lg text-[#1F2A5C] group-hover:text-[#9B3A32] transition-colors">
                    {item.title}
                  </h3>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                    <CheckCircle className="w-3 h-3" />
                    <span>पूर्ण कव्हर</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
