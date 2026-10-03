"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const propertyTypes = [
  { value: "all", label: "همه" },
  { value: "land", label: "زمین" },
  { value: "house", label: "خانه" },
  { value: "villa", label: "ویلا" },
  { value: "shop", label: "مغازه" },
];

export function SearchBox() {
  const router = useRouter();
  const [provinces, setProvinces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await fetch("/api/provinces");
        const result = await response.json();

        if (result.success) {
          setProvinces(result.data);
        }
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
        setCity("");
        return;
      }

      try {
        const response = await fetch(`/api/cities?province=${encodeURIComponent(province)}`);
        const result = await response.json();

        if (result.success) {
          setCities(result.data);
          setCity("");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCities();
  }, [province]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (province) params.set("province", province);
    if (city) params.set("city", city);
    if (type !== "all") params.set("type", type);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#E6E0D2] bg-white p-4 shadow-[0_15px_45px_rgba(31,41,51,0.05)] sm:p-6">
        <button
          type="button"
          onClick={() => setMobileOpen((current) => !current)}
          className="mt-6 mb-4 flex w-full items-center justify-between rounded-xl bg-[#1B5E3C] px-4 py-3 text-right text-sm font-bold text-white lg:hidden"
        >
          <span>فیلتر آگهی‌ها</span>
          <span aria-hidden="true">{mobileOpen ? "−" : "+"}</span>
        </button>

        <form onSubmit={handleSubmit} className={`${mobileOpen ? "grid" : "hidden"} gap-4 lg:grid lg:grid-cols-5`}>
          <label className="flex flex-col gap-2 text-sm font-medium text-[#1F2933]">
            <span>استان</span>
            <select
              value={province}
              onChange={(event) => setProvince(event.target.value)}
              className="rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 text-sm text-[#1F2933] outline-none ring-0 transition focus:border-[#1B5E3C]"
            >
              <option value="">همه استان‌ها</option>
              {provinces.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-[#1F2933]">
            <span>شهر</span>
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 text-sm text-[#1F2933] outline-none transition focus:border-[#1B5E3C]"
              disabled={!province}
            >
              <option value="">همه شهرها</option>
              {cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-[#1F2933]">
            <span>نوع ملک</span>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 text-sm text-[#1F2933] outline-none transition focus:border-[#1B5E3C]"
            >
              {propertyTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-[#1F2933]">
            <span>حداقل قیمت</span>
            <input
              type="number"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder="مثلاً 1000000000"
              className="rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 text-sm text-[#1F2933] outline-none transition placeholder:text-[#6B7280] focus:border-[#1B5E3C]"
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-[#1F2933]">حداکثر قیمت</span>
            <div className="flex gap-2">
              <input
                type="number"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="مثلاً 5000000000"
                className="w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 text-sm text-[#1F2933] outline-none transition placeholder:text-[#6B7280] focus:border-[#1B5E3C]"
              />
              <button
                type="submit"
                className="inline-flex min-w-[120px] items-center justify-center rounded-xl bg-[#1B5E3C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#143f2d]"
              >
                جستجو
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
