import Link from "next/link";

const adminLinks = [
  { href: "/admin1383", label: "پیشخوان" },
  { href: "/admin1383/about", label: "درباره ما" },
  { href: "/admin1383/contact", label: "تماس با ما" },
  { href: "/admin1383/banner", label: "بنر صفحه اصلی" },
  { href: "/admin1383/properties/new", label: "افزودن آگهی" },
];

export function AdminNavigation() {
  return (
    <nav aria-label="بخش‌های پنل مدیریت" className="mb-8 flex gap-2 overflow-x-auto border-b border-[#E6E0D2] pb-3">
      {adminLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="shrink-0 rounded-xl border border-[#E6E0D2] bg-white px-4 py-2.5 text-sm font-semibold text-[#1F2933] transition hover:border-[#1B5E3C] hover:text-[#1B5E3C]"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}