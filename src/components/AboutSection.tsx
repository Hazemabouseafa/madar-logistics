"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  Check, 
  Truck, 
  ShieldCheck, 
  FileText, 
  Navigation 
} from "lucide-react";
import { PortItem } from "@/lib/types";

interface AboutSectionProps {
  badge?: string;
  title?: string;
  desc1?: string;
  desc2?: string;
  portsCardTitle?: string;
  portsCardSubtitle?: string;
  portsCardBadge?: string;
  portsCardCalloutTitle?: string;
  portsCardCalloutSubtitle?: string;
  portsCardCta?: string;
  portsList?: PortItem[];
}

export default function AboutSection({
  badge = "نبذة عن الشركة ومسيرتنا",
  title = "خبرة راسخة وأسطول متطور في نقل الحاويات والموانئ",
  desc1 = "تأسست شركة مدار للنقل البري (Madar Logistics and Transportation) لتكون الشريك الاستراتيجي الأول للشركات والمصانع والمصدرين والمستوردين في جمهورية مصر العربية، حيث نقدم أسرع وأدق خدمات النقل البري للبضائع والحاويات عبر شبكة الطرق والموانئ البحرية.",
  desc2 = "نتميز بإدارة تشغيلية صارمة تعتمد على تقنيات التتبع الفوري والمراقبة الفنية لأسطولنا، مما يضمن تدفقاً سلساً للبضائع من أرصفة الموانئ إلى المستودعات والمصانع مباشرةً دون أي تأخير أو تلف للمحتويات.",
  portsCardTitle = "الموانئ التي نخدمها بانتظام",
  portsCardSubtitle = "تغطية تشغيلية يومية",
  portsCardBadge = "تغطية 100%",
  portsCardCalloutTitle = "تواصل لتحديد ميعاد الشحن",
  portsCardCalloutSubtitle = "جاهزية فورية للنقل والمناولة",
  portsCardCta = "احجز الآن",
  portsList,
}: AboutSectionProps) {
  const effectivePorts: PortItem[] = portsList && portsList.length > 0 ? portsList : [
    { name: "ميناء الإسكندرية البحري", role: "البوابة الرئيسية للتجارة المتوسطية" },
    { name: "ميناء الدخيلة", role: "محطة الحاويات العملاقة والصب الجاف" },
    { name: "ميناء دمياط", role: "مركز الربط اللوجستي للدلتا والقاهرة" },
    { name: "ميناء بورسعيد وشرق بورسعيد", role: "شريان قناة السويس المحوري" },
    { name: "ميناء السخنة والأدبية", role: "بوابة البحر الأحمر والاستيراد الآسيوي" },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-madar-dark via-madar-navy/40 to-madar-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold">
              <Building2 className="w-4 h-4" />
              <span>{badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {title}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed whitespace-pre-line">
              {desc1}
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed whitespace-pre-line">
              {desc2}
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-madar-card/60 border border-madar-cardBorder/60">
                <Truck className="w-5 h-5 text-madar-gold shrink-0" />
                <span className="text-sm font-semibold text-slate-200">أسطول شاحنات مجهز ومفحوص دورياً</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-madar-card/60 border border-madar-cardBorder/60">
                <ShieldCheck className="w-5 h-5 text-madar-gold shrink-0" />
                <span className="text-sm font-semibold text-slate-200">تأمين شامل ورقابة سلامة الشحنات</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-madar-card/60 border border-madar-cardBorder/60">
                <FileText className="w-5 h-5 text-madar-gold shrink-0" />
                <span className="text-sm font-semibold text-slate-200">إجراءات جمركية وإفراجات رسمية دقيقة</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-madar-card/60 border border-madar-cardBorder/60">
                <Navigation className="w-5 h-5 text-madar-gold shrink-0" />
                <span className="text-sm font-semibold text-slate-200">تتبع مباشر لحظة بلحظة (GPS)</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Showcase & Ports List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder relative shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-madar-gold/15 border border-madar-gold/30 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-madar-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{portsCardTitle}</h3>
                    <p className="text-xs text-slate-400">{portsCardSubtitle}</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <bdi>{portsCardBadge}</bdi>
                </span>
              </div>

              <div className="space-y-3">
                {effectivePorts.map((port, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3.5 rounded-xl bg-madar-navy/60 hover:bg-madar-navy border border-white/5 hover:border-madar-gold/40 transition-all duration-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-100">{port.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{port.role}</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-madar-gold/10 text-madar-gold flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Callout box */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-madar-blue/40 to-madar-card border border-madar-blue flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-300">{portsCardCalloutSubtitle}</div>
                  <div className="text-sm font-bold text-madar-gold">{portsCardCalloutTitle}</div>
                </div>
                <a
                  href="#contact"
                  className="px-4 py-2 rounded-xl bg-madar-gold text-madar-dark text-xs font-bold hover:brightness-110 transition-all"
                >
                  {portsCardCta}
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
