"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Headphones, 
  Zap, 
  FileCheck2, 
  Award,
  Sparkles
} from "lucide-react";

export default function WhyUs() {
  const advantages = [
    {
      icon: Clock,
      title: "دقة في المواعيد بدون تأخير",
      description: "نلتزم بجداول رسو وسحب الحاويات بدقة تمنع رسوم التأخير والغرامات في ساحات الموانئ.",
    },
    {
      icon: ShieldCheck,
      title: "أمان قصوى وحماية للبضائع",
      description: "تثبيت محكم للحاويات وتأمين مستمر طوال مسار الرحلة على شبكة الطرق السريعة.",
    },
    {
      icon: Zap,
      title: "مولدات كهربائية حديثة (Gensets)",
      description: "وحدات طاقة ديزل مستقلة تضمن تبريداً لا ينقطع للشحنات الغذائية والدوائية الحساسة.",
    },
    {
      icon: FileCheck2,
      title: "متابعة وإتمام المستندات الجمركية",
      description: "فريق متخصص في مراجعة أذونات الصرف، بوالص الشحن، وتصاريح المرور والتفريغ.",
    },
    {
      icon: MapPin,
      title: "ربط مباشر بين الموانئ والمصانع",
      description: "نقل سريع من الميناء إلى مستودعك أو مصنعك في أي منطقة صناعية داخل مصر.",
    },
    {
      icon: Headphones,
      title: "دعم ومتابعة عمليات على مدار 24/7",
      description: "خط طوارئ دائم وفريق عمليات يتابع الشاحنات لحظة بلحظة حتى إتمام التسليم النهائي.",
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-gradient-to-b from-madar-dark via-madar-navy/30 to-madar-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-madar-gold/10 border border-madar-gold/30 text-madar-gold text-xs sm:text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            <span>لماذا يختارنا كبار المصدرين والمستوردين؟</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight break-words">
            معايير احترافية تجعلنا الخيار الأول في{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-madar-gold via-amber-300 to-madar-goldHover">
              النقل البري اللوجستي
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
            نجمع بين كفاءة الأسطول البري وسرعة الإجراءات لنمنح أعمالكم ميزة تنافسية واستقراراً لوجستياً دائماً.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel glass-panel-hover p-5 sm:p-8 rounded-3xl border border-madar-cardBorder flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-madar-gold/15 border border-madar-gold/30 flex items-center justify-center text-madar-gold mb-5 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-madar-gold transition-colors mb-2.5">
                    <bdi>{adv.title}</bdi>
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {adv.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
