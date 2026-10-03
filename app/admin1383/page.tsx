"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import type { Property } from "@/lib/property-data";

export default function AdminPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch("/api/properties");
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message ?? "دریافت اطلاعات آگهی‌ها ناموفق بود.");
        }

        setProperties(result.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "دریافت اطلاعات آگهی‌ها ناموفق بود.");
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  const featuredCount = properties.filter((property) => property.featured).length;
  const provinceCount = new Set(properties.map((property) => property.province)).size;
  const formatNumber = (value: number) => new Intl.NumberFormat("fa-IR").format(value);

  async function removeProperty(id: number) {
    if (!window.confirm("این آگهی حذف شود؟")) return;
    try {
      const response = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      setProperties((current) => current.filter((property) => property.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "حذف آگهی ناموفق بود.");
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 border-b border-[#E6E0D2] pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#1B5E3C]">مدیریت سامانه</p>
          <h1 className="mt-2 text-3xl font-black text-[#1F2933]">پنل مدیریت</h1>
          <p className="mt-2 text-sm text-[#6B7280]">نمای کلی آگهی‌ها و وضعیت سایت</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin1383/properties/new"
            className="inline-flex items-center justify-center rounded-xl bg-[#C9A227] px-4 py-3 text-sm font-bold text-[#1F2933] transition hover:bg-[#d7b141]"
          >
            افزودن آگهی
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center justify-center rounded-xl border border-[#D9D7CE] bg-white px-4 py-3 text-sm font-bold text-[#1F2933] transition hover:border-[#1B5E3C]"
          >
            مشاهده آگهی‌ها
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-[#1B5E3C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#143f2d]"
          >
            صفحه اصلی سایت
          </Link>
        </div>
      </div>

      <AdminNavigation />

      <section aria-label="خلاصه آگهی‌ها" className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-2xl border border-[#E6E0D2] bg-white p-5">
          <p className="text-sm font-medium text-[#6B7280]">کل آگهی‌ها</p>
          <p className="mt-3 text-3xl font-black text-[#1F2933]">
            {loading ? "…" : formatNumber(properties.length)}
          </p>
        </article>
        <article className="rounded-2xl border border-[#E6E0D2] bg-white p-5">
          <p className="text-sm font-medium text-[#6B7280]">آگهی‌های ویژه</p>
          <p className="mt-3 text-3xl font-black text-[#1B5E3C]">
            {loading ? "…" : formatNumber(featuredCount)}
          </p>
        </article>
        <article className="rounded-2xl border border-[#E6E0D2] bg-white p-5">
          <p className="text-sm font-medium text-[#6B7280]">استان‌های دارای آگهی</p>
          <p className="mt-3 text-3xl font-black text-[#C9A227]">
            {loading ? "…" : formatNumber(provinceCount)}
          </p>
        </article>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#E6E0D2] bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-[#E6E0D2] px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-[#1F2933]">آگهی‌های ثبت‌شده</h2>
            <p className="mt-1 text-sm text-[#6B7280]">اطلاعات دریافت‌شده از فهرست آگهی‌های سایت</p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-[#1B5E3C]">
            {loading ? "…" : `${formatNumber(properties.length)} مورد`}
          </span>
        </div>

        {error ? (
          <p role="alert" className="p-6 text-sm font-medium text-red-700">{error}</p>
        ) : loading ? (
          <p className="p-6 text-sm text-[#6B7280]">در حال دریافت آگهی‌ها…</p>
        ) : properties.length === 0 ? (
          <p className="p-6 text-sm text-[#6B7280]">هنوز آگهی‌ای ثبت نشده است.</p>
        ) : (
          <ul className="divide-y divide-[#E6E0D2]">
            {properties.map((property) => (
              <li key={property.id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <Link href={`/properties/${property.id}`} className="min-w-0 flex-1">
                  <p className="truncate font-bold text-[#1F2933]">{property.title}</p>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    {property.province}، {property.city} · {property.propertyType}
                  </p>
                </Link>
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <p className="shrink-0 text-sm font-black text-[#1B5E3C]">
                    {formatNumber(property.price)} تومان
                  </p>
                  <Link href={`/admin1383/properties/${property.id}`} className="text-sm font-semibold text-[#1B5E3C]">ویرایش</Link>
                  <button type="button" onClick={() => void removeProperty(property.id)} className="text-sm font-semibold text-red-700">حذف</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}