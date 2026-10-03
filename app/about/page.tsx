"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AboutContent } from "@/lib/site-content";

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    fetch("/api/site-content/about")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message);
        setContent(result.data);
      })
      .catch((error: unknown) => console.error("Failed to load about page content:", error));
  }, []);

  if (!content) {
    return <main className="mx-auto max-w-7xl px-4 py-12 text-center text-sm text-[#6B7280] sm:px-6 lg:px-8">در حال دریافت محتوا…</main>;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-[0_12px_32px_rgba(31,41,51,0.04)]">
        <p className="text-sm font-semibold text-[#1B5E3C]">درباره ما</p>
        <h1 className="mt-3 text-4xl font-black text-[#1F2933]">{content.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#4B5563]">{content.intro}</p>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-[#E6E0D2] bg-white p-8">
          <h2 className="text-2xl font-black text-[#1F2933]">{content.activityTitle}</h2>
          <p className="mt-4 text-base leading-8 text-[#4B5563]">{content.activityDescription}</p>
        </div>

        <div className="rounded-[2rem] border border-[#E6E0D2] bg-[#F3F0EA] p-8">
          <h2 className="text-2xl font-black text-[#1F2933]">{content.servicesTitle}</h2>
          <ul className="mt-4 space-y-3 text-base leading-8 text-[#4B5563]">
            {content.services.map((service) => (
              <li key={service} className="flex items-start gap-3">
                <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-[#C9A227]" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-[#E6E0D2] bg-white p-8">
          <h2 className="text-2xl font-black text-[#1F2933]">{content.advantagesTitle}</h2>
          <ul className="mt-4 space-y-3 text-base leading-8 text-[#4B5563]">
            {content.advantages.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-[#1B5E3C]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] bg-[#1B5E3C] p-8 text-white">
          <h2 className="text-2xl font-black">{content.processTitle}</h2>
          <ol className="mt-5 space-y-4 text-base leading-8 text-white/90">
            {content.processSteps.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}
          </ol>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#C9A227] px-6 py-3 text-sm font-bold text-[#1F2933]"
          >
            تماس با ما
          </Link>
        </div>
      </section>
    </main>
  );
}
