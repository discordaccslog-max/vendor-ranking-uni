import { Container } from "@/components/ui/Container";
import { CATEGORY_NAME } from "@/config/site";

// TODO: edit these steps to describe your own ranking process.
const STEPS = [
  {
    title: "We research",
    body: `We track the leading ${CATEGORY_NAME} vendors and gather feedback from real customers.`,
    icon: (
      <path d="M10.5 3.75a6.75 6.75 0 1 0 4.24 12l4.38 4.38a.75.75 0 1 0 1.06-1.06l-4.38-4.38A6.75 6.75 0 0 0 10.5 3.75ZM5.25 10.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" />
    ),
  },
  {
    title: "We rate",
    body: "Each vendor is scored on quality, reliability, value and support, then ranked overall.",
    icon: (
      <path d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.12 5.11 5.52.44c.5.04.7.66.32.99l-4.2 3.6 1.28 5.38a.56.56 0 0 1-.84.61L12 16.73l-4.72 2.9a.56.56 0 0 1-.84-.61l1.28-5.38-4.2-3.6a.56.56 0 0 1 .32-.99l5.52-.44 2.12-5.11Z" />
    ),
  },
  {
    title: "You choose",
    body: "Compare ratings and review breakdowns side by side, then pick the vendor that fits you best.",
    icon: (
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">How it works</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance text-ink-900 sm:text-4xl">
            Rankings you can trust, in three simple steps
          </h2>
        </div>
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-3xl border border-ink-200 bg-ink-50/50 p-8 transition-shadow hover:shadow-lg hover:shadow-ink-900/5"
            >
              <span className="absolute top-8 right-8 text-5xl font-extrabold text-ink-200/80">{i + 1}</span>
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-500 text-white shadow-md shadow-brand-500/30">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                  {step.icon}
                </svg>
              </span>
              <h3 className="mt-6 text-lg font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
