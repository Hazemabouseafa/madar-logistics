"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WhatsAppWidgetProps {
  whatsappNumber?: string;
  phoneDisplay?: string;
}

export default function WhatsAppWidget({
  whatsappNumber = "201050028330",
  phoneDisplay = "+20 10 50028330",
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("");

  const handleStartChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = userMsg.trim()
      ? encodeURIComponent(userMsg)
      : encodeURIComponent("مرحباً، أود الاستفسار عن نقل حاويات عبر مدار للنقل البري.");
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 max-w-[calc(100vw-2rem)]">
      {/* Interactive Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[calc(100vw-2rem)] max-w-sm sm:w-88 rounded-3xl bg-madar-dark border border-madar-cardBorder shadow-2xl overflow-hidden text-right"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-3.5 sm:p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">مدار للنقل البري</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    <span>فريق العمليات متصل الآن</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="إغلاق نافذة المحادثة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-3.5 sm:p-4 bg-madar-navy/80 space-y-2.5">
              <div className="p-3 rounded-2xl bg-white/10 text-xs sm:text-sm text-slate-100 leading-relaxed border border-white/5">
                أهلاً بك في شركة مدار للنقل البري! 🚢🚛
                <br />
                يسعدنا مساعدتك في شحن ونقل الحاويات المبردة أو الجافة من وإلى الموانئ.
              </div>

              <div className="text-[11px] text-slate-400">
                الرقم المباشر:{" "}
                <span dir="ltr" className="inline-block text-emerald-400 font-bold font-sans tabular-nums">
                  {phoneDisplay}
                </span>
              </div>
            </div>

            {/* Quick Input & Send */}
            <form onSubmit={handleStartChat} className="p-3 bg-madar-dark flex items-center gap-2 border-t border-white/10">
              <input
                type="text"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder="اكتب استفسارك هنا..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-madar-navy text-xs text-white border border-madar-cardBorder focus:border-emerald-500 placeholder-slate-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shrink-0"
                title="إرسال عبر واتساب"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="تواصل عبر واتساب"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">واتساب مباشر</span>
      </button>
    </div>
  );
}
