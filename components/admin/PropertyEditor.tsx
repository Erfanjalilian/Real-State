"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import type { PropertyInput, PropertyType } from "@/lib/property-data";

const blankProperty: PropertyInput = {
  title: "",
  type: "land",
  propertyType: "زمین",
  province: "",
  city: "",
  price: 0,
  area: 0,
  description: "",
  images: [],
  address: "",
  phone: "",
  features: [],
  featured: false,
};

const inputClass = "mt-2 w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 text-sm outline-none focus:border-[#1B5E3C]";

const typeLabels: Record<PropertyType, string> = {
  land: "زمین",
  house: "خانه",
  villa: "ویلا",
  shop: "مغازه",
};

export function PropertyEditor({ propertyId }: { propertyId: string }) {
  const router = useRouter();
  const isNew = propertyId === "new";
  const [property, setProperty] = useState<PropertyInput>(blankProperty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isNew) return;

    fetch(`/api/properties/${propertyId}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message);
        setProperty(result.data);
      })
      .catch((error: unknown) => setMessage(error instanceof Error ? error.message : "دریافت آگهی ناموفق بود."))
      .finally(() => setLoading(false));
  }, [isNew, propertyId]);

  const setField = <Key extends keyof PropertyInput>(key: Key, value: PropertyInput[Key]) => {
    setProperty((current) => ({ ...current, [key]: value }));
  };

  const uploadFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    setMessage("");
    try {
      const uploaded = await Promise.all(Array.from(files, async (file) => {
        const formData = new FormData();
        formData.set("file", file);
        const response = await fetch("/api/admin/uploads", { method: "POST", body: formData });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message);
        return result.data.url as string;
      }));
      setProperty((current) => ({ ...current, images: [...current.images, ...uploaded] }));
      setMessage(`${uploaded.length} فایل بارگذاری شد.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "بارگذاری فایل ناموفق بود.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(isNew ? "/api/properties" : `/api/properties/${propertyId}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      router.push("/admin1383");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "ذخیره آگهی ناموفق بود.");
    } finally {
      setSaving(false);
    }
  };

  const deleteListing = async () => {
    if (!window.confirm("این آگهی حذف شود؟")) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/properties/${propertyId}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      router.push("/admin1383");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "حذف آگهی ناموفق بود.");
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminNavigation />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#1B5E3C]">مدیریت آگهی‌ها</p>
          <h1 className="mt-2 text-3xl font-black text-[#1F2933]">{isNew ? "افزودن آگهی" : "ویرایش آگهی"}</h1>
        </div>
        <Link href="/admin1383" className="text-sm font-semibold text-[#1B5E3C]">بازگشت به پیشخوان</Link>
      </div>

      {loading ? <p className="text-sm text-[#6B7280]">در حال دریافت آگهی…</p> : (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-[#E6E0D2] bg-white p-5 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold sm:col-span-2">عنوان آگهی<input required value={property.title} onChange={(event) => setField("title", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-semibold">دسته‌بندی<select value={property.type} onChange={(event) => { const type = event.target.value as PropertyType; setProperty((current) => ({ ...current, type, propertyType: typeLabels[type] })); }} className={inputClass}>{Object.entries(typeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label className="block text-sm font-semibold">عنوان نوع ملک<input required value={property.propertyType} onChange={(event) => setField("propertyType", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-semibold">استان<input required value={property.province} onChange={(event) => setField("province", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-semibold">شهر<input required value={property.city} onChange={(event) => setField("city", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-semibold">قیمت به تومان<input required min="0" type="number" value={property.price} onChange={(event) => setField("price", Number(event.target.value))} className={inputClass} /></label>
            <label className="block text-sm font-semibold">متراژ به متر<input required min="0" type="number" value={property.area} onChange={(event) => setField("area", Number(event.target.value))} className={inputClass} /></label>
            <label className="block text-sm font-semibold sm:col-span-2">آدرس<input required value={property.address} onChange={(event) => setField("address", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-semibold">شماره تماس<input required value={property.phone} onChange={(event) => setField("phone", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-semibold">تاریخ ثبت<input type="date" value={property.createdAt ?? ""} onChange={(event) => setField("createdAt", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-semibold sm:col-span-2">توضیحات<textarea required rows={5} value={property.description} onChange={(event) => setField("description", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-semibold sm:col-span-2">ویژگی‌ها، هر مورد در یک خط<textarea rows={4} value={property.features.join("\n")} onChange={(event) => setField("features", event.target.value.split("\n"))} className={inputClass} /></label>
          </div>

          <label className="flex items-center gap-3 text-sm font-semibold">
            <input type="checkbox" checked={Boolean(property.featured)} onChange={(event) => setField("featured", event.target.checked)} className="h-4 w-4 accent-[#1B5E3C]" />
            نمایش در پیشنهادهای ویژه
          </label>

          <section className="border-t border-[#E6E0D2] pt-6">
            <h2 className="font-bold text-[#1F2933]">تصاویر آگهی</h2>
            <p className="mt-1 text-sm text-[#6B7280]">چند فایل را با هم انتخاب کنید؛ فایل‌ها بدون تغییر ذخیره می‌شوند.</p>
            <input type="file" multiple onChange={(event) => { void uploadFiles(event.target.files); event.currentTarget.value = ""; }} className="mt-4 block w-full text-sm text-[#4B5563] file:ml-4 file:rounded-lg file:border-0 file:bg-[#EEF5F1] file:px-4 file:py-2.5 file:font-semibold file:text-[#1B5E3C]" />
            {uploading && <p role="status" className="mt-3 text-sm text-[#1B5E3C]">در حال بارگذاری فایل‌ها…</p>}
            {property.images.length > 0 && (
              <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {property.images.map((image, index) => (
                  <li key={`${image}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#E6E0D2]">
                    <Image src={image} alt={`تصویر ${index + 1} آگهی`} fill unoptimized className="object-cover" />
                    <button type="button" onClick={() => setField("images", property.images.filter((_, imageIndex) => imageIndex !== index))} aria-label={`حذف تصویر ${index + 1}`} className="absolute left-2 top-2 rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-red-700 shadow">حذف</button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className="flex flex-wrap items-center gap-3 border-t border-[#E6E0D2] pt-6">
            <button type="submit" disabled={saving || uploading} className="rounded-xl bg-[#1B5E3C] px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "در حال ذخیره…" : isNew ? "ثبت آگهی" : "ذخیره تغییرات"}</button>
            {!isNew && <button type="button" onClick={() => void deleteListing()} disabled={saving} className="rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-700 disabled:opacity-60">حذف آگهی</button>}
            {message && <p role="status" className="text-sm text-[#1B5E3C]">{message}</p>}
          </div>
        </form>
      )}
    </main>
  );
}