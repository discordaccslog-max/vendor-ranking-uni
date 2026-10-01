import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, ButtonLink } from "@/components/ui/ButtonLink";
import { CATEGORY_NAME } from "@/config/site";

export function CtaBand() {
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-900 px-6 py-16 text-center shadow-2xl sm:px-16">
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/40 blur-3xl"
          />
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
            Ready to find the best {CATEGORY_NAME} vendor?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
            See who&apos;s on top right now, with ratings and full review breakdowns.
          </p>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/rankings" size="lg" variant="inverse">
              View current rankings
              <ArrowRightIcon />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
