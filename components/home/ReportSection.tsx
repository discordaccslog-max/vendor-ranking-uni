import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ShieldCheckIcon } from "@/components/ui/icons";
import { LINKS } from "@/config/site";

const ISSUES = ["Misleading information", "Poor service", "Suspicious activity", "Another issue"];

export function ReportSection() {
  return (
    <section id="report" className="bg-bone py-28 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-sand-200 bg-white/80 p-8 shadow-[0_30px_80px_-50px_rgb(10_10_11/0.3)] sm:p-12 lg:p-16">
            {/* Subtle gold edge at the top */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

            <div className="grid gap-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-14">
              <span className="grid size-16 place-items-center rounded-2xl bg-gold-100 text-gold-600">
                <ShieldCheckIcon className="size-8" />
              </span>

              <div>
                <p className="text-xs font-medium tracking-[0.22em] text-gold-600 uppercase">Accountability</p>
                <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.01em] text-ink-950 sm:text-5xl">
                  Help us keep the directory better.
                </h2>
                <p className="mt-5 max-w-2xl leading-relaxed text-stone-600">
                  Had a negative experience with a vendor listed on our platform? Let us know. If you&apos;ve experienced
                  misleading information, poor service, suspicious activity, or another issue with a listed vendor,
                  please report it to our team so we can review the situation.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {ISSUES.map((issue) => (
                    <li
                      key={issue}
                      className="flex items-center gap-2 rounded-full border border-sand-200 bg-bone px-3.5 py-1.5 text-xs text-stone-600"
                    >
                      <span className="size-1 rounded-full bg-gold-500" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-start gap-3 lg:items-center">
                <Button href={LINKS.reportVendor} variant="dark" size="lg" arrow>
                  Report a Vendor
                </Button>
                <p className="text-xs text-stone-500">Every report is reviewed by our team.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
