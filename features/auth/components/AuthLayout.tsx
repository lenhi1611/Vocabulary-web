"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Testimonial = {
  quote: string;
  author: string;
};

type NavLink = {
  href: string;
  label: string;
};

type AuthLayoutProps = {
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  testimonial?: Testimonial;
  panelLabel: string;
  heading: string;
  navLink: NavLink;
  gridClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthLayout({
  eyebrow,
  heroTitle,
  heroDescription,
  testimonial,
  panelLabel,
  heading,
  navLink,
  gridClassName = "lg:grid-cols-[1.05fr_0.95fr]",
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),_transparent_40%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_100%)] px-4 py-10 text-zinc-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center">
        <div
          className={`grid w-full overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-[0_24px_80px_-24px_rgba(15,23,42,0.35)] ${gridClassName}`}
        >
          <section className="flex flex-col justify-between bg-zinc-950 px-8 py-10 text-white sm:px-10 lg:px-12">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-indigo-300">
                {eyebrow}
              </p>
              <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                {heroTitle}
              </h1>
              <p className="mt-4 max-w-md text-base leading-7 text-zinc-300">
                {heroDescription}
              </p>
            </div>

            {testimonial ? (
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-medium text-zinc-100">"{testimonial.quote}"</p>
                <p className="mt-2 text-sm text-zinc-300">— {testimonial.author}</p>
              </div>
            ) : null}
          </section>

          <section className="px-8 py-10 sm:px-10 lg:px-12">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">{panelLabel}</p>
                <h2 className="mt-1 text-2xl font-semibold text-zinc-900">{heading}</h2>
              </div>
              <Link href={navLink.href} className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900">
                {navLink.label}
              </Link>
            </div>

            {children}

            {footer}
          </section>
        </div>
      </div>
    </main>
  );
}
