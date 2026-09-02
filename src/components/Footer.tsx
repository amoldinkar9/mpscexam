import { MessageCircle, Globe, ExternalLink, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1F2A5C] text-white">
      
      {/* Plain White Contact Bar */}
      <div className="bg-white text-[#1F2A5C] border-b border-slate-200 py-6 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-11 h-11 rounded-full bg-[#fbeae8] flex items-center justify-center text-[#9B3A32] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm text-slate-500 font-medium">काही अडचण किंवा प्रश्न असल्यास थेट बोला:</p>
                <p className="text-base sm:text-lg font-extrabold text-[#1F2A5C] english-numerals">+91 98765 43210 (सकाळी 9 ते रात्री 9)</p>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <a
              href="https://wa.me/919876543210?text=Hello%20TCS9%20MPSC%20Group%20C%20Test%20Series%20बद्दल%20माहिती%20हवी%20आहे"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all shrink-0"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>व्हॉट्सॲपवर संपर्क करा</span>
            </a>

          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center">
                <span className="text-amber-400 font-black text-xs">TCS9</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">mpscexam</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-[1.8] max-w-sm">
              महाराष्ट्र लोकसेवा आयोगाच्या (MPSC) विविध स्पर्धा परीक्षांच्या तयारीसाठी दर्जेदार मॉक टेस्ट्स आणि अभ्यास साहित्याचा विश्वासू मंच.
            </p>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 pt-2">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>support@mpscexam.com</span>
              </span>
            </div>
          </div>

          {/* Quick & Partner Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">आमचे इतर शैक्षणिक प्लॅटफॉर्म्स</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li>
                <a
                  href="https://tcs9.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 flex items-center gap-2 transition-colors"
                >
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span>TCS9.com — ऑनलाइन टेस्ट सिरीज प्लॅटफॉर्म</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 ml-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://chalughadamodi.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 flex items-center gap-2 transition-colors"
                >
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span>chalughadamodi.in — दैनिक चालू घडामोडी</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 ml-0.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">धोरणे व अटी</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">गोपनीयता धोरण (Privacy Policy)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">नियम व अटी (Terms of Service)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">रिफंड धोरण (Refund Policy)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">आमच्याबद्दल (About Us)</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left text-xs sm:text-sm text-slate-400">
          <p className="english-numerals">
            © 2026 mpscexam / TCS9. सर्व हक्क राखीव.
          </p>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            *अस्वीकरण: ही एक खाजगी शैक्षणिक टेस्ट सिरीज असून तिचा महाराष्ट्र लोकसेवा आयोग (MPSC) शी कोणताही थेट किंवा अधिकृत संबंध नाही.
          </p>
        </div>
      </div>

    </footer>
  );
}
