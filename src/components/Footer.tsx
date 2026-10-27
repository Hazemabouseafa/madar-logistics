import Link from "next/link";
import Image from "next/image";
import { Phone, MessageSquare, MapPin, Mail, Clock } from "lucide-react";

interface FooterProps {
  whatsappNumber?: string;
  whatsappDisplay?: string;
  phoneNumber?: string;
  mapsUrl?: string;
  companyEmail?: string;
  salesEmail?: string;
  addressAr?: string;
  workingHours?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
}

export default function Footer({
  whatsappNumber = "201050028330",
  whatsappDisplay = "+20 10 50028330",
  phoneNumber = "+20 10 50028330",
  mapsUrl = "https://maps.google.com/?q=31.4422793,31.7658919&entry=gps&shh=CAE&lucs=,94297699,94231188,94280568,100821555,47071704,94218641,94282134,100835694,100840646,94286869,100820247,100822504,100838877,121816461&g_st=iw",
  companyEmail = "info@madartrans.com",
  salesEmail = "sales@madartrans.com",
  addressAr = "جمهورية مصر العربية - مكاتب الشحن وخدمات الموانئ البحرية (دمياط، بورسعيد، الإسكندرية، الدخيلة، السخنة)",
  workingHours = "السبت - الخميس: 8:00 ص - 6:00 م (خدمة الطوارئ وغرفة العمليات 24/7)",
  facebookUrl = "https://facebook.com/madartrans",
  linkedinUrl = "https://linkedin.com/company/madartrans",
  instagramUrl = "https://instagram.com/madartrans",
  twitterUrl = "https://x.com/madartrans",
}: FooterProps) {
  const cleanPhone = phoneNumber.replace(/\s+/g, "");

  return (
    <footer className="bg-madar-dark border-t border-madar-cardBorder/60 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block py-1">
              <Image
                src="/logo-white.png"
                alt="مدار للنقل البري"
                width={190}
                height={80}
                className="h-12 w-auto object-contain drop-shadow-md"
              />
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              شركة رائدة ومتخصصة في خدمات النقل البري للبضائع والحاويات المبردة والجافة من وإلى الموانئ البحرية المصرية، ملتزمون بالمواعيد وحماية الشحنات وإتقان المستندات.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/25 transition-colors"
                title="اتصال هاتفي مباشر"
              >
                <Phone className="w-3.5 h-3.5 text-madar-gold" />
                <span>اتصال فون:</span>
                <span dir="ltr" className="inline-block font-sans tabular-nums font-bold">
                  {phoneNumber}
                </span>
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-600/30 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>واتساب:</span>
                <span dir="ltr" className="inline-block font-sans tabular-nums font-bold">
                  {whatsappDisplay}
                </span>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-2">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 border border-white/10 flex items-center justify-center transition-all"
                  title="فيسبوك"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-sky-600/20 text-slate-300 hover:text-sky-400 border border-white/10 flex items-center justify-center transition-all"
                  title="لينكد إن"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-pink-600/20 text-slate-300 hover:text-pink-400 border border-white/10 flex items-center justify-center transition-all"
                  title="إنستغرام"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-slate-700/40 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all"
                  title="إكس / تويتر"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-r-2 border-madar-gold pr-2">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#hero" className="hover:text-madar-gold transition-colors">الرئيسية</a>
              </li>
              <li>
                <a href="#about" className="hover:text-madar-gold transition-colors">من نحن والموانئ</a>
              </li>
              <li>
                <a href="#commitments" className="hover:text-madar-gold transition-colors">التزاماتنا الثلاثة</a>
              </li>
              <li>
                <a href="#services" className="hover:text-madar-gold transition-colors">حاويات مبردة & جافة</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-madar-gold transition-colors">لماذا مدار</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-madar-gold transition-colors">طلب تسعير وشحن</a>
              </li>
            </ul>
          </div>

          {/* Contact Coordinates (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-r-2 border-madar-gold pr-2">
              بيانات التواصل الرسمية
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              {/* Direct Phone */}
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-start gap-3 hover:text-amber-300 transition-colors group"
              >
                <Phone className="w-4 h-4 text-madar-gold shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>
                  هاتف مباشر (فون):{" "}
                  <span dir="ltr" className="inline-block font-sans tabular-nums font-bold text-amber-200">
                    {phoneNumber}
                  </span>
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-emerald-400 transition-colors group"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>
                  محادثة واتساب:{" "}
                  <span dir="ltr" className="inline-block font-sans tabular-nums font-bold text-slate-200">
                    {whatsappDisplay}
                  </span>
                </span>
              </a>

              {companyEmail && (
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-madar-gold shrink-0 mt-0.5" />
                  <span className="break-all">الإدارة: {companyEmail}</span>
                </div>
              )}

              {salesEmail && (
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="break-all">المبيعات والعمليات: {salesEmail}</span>
                </div>
              )}

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-madar-gold shrink-0 mt-0.5" />
                <span>{addressAr}</span>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-madar-gold shrink-0 mt-0.5" />
                <span>{workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} شركة مدار للنقل البري (Madar Logistics).
          </div>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-slate-400 transition-colors">للأعلى ↑</a>
            <Link href="/admin" className="hover:text-madar-gold transition-colors">دخول الإدارة</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
