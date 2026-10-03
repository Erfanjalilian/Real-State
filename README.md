This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## مدیریت محتوا

پنل مدیریت در مسیر `/admin1383` قرار دارد و امکان افزودن، ویرایش و حذف آگهی‌ها، ویرایش صفحه‌های درباره ما و تماس با ما، و تغییر تصویر بنر صفحه اصلی را فراهم می‌کند. پنل و APIهای نوشتن بدون ورود یا احراز هویت هستند؛ هر کسی که به سایت دسترسی داشته باشد می‌تواند محتوا را تغییر دهد.

اطلاعات در فایل‌های JSON داخل `data/` و فایل‌های آپلودشده در `data/uploads/` ذخیره می‌شوند. این روش برای اجرای محلی با دیسک قابل نوشتن مناسب است؛ روی میزبان‌های serverless یا دیسک‌های موقت، تغییرات ممکن است پایدار نمانند. محدودیت اندازه درخواست توسط Next.js یا میزبان نیز ممکن است اعمال شود.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
