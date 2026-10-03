import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F7F4] px-6 py-20 text-[#1F2933]">
      <div className="max-w-md rounded-3xl border border-[#D9D7CE] bg-white p-10 text-center shadow-[0_12px_30px_rgba(27,94,60,0.08)]">
        <p className="text-sm font-semibold text-[#1B5E3C]">404</p>
        <h1 className="mt-4 text-3xl font-bold">صفحه مورد نظر یافت نشد</h1>
        <p className="mt-3 text-sm leading-7 text-[#4B5563]">
          آدرس وارد شده اشتباه است یا صفحه حذف شده است.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1B5E3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163f2a]"
        >
          بازگشت به خانه
        </Link>
      </div>
    </main>
  );
}
