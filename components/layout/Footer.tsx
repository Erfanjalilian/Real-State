import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[#E4E1D6] bg-[#F3F0EA]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1B5E3C] text-lg font-black text-white">
              ر
            </div>
            <div>
              <p className="text-lg font-extrabold text-[#1F2933]">رهن و فروش</p>
              <p className="text-[10px] font-medium text-[#4B5563]">برند املاک و زمین</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[#4B5563]">
            پلتفرمی حرفه‌ای برای معرفی و جستجوی بهترین آگهی‌های ملکی، با تمرکز بر اعتماد، شفافیت و تجربه کاربری راحت.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#1F2933]">صفحات</h3>
          <ul className="mt-5 space-y-3 text-sm text-[#4B5563]">
            <li><Link href="/">خانه</Link></li>
            <li><Link href="/properties">آگهی‌ها</Link></li>
            <li><Link href="/about">درباره ما</Link></li>
            <li><Link href="/contact">تماس با ما</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#1F2933]">تماس</h3>
          <ul className="mt-5 space-y-3 text-sm text-[#4B5563]">
            <li>۰۲۱-۱۲۳۴۵۶۷</li>
            <li>info@rahnfirosh.com</li>
            <li>تهران، خیابان ولیعصر، پلاک ۱۲</li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#1F2933]">شبکه‌های اجتماعی</h3>
          <div className="mt-5 flex gap-3 text-sm text-[#4B5563]">
            <a href="#" className="rounded-full border border-[#D9D7CE] px-3 py-1.5">اینستاگرام</a>
            <a href="#" className="rounded-full border border-[#D9D7CE] px-3 py-1.5">تلگرام</a>
            <a href="#" className="rounded-full border border-[#D9D7CE] px-3 py-1.5">لینکدین</a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E4E1D6] bg-[#EFEAE2]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-[#4B5563] sm:px-6 lg:px-8">
          <p>© 2026 رهن و فروش. تمامی حقوق محفوظ است.</p>
          <p>طراحی و توسعه: تیم دیجیتال برند</p>
        </div>
      </div>
    </footer>
  );
}
