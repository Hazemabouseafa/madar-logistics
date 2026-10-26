"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Loader2,
  Mail,
  HelpCircle
} from "lucide-react";

interface ContactSectionProps {
  whatsappNumber?: string;
  whatsappDisplay?: string;
  phoneNumber?: string;
  addressAr?: string;
  workingHours?: string;
  companyEmail?: string;
  salesEmail?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
}

export default function ContactSection({
  whatsappNumber = "201050028330",
  whatsappDisplay = "+20 10 50028330",
  phoneNumber = "+20 10 50028330",
  addressAr = "جمهورية مصر العربية - مكاتب الشحن وخدمات الموانئ البحرية",
  workingHours = "السبت - الخميس: 8:00 ص - 6:00 م (خدمة الطوارئ وغرفة العمليات 24/7)",
  companyEmail = "info@madartrans.com",
  salesEmail = "sales@madartrans.com",
  badge = "طلب تسعير واستفسارات فورية",
  title = "تواصل معنا وابدأ شحن حاوياتك اليوم",
  subtitle = "املأ نموذج البيانات وسيقوم فريق العمليات بمراجعة تفاصيل الشحنة والتواصل معكم مباشرة بأفضل عروض الأسعار وجدول التحميل.",
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "حاويات مبردة",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const serviceOptions = [
    { value: "حاويات مبردة", label: "حاويات مبردة (Reefer Containers)" },
    { value: "حاويات جافة", label: "حاويات جافة (Dry Van Containers)" },
    { value: "نقل بضائع عامة وصب", label: "نقل بضائع عامة وصب جاف" },
    { value: "استفسار عام / خدمات لوجستية", label: "استفسار عام / شراكة لوجستية" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    // Client-side validations
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus({ type: "error", message: "يرجى كتابة الاسم بالكامل" });
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setStatus({ type: "error", message: "يرجى كتابة رقم هاتف صالح للتواصل" });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatus({ type: "error", message: "يرجى كتابة تفاصيل الشحنة أو الاستفسار بوضوح" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "فشل إرسال الطلب، يرجى المحاولة مرة أخرى.");
      }

      setStatus({
        type: "success",
        message: data.message || "تم استلام طلبكم بنجاح! سيتواصل معكم فريق العمل في أقرب وقت.",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        serviceType: "حاويات مبردة",
        message: "",
      });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت أو التواصل عبر واتساب مباشرة.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-madar-dark relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-madar-gold/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-madar-blue/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-madar-gold/10 border border-madar-gold/30 text-madar-gold text-xs sm:text-sm font-semibold mb-4">
            <Send className="w-4 h-4" />
            <span>{badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed whitespace-pre-line">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-2xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-madar-gold" />
                <span>قنوات التواصل المباشرة</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                يسعدنا استقبال اتصالاتكم ومراسلاتكم اليومية للرد على استفسارات أسعار النقل ومواعيد الشحن والتفريغ.
              </p>

              {/* WhatsApp direct card */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 group transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-emerald-400 font-bold">محادثة واتساب مباشرة (شات 24/7)</div>
                  <div className="text-base sm:text-lg font-black text-white mt-0.5 tracking-wider">
                    <span dir="ltr" className="inline-block font-sans tabular-nums font-bold">
                      {whatsappDisplay}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  واتساب
                </span>
              </a>

              {/* Direct Phone Call card (فون وليس واتساب) */}
              <a
                href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 hover:border-amber-400 group transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-madar-gold flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-amber-300 font-bold">اتصال هاتفي مباشر (فون وليس واتساب)</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5 tracking-wider">
                    <span dir="ltr" className="inline-block font-sans tabular-nums font-bold text-amber-200">
                      {phoneNumber}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-amber-300 font-bold bg-amber-500/15 px-2.5 py-1 rounded-full border border-amber-500/30">
                  اتصال صوتي
                </span>
              </a>

              {/* Official Emails */}
              <div className="p-4 rounded-2xl bg-madar-navy/60 border border-white/5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-madar-gold pb-1 border-b border-white/5">
                  <Mail className="w-4 h-4" />
                  <span>الإيميلات الرسمية للشركة</span>
                </div>
                
                {companyEmail && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">الإدارة العامة:</span>
                    <a href={`mailto:${companyEmail}`} className="text-white hover:text-madar-gold font-mono transition-colors">
                      {companyEmail}
                    </a>
                  </div>
                )}

                {salesEmail && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">المبيعات والعمليات:</span>
                    <a href={`mailto:${salesEmail}`} className="text-white hover:text-madar-gold font-mono transition-colors">
                      {salesEmail}
                    </a>
                  </div>
                )}
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-madar-navy/60 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">أوقات العمل والمتابعة</div>
                  <div className="text-sm font-semibold text-slate-200 mt-1 leading-relaxed">
                    {workingHours}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-madar-navy/60 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">نطاق الخدمة والمكاتب</div>
                  <div className="text-sm font-semibold text-slate-200 mt-1 leading-relaxed">
                    {addressAr}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Form Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-madar-cardBorder shadow-2xl relative">
              <h3 className="text-2xl font-black text-white mb-2">طلب نقل شحنة / استفسار</h3>
              <p className="text-sm text-slate-300 mb-8">
                يرجى تزويدنا بالمعلومات التالية وسيقوم منسق العمليات بالرد الفوري عليكم.
              </p>

              {/* Notification Toast */}
              <AnimatePresence>
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-2xl mb-6 flex items-start gap-3 border ${
                      status.type === "success"
                        ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-200"
                        : "bg-rose-950/60 border-rose-500/50 text-rose-200"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm font-medium leading-relaxed">{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-bold text-slate-200 mb-2">
                    الاسم الكامل أو اسم الشركة <span className="text-madar-gold">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثال: أحمد عبد الله (شركة التصدير)"
                    className="w-full px-4 py-3.5 rounded-xl bg-madar-dark/80 border border-madar-cardBorder text-white placeholder-slate-500 text-sm transition-all"
                  />
                </div>

                {/* Phone & Service Type Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-bold text-slate-200 mb-2">
                      رقم الهاتف / واتساب <span className="text-madar-gold">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="مثال: 01012345678"
                      className="w-full px-4 py-3.5 rounded-xl bg-madar-dark/80 border border-madar-cardBorder text-white placeholder-slate-500 text-sm transition-all"
                    />
                  </div>

                  {/* Service Type */}
                  <div>
                    <label htmlFor="serviceType" className="block text-xs sm:text-sm font-bold text-slate-200 mb-2">
                      نوع الشحنة / الخدمة المطلوبة <span className="text-madar-gold">*</span>
                    </label>
                    <select
                      id="serviceType"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-sm transition-all cursor-pointer"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-madar-dark text-white py-2">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-bold text-slate-200 mb-2">
                    تفاصيل الشحنة أو الاستفسار <span className="text-madar-gold">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="اكتب عدد الحاويات، ميناء الشحن/التفريغ، الوجهة المقصودة، وتاريخ النقل المتوقع..."
                    className="w-full px-4 py-3.5 rounded-xl bg-madar-dark/80 border border-madar-cardBorder text-white placeholder-slate-500 text-sm transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-madar-gold via-amber-400 to-madar-goldHover text-madar-dark font-black text-base shadow-lg shadow-amber-500/20 hover:shadow-glow-gold hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>جاري إرسال الطلب وحفظ البيانات...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>إرسال طلب النقل الآن</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
