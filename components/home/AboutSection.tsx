import Link from "next/link";

export function AboutSection() {
  return (
    <section className="bg-[#F3F0EA]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div className="rounded-[2rem] border border-[#E6E0D2] bg-white p-6 shadow-[0_16px_40px_rgba(31,41,51,0.04)]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#EEF5F1] p-5">
              <p className="text-3xl font-black text-[#1B5E3C]">12+</p>
              <p className="mt-2 text-sm text-[#4B5563]">سال تجربه در بازار املاک</p>
            </div>
            <div className="rounded-2xl bg-[#F8F3E0] p-5">
              <p className="text-3xl font-black text-[#C9A227]">2500+</p>
              <p className="mt-2 text-sm text-[#4B5563]">معاملات موفق</p>
            </div>
            <div className="rounded-2xl bg-[#EEF5F1] p-5">
              <p className="text-3xl font-black text-[#1B5E3C]">98%</p>
              <p className="mt-2 text-sm text-[#4B5563]">رضایت مشتریان</p>
            </div>
            <div className="rounded-2xl bg-[#F8F3E0] p-5">
              <p className="text-3xl font-black text-[#C9A227]">24/7</p>
              <p className="mt-2 text-sm text-[#4B5563]">پشتیبانی</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#1B5E3C]">درباره ما</p>
          <h2 className="mt-3 text-3xl font-black text-[#1F2933]">مجموعه‌ای برای پیدا کردن بهترین گزینه‌های ملکی</h2>
          <p className="mt-5 text-base leading-8 text-[#4B5563]">
            ما با تجربه‌ای طولانی در بازار املاک، به شما کمک می‌کنیم تا بهترین زمین، ویلا، خانه و مغازه را بر اساس موقعیت، بودجه و نیاز خود پیدا کنید. تمرکز ما بر اعتماد، شفافیت و همکاری حرفه‌ای با مشتریان است.
          </p>
          <p className="mt-4 text-base leading-8 text-[#4B5563]">
            تیم ما در هر مرحله، از جستجوی آگهی تا مشاوره نهایی، همراه شماست تا تجربه‌ای سریع، مطمئن و رضایت‌بخش داشته باشید.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1B5E3C] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#173e2d]"
          >
            درباره ما
          </Link>
        </div>
      </div>
    </section>
  );
}
