import { MessageCircle, Globe, ExternalLink, Mail, Phone } from "lucide-react";
import defaultData from "@/data/siteContent.json";

export function Footer({ initialData }: { initialData?: typeof defaultData.footer } = {}) {
  const footer = initialData || defaultData.footer;
  const contact = footer?.contactBar || defaultData.footer.contactBar;
  const brand = footer?.brand || defaultData.footer.brand;
  const partnerLinks = footer?.partnerLinks || defaultData.footer.partnerLinks;
  const legalLinks = footer?.legalLinks || defaultData.footer.legalLinks;
  const copyright = footer?.copyright || defaultData.footer.copyright;
  const disclaimer = footer?.disclaimer || defaultData.footer.disclaimer;

  const whatsappUrl = `https://wa.me/${contact.whatsappNumber || "919579616908"}?text=${encodeURIComponent(contact.whatsappMessage || "Hello TCS9 MPSC Group C Test Series बद्दल माहिती हवी आहे")}`;

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
                <p className="text-xs sm:text-sm text-slate-500 font-medium">{contact.heading}</p>
                <p className="text-base sm:text-lg font-extrabold text-[#1F2A5C] english-numerals">
                  {contact.phone} <span className="font-medium text-sm text-slate-500">{contact.timing}</span>
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>{contact.whatsappButtonText}</span>
            </a>

          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center">
                <span className="text-amber-400 font-black text-xs">{brand.badge}</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">{brand.name}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-[1.8] max-w-sm">
              {brand.description}
            </p>
            {brand.supportEmail && (
              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 pt-2">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <a href={`mailto:${brand.supportEmail}`} className="hover:text-white transition-colors">
                    {brand.supportEmail}
                  </a>
                </span>
              </div>
            )}
          </div>

          {/* Quick & Partner Links */}
          <div className="md:col-span-6 lg:col-span-4 space-y-4">
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">{partnerLinks.title}</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              {(partnerLinks.links || []).map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 flex items-center gap-2 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span>{link.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 ml-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Policy */}
          <div className="md:col-span-12 lg:col-span-3 space-y-3 md:space-y-4 md:pt-2 lg:pt-0">
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">{legalLinks.title}</h4>
            <ul className="space-y-2.5 md:space-y-0 md:flex md:flex-wrap md:gap-x-6 md:gap-y-2 lg:block lg:space-y-2.5 text-xs sm:text-sm text-slate-300">
              {(legalLinks.links || []).map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} className="hover:text-white transition-colors">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left text-xs sm:text-sm text-slate-400">
          <p className="english-numerals">
            {copyright}
          </p>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            {disclaimer}
          </p>
        </div>
      </div>

    </footer>
  );
}
