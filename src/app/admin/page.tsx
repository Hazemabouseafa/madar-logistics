import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdminSession } from "@/lib/auth";
import { getDashboardStats, getMessages, getSiteSettings } from "@/lib/data-store";
import { 
  Inbox, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  MessageSquare, 
  Settings, 
  Truck,
  Phone,
  Calendar
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getCurrentAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const stats = await getDashboardStats();
  const recentMessages = await getMessages();
  const settings = await getSiteSettings();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>جديد</span>
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Clock className="w-3 h-3" />
            <span>قيد المتابعة</span>
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>تم الرد</span>
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            مرحباً بك، {session.name}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            نظرة عامة على طلبات النقل الواردة وإحصائيات العمليات
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/messages"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-madar-gold text-madar-dark font-extrabold text-xs sm:text-sm hover:brightness-110 transition-all shadow-md"
          >
            <Inbox className="w-4 h-4" />
            <span>صندوق الوارد ({stats.newMessages} جديد)</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-madar-navy hover:bg-white/10 text-white border border-madar-cardBorder font-semibold text-xs sm:text-sm transition-all"
          >
            <Settings className="w-4 h-4" />
            <span>الإعدادات العامة</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Inquiries */}
        <div className="glass-panel p-5 rounded-2xl border border-madar-cardBorder relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">إجمالي الرسائل والطلبات</span>
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-200">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{stats.totalMessages}</div>
          <div className="text-[11px] text-slate-400 mt-2">كافة الطلبات المسجلة بالنظام</div>
        </div>

        {/* New / Unread */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-300">طلبات جديدة غير مقروءة</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-400">{stats.newMessages}</div>
          <div className="text-[11px] text-amber-300/80 mt-2">تتطلب التواصل الفوري مع العميل</div>
        </div>

        {/* In Progress */}
        <div className="glass-panel p-5 rounded-2xl border border-blue-500/30 bg-blue-500/5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-blue-300">قيد المتابعة والتجهيز</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-blue-400">{stats.inProgressMessages}</div>
          <div className="text-[11px] text-blue-300/80 mt-2">جاري التنسيق وعرض الأسعار</div>
        </div>

        {/* Completed */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-300">تم الرد وإتمام النقل</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400">{stats.completedMessages}</div>
          <div className="text-[11px] text-emerald-300/80 mt-2">طلبات معالجة بنجاح</div>
        </div>

      </div>

      {/* Recent Messages Section */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Inbox className="w-5 h-5 text-madar-gold" />
              <span>أحدث طلبات النقل الواردة</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">آخر رسائل واستفسارات استلمها الموقع</p>
          </div>

          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-madar-gold hover:underline"
          >
            <span>عرض وإدارة جميع الرسائل</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Table / List View */}
        {recentMessages.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            لا توجد أي رسائل واردة حتى الآن.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="text-xs text-slate-400 uppercase bg-madar-navy/60 border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">اسم العميل</th>
                  <th className="py-3 px-4">رقم الهاتف</th>
                  <th className="py-3 px-4">نوع الخدمة</th>
                  <th className="py-3 px-4">ملخص الرسالة</th>
                  <th className="py-3 px-4">الحالة</th>
                  <th className="py-3 px-4">تاريخ الإرسال</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentMessages.slice(0, 5).map((msg) => (
                  <tr key={msg.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                      {msg.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap dir-ltr text-right">
                      {msg.phone}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-300 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg bg-madar-dark border border-white/10">
                        {msg.serviceType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 max-w-xs truncate">
                      {msg.message}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(msg.status)}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString("ar-EG", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Settings Overview */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-madar-gold" />
              <span>معلومات التواصل الحالية للموقع</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">البيانات المعروضة حالياً لزوار الموقع</p>
          </div>

          <Link
            href="/admin/settings"
            className="text-xs sm:text-sm font-bold text-madar-gold hover:underline"
          >
            تعديل البيانات
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-madar-navy/60 border border-white/5">
            <span className="text-xs text-slate-400 block mb-1">رقم واتساب الفعال</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">
              {settings.whatsapp_display}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-madar-navy/60 border border-white/5">
            <span className="text-xs text-slate-400 block mb-1">البريد الرسمي</span>
            <span className="text-sm font-bold text-slate-200">
              {settings.company_email}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-madar-navy/60 border border-white/5">
            <span className="text-xs text-slate-400 block mb-1">ساعات العمل</span>
            <span className="text-xs font-bold text-slate-200 truncate block">
              {settings.working_hours}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
