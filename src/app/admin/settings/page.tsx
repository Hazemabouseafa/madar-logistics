"use client";

import { useState, useEffect } from "react";
import { 
  Settings, 
  Save, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  ExternalLink,
  Share2,
  FileText,
  Layout,
  Globe,
  Sparkles,
  ShieldCheck,
  Send,
  Boxes,
  Building2,
  Plus,
  Trash2,
  Anchor,
  KeyRound,
  Eye,
  EyeOff,
  Lock,
  ShieldAlert
} from "lucide-react";
import { SiteSettings } from "@/lib/types";
import { DEFAULT_SETTINGS } from "@/lib/default-settings";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState<"content" | "social" | "emails" | "location" | "security">("content");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  // Password change states
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordToast, setPasswordToast] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleAddPort = () => {
    const currentList = settings.ports_list || [];
    setSettings({
      ...settings,
      ports_list: [...currentList, { name: "", role: "" }],
    });
  };

  const handleRemovePort = (index: number) => {
    const currentList = [...(settings.ports_list || [])];
    currentList.splice(index, 1);
    setSettings({
      ...settings,
      ports_list: currentList,
    });
  };

  const handlePortChange = (index: number, field: "name" | "role", value: string) => {
    const currentList = [...(settings.ports_list || [])];
    if (currentList[index]) {
      currentList[index] = { ...currentList[index], [field]: value };
      setSettings({
        ...settings,
        ports_list: currentList,
      });
    }
  };

  useEffect(() => {
    // Check if URL query specified a tab, e.g. /admin/settings?tab=security
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get("tab");
      if (tab === "security" || tab === "content" || tab === "social" || tab === "emails" || tab === "location") {
        setActiveTab(tab as any);
      }
    }

    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings({
            ...DEFAULT_SETTINGS,
            ...data.settings,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordToast({ type: null, message: "" });

    if (!passwordForm.currentPassword) {
      setPasswordToast({ type: "error", message: "يرجى إدخال كلمة المرور الحالية" });
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordToast({ type: "error", message: "يجب ألا تقل كلمة المرور الجديدة عن 8 أحرف" });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordToast({ type: "error", message: "كلمة المرور الجديدة وتأكيدها غير متطابقين" });
      return;
    }

    if (passwordForm.newPassword === passwordForm.currentPassword) {
      setPasswordToast({ type: "error", message: "كلمة المرور الجديدة يجب أن تكون مختلفة عن كلمة المرور الحالية" });
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordForm),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "فشل تغيير كلمة المرور");
      }

      setPasswordToast({
        type: "success",
        message: data.message || "تم تغيير كلمة المرور بنجاح! يمكنك استخدامها لتسجيل الدخول القادم.",
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setPasswordToast({
        type: "error",
        message: err.message || "حدث خطأ أثناء محاولة تغيير كلمة المرور",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToast({ type: null, message: "" });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "فشل حفظ الإعدادات");
      }

      setToast({
        type: "success",
        message: "تم حفظ الإعدادات وتحديث محتوى الموقع فورياً بنجاح!",
      });
    } catch (err: any) {
      setToast({
        type: "error",
        message: err.message || "حدث خطأ أثناء حفظ الإعدادات",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-madar-gold" />
        <span>جاري تحميل الإعدادات العامة ومحتوى الواجهة...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <Settings className="w-7 h-7 text-madar-gold" />
            <span>لوحة التحكم في محتوى وإعدادات المنصة</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            إدارة نصوص الواجهة الرئيسية، روابط السوشيال ميديا، الإيميلات الرسمية، وأرقام التواصل المباشرة
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-madar-navy hover:bg-white/10 text-white border border-madar-cardBorder text-xs sm:text-sm font-semibold transition-all"
        >
          <Globe className="w-4 h-4 text-madar-gold" />
          <span>معاينة الموقع مباشرة</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-madar-navy border border-madar-cardBorder overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "content"
              ? "bg-madar-gold text-madar-dark shadow-md"
              : "text-slate-300 hover:text-white hover:bg-white/5"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>تعديل نصوص الواجهة (CMS)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "social"
              ? "bg-madar-gold text-madar-dark shadow-md"
              : "text-slate-300 hover:text-white hover:bg-white/5"
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>السوشيال ميديا</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("emails")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "emails"
              ? "bg-madar-gold text-madar-dark shadow-md"
              : "text-slate-300 hover:text-white hover:bg-white/5"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>الإيميلات الرسمية والاتصال</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("location")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "location"
              ? "bg-madar-gold text-madar-dark shadow-md"
              : "text-slate-300 hover:text-white hover:bg-white/5"
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>الموقع وساعات العمل</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === "security"
              ? "bg-madar-gold text-madar-dark shadow-md"
              : "text-slate-300 hover:text-white hover:bg-white/5"
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>أمان الحساب وكلمة المرور</span>
        </button>
      </div>

      {/* Toast Notification (CMS Settings) */}
      {activeTab !== "security" && toast.type && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 border ${
            toast.type === "success"
              ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-200"
              : "bg-rose-950/60 border-rose-500/50 text-rose-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      {/* CMS Form (Tabs 1-4) */}
      {activeTab !== "security" && (
        <form onSubmit={handleSave} className="space-y-8">

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: LANDING PAGE CMS CONTENT */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "content" && (
          <div className="space-y-6">
            
            {/* Section 1: Hero Section */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-madar-gold/15 text-madar-gold flex items-center justify-center">
                  <Layout className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">القسم الرئيسي (Hero Section)</h2>
                  <p className="text-xs text-slate-400">العنوان الكبير والرسالة التسويقية الأولى للزائر</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  شارة الإعلان العلوية (Top Badge)
                </label>
                <input
                  type="text"
                  value={settings.hero_badge || ""}
                  onChange={(e) => setSettings({ ...settings, hero_badge: e.target.value })}
                  placeholder="النقل البري التخصصي من وإلى كافة الموانئ البحرية..."
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  العنوان الرئيسي (Hero Headline)
                </label>
                <input
                  type="text"
                  value={settings.hero_title || ""}
                  onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                  placeholder="شريانك اللوجستي الموثوق لنقل الحاويات من وإلى الموانئ"
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  النص التعريفي الفرعي (Subtitle)
                </label>
                <textarea
                  rows={3}
                  value={settings.hero_subtitle || ""}
                  onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    نص زر الحجز الرئيسي (CTA 1)
                  </label>
                  <input
                    type="text"
                    value={settings.hero_cta_primary || ""}
                    onChange={(e) => setSettings({ ...settings, hero_cta_primary: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    نص زر واتساب (CTA 2)
                  </label>
                  <input
                    type="text"
                    value={settings.hero_cta_whatsapp || ""}
                    onChange={(e) => setSettings({ ...settings, hero_cta_whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Commitments */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">قسم الالتزامات الثلاثة (Commitments)</h2>
                  <p className="text-xs text-slate-400">تعديل نصوص الركائز الأساسية للشركة</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">عنوان قسم الالتزامات</label>
                  <input
                    type="text"
                    value={settings.commitments_title || ""}
                    onChange={(e) => setSettings({ ...settings, commitments_title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">الشارة العلوية للالتزامات</label>
                  <input
                    type="text"
                    value={settings.commitments_badge || ""}
                    onChange={(e) => setSettings({ ...settings, commitments_badge: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">مقدمة الالتزامات</label>
                <textarea
                  rows={2}
                  value={settings.commitments_subtitle || ""}
                  onChange={(e) => setSettings({ ...settings, commitments_subtitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm resize-none"
                />
              </div>

              {/* Commitment 1 */}
              <div className="p-4 rounded-2xl bg-madar-dark/60 border border-white/5 space-y-3">
                <span className="text-xs font-bold text-amber-400">الالتزام الأول (المواعيد)</span>
                <input
                  type="text"
                  value={settings.commitment_1_title || ""}
                  onChange={(e) => setSettings({ ...settings, commitment_1_title: e.target.value })}
                  placeholder="عنوان الالتزام الأول"
                  className="w-full px-4 py-2.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={settings.commitment_1_desc || ""}
                  onChange={(e) => setSettings({ ...settings, commitment_1_desc: e.target.value })}
                  placeholder="تفاصيل الالتزام الأول"
                  className="w-full px-4 py-2.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-xs resize-none"
                />
              </div>

              {/* Commitment 2 */}
              <div className="p-4 rounded-2xl bg-madar-dark/60 border border-white/5 space-y-3">
                <span className="text-xs font-bold text-blue-400">الالتزام الثاني (سلامة الشحنات)</span>
                <input
                  type="text"
                  value={settings.commitment_2_title || ""}
                  onChange={(e) => setSettings({ ...settings, commitment_2_title: e.target.value })}
                  placeholder="عنوان الالتزام الثاني"
                  className="w-full px-4 py-2.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={settings.commitment_2_desc || ""}
                  onChange={(e) => setSettings({ ...settings, commitment_2_desc: e.target.value })}
                  placeholder="تفاصيل الالتزام الثاني"
                  className="w-full px-4 py-2.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-xs resize-none"
                />
              </div>

              {/* Commitment 3 */}
              <div className="p-4 rounded-2xl bg-madar-dark/60 border border-white/5 space-y-3">
                <span className="text-xs font-bold text-emerald-400">الالتزام الثالث (المستندات)</span>
                <input
                  type="text"
                  value={settings.commitment_3_title || ""}
                  onChange={(e) => setSettings({ ...settings, commitment_3_title: e.target.value })}
                  placeholder="عنوان الالتزام الثالث"
                  className="w-full px-4 py-2.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={settings.commitment_3_desc || ""}
                  onChange={(e) => setSettings({ ...settings, commitment_3_desc: e.target.value })}
                  placeholder="تفاصيل الالتزام الثالث"
                  className="w-full px-4 py-2.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-xs resize-none"
                />
              </div>
            </div>

            {/* Section 3: About Us */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">قسم نبذة عن الشركة (About Us)</h2>
                  <p className="text-xs text-slate-400">القصة المؤسسية وتغطية الموانئ البحرية</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">عنوان قسم من نحن</label>
                  <input
                    type="text"
                    value={settings.about_title || ""}
                    onChange={(e) => setSettings({ ...settings, about_title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">الشارة العلوية</label>
                  <input
                    type="text"
                    value={settings.about_badge || ""}
                    onChange={(e) => setSettings({ ...settings, about_badge: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">الفقرة التعريفية الأولى</label>
                <textarea
                  rows={3}
                  value={settings.about_desc_1 || ""}
                  onChange={(e) => setSettings({ ...settings, about_desc_1: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">الفقرة التعريفية الثانية</label>
                <textarea
                  rows={3}
                  value={settings.about_desc_2 || ""}
                  onChange={(e) => setSettings({ ...settings, about_desc_2: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm resize-none"
                />
              </div>
            </div>

            {/* Section 4: Ports Card CMS (بطاقة الموانئ التي نخدمها بانتظام) */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-madar-gold/15 text-madar-gold flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">بطاقة الموانئ التي نخدمها بانتظام</h2>
                    <p className="text-xs text-slate-400">تعديل نصوص البطاقة، شارة التغطية، شريط الحجز، وقائمة الموانئ البحرية</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddPort}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-madar-gold text-madar-dark text-xs font-bold hover:brightness-110 transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة ميناء جديد</span>
                </button>
              </div>

              {/* Card Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">عنوان البطاقة الرئيسي</label>
                  <input
                    type="text"
                    value={settings.ports_card_title || ""}
                    onChange={(e) => setSettings({ ...settings, ports_card_title: e.target.value })}
                    placeholder="الموانئ التي نخدمها بانتظام"
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">الوصف الفرعي للبطاقة</label>
                  <input
                    type="text"
                    value={settings.ports_card_subtitle || ""}
                    onChange={(e) => setSettings({ ...settings, ports_card_subtitle: e.target.value })}
                    placeholder="تغطية تشغيلية يومية"
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">شارة نسبة التغطية</label>
                  <input
                    type="text"
                    value={settings.ports_card_badge || ""}
                    onChange={(e) => setSettings({ ...settings, ports_card_badge: e.target.value })}
                    placeholder="تغطية 100%"
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-emerald-400 text-sm font-bold"
                  />
                </div>
              </div>

              {/* Callout bar settings */}
              <div className="p-4 rounded-2xl bg-madar-dark/60 border border-white/5 space-y-4">
                <span className="text-xs font-bold text-madar-gold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>شريط الحجز السريع أسفل بطاقة الموانئ</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">عنوان الحجز</label>
                    <input
                      type="text"
                      value={settings.ports_card_callout_title || ""}
                      onChange={(e) => setSettings({ ...settings, ports_card_callout_title: e.target.value })}
                      placeholder="تواصل لتحديد ميعاد الشحن"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">نص الجاهزية</label>
                    <input
                      type="text"
                      value={settings.ports_card_callout_subtitle || ""}
                      onChange={(e) => setSettings({ ...settings, ports_card_callout_subtitle: e.target.value })}
                      placeholder="جاهزية فورية للنقل والمناولة"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">نص زر الإجراء (CTA)</label>
                    <input
                      type="text"
                      value={settings.ports_card_cta || ""}
                      onChange={(e) => setSettings({ ...settings, ports_card_cta: e.target.value })}
                      placeholder="احجز الآن"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Interactive Ports List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300">
                    قائمة الموانئ المشمولة بالخدمة ({(settings.ports_list || []).length} موانئ)
                  </label>
                  <span className="text-[11px] text-slate-400">يمكنك تعديل أسماء الموانئ، إضافة ميناء جديد، أو حذف أي ميناء</span>
                </div>

                <div className="space-y-3">
                  {(settings.ports_list || []).map((port, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-madar-navy/60 border border-white/5 hover:border-madar-gold/30 transition-all flex flex-col sm:flex-row items-center gap-3"
                    >
                      <div className="w-7 h-7 rounded-lg bg-madar-gold/15 text-madar-gold text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>

                      <div className="flex-1 w-full sm:w-auto">
                        <input
                          type="text"
                          value={port.name}
                          onChange={(e) => handlePortChange(idx, "name", e.target.value)}
                          placeholder="اسم الميناء (مثال: ميناء الإسكندرية البحري)"
                          className="w-full px-3.5 py-2 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-xs font-bold"
                        />
                      </div>

                      <div className="flex-[1.5] w-full sm:w-auto">
                        <input
                          type="text"
                          value={port.role}
                          onChange={(e) => handlePortChange(idx, "role", e.target.value)}
                          placeholder="الوصف / الدور اللوجستي (مثال: البوابة الرئيسية للتجارة المتوسطية)"
                          className="w-full px-3.5 py-2 rounded-xl bg-madar-dark border border-madar-cardBorder text-slate-300 text-xs"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemovePort(idx)}
                        title="حذف هذا الميناء"
                        className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20 flex items-center justify-center shrink-0 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {(!settings.ports_list || settings.ports_list.length === 0) && (
                    <div className="p-6 text-center rounded-2xl bg-madar-dark/40 border border-dashed border-white/10 text-xs text-slate-400">
                      لا يوجد أي موانئ مسجلة حالياً. اضغط على زر &quot;إضافة ميناء جديد&quot; بالأعلى لإضافة ميناء.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 5: Services */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">قسم الخدمات المتخصصة (Services)</h2>
                  <p className="text-xs text-slate-400">تعديل نصوص الحاويات المبردة والجافة</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">عنوان قسم الخدمات</label>
                  <input
                    type="text"
                    value={settings.services_title || ""}
                    onChange={(e) => setSettings({ ...settings, services_title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">الشارة العلوية للخدمات</label>
                  <input
                    type="text"
                    value={settings.services_badge || ""}
                    onChange={(e) => setSettings({ ...settings, services_badge: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-madar-dark/60 border border-white/5 space-y-3">
                <span className="text-xs font-bold text-cyan-400">الحاويات المبردة (Reefer Containers)</span>
                <input
                  type="text"
                  value={settings.reefer_title || ""}
                  onChange={(e) => setSettings({ ...settings, reefer_title: e.target.value })}
                  placeholder="عنوان خدمة الحاويات المبردة"
                  className="w-full px-4 py-2.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-xs font-bold"
                />
                <textarea
                  rows={3}
                  value={settings.reefer_desc || ""}
                  onChange={(e) => setSettings({ ...settings, reefer_desc: e.target.value })}
                  placeholder="وصف خدمة الحاويات المبردة"
                  className="w-full px-4 py-2.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-xs resize-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-madar-dark/60 border border-white/5 space-y-3">
                <span className="text-xs font-bold text-amber-400">الحاويات الجافة (Dry Containers)</span>
                <input
                  type="text"
                  value={settings.dry_title || ""}
                  onChange={(e) => setSettings({ ...settings, dry_title: e.target.value })}
                  placeholder="عنوان خدمة الحاويات الجافة"
                  className="w-full px-4 py-2.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-xs font-bold"
                />
                <textarea
                  rows={3}
                  value={settings.dry_desc || ""}
                  onChange={(e) => setSettings({ ...settings, dry_desc: e.target.value })}
                  placeholder="وصف خدمة الحاويات الجافة"
                  className="w-full px-4 py-2.5 rounded-xl bg-madar-navy border border-madar-cardBorder text-white text-xs resize-none"
                />
              </div>
            </div>

            {/* Section 5: Contact Section Copy */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-madar-gold/15 text-madar-gold flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">قسم التواصل والحجز (Contact Copy)</h2>
                  <p className="text-xs text-slate-400">عناوين نموذج الحجز والاستفسارات</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">عنوان قسم التواصل</label>
                  <input
                    type="text"
                    value={settings.contact_title || ""}
                    onChange={(e) => setSettings({ ...settings, contact_title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">الشارة العلوية</label>
                  <input
                    type="text"
                    value={settings.contact_badge || ""}
                    onChange={(e) => setSettings({ ...settings, contact_badge: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">الرسالة التوضيحية لنموذج الحجز</label>
                <textarea
                  rows={2}
                  value={settings.contact_subtitle || ""}
                  onChange={(e) => setSettings({ ...settings, contact_subtitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm resize-none"
                />
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: SOCIAL MEDIA LINKS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "social" && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">روابط صفحات التواصل الاجتماعي</h2>
                <p className="text-xs text-slate-400">تظهر هذه الروابط كأيقونات تفاعلية في فوتر الموقع ويسهل وصول العملاء إليها</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
                  <span>صفحة فيسبوك (Facebook URL)</span>
                  {settings.facebook_url && (
                    <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1 font-normal">
                      <span>فتح الرابط</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </label>
                <input
                  type="url"
                  value={settings.facebook_url || ""}
                  onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                  placeholder="https://facebook.com/madartrans"
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm font-mono dir-ltr text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
                  <span>صفحة لينكد إن (LinkedIn URL)</span>
                  {settings.linkedin_url && (
                    <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline flex items-center gap-1 font-normal">
                      <span>فتح الرابط</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </label>
                <input
                  type="url"
                  value={settings.linkedin_url || ""}
                  onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/company/madartrans"
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm font-mono dir-ltr text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
                  <span>حساب إنستغرام (Instagram URL)</span>
                  {settings.instagram_url && (
                    <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline flex items-center gap-1 font-normal">
                      <span>فتح الرابط</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </label>
                <input
                  type="url"
                  value={settings.instagram_url || ""}
                  onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                  placeholder="https://instagram.com/madartrans"
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm font-mono dir-ltr text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
                  <span>حساب منصة إكس / تويتر (X / Twitter URL)</span>
                  {settings.twitter_url && (
                    <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:underline flex items-center gap-1 font-normal">
                      <span>فتح الرابط</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </label>
                <input
                  type="url"
                  value={settings.twitter_url || ""}
                  onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                  placeholder="https://x.com/madartrans"
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm font-mono dir-ltr text-right"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: OFFICIAL EMAILS & CONTACT */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "emails" && (
          <div className="space-y-6">
            
            {/* Official Emails Group */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">الإيميلات الرسمية للشركة (Official Inboxes)</h2>
                  <p className="text-xs text-slate-400">إضافة وتخصيص إيميلات الإدارة، المبيعات، والعمليات للموقع</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    البريد الرئيسي العام (General / Info) <span className="text-madar-gold">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={settings.company_email}
                    onChange={(e) => setSettings({ ...settings, company_email: e.target.value })}
                    placeholder="info@madartrans.com"
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm font-mono dir-ltr text-right"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">يظهر كبريد رسمي رئيسي للإدارة العامة</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    بريد المبيعات والعمليات (Sales & Operations)
                  </label>
                  <input
                    type="email"
                    value={settings.sales_email || ""}
                    onChange={(e) => setSettings({ ...settings, sales_email: e.target.value })}
                    placeholder="sales@madartrans.com"
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm font-mono dir-ltr text-right"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">لطلب عروض الأسعار والتنسيق التشغيلي وحركة الموانئ</span>
                </div>
              </div>
            </div>

            {/* Direct Phone Calling (فون وليس واتساب) */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-300 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">رقم الهاتف للتواصل المباشر (فون وليس واتساب)</h2>
                  <p className="text-xs text-slate-400">الرقم المخصص للمكالمات الصوتية المباشرة وغرفة العمليات (رابط tel:)</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  رقم الهاتف المباشر (Direct Phone Call) <span className="text-madar-gold">*</span>
                </label>
                <input
                  type="text"
                  required
                  dir="ltr"
                  value={settings.phone_number}
                  onChange={(e) => setSettings({ ...settings, phone_number: e.target.value })}
                  placeholder="+20 10 50028330"
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-amber-300 text-sm font-mono font-bold text-left"
                />
                <span className="text-[11px] text-slate-400 mt-2 block">
                  رابط الاتصال الهاتفي الصوتي: <span dir="ltr" className="text-amber-300 font-mono">tel:{settings.phone_number ? settings.phone_number.replace(/\s+/g, "") : ""}</span>
                </span>
              </div>
            </div>

            {/* WhatsApp Chat Settings */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">إعدادات محادثات واتساب (WhatsApp Chat)</h2>
                  <p className="text-xs text-slate-400">الرقم المربوط بأزرار المحادثة الفورية والويدجت العائم المباشر</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    رقم واتساب للتوجيه (صيغة دولية بدون + وبدون مسافات)
                  </label>
                  <input
                    type="text"
                    required
                    dir="ltr"
                    value={settings.whatsapp_number}
                    onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                    placeholder="201050028330"
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-emerald-400 text-sm font-mono text-left"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    الرابط المباشر: <span dir="ltr" className="text-emerald-400 font-mono">https://wa.me/{settings.whatsapp_number}</span>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    نص عرض رقم واتساب للزوار
                  </label>
                  <input
                    type="text"
                    required
                    dir="ltr"
                    value={settings.whatsapp_display}
                    onChange={(e) => setSettings({ ...settings, whatsapp_display: e.target.value })}
                    placeholder="+20 10 50028330"
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm font-mono text-left"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: LOCATION & WORKING HOURS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "location" && (
          <div className="space-y-6">
            
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">إعدادات الموقع الجغرافي وخرائط جوجل</h2>
                  <p className="text-xs text-slate-400">رابط الاتجاهات التفاعلي المعروض في الموقع والفوتر</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  رابط موقع الشركة على خرائط جوجل (Google Maps URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={settings.google_maps_url}
                    onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                    placeholder="https://maps.app.goo.gl/WtFERuC1uf81Yzns8?g_st=iw"
                    className="flex-1 px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm font-mono dir-ltr text-right"
                  />
                  <a
                    href={settings.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-madar-gold border border-white/10 flex items-center justify-center"
                    title="تجربة فتح الرابط"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    العنوان بالتفصيل (باللغة العربية)
                  </label>
                  <textarea
                    rows={2}
                    value={settings.address_ar}
                    onChange={(e) => setSettings({ ...settings, address_ar: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    العنوان (باللغة الإنجليزية)
                  </label>
                  <textarea
                    rows={2}
                    value={settings.address_en}
                    onChange={(e) => setSettings({ ...settings, address_en: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm resize-none dir-ltr"
                  />
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">ساعات العمل والنبذة العامة</h2>
                  <p className="text-xs text-slate-400">مواعيد الدوام وملاحظات خدمة الطوارئ 24/7</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  ساعات العمل الرسمية
                </label>
                <input
                  type="text"
                  required
                  value={settings.working_hours}
                  onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  النبذة المختصرة للشركة (تظهر في الفوتر ونبذة من نحن)
                </label>
                <textarea
                  rows={3}
                  value={settings.about_summary}
                  onChange={(e) => setSettings({ ...settings, about_summary: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-madar-dark border border-madar-cardBorder text-white text-sm resize-none"
                />
              </div>
            </div>

          </div>
        )}

        {/* Global Submit Floating Bar */}
        <div className="sticky bottom-6 z-20 glass-panel p-4 rounded-2xl border border-madar-gold/30 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-madar-gold" />
            <span>يتم تطبيق كافة التعديلات فور الحفظ ومباشرة في الموقع العام</span>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-madar-gold via-amber-400 to-madar-goldHover text-madar-dark font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري الحفظ والتطبيق...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>حفظ التعديلات فورياً</span>
              </>
            )}
          </button>
        </div>

      </form>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: SECURITY & CHANGE ADMIN PASSWORD */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "security" && (
        <div className="space-y-6 max-w-3xl">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-madar-cardBorder shadow-xl space-y-6">
            <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-madar-gold border border-amber-500/30 flex items-center justify-center shrink-0">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">تغيير كلمة المرور وأمان حساب الإدارة</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  قم بتعيين كلمة مرور جديدة قوية لحماية لوحة التحكم ومنع الوصول غير المصرح به
                </p>
              </div>
            </div>

            {/* Informational Callout */}
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white block mb-1">إرشادات حماية الحساب:</strong>
                يجب ألا تقل كلمة المرور عن 8 أحرف، ويفضل أن تشتمل على حروف وأرقام ورموز. يتم تشفير كلمة المرور فوراً بأقوى خوارزميات التشفير (Bcrypt) وحفظها في قاعدة البيانات المحلية.
              </div>
            </div>

            {/* Security Toast Notification */}
            {passwordToast.type && (
              <div
                className={`p-4 rounded-2xl flex items-center gap-3 border ${
                  passwordToast.type === "success"
                    ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-200"
                    : "bg-rose-950/60 border-rose-500/50 text-rose-200"
                }`}
              >
                {passwordToast.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <span className="text-sm font-semibold">{passwordToast.message}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">
                  كلمة المرور الحالية <span className="text-madar-gold">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    placeholder="أدخل كلمة المرور الحالية المسجل بها دخولك..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-madar-dark border border-madar-cardBorder text-white placeholder-slate-500 text-sm focus:border-madar-gold transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    title={showCurrentPass ? "إخفاء" : "إظهار"}
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">
                  كلمة المرور الجديدة <span className="text-madar-gold">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    required
                    minLength={8}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="8 أحرف أو أكثر..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-madar-dark border border-madar-cardBorder text-white placeholder-slate-500 text-sm focus:border-madar-gold transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    title={showNewPass ? "إخفاء" : "إظهار"}
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 mt-1.5 block">
                  يجب أن تتكون من 8 أحرف على الأقل
                </span>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-2">
                  تأكيد كلمة المرور الجديدة <span className="text-madar-gold">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    required
                    minLength={8}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="أعد إدخال كلمة المرور الجديدة..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-madar-dark border border-madar-cardBorder text-white placeholder-slate-500 text-sm focus:border-madar-gold transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    title={showConfirmPass ? "إخفاء" : "إظهار"}
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={changingPassword}
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-madar-gold via-amber-400 to-madar-goldHover text-madar-dark font-black text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  {changingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري حفظ وتشفير كلمة المرور...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>تحديث كلمة المرور الآن</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
