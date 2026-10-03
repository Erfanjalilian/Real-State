"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Property } from "@/lib/property-data";

const defaultBanner = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80";

export function Hero({ featuredVilla }: { featuredVilla: Property | null }) {
  const [bannerImage, setBannerImage] = useState(defaultBanner);

  useEffect(() => {
    fetch("/api/site-content/banner")
      .then(async (response) => {
        const result = await response.json();
        if (response.ok && result.success && typeof result.data.imageUrl === "string") {
          setBannerImage(result.data.imageUrl);
        }
      })
      .catch((error: unknown) => console.error("Failed to load homepage banner:", error));
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#F7F7F4] pb-6 pt-4">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative w-full min-w-0 overflow-hidden rounded-[2rem] border border-[#E7E2D7] bg-white shadow-[0_24px_60px_rgba(27,94,60,0.12)]">
          <div className="absolute inset-0">
            <Image
              src={bannerImage}
              alt="بنر صفحه اصلی ملکی"
              fill
              priority
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f2d1f]/80 via-[#1B5E3C]/75 to-[#1B5E3C]/30" />
          </div>

          <div className="relative grid w-full min-w-0 min-h-[520px] items-center px-5 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-14">
            <div className="w-full min-w-0 max-w-xl text-white">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-[#F7E8A9] backdrop-blur-sm">
                بهترین انتخاب برای سرمایه‌گذاری
              </span>

              <h1 className="mt-6 text-3xl font-black leading-[1.2] sm:text-4xl lg:text-5xl">
                ملک مناسب خود را پیدا کنید
              </h1>

              <p className="mt-5 max-w-lg text-base leading-8 text-white/85 sm:text-lg">
                از زمین‌های ارزشمند تا ویلاهای لوکس، با مشاوره حرفه‌ای و اطلاعات دقیق، بهترین گزینه‌ها را برای خرید و سرمایه‌گذاری انتخاب کنید.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center rounded-full bg-[#C9A227] px-6 py-3.5 text-sm font-bold text-[#1F2933] transition hover:bg-[#d7b141]"
                >
                  مشاهده آگهی‌ها
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  تماس با پشتیبانی
                </Link>
              </div>

              <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-black text-[#F7E8A9]">250+</p>
                  <p className="mt-1 text-[11px] text-white/80">آگهی فعال</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-black text-[#F7E8A9]">12+</p>
                  <p className="mt-1 text-[11px] text-white/80">سال تجربه</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-black text-[#F7E8A9]">98%</p>
                  <p className="mt-1 text-[11px] text-white/80">رضایت مشتری</p>
                </div>
              </div>
            </div>

            {featuredVilla?.images[0] && (
              <div className="mt-8 flex w-full min-w-0 justify-center lg:mt-0 lg:justify-end">
                <div className="w-full min-w-0 max-w-md rounded-[1.75rem] border border-white/20 bg-white/10 p-4 shadow-[0_18px_36px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                  <Link href={`/properties/${featuredVilla.id}`} className="block overflow-hidden rounded-[1.2rem] border border-white/20">
                    <Image
                      src={featuredVilla.images[0]}
                      alt={featuredVilla.title}
                      width={700}
                      height={520}
                      unoptimized
                      className="h-[260px] w-full object-cover sm:h-[300px]"
                    />
                  </Link>
                  <Link href={`/properties/${featuredVilla.id}`} className="mt-4 block rounded-2xl bg-white/95 p-4 text-[#1F2933] shadow-sm">
                    <p className="text-xs font-medium text-[#6B7280]">ویلا ویژه</p>
                    <p className="mt-1 text-lg font-extrabold text-[#1F2933]">{featuredVilla.title}</p>
                    <p className="mt-1 text-xl font-black text-[#C9A227]">
                      {new Intl.NumberFormat("fa-IR").format(featuredVilla.price)} تومان
                    </p>
                    <p className="mt-1 text-xs text-[#4B5563]">{featuredVilla.city}، {featuredVilla.province}</p>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
