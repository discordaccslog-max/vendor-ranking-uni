import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CompassIcon, HandshakeIcon, SearchIcon } from "@/components/ui/icons";

const STEPS = [
  {
    title: "Explore",
    body: "Browse vendors across categories that matter to your business.",
    Icon: CompassIcon,
  },
  {
    title: "Discover",
    body: "Review vendor information and discover potential suppliers and service providers.",
    Icon: SearchIcon,
  },
  {
    title: "Connect",
    body: "Choose the vendors that fit your needs and connect with them directly.",
    Icon: HandshakeIcon,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative border-y border-sand-200 bg-sand-50 py-28 sm:py-36">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          align="center"
          title={
            <>
              Three steps. <em className="italic text-gold-600">Zero</em> fees.
            </>
          }
          description="From first search to first conversation, the platform is free to discover and browse."
        />

        <ol className="relative mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Connecting line (desktop) */}
          <Reveal className="absolute top-7 right-[16%] left-[16%] hidden md:block">
            <span className="block h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
          </Reveal>

          {STEPS.map(({ title, body, Icon }, i) => (
            <Reveal as="li" key={title} delay={i * 150} className="relative text-center">
              <span className="relative mx-auto grid size-14 place-items-center rounded-full border border-gold-300/70 bg-bone text-ink-950 shadow-[0_0_0_8px_var(--color-sand-50)]">
                <Icon className="size-6" />
              </span>
              <p className="mt-8 font-display text-6xl text-gold-500/90">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.01em] text-ink-950">{title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-stone-600">{body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={300}>
          <div className="mx-auto mt-20 flex max-w-2xl flex-col items-center gap-3 rounded-full border border-gold-300/60 bg-bone px-6 py-4 text-center sm:flex-row sm:justify-center sm:gap-4 sm:py-3">
            <span className="rounded-full bg-ink-950 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-gold-200 uppercase">
              Always free
            </span>
            <span className="text-sm text-stone-600">No subscriptions, no paywalls, no access fees.</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
