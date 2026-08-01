import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900 sm:px-8 lg:px-12">
      <section className="mx-auto flex max-w-5xl flex-col items-center gap-10 rounded-[32px] border border-zinc-200 bg-white p-8 shadow-sm sm:p-12 lg:flex-row lg:justify-between lg:p-16">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
            Vocabulary web
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            A calm way to practice words every day.
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Build your vocabulary with a polished, distraction-free experience that feels welcoming from the first click.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/signin"
              className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Log in
            </Link>
            <a
              href="#"
              className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100"
            >
              Learn more
            </a>
          </div>
        </div>

        <div className="w-full max-w-sm rounded-3xl bg-zinc-950 p-6 text-white">
          <p className="text-sm uppercase tracking-[0.32em] text-indigo-300">Ready to begin?</p>
          <p className="mt-3 text-2xl font-semibold">Start with a simple sign-in experience.</p>
          <p className="mt-3 text-sm leading-7 text-zinc-300">
            This starter app now includes a polished login screen you can expand into a real auth flow.
          </p>
        </div>
      </section>
    </main>
  );
}
