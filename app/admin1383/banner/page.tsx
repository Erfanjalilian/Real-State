"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import type { BannerContent } from "@/lib/site-content";

export default function AdminBannerPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/site-content/banner")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message);
        setImageUrl((result.data as BannerContent).imageUrl);
      })
      .catch((error: unknown) => setMessage(error instanceof Error ? error.message : "دریافت بنر ناموفق بود."));
  }, []);

  const uploadBanner = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.set("file", file);
      const uploadResponse = await fetch("/api/admin/uploads", { method: "POST", body: formData });
      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok || !uploadResult.success) throw new Error(uploadResult.message);
      const nextImageUrl = uploadResult.data.url as string;

      setSaving(true);
      const saveResponse = await fetch("/api/site-content/banner", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: nextImageUrl }),
      });
      const saveResult = await saveResponse.json();
      if (!saveResponse.ok || !saveResult.success) throw new Error(saveResult.message);
      setImageUrl(nextImageUrl);
      setMessage("تصویر بنر ذخیره شد و در صفحه اصلی نمایش داده می‌شود.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "ذخیره تصویر بنر ناموفق بود.");
    } finally {
      setUploading(false);
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminNavigation />
      <h1 className="mb-6 text-3xl font-black text-[#1F2933]">تصویر بنر صفحه اصلی</h1>
      <section className="rounded-2xl border border-[#E6E0D2] bg-white p-5 sm:p-8">
        <p className="text-sm leading-7 text-[#6B7280]">هر فایلی را می‌توانید انتخاب کنید؛ فایل بدون تبدیل یا فشرده‌سازی ذخیره می‌شود. نمایش تصویر به پشتیبانی مرورگر از قالب فایل بستگی دارد.</p>
        <label className="mt-5 block text-sm font-semibold text-[#1F2933]">
          انتخاب تصویر یا فایل بنر
          <input
            type="file"
            onChange={(event) => {
              void uploadBanner(event.currentTarget.files?.[0]);
              event.currentTarget.value = "";
            }}
            className="mt-2 block w-full text-sm text-[#4B5563] file:ml-4 file:rounded-lg file:border-0 file:bg-[#EEF5F1] file:px-4 file:py-2.5 file:font-semibold file:text-[#1B5E3C]"
          />
        </label>
        {(uploading || saving) && <p role="status" className="mt-4 text-sm text-[#1B5E3C]">{uploading ? "در حال بارگذاری…" : "در حال ذخیره…"}</p>}
        {imageUrl && (
          <div className="mt-6">
            <h2 className="mb-3 font-bold text-[#1F2933]">پیش‌نمایش</h2>
            <div className="relative aspect-[16/7] overflow-hidden rounded-xl border border-[#E6E0D2] bg-[#F8F7F4]">
              <Image src={imageUrl} alt="پیش‌نمایش بنر صفحه اصلی" fill unoptimized className="object-cover" />
            </div>
          </div>
        )}
        {message && <p role="status" className="mt-4 text-sm text-[#1B5E3C]">{message}</p>}
      </section>
    </main>
  );
}