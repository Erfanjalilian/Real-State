"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Property } from "@/lib/property-data";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyGrid } from "@/components/properties/PropertyGrid";

export function PropertiesPageClient() {
  const params = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const query = useMemo(() => {
    const urlParams = new URLSearchParams(params.toString());
    return urlParams.toString();
  }, [params]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const response = await fetch(`/api/properties${query ? `?${query}` : ""}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message ?? "در دریافت آگهی‌ها مشکلی پیش آمده است.");
        }

        setProperties(result.data ?? []);
        setError("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "در دریافت آگهی‌ها مشکلی پیش آمده است.");
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [query]);

  const province = params.get("province") ?? "";
  const city = params.get("city") ?? "";
  const type = params.get("type") ?? "all";
  const minPrice = params.get("minPrice") ?? "";
  const maxPrice = params.get("maxPrice") ?? "";

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#1B5E3C]">آگهی‌ها</p>
        <h1 className="mt-2 text-3xl font-black text-[#1F2933]">جستجوی ملک مناسب</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <PropertyFilters
          initialProvince={province}
          initialCity={city}
          initialType={type}
          initialMinPrice={minPrice}
          initialMaxPrice={maxPrice}
        />

        <div>
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse overflow-hidden rounded-[1.75rem] border border-[#E6E0D2] bg-white">
                  <div className="h-60 bg-[#E9E5DD]" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-24 rounded-full bg-[#E9E5DD]" />
                    <div className="h-7 w-full rounded bg-[#E9E5DD]" />
                    <div className="h-7 w-2/3 rounded bg-[#E9E5DD]" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-[2rem] border border-[#E6E0D2] bg-white p-8 text-center shadow-sm">
              <p className="text-lg font-bold text-[#1F2933]">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1B5E3C] px-5 py-3 text-sm font-bold text-white"
              >
                تلاش مجدد
              </button>
            </div>
          ) : (
            <PropertyGrid properties={properties} />
          )}
        </div>
      </div>
    </main>
  );
}
