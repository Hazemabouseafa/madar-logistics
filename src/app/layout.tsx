import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مدار للنقل البري | نقل الحاويات المبردة والجافة من وإلى الموانئ",
  description:
    "شركة مدار للنقل البري والخدمات اللوجستية المتخصصة في نقل الحاويات المبردة والجافة من وإلى الموانئ البحرية. التزام تام بالمواعيد، حماية قصوى للشحنات، ودقة متناهية بالمستندات.",
  keywords: [
    "مدار للنقل البري",
    "نقل حاويات",
    "حاويات مبردة",
    "حاويات جافة",
    "نقل موانئ",
    "ميناء دمياط",
    "ميناء بورسعيد",
    "ميناء الإسكندرية",
    "ميناء الدخيلة",
    "ميناء السخنة",
    "لوجستيات مصر",
    "شحن وتفريغ",
    "Madar Logistics",
  ],
  authors: [{ name: "Madar Logistics and Transportation" }],
  openGraph: {
    title: "مدار للنقل البري | خدمات النقل السريع للحاويات والموانئ",
    description: "أسطول حديث ومجهز لنقل الحاويات المبردة والجافة بأعلى كفاءة وسرعة.",
    type: "website",
    locale: "ar_EG",
  },
  icons: {
    icon: "/logo-mark.png",
    shortcut: "/logo-mark.png",
    apple: "/logo-mark.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#070F1E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`scroll-smooth ${cairo.variable}`}>
      <body className="font-cairo bg-madar-dark text-slate-100 antialiased min-h-screen selection:bg-madar-gold selection:text-madar-dark">
        {children}
      </body>
    </html>
  );
}
