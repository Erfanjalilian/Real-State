"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface PropertyFiltersProps {
  initialProvince?: string;
  initialCity?: string;
  initialType?: string;
  initialMinPrice?: string;
  initialMaxPrice?: string;
}

const propertyTypes = [
  { value: "all", label: "همه" },
  { value: "land", label: "زمین" },
  { value: "house", label: "خانه" },
  { value: "villa", label: "ویلا" },
  { value: "shop", label: "مغازه" },
];

export function PropertyFilters({
  initialProvince = "",
  initialCity = "",
  initialType = "all",
  initialMinPrice = "",
  initialMaxPrice = "",
}: PropertyFiltersProps) {
  const router = useRouter();
  const [provinces, setProvinces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [province, setProvince] = useState(initialProvince);
  const [city, setCity] = useState(initialCity);
  const [type, setType] = useState(initialType);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await fetch("/api/provinces");
        const result = await response.json();
        if (result.success) setProvinces(result.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProvinces();
  }, []);

  useEffect(() => {
    async function fetchCities() {
      if (!province) {
        setCities([]);
        if (city) {
          setCity("");
        }
        return;
      }

      try {
        const response = await fetch(`/api/cities?province=${encodeURIComponent(province)}`);
        const result = await response.json();
        if (result.success) {
          setCities(result.data);
          if (!result.data.includes(city) && city) {
            setCity("");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCities();
  }, [province, city]);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (province) params.set("province", province);
    if (city) params.set("city", city);
    if (type && type !== "all") params.set("type", type);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    return params.toString();
  }, [province, city, type, minPrice, maxPrice]);

  const applyFilters = () => {
    const url = query ? `?${query}` : "";
    router.push(`/properties${url}`);
  };

  const clearFilters = () => {
    setProvince("");
    setCity("");
    setType("all");
    setMinPrice("");
    setMaxPrice("");
    router.push("/properties");
  };

  return (
    <div className="rounded-[2rem] border border-[#E6E0D2] bg-white p-5 shadow-[0_10px_24px_rgba(31,41,51,0.03)]">
      <button
        type="button"
        onClick={() => setMobileOpen((current) => !current)}
        aria-expanded={mobileOpen}
        aria-controls="property-filter-panel"
        className="mb-4 flex w-full items-center justify-between rounded-xl bg-[#1B5E3C] px-4 py-3 text-right text-sm font-bold text-white lg:hidden"
      >
        <span>{mobileOpen ? "بستن فیلترها" : "نمایش فیلترها"}</span>
        <span aria-hidden="true">{mobileOpen ? "−" : "+"}</span>
      </button>

      <div id="property-filter-panel" className={`${mobileOpen ? "block" : "hidden"} lg:block`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#1F2933]">فیلترها</h3>
          <button type="button" onClick={clearFilters} className="text-sm font-semibold text-[#1B5E3C]">
            حذف فیلترها
          </button>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-[#1F2933]">
            <span className="mb-2 block">استان</span>
            <select
              value={province}
              onChange={(event) => setProvince(event.target.value)}
              className="w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 text-sm text-[#1F2933] outline-none transition focus:border-[#1B5E3C]"
            >
              <option value="">همه استان‌ها</option>
              {provinces.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-[#1F2933]">
            <span className="mb-2 block">شهر</span>
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 text-sm text-[#1F2933] outline-none transition focus:border-[#1B5E3C]"
              disabled={!province}
            >
              <option value="">همه شهرها</option>
              {cities.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-[#1F2933]">
            <span className="mb-2 block">نوع ملک</span>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 text-sm text-[#1F2933] outline-none transition focus:border-[#1B5E3C]"
            >
              {propertyTypes.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </label>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <label className="block text-sm font-medium text-[#1F2933]">
              <span className="mb-2 block">حداقل قیمت</span>
              <input
                type="number"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                className="w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 text-sm text-[#1F2933] outline-none transition focus:border-[#1B5E3C]"
                placeholder="۰"
              />
            </label>

            <label className="block text-sm font-medium text-[#1F2933]">
              <span className="mb-2 block">حداکثر قیمت</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                className="w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 text-sm text-[#1F2933] outline-none transition focus:border-[#1B5E3C]"
                placeholder="۰"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={applyFilters}
            className="inline-flex w-full items-center justify-center rounded-xl bg-[#1B5E3C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#143f2d]"
          >
            اعمال فیلترها
          </button>
        </div>
      </div>
    </div>
  );
}
