import Link from "next/link";

const categories = [
  { title: "زمین", type: "land", icon: "🏞️" },
  { title: "خانه", type: "house", icon: "🏡" },
  { title: "ویلا", type: "villa", icon: "🌿" },
  { title: "مغازه", type: "shop", icon: "🏪" },
];

export function PropertyCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#1B5E3C]">دسته‌بندی‌ها</p>
          <h2 className="mt-2 text-3xl font-black text-[#1F2933]">انتخاب ملک بر اساس نیاز شما</h2>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.type}
            href={`/properties?type=${category.type}`}
            className="group rounded-[1.75rem] border border-[#E6E0D2] bg-white p-6 shadow-[0_10px_25px_rgba(31,41,51,0.04)] transition duration-200 hover:-translate-y-1 hover:border-[#B9D7C6] hover:shadow-[0_18px_32px_rgba(27,94,60,0.08)]"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF5F1] text-3xl">
              {category.icon}
            </div>
            <h3 className="mt-5 text-xl font-bold text-[#1F2933]">{category.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#4B5563]">
              بهترین گزینه‌ها برای {category.title.toLowerCase()}‌های مدرن و مناسب.
            </p>
            <span className="mt-4 inline-flex text-sm font-semibold text-[#1B5E3C]">
              مشاهده آگهی‌ها
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
