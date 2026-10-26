"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MessageSquare, 
  Phone,
  ShieldCheck, 
  Clock, 
  ThermometerSnowflake, 
  Anchor, 
  ChevronDown
} from "lucide-react";

interface HeroProps {
  whatsappNumber?: string;
  phoneNumber?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaWhatsapp?: string;
}

export default function Hero({ 
  whatsappNumber = "201050028330",
  phoneNumber = "+20 10 50028330",
  badge = "النقل البري التخصصي من وإلى كافة الموانئ البحرية [ حاويات مبردة & جافة ]",
  title = "شريانك اللوجستي الموثوق لنقل الحاويات من وإلى الموانئ",
  subtitle = "شركة مدار للنقل البري تقدم حلولاً احترافية لنقل الحاويات المبردة والجافة مع التزام صارم بالمواعيد، حماية قصوى للشحنات، وإنهاء دقيق لكافة متطلبات وتراخيص النقل الجمركية.",
  ctaPrimary = "احجز شحنتك الآن",
  ctaWhatsapp = "تواصل عبر واتساب",
}: HeroProps) {
  const cleanPhone = phoneNumber.replace(/\s+/g, "");

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-14 sm:pb-16 overflow-hidden bg-gradient-to-b from-madar-dark via-madar-navy to-madar-dark"
    >
      {/* Background patterns and glowing orbs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-madar-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-64 sm:w-80 h-64 sm:h-80 bg-madar-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-madar-dark via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full text-center">
        {/* Top Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-madar-gold/30 backdrop-blur-md mb-6 sm:mb-8 shadow-glow-gold/20 max-w-full"
        >
          <span className="flex h-2 w-2 rounded-full bg-madar-gold animate-pulse shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
            {badge}
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight sm:leading-tight max-w-5xl mx-auto break-words"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal whitespace-pre-line"
        >
          {subtitle}
        </motion.p>

        {/* Call to Actions (حجز، واتساب، واتصال فون مباشر) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full"
        >
          {/* CTA 1: Booking */}
          <a
            href="#contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-madar-gold via-amber-400 to-madar-goldHover text-madar-dark font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/20 hover:shadow-glow-gold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span>{ctaPrimary}</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </a>

          {/* CTA 2: Direct Phone Call (اتصال فون مباشر وليس واتساب) */}
          <a
            href={`tel:${cleanPhone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 hover:border-amber-400 font-bold text-sm sm:text-base backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md"
            title="اتصال هاتفي مباشر (فون)"
          >
            <Phone className="w-5 h-5 text-madar-gold shrink-0" />
            <span>اتصال فون:</span>
            <span dir="ltr" className="inline-block font-sans tabular-nums font-bold">
              {phoneNumber}
            </span>
          </a>

          {/* CTA 3: WhatsApp Chat */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-madar-card/90 hover:bg-emerald-950/40 text-emerald-400 border border-emerald-500/40 hover:border-emerald-400 font-bold text-sm sm:text-base backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md"
          >
            <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{ctaWhatsapp}</span>
          </a>
        </motion.div>

        {/* Highlight Metrics Grid with responsive layout */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto text-right"
        >
          <div className="glass-panel glass-panel-hover p-4 sm:p-5 rounded-2xl flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-madar-gold/15 border border-madar-gold/30 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-madar-gold" />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-black text-white">
                <span dir="ltr" className="inline-block tabular-nums font-sans">100%</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">دقة التزام بالمواعيد</div>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover p-4 sm:p-5 rounded-2xl flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
              <ThermometerSnowflake className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-base sm:text-xl font-black text-white">
                <span dir="ltr" className="inline-block tabular-nums font-sans">-30°C</span> إلى <span dir="ltr" className="inline-block tabular-nums font-sans">+30°C</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">سلسلة تبريد معتمدة</div>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover p-4 sm:p-5 rounded-2xl flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-black text-white">أمان كامل</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">حماية قصوى وتأمين</div>
            </div>
          </div>

          <div className="glass-panel glass-panel-hover p-4 sm:p-5 rounded-2xl flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Anchor className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-black text-white">كافة الموانئ</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">تغطية بحرية شاملة</div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <a
            href="#commitments"
            className="flex flex-col items-center text-xs text-slate-400 hover:text-madar-gold transition-colors gap-1 group py-2"
          >
            <span>اكتشف المزيد</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-madar-gold" />
          </a>
        </div>
      </div>
    </section>
  );
}
