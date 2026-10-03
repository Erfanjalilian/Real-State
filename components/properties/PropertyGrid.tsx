import { Property } from "@/lib/property-data";
import { PropertyCard } from "@/components/properties/PropertyCard";

export function PropertyGrid({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-[#D9D7CE] bg-[#F9F8F5] px-6 py-14 text-center">
        <p className="text-2xl font-black text-[#1F2933]">آگهی‌ای مطابق با فیلترهای انتخاب‌شده پیدا نشد.</p>
        <p className="mt-3 text-sm text-[#4B5563]">لطفاً فیلترها را تغییر دهید یا همه آگهی‌ها را مجدداً بررسی کنید.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
