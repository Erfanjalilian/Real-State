"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import type { ContactContent } from "@/lib/site-content";

const fieldClass = "mt-2 w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 text-sm outline-none focus:border-[#1B5E3C]";

export default function AdminContactPage() {
  const [content, setContent] = useState<ContactContent | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/site-content/contact")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message);
        setContent(result.data);
      })
      .catch((error: unknown) => setMessage(error instanceof Error ? error.message : "دریافت اطلاعات ناموفق بود."));
  }, []);

  const setText = (key: "phone" | "email" | "address" | "workingHours", value: string) => {
    setContent((current) => current ? { ...current, [key]: value } : current);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content) return;
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/site-content/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      setMessage("اطلاعات تماس ذخیره شد.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "ذخیره اطلاعات ناموفق بود.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminNavigation />
      <h1 className="mb-6 text-3xl font-black text-[#1F2933]">ویرایش صفحه تماس با ما</h1>
      {!content ? <p className="text-sm text-[#6B7280]">در حال دریافت اطلاعات…</p> : (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-[#E6E0D2] bg-white p-5 sm:p-8">
          <label className="block text-sm font-semibold">شماره تلفن<input required value={content.phone} onChange={(event) => setText("phone", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-semibold">ایمیل<input required type="email" value={content.email} onChange={(event) => setText("email", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-semibold">آدرس<textarea required rows={3} value={content.address} onChange={(event) => setText("address", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-semibold">ساعات کاری<input required value={content.workingHours} onChange={(event) => setText("workingHours", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-semibold">شبکه‌های اجتماعی، هر مورد در یک خط<textarea rows={4} value={content.socialLinks.join("\n")} onChange={(event) => setContent((current) => current ? { ...current, socialLinks: event.target.value.split("\n") } : current)} className={fieldClass} /></label>
          <button type="submit" disabled={saving} className="rounded-xl bg-[#1B5E3C] px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "در حال ذخیره…" : "ذخیره تغییرات"}</button>
          {message && <p role="status" className="text-sm text-[#1B5E3C]">{message}</p>}
        </form>
      )}
    </main>
  );
}