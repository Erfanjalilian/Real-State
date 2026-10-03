import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertiesPageClient } from "@/components/properties/PropertiesPageClient";

export const metadata: Metadata = {
  title: "آگهی‌های ملکی | رهن و فروش",
  description: "فیلتر و جستجوی آگهی‌های زمین، خانه، ویلا و مغازه با قیمت و موقعیت دلخواه.",
};

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12 text-center">در حال بارگذاری فیلترها...</div>}>
      <PropertiesPageClient />
    </Suspense>
  );
}
