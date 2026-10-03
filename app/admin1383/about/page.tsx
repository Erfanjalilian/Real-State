"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import type { AboutContent } from "@/lib/site-content";

const fieldClass = "mt-2 w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 text-sm outline-none focus:border-[#1B5E3C]";

export default function AdminAboutPage() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/site-content/about")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message);
        setContent(result.data);
      })
      .catch((error: unknown) => setMessage(error instanceof Error ? error.message : "دریافت اطلاعات ناموفق بود."));
  }, []);

  const setText = (key: keyof AboutContent, value: string) => {
    setContent((current) => current ? { ...current, [key]: value } : current);
  };

  const setLines = (key: "services" | "advantages" | "processSteps", value: string) => {
    setContent((current) => current ? { ...current, [key]: value.split("\n") } : current);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content) return;
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/site-content/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      setMessage("تغییرات صفحه درباره ما ذخیره شد.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "ذخیره اطلاعات ناموفق بود.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminNavigation />
      <h1 className="mb-6 text-3xl font-black text-[#1F2933]">ویرایش صفحه درباره ما</h1>
      {!content ? <p className="text-sm text-[#6B7280]">در حال دریافت محتوا…</p> : (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-[#E6E0D2] bg-white p-5 sm:p-8">
          <label className="block text-sm font-semibold">عنوان اصلی<input required value={content.title} onChange={(event) => setText("title", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-semibold">معرفی مجموعه<textarea required rows={4} value={content.intro} onChange={(event) => setText("intro", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-semibold">عنوان حوزه فعالیت<input required value={content.activityTitle} onChange={(event) => setText("activityTitle", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-semibold">توضیحات حوزه فعالیت<textarea required rows={4} value={content.activityDescription} onChange={(event) => setText("activityDescription", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-semibold">عنوان خدمات<input required value={content.servicesTitle} onChange={(event) => setText("servicesTitle", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-semibold">خدمات، هر مورد در یک خط<textarea rows={5} value={content.services.join("\n")} onChange={(event) => setLines("services", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-semibold">عنوان مزیت‌ها<input required value={content.advantagesTitle} onChange={(event) => setText("advantagesTitle", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-semibold">مزیت‌ها، هر مورد در یک خط<textarea rows={5} value={content.advantages.join("\n")} onChange={(event) => setLines("advantages", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-semibold">عنوان روند همکاری<input required value={content.processTitle} onChange={(event) => setText("processTitle", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-semibold">مراحل همکاری، هر مورد در یک خط<textarea rows={5} value={content.processSteps.join("\n")} onChange={(event) => setLines("processSteps", event.target.value)} className={fieldClass} /></label>
          <button type="submit" disabled={saving} className="rounded-xl bg-[#1B5E3C] px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "در حال ذخیره…" : "ذخیره تغییرات"}</button>
          {message && <p role="status" className="text-sm text-[#1B5E3C]">{message}</p>}
        </form>
      )}
    </main>
  );
}