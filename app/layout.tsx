import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "رهن و فروش | خرید، فروش و معرفی ملک",
  description: "وب‌سایت حرفه‌ای برای جستجوی و معرفی زمین، خانه، ویلا و مغازه با فیلترهای پیشرفته و تجربه کاربری مدرن.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#F7F7F4] text-[#1F2933]">
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
