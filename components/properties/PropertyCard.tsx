import Image from "next/image";
import Link from "next/link";
import { Property } from "@/lib/property-data";

const formatPrice = (value: number) => 
  new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 }).format(value);

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-[#E6E0D2] bg-white shadow-[0_10px_25px_rgba(31,41,51,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(27,94,60,0.08)]">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
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
          <span>{property.features[0] ?? "ویژگی ممتاز"}</span>
        </div>

        <div className="mt-6">
          <div>
            <p className="text-[11px] text-[#6B7280]">قیمت</p>
            <p className="text-xl font-black text-[#C9A227]">{formatPrice(property.price)} تومان</p>
          </div>
          <Link
            href={`/properties/${property.id}`}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#1B5E3C] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#173e2d]"
          >
            مشاهده جزئیات
          </Link>
        </div>
      </div>
    </article>
  );
}
