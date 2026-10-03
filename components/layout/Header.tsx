"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/properties", label: "آگهی‌ها" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1B5E3C] text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C9A227] text-lg font-black text-[#1F2933]">
            ر
          </div>
          <div>
            <p className="text-lg font-extrabold tracking-tight">رهن و فروش</p>
            <p className="text-[10px] font-medium text-white/70">برند املاک</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  active ? "text-[#F3D77B]" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/properties"
            className="inline-flex items-center justify-center rounded-full bg-[#C9A227] px-5 py-2.5 text-sm font-bold text-[#1F2933] shadow-sm transition hover:bg-[#d7b141]"
          >
            مشاهده آگهی‌ها
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 md:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="باز کردن منو"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-white" />
            <span className="block h-0.5 w-5 rounded-full bg-white" />
            <span className="block h-0.5 w-5 rounded-full bg-white" />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#1B5E3C] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-3 py-2 text-sm font-medium ${
                  pathname === item.href ? "bg-white/10 text-[#F3D77B]" : "text-white/90"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/properties"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#C9A227] px-4 py-3 text-sm font-bold text-[#1F2933]"
            >
              مشاهده آگهی‌ها
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
