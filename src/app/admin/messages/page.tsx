"use client";

import { useState, useEffect } from "react";
import { 
  Inbox, 
  Search, 
  Filter, 
  Phone, 
  MessageSquare, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  RefreshCw, 
  Calendar,
  X,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { ContactMessage, MessageStatus } from "@/lib/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/messages", window.location.origin);
      if (statusFilter !== "ALL") url.searchParams.set("status", statusFilter);
      if (searchTerm.trim()) url.searchParams.set("search", searchTerm.trim());

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMessages();
  };

  const handleUpdateStatus = async (id: string, newStatus: MessageStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الرسالة نهائياً؟")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  // Generate WhatsApp Direct Reply Link
  const getWhatsAppReplyLink = (msg: ContactMessage) => {
    let cleanPhone = msg.phone.replace(/[^0-9]/g, "");
    // If Egyptian number starting with 01
    if (cleanPhone.startsWith("01")) {
      cleanPhone = "2" + cleanPhone;
    } else if (cleanPhone.startsWith("1") && cleanPhone.length === 10) {
      cleanPhone = "20" + cleanPhone;
    }
    const greeting = `مرحباً أ/ ${msg.name}، نتواصل معك من شركة مدار للنقل البري بخصوص طلبكم لخدمة (${msg.serviceType}). يسعدنا تزويدكم بالتفاصيل وعرض السعر.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
  };

  const getStatusBadge = (status: MessageStatus) => {
    switch (status) {
      case "NEW":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>جديد</span>
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Clock className="w-3 h-3" />
            <span>قيد المتابعة</span>
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>تم الرد</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <Inbox className="w-7 h-7 text-madar-gold" />
            <span>صندوق الرسائل والطلبات الواردة</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            إدارة استفسارات العملاء، تحديث حالات المتابعة، والرد المباشر عبر واتساب
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-madar-navy hover:bg-white/10 text-white border border-madar-cardBorder text-xs sm:text-sm font-semibold transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>تحديث القائمة</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-madar-cardBorder flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === "ALL"
                ? "bg-madar-gold text-madar-dark shadow-sm"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            الجميع ({messages.length})
          </button>
          <button
            onClick={() => setStatusFilter("NEW")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === "NEW"
                ? "bg-amber-500 text-madar-dark shadow-sm"
                : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
            }`}
          >
            جديد
          </button>
          <button
            onClick={() => setStatusFilter("IN_PROGRESS")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === "IN_PROGRESS"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
            }`}
          >
            قيد المتابعة
          </button>
          <button
            onClick={() => setStatusFilter("COMPLETED")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === "COMPLETED"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
            }`}
          >
            تم الرد
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="بحث بالاسم، الهاتف، أو الخدمة..."
            className="w-full px-4 py-2.5 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-xs pl-9 placeholder-slate-500"
          />
          <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Messages Table Container */}
      <div className="glass-panel rounded-3xl border border-madar-cardBorder shadow-2xl overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-madar-gold" />
            <span>جاري تحميل الرسائل...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-sm">
            لا توجد أي رسائل مطابقة لخيارات البحث أو الفلتر.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="text-xs text-slate-400 uppercase bg-madar-navy/80 border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4">اسم العميل</th>
                  <th className="py-3.5 px-4">رقم الهاتف</th>
                  <th className="py-3.5 px-4">نوع الشحنة</th>
                  <th className="py-3.5 px-4">محتوى الطلب</th>
                  <th className="py-3.5 px-4">الحالة الحالية</th>
                  <th className="py-3.5 px-4">تغيير الحالة</th>
                  <th className="py-3.5 px-4">إجراءات سريعة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    {/* Name */}
                    <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                      <button
                        onClick={() => setSelectedMessage(msg)}
                        className="text-right hover:text-madar-gold transition-colors block"
                      >
                        {msg.name}
                        <span className="block text-[11px] font-normal text-slate-400 mt-0.5">
                          {new Date(msg.createdAt).toLocaleDateString("ar-EG", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </button>
                    </td>

                    {/* Phone */}
                    <td className="py-4 px-4 font-mono text-slate-300 whitespace-nowrap dir-ltr text-right">
                      {msg.phone}
                    </td>

                    {/* Service Type */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-madar-dark border border-white/10 text-slate-200">
                        {msg.serviceType}
                      </span>
                    </td>

                    {/* Message Preview */}
                    <td className="py-4 px-4 text-xs text-slate-300 max-w-xs">
                      <p
                        onClick={() => setSelectedMessage(msg)}
                        className="cursor-pointer truncate hover:text-white transition-colors"
                        title={msg.message}
                      >
                        {msg.message}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {getStatusBadge(msg.status)}
                    </td>

                    {/* Status Changer Dropdown */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <select
                        value={msg.status}
                        disabled={updatingId === msg.id}
                        onChange={(e) => handleUpdateStatus(msg.id, e.target.value as MessageStatus)}
                        className="px-2.5 py-1 rounded-lg bg-madar-navy border border-madar-cardBorder text-xs text-slate-200 cursor-pointer focus:border-madar-gold"
                      >
                        <option value="NEW">جديد</option>
                        <option value="IN_PROGRESS">قيد المتابعة</option>
                        <option value="COMPLETED">تم الرد</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {/* Direct WhatsApp Reply */}
                        <a
                          href={getWhatsAppReplyLink(msg)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all"
                          title="بدء محادثة واتساب مع العميل"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>رد واتساب</span>
                        </a>

                        {/* View Details */}
                        <button
                          onClick={() => setSelectedMessage(msg)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                          title="عرض التفاصيل الكاملة"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          disabled={deletingId === msg.id}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="حذف الرسالة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-madar-dark border border-madar-cardBorder rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative text-right">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute left-6 top-6 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-madar-gold/15 text-madar-gold flex items-center justify-center">
                <Inbox className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedMessage.name}</h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  تاريخ الإرسال: {new Date(selectedMessage.createdAt).toLocaleString("ar-EG")}
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-200">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-madar-navy/60 border border-white/5">
                <div>
                  <span className="text-xs text-slate-400 block mb-1">رقم الهاتف</span>
                  <span className="font-mono font-bold text-white dir-ltr block text-right">
                    {selectedMessage.phone}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-1">نوع الشحنة</span>
                  <span className="font-bold text-madar-gold">{selectedMessage.serviceType}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1.5 font-bold">تفاصيل الرسالة</span>
                <div className="p-4 rounded-2xl bg-madar-navy border border-white/5 text-slate-100 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {selectedMessage.notes && (
                <div>
                  <span className="text-xs text-slate-400 block mb-1 font-bold">ملاحظات داخلية</span>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
                    {selectedMessage.notes}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
              <a
                href={getWhatsAppReplyLink(selectedMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>رد فوري عبر واتساب</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteMessage(selectedMessage.id)}
                  className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-xs font-bold transition-colors"
                >
                  حذف الطلب
                </button>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
