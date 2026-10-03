import { Property } from "@/lib/property-data";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 }).format(value);

export function PropertyDetails({ property }: { property: Property }) {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-[#E6E0D2] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,51,0.04)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="rounded-full bg-[#EEF5F1] px-3 py-1 text-xs font-semibold text-[#1B5E3C]">
              {property.propertyType}
            </span>
            <h1 className="mt-4 text-3xl font-black text-[#1F2933]">{property.title}</h1>
          </div>
          <div className="rounded-2xl bg-[#F8F3E0] px-4 py-3 text-left">
            <p className="text-xs text-[#6B7280]">قیمت</p>
            <p className="mt-1 text-2xl font-black text-[#C9A227]">{formatPrice(property.price)} تومان</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-[#F7F7F4] p-4">
            <p className="text-xs text-[#6B7280]">استان</p>
            <p className="mt-2 text-lg font-bold text-[#1F2933]">{property.province}</p>
          </div>
          <div className="rounded-2xl bg-[#F7F7F4] p-4">
            <p className="text-xs text-[#6B7280]">شهر</p>
            <p className="mt-2 text-lg font-bold text-[#1F2933]">{property.city}</p>
          </div>
          <div className="rounded-2xl bg-[#F7F7F4] p-4">
            <p className="text-xs text-[#6B7280]">متراژ</p>
            <p className="mt-2 text-lg font-bold text-[#1F2933]">{property.area} متر</p>
          </div>
          <div className="rounded-2xl bg-[#F7F7F4] p-4">
            <p className="text-xs text-[#6B7280]">تاریخ ثبت</p>
            <p className="mt-2 text-lg font-bold text-[#1F2933]">{property.createdAt}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#E6E0D2] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,51,0.04)]">
        <h2 className="text-2xl font-black text-[#1F2933]">توضیحات</h2>
        <p className="mt-4 text-base leading-8 text-[#4B5563]">{property.description}</p>
      </div>

      <div className="rounded-[2rem] border border-[#E6E0D2] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,51,0.04)]">
        <h2 className="text-2xl font-black text-[#1F2933]">امکانات</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {property.features.map((feature) => (
            <span key={feature} className="rounded-full bg-[#EEF5F1] px-3 py-2 text-xs font-semibold text-[#1B5E3C]">
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#E6E0D2] bg-white p-6 shadow-[0_10px_30px_rgba(31,41,51,0.04)]">
        <h2 className="text-2xl font-black text-[#1F2933]">اطلاعات تماس</h2>
        <div className="mt-5 space-y-3 text-[#4B5563]">
          <p>آدرس: {property.address}</p>
          <p>تلفن: {property.phone}</p>
        </div>
        <a
          href={`tel:${property.phone}`}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#C9A227] px-6 py-3 text-sm font-bold text-[#1F2933] transition hover:bg-[#d7b141]"
        >
          تماس با پشتیبانی
        </a>
      </div>
    </div>
  );
}
