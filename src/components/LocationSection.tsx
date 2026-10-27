"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink, Compass } from "lucide-react";

interface LocationSectionProps {
  mapsUrl?: string;
  addressAr?: string;
}

export default function LocationSection({
  mapsUrl = "https://maps.google.com/?q=31.4422793,31.7658919&entry=gps&shh=CAE&lucs=,94297699,94231188,94280568,100821555,47071704,94218641,94282134,100835694,100840646,94286869,100820247,100822504,100838877,121816461&g_st=iw",
  addressAr = "جمهورية مصر العربية - مكاتب الشحن وخدمات الموانئ البحرية (دمياط، بورسعيد، الإسكندرية، الدخيلة، السخنة)",
}: LocationSectionProps) {
  // Extract latitude and longitude if present in mapsUrl (e.g. q=31.4422793,31.7658919)
  const coordMatch = mapsUrl ? mapsUrl.match(/q=([0-9.-]+),([0-9.-]+)/) : null;
  const queryParam = coordMatch ? `${coordMatch[1]},${coordMatch[2]}` : "31.4422793,31.7658919";
  const embedUrl = `https://maps.google.com/maps?q=${queryParam}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="py-20 sm:py-24 bg-gradient-to-b from-madar-dark via-madar-navy/20 to-madar-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs sm:text-sm font-semibold mb-4">
            <Compass className="w-4 h-4" />
            <span>الموقع الجغرافي والوصول الميداني</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight break-words">
            موقع استراتيجي بالقرب من{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-madar-gold via-amber-300 to-madar-goldHover">
              الموانئ وشبكات الطرق
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
            موقعنا في دمياط يتيح وصولاً سريعاً لكافة الموانئ البحرية الرئيسية والمحاور اللوجستية لنقل وتفريغ الشحنات بأعلى كفاءة.
          </p>
        </div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-3xl p-4 sm:p-6 border border-madar-cardBorder shadow-2xl relative overflow-hidden"
        >
          {/* Map Top Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white">
                  مقر مدار للنقل البري والخدمات اللوجستية (دمياط)
                </h3>
                <p className="text-xs text-slate-400">{addressAr}</p>
              </div>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-madar-gold to-madar-goldHover text-madar-dark font-bold text-xs sm:text-sm shadow-md hover:brightness-110 hover:scale-105 transition-all text-center"
            >
              <Navigation className="w-4 h-4" />
              <span>فتح الاتجاهات على خرائط جوجل</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Google Maps iframe */}
          <div className="relative w-full h-[320px] sm:h-[450px] rounded-2xl overflow-hidden border border-white/10 bg-madar-navy">
            <iframe
              title="موقع مدار للنقل البري على الخريطة - دمياط"
              src={embedUrl}
              className="w-full h-full border-0 filter contrast-105"
              loading="lazy"
              allowFullScreen
            />

            {/* Floating Quick Pin Overlay */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 max-w-sm glass-panel p-3.5 sm:p-4 rounded-2xl border border-madar-gold/30 shadow-2xl hidden sm:block">
              <div className="flex items-center gap-2 text-madar-gold font-bold text-xs mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>مركز العمليات الرئيسي - دمياط</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                قريب من ميناء دمياط ومحطات الحاويات لتسهيل خروج المقطورات وشاحنات التبريد فوراً إلى كافة المحافظات.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
