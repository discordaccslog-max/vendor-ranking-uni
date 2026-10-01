import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FlagIcon } from "@/components/ui/icons";
import { LINKS } from "@/config/site";

const ISSUES = ["Misleading information", "Poor service", "Suspicious activity", "Another issue"];

/** Accountability / "Report a vendor" — the most prominent call-out after the vendors. */
export function ReportSection() {
  return (
    <section id="report" className="relative py-20 sm:py-28">
      <Container>
        <Reveal>
          {/* Glowing gradient border */}
          <div className="relative rounded-[36px] bg-[linear-gradient(135deg,rgb(251_113_133/0.7),rgb(217_70_239/0.5)_40%,rgb(103_232_249/0.45))] p-px shadow-[0_40px_140px_-40px_rgb(217_70_239/0.55)]">
            <div className="relative overflow-hidden rounded-[35px] bg-night-900/85 px-6 py-14 backdrop-blur-xl sm:px-12 sm:py-20 lg:px-20">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl"
              />

              <div className="relative mx-auto max-w-3xl text-center">
                <span className="relative mx-auto grid size-18 place-items-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-rose-400/20 [animation-duration:2.4s]" />
                  <span className="relative grid size-18 place-items-center rounded-full bg-[linear-gradient(135deg,#fb7185,#e879f9)] text-white shadow-[0_10px_40px_-8px_rgb(244_114_182/0.8)]">
                    <FlagIcon className="size-8" />
                  </span>
                </span>

                <p className="mt-8 text-xs font-medium tracking-[0.28em] text-rose-300 uppercase">Accountability</p>
                <h2 className="mt-5 font-display text-5xl leading-[1] tracking-[-0.02em] text-balance text-white sm:text-7xl">
                  Help us keep the <em className="text-aurora italic">directory honest.</em>
                </h2>
                <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-mist-300">
                  Had a negative experience with a vendor listed on our platform? Let us know. If you&apos;ve experienced
                  misleading information, poor service, suspicious activity, or another issue with a listed vendor,
                  report it so we can review the situation.
                </p>

                <ul className="mt-9 flex flex-wrap justify-center gap-2">
                  {ISSUES.map((issue) => (
                    <li
                      key={issue}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-mist-300"
                    >
                      <span className="size-1.5 rounded-full bg-rose-400" />
                      {issue}
                    </li>
                  ))}
                </ul>

                <Button href={LINKS.reportVendor} variant="aurora" size="lg" arrow className="mt-11">
                  Report a Vendor
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
