"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MessageSquare, 
  Menu, 
  X, 
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  whatsappNumber?: string;
  whatsappDisplay?: string;
  phoneNumber?: string;
}

export default function Navbar({
  whatsappNumber = "201050028330",
  whatsappDisplay = "+20 10 50028330",
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "#hero" },
    { name: "من نحن", href: "#about" },
    { name: "التزاماتنا", href: "#commitments" },
    { name: "خدماتنا", href: "#services" },
    { name: "لماذا مدار", href: "#why-us" },
    { name: "الموقع الجغرافي", href: "#location" },
    { name: "اتصل بنا", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-madar-dark/95 backdrop-blur-md py-3 shadow-lg border-b border-madar-cardBorder/60"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Official Logo */}
            <Link href="/" className="flex items-center gap-3 group py-1 shrink-0">
              <Image
                src="/logo-white.png"
                alt="شعار مدار للنقل البري - Madar Logistics & Transport"
                width={170}
                height={70}
                priority
                className="h-9 sm:h-11 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-madar-navy/60 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-madar-gold hover:bg-white/5 rounded-full transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action Buttons (Clean & Fast) */}
            <div className="hidden sm:flex items-center gap-3">
              {/* WhatsApp Quick Action */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-400 border border-emerald-500/30 text-xs sm:text-sm font-semibold transition-all hover:scale-105 shadow-sm min-h-[40px]"
                title="تواصل فوري عبر واتساب"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>واتساب</span>
              </a>

              {/* Contact CTA */}
              <a
                href="#contact"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-madar-gold to-madar-goldHover text-madar-dark text-xs sm:text-sm font-bold shadow-md hover:shadow-glow-gold hover:brightness-110 transition-all min-h-[40px]"
              >
                <span>طلب تسعير وشحن</span>
              </a>

              {/* Admin Portal Quick Icon */}
              <Link
                href="/admin"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-madar-gold border border-white/5 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="لوحة الإدارة"
              >
                <Lock className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label="WhatsApp"
                title="محادثة واتساب"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-madar-navy text-slate-200 hover:text-white border border-madar-cardBorder focus:outline-none flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label="القائمة الرئيسية"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-madar-gold" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] sm:top-[72px] z-40 bg-madar-dark/98 backdrop-blur-2xl border-b border-madar-cardBorder px-5 py-5 lg:hidden shadow-2xl max-h-[calc(100dvh-70px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-madar-navy hover:text-madar-gold transition-colors flex items-center justify-between min-h-[48px]"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-slate-500">←</span>
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-slate-800 flex flex-col gap-3">
                {/* WhatsApp Chat Button */}
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md min-h-[48px]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>محادثة واتساب مباشرة:</span>
                  <span dir="ltr" className="inline-block font-sans tabular-nums font-bold">
                    {whatsappDisplay}
                  </span>
                </a>

                {/* Contact CTA */}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-madar-gold to-madar-goldHover text-madar-dark font-bold text-sm min-h-[48px]"
                >
                  <span>طلب تسعير وشحن</span>
                </a>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 text-xs text-slate-400 hover:text-madar-gold transition-colors min-h-[40px]"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>دخول لوحة التحكم</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
