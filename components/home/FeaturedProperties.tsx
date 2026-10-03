import Link from "next/link";
import Image from "next/image";
import { Property } from "@/lib/property-data";

interface FeaturedPropertiesProps {
  properties: Property[];
}

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 0,
  }).format(value);
};

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#1B5E3C]">آگهی‌های منتخب</p>
          <h2 className="mt-2 text-3xl font-black text-[#1F2933]">پیشنهادهای ویژه امروز</h2>
        </div>
        <Link href="/properties" className="hidden text-sm font-semibold text-[#1B5E3C] md:inline-flex">
          مشاهده همه آگهی‌ها
        </Link>
      </div>

      <div className="-mx-1 overflow-x-auto pb-2 md:mx-0 md:overflow-visible">
        <div className="flex gap-4 md:grid md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {properties.slice(0, 6).map((property) => (
            <article
              key={property.id}
              className="group min-w-[86%] overflow-hidden rounded-[1.75rem] border border-[#E6E0D2] bg-white shadow-[0_10px_25px_rgba(31,41,51,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(27,94,60,0.08)] md:min-w-0"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  unoptimized
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 86vw, 33vw"
                />
                <span className="absolute right-4 top-4 rounded-full bg-[#1B5E3C] px-3 py-1 text-xs font-bold text-white">
                  {property.propertyType}
                </span>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#EEF5F1] px-2.5 py-1 text-[11px] font-semibold text-[#1B5E3C]">
                    {property.city}
                  </span>
                  <span className="text-xs text-[#6B7280]">{property.province}</span>
                </div>

                <h3 className="min-h-[52px] text-lg font-bold leading-7 text-[#1F2933]">{property.title}</h3>

                <div className="mt-4 flex items-center justify-between text-sm text-[#4B5563]">
                  <span>متراژ: {property.area} متر</span>
                  <span>{property.features[0] ?? "امکانات کامل"}</span>
                </div>

                <div className="mt-6 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] text-[#6B7280]">قیمت</p>
                    <p className="text-xl font-black text-[#C9A227]">{formatPrice(property.price)} تومان</p>
                  </div>
                  <Link
                    href={`/properties/${property.id}`}
                    className="inline-flex items-center justify-center rounded-full bg-[#1B5E3C] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#173e2d]"
                  >
                    مشاهده جزئیات
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
