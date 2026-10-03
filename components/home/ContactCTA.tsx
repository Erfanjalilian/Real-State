import Link from "next/link";

export function ContactCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-[#1B5E3C] px-6 py-10 text-white sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#E9D998]">پشتیبانی حرفه‌ای</p>
            <h2 className="mt-2 text-3xl font-black">ملک مورد نظر خود را پیدا نکردید؟</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#C9A227] px-6 py-3 text-sm font-bold text-[#1F2933] transition hover:bg-[#d7b141]"
          >
            تماس با پشتیبانی
          </Link>
        </div>
      </div>
    </section>
  );
}
