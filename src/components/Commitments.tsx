"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, FileCheck, CheckCircle2, TrendingUp, Award } from "lucide-react";

interface CommitmentsProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  commitment1Title?: string;
  commitment1Desc?: string;
  commitment2Title?: string;
  commitment2Desc?: string;
  commitment3Title?: string;
  commitment3Desc?: string;
}

export default function Commitments({
  badge = "قيمنا ومبادئنا الراسخة",
  title = "الركائز الثلاث لتميز مدار للنقل البري",
  subtitle = "بنينا سمعتنا في السوق اللوجستي على ثلاثة معايير لا نساوم عليها أبداً، لتكون شحنتكم دائماً في أيدٍ أمينة من لحظة استلامها حتى وصولها.",
  commitment1Title = "التزام تام بالمواعيد",
  commitment1Desc = "ندرك أن وقت الشحن والتفريغ بالموانئ هو عصب النجاح التجاري. نضمن وصول شاحناتنا في الوقت المحدد بدقة متناهية لتفادي أي غرامات تأخير (Demurrage) وضمان سرعة تدفق بضائعكم.",
  commitment2Title = "محافظة قصوى على الشحنات",
  commitment2Desc = "حماية بضائعكم مسؤوليتنا الأولى. نوفر أسطولاً حديثاً مجهزاً بأحدث مقطورات نقل الحاويات ومولدات كهربائية متطورة (Gensets) لحاويات التبريد تضمن سلامة البضائع الغذائية والدوائية والصناعية.",
  commitment3Title = "التزام دقيق بالمستندات",
  commitment3Desc = "إنهاء ومطابقة المستندات بدقة قانونية وجمركية كاملة. نتابع بوالص الشحن، أذونات التسليم، تصاريح النقل، وإجراءات الفحص والجمارك لتسليم الشحنات بسلاسة مطلقة وبدون أي عوائق.",
}: CommitmentsProps) {
  const commitments = [
    {
      id: "punctuality",
      title: commitment1Title,
      subtitle: "Strict Adherence to Schedules",
      icon: Clock,
      color: "from-amber-500 to-madar-gold",
      borderColor: "border-amber-500/30",
      iconBg: "bg-amber-500/10 text-amber-400",
      description: commitment1Desc,
      points: [
        "تنسيق مسبق مع جداول رسو وتفريغ السفن بالموانئ",
        "تتبع الشاحنات بالـ GPS على مدار الساعة بدون انقطاع",
        "بدائل فورية وجاهزية أسطول طوارئ لتفادي أي عطل محتمل",
      ],
    },
    {
      id: "safety",
      title: commitment2Title,
      subtitle: "Maximum Cargo Safety & Protection",
      icon: ShieldCheck,
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500/30",
      iconBg: "bg-blue-500/10 text-blue-400",
      description: commitment2Desc,
      points: [
        "سلسلة تبريد مستمرة ومراقبة دقيقة لدرجات الحرارة",
        "سائقون محترفون ومدربون على القيادة الآمنة للحمولات الثقيلة",
        "فحص فني دوري صارم للشاحنات وأنظمة التعليق والفرامل",
      ],
    },
    {
      id: "documentation",
      title: commitment3Title,
      subtitle: "Flawless Documentation Compliance",
      icon: FileCheck,
      color: "from-emerald-500 to-teal-500",
      borderColor: "border-emerald-500/30",
      iconBg: "bg-emerald-500/10 text-emerald-400",
      description: commitment3Desc,
      points: [
        "إتمام واستلام بوالص الشحن وأذونات التسليم بدقة",
        "مطابقة أرقام الحاويات والأختام الملاحية (Seals)",
        "تسليم فوري للمستندات وإيصالات الوصول المعتمدة للعميل",
      ],
    },
  ];

  return (
    <section id="commitments" className="py-24 bg-madar-dark relative overflow-hidden">
      {/* Decorative lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-madar-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-madar-gold/10 border border-madar-gold/30 text-madar-gold text-xs sm:text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            <span>{badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed whitespace-pre-line">
            {subtitle}
          </p>
        </div>

        {/* Commitments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`glass-panel rounded-3xl p-8 relative flex flex-col justify-between border ${item.borderColor} hover:border-madar-gold/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl`}
              >
                {/* Number watermark */}
                <div className="absolute top-6 left-6 text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors select-none">
                  <span dir="ltr" className="inline-block tabular-nums font-mono">0{idx + 1}</span>
                </div>

                <div>
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-white group-hover:text-madar-gold transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium tracking-wider mb-4">
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Points list */}
                <div className="pt-6 border-t border-white/10 space-y-3">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-madar-gold shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
