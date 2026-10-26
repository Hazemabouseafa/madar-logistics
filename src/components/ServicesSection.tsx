"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ThermometerSnowflake, 
  Boxes, 
  CheckCircle, 
  ArrowLeft,
  Truck,
  Layers,
  Sparkles
} from "lucide-react";

interface ServicesSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  reeferTitle?: string;
  reeferDesc?: string;
  dryTitle?: string;
  dryDesc?: string;
}

export default function ServicesSection({
  badge = "خدماتنا الأساسية المتخصصة",
  title = "حلول النقل البري المتقدمة للحاويات والموانئ",
  subtitle = "نركز خبراتنا وأسطولنا على التخصصين الأكثر طلباً وحيوية في حركة التجارة والاستيراد والتصدير، بأعلى مواصفات الجودة العالمية.",
  reeferTitle = "نقل الحاويات المبردة (Reefer Containers)",
  reeferDesc = "خدمة متخصصة ومجهزة بأحدث مولدات الطاقة الكهربائية (Clip-on & Undermount Gensets) التي تضمن استمرار عمل وحدات التبريد والتجميد دون أي انقطاع من رصيف الميناء وحتى الوصول للوجهة النهائية.",
  dryTitle = "نقل الحاويات الجافة (Dry Van Containers)",
  dryDesc = "نقل موثوق للحاويات الجافة بمختلف أحجامها من وإلى كافة الموانئ البحرية، بالاعتماد على مقطورات شاحنات قوية (Flatbeds & Skeleton Trailers) مصممة للأوزان الثقيلة مع تثبيت محكم للأقفال الملاحية (Twist Locks).",
}: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<"reefer" | "dry">("reefer");

  const services = [
    {
      id: "reefer",
      title: reeferTitle,
      subtitle: "حلول التبريد الفائقة وسلسلة الإمداد الدقيقة",
      icon: ThermometerSnowflake,
      tag: "تخصص دقيق وتبريد مستمر",
      tagColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
      description: reeferDesc,
      specs: [
        { label: "نطاق درجات الحرارة", value: "-30°C إلى +30°C مع تسجيل حراري مستمر" },
        { label: "نوع الحاويات", value: "حاويات 20 قدم و 40 قدم High Cube مبردة" },
        { label: "المولدات الكهربائية", value: "مولدات ديزل حديثة ومفحوصة (Gensets) مع خزانات وقود كافية" },
        { label: "البضائع المستهدفة", value: "الخضروات والفواكه، الأغذية المجمدة، الأدوية والأمصال، منتجات الألبان" },
      ],
      features: [
        "متابعة دورية لقراءات درجات الحرارة كل ساعة أثناء الرحلة",
        "توصيل فوري بالمولد فور إنهاء إجراءات السحب من ساحة الميناء",
        "سائقون مدربون على فحص ومعايرة أجهزة التبريد (Carrier, Thermo King, Daikin)",
        "أولويات خروج وتفريغ سريع لتفادي أي ذوبان أو تلف للمنتجات",
      ],
    },
    {
      id: "dry",
      title: dryTitle,
      subtitle: "نقل آمن وعالي الحمولة لكافة البضائع العامة والمصنعة",
      icon: Boxes,
      tag: "أسطول نقل ثقيل وسريع",
      tagColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      description: dryDesc,
      specs: [
        { label: "مقاسات الحاويات", value: "20 قدم، 40 قدم، 40 قدم High Cube، و45 قدم" },
        { label: "أنواع المقطورات", value: "شاسيهات سحب حديثة خفيفة الوزن لزيادة صافي الحمولة المسموحة" },
        { label: "أنظمة التثبيت", value: "أقفال أوتوماتيكية معتمدة لمقاومة الاهتزاز والرياح على الطرق السريعة" },
        { label: "البضائع المستهدفة", value: "المواد الخام، الكيماويات، السيراميك، الأجهزة، الحبوب، البضائع العامة" },
      ],
      features: [
        "سحب وتعتيق الحاويات الفارغة والمحملة طبقاً لتعليمات الخط الملاحي",
        "تنسيق مسبق لحجز المواعيد على بوابات الموانئ لمنع التكدس",
        "حمولة آمنة وموزعة بدقة وفقاً للأوزان المحورية المسموح بها قانونياً",
        "سرعة فائقة في إنهاء دورة النقل والعودة بالحاوية الفارغة للخط",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-24 bg-madar-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-madar-blue/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-madar-gold/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-madar-gold/10 border border-madar-gold/30 text-madar-gold text-xs sm:text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>{badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight break-words">
            {title}
          </h2>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed whitespace-pre-line">
            {subtitle}
          </p>

          {/* Interactive Toggle for Desktop/Mobile - 100% responsive */}
          <div className="mt-8 max-w-md mx-auto grid grid-cols-2 p-1.5 rounded-2xl bg-madar-navy border border-madar-cardBorder shadow-lg">
            <button
              onClick={() => setActiveTab("reefer")}
              className={`flex items-center justify-center gap-2 px-2.5 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === "reefer"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ThermometerSnowflake className="w-4 h-4 shrink-0" />
              <span className="truncate">حاويات مبردة</span>
            </button>
            <button
              onClick={() => setActiveTab("dry")}
              className={`flex items-center justify-center gap-2 px-2.5 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === "dry"
                  ? "bg-gradient-to-r from-madar-gold to-madar-goldHover text-madar-dark shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Boxes className="w-4 h-4 shrink-0" />
              <span className="truncate">حاويات جافة</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Card */}
        {services.map((svc) => {
          if (svc.id !== activeTab) return null;
          const Icon = svc.icon;

          return (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-3xl p-5 sm:p-8 lg:p-12 border border-madar-cardBorder relative shadow-2xl overflow-hidden"
            >
              {/* Header inside card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 sm:pb-8 border-b border-white/10">
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                  <div
                    className={`w-13 h-13 sm:w-16 sm:h-16 rounded-2xl ${
                      svc.id === "reefer"
                        ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400"
                        : "bg-madar-gold/15 border-madar-gold/30 text-madar-gold"
                    } border flex items-center justify-center shrink-0 shadow-lg p-3 sm:p-0`}
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">{svc.title}</h3>
                      <span className={`text-[11px] sm:text-xs font-bold px-2.5 py-0.5 sm:py-1 rounded-full border ${svc.tagColor}`}>
                        {svc.tag}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">{svc.subtitle}</p>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-madar-gold text-madar-dark font-extrabold text-xs sm:text-sm hover:brightness-110 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-center shrink-0"
                >
                  <span>طلب تسعير هذه الخدمة</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>
              </div>

              {/* Description */}
              <div className="py-5 sm:py-6">
                <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal">
                  {svc.description}
                </p>
              </div>

              {/* Grid: Specifications & Features */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-2">
                
                {/* Tech Specs */}
                <div className="lg:col-span-6 space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-madar-gold tracking-wide uppercase flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4" />
                    <span>المواصفات الفنية والتجهيزات</span>
                  </h4>
                  <div className="space-y-2.5">
                    {svc.specs.map((sp, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 sm:p-4 rounded-xl bg-madar-navy/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2"
                      >
                        <span className="text-xs sm:text-sm text-slate-400 font-medium">{sp.label}</span>
                        <span className="text-xs sm:text-sm font-bold text-white text-right sm:text-left">
                          <bdi>{sp.value}</bdi>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features & Guarantees */}
                <div className="lg:col-span-6 space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-madar-gold tracking-wide uppercase flex items-center gap-2 mb-3">
                    <CheckCircle className="w-4 h-4" />
                    <span>مميزات الخدمة وضمانات التنفيذ</span>
                  </h4>
                  <div className="space-y-2.5">
                    {svc.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-3.5 sm:p-4 rounded-xl bg-madar-navy/60 border border-white/5 flex items-start gap-2.5 sm:gap-3"
                      >
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}

        {/* Quick summary banner for other logistical capabilities */}
        <div className="mt-10 sm:mt-12 glass-panel p-5 sm:p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-madar-gold" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white">
                هل لديك شحنة خاصة، صب جاف، أو متطلبات نقل لوجستي محددة؟
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                فريقنا الميداني وغرفة العمليات جاهزون لترتيب خطة نقل مخصصة تلبي متطلباتكم بدقة.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="w-full md:w-auto text-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-bold transition-all shrink-0"
          >
            استشارة لوجستية مجانية
          </a>
        </div>

      </div>
    </section>
  );
}
