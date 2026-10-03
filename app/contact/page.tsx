"use client";

import { FormEvent, useEffect, useState } from "react";
import type { ContactContent } from "@/lib/site-content";

export default function ContactPage() {
  const [contactContent, setContactContent] = useState<ContactContent | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    fetch("/api/site-content/contact")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message);
        setContactContent(result.data);
      })
      .catch((error: unknown) => console.error("Failed to load contact page content:", error));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredFields = Object.values(formData).every((value) => value.trim() !== "");
    if (!requiredFields) {
      setSubmitState("error");
      setSubmitMessage("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "در ارسال پیام مشکلی پیش آمده است.");
      }

      setSubmitState("success");
      setSubmitMessage(result.message);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "در ارسال پیام مشکلی پیش آمده است.");
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#1B5E3C]">تماس با ما</p>
        <h1 className="mt-3 text-4xl font-black text-[#1F2933]">با ما در تماس باشید</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-[#1B5E3C] p-8 text-white shadow-[0_18px_40px_rgba(27,94,60,0.16)]">
          <h2 className="text-2xl font-black">اطلاعات تماس</h2>
          <div className="mt-6 space-y-5 text-base text-white/90">
            <p>تلفن: {contactContent?.phone ?? "…"}</p>
            <p>ایمیل: {contactContent?.email ?? "…"}</p>
            <p>آدرس: {contactContent?.address ?? "…"}</p>
            <p>ساعات کاری: {contactContent?.workingHours ?? "…"}</p>
          </div>
          <div className="mt-8 flex gap-3 text-sm">
            {contactContent?.socialLinks.map((link) => <span key={link} className="rounded-full border border-white/20 px-3 py-1.5">{link}</span>)}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[#E6E0D2] bg-white p-8 shadow-[0_10px_30px_rgba(31,41,51,0.04)]">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-[#1F2933] sm:col-span-1">
              <span className="mb-2 block">نام و نام خانوادگی</span>
              <input
                type="text"
                value={formData.fullName}
                onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
                className="w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 outline-none transition focus:border-[#1B5E3C]"
              />
            </label>

            <label className="block text-sm font-medium text-[#1F2933] sm:col-span-1">
              <span className="mb-2 block">شماره تماس</span>
              <input
                type="tel"
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                className="w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 outline-none transition focus:border-[#1B5E3C]"
              />
            </label>

            <label className="block text-sm font-medium text-[#1F2933] sm:col-span-2">
              <span className="mb-2 block">ایمیل</span>
              <input
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className="w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 outline-none transition focus:border-[#1B5E3C]"
              />
            </label>

            <label className="block text-sm font-medium text-[#1F2933] sm:col-span-2">
              <span className="mb-2 block">موضوع</span>
              <input
                type="text"
                value={formData.subject}
                onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                className="w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 outline-none transition focus:border-[#1B5E3C]"
              />
            </label>

            <label className="block text-sm font-medium text-[#1F2933] sm:col-span-2">
              <span className="mb-2 block">پیام</span>
              <textarea
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                rows={5}
                className="w-full rounded-xl border border-[#D9D7CE] bg-[#F8F7F4] px-3 py-3 outline-none transition focus:border-[#1B5E3C]"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1B5E3C] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#163f2a]"
          >
            ارسال پیام
          </button>

          {submitMessage ? (
            <p
              className={`mt-5 text-sm ${
                submitState === "success" ? "text-[#1B5E3C]" : "text-red-600"
              }`}
            >
              {submitMessage}
            </p>
          ) : null}
        </form>
      </div>
    </main>
  );
}
