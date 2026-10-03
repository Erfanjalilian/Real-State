"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/home/Hero";
import { SearchBox } from "@/components/home/SearchBox";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { PropertyCategories } from "@/components/home/PropertyCategories";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Property } from "@/lib/property-data";

export function HomePageClient() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch("/api/properties");
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message ?? "در دریافت آگهی‌ها مشکلی پیش آمده است.");
        }

        setProperties(result.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "در دریافت اطلاعات مشکلی پیش آمده است.");
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  const featuredVilla =
    properties.find((property) => property.type === "villa" && property.featured) ??
    properties.find((property) => property.type === "villa") ??
    null;

  return (
    <main className="bg-[#F7F7F4] text-[#1F2933]">
      <Hero featuredVilla={featuredVilla} />
      <SearchBox />
      {loading ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse overflow-hidden rounded-[1.75rem] border border-[#E6E0D2] bg-white">
                <div className="h-60 bg-[#E9E5DD]" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-20 rounded-full bg-[#E9E5DD]" />
                  <div className="h-6 w-full rounded bg-[#E9E5DD]" />
                  <div className="h-6 w-2/3 rounded bg-[#E9E5DD]" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : error ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
        </section>
      ) : (
        <FeaturedProperties properties={properties.filter((property) => property.featured)} />
      )}
      <PropertyCategories />
      <AboutSection />
      <ContactCTA />
    </main>
  );
}
