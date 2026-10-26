"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  Truck, 
  LayoutDashboard, 
  Inbox, 
  Settings, 
  LogOut, 
  Globe, 
  Menu, 
  X,
  User,
  ShieldCheck,
  KeyRound
} from "lucide-react";
import { AdminUserSession } from "@/lib/types";

export default function AdminSidebar({ session }: { session: AdminUserSession }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // If on login page, don't show sidebar
  if (pathname === "/admin/login") {
    return null;
  }

  const navItems = [
    {
      name: "لوحة التحكم",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      name: "الرسائل والطلبات",
      href: "/admin/messages",
      icon: Inbox,
      active: pathname.startsWith("/admin/messages"),
    },
    {
      name: "الإعدادات العامة",
      href: "/admin/settings",
      icon: Settings,
      active: pathname.startsWith("/admin/settings"),
    },
    {
      name: "أمان الحساب وكلمة المرور",
      href: "/admin/settings?tab=security",
      icon: KeyRound,
      active: false,
    },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-madar-navy border-b border-madar-cardBorder">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-white.png"
            alt="مدار للنقل البري"
            width={120}
            height={45}
            className="h-8 w-auto object-contain"
          />
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-madar-card text-white"
          aria-label="القائمة"
        >
          {mobileOpen ? <X className="w-5 h-5 text-madar-gold" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Desktop / Mobile */}
      <aside
        className={`${
          mobileOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-madar-navy/95 border-l border-madar-cardBorder flex flex-col justify-between p-5 shrink-0 z-30`}
      >
        <div>
          {/* Logo */}
          <div className="hidden lg:flex items-center justify-center pb-6 mb-6 border-b border-white/10">
            <Link href="/" className="inline-block py-1">
              <Image
                src="/logo-white.png"
                alt="شعار مدار للنقل البري"
                width={160}
                height={65}
                className="h-10 w-auto object-contain hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* User Badge & Quick Password Change link */}
          <Link
            href="/admin/settings?tab=security"
            onClick={() => setMobileOpen(false)}
            className="p-3.5 rounded-2xl bg-madar-dark/80 hover:bg-madar-dark border border-white/5 hover:border-madar-gold/30 mb-6 flex items-center justify-between group transition-all"
            title="إدارة الحساب وتغيير كلمة المرور"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-madar-gold/15 text-madar-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <User className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">{session.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{session.email}</div>
              </div>
            </div>
            <KeyRound className="w-4 h-4 text-slate-500 group-hover:text-madar-gold transition-colors shrink-0" />
          </Link>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    item.active
                      ? "bg-gradient-to-r from-madar-gold to-madar-goldHover text-madar-dark font-black shadow-md shadow-amber-500/20"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Globe className="w-4 h-4 text-slate-400" />
            <span>معاينة الموقع الرئيسي</span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-500/30 transition-all text-right"
          >
            <LogOut className="w-4 h-4" />
            <span>{loggingOut ? "جاري الخروج..." : "تسجيل الخروج"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
