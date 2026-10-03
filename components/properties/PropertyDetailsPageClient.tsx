"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Property } from "@/lib/property-data";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertyDetails } from "@/components/properties/PropertyDetails";

export function PropertyDetailsPageClient({ propertyId }: { propertyId: number }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await fetch(`/api/properties/${propertyId}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message ?? "در دریافت اطلاعات ملک مشکلی پیش آمده است.");
        }

        setProperty(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "در دریافت اطلاعات ملک مشکلی پیش آمده است.");
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [propertyId]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-[420px] rounded-[2rem] bg-[#E9E5DD]" />
          <div className="h-28 rounded-[2rem] bg-[#E9E5DD]" />
          <div className="h-48 rounded-[2rem] bg-[#E9E5DD]" />
        </div>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#E6E0D2] bg-white p-10 text-center shadow-sm">
          <p className="text-2xl font-black text-[#1F2933]">{error || "آگهی مورد نظر پیدا نشد."}</p>
          <Link href="/properties" className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1B5E3C] px-5 py-3 text-sm font-bold text-white">
            بازگشت به آگهی‌ها
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <PropertyGallery images={property.images} title={property.title} />
        <PropertyDetails property={property} />
      </div>
    </main>
  );
}
