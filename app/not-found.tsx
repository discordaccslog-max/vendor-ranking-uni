import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-28 text-center">
      <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">404</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-ink-600">
        The page you&apos;re looking for doesn&apos;t exist. It may have been moved, or the vendor may no longer be
        ranked.
      </p>
      <ButtonLink href="/rankings" size="lg" className="mt-8">
        View the rankings
      </ButtonLink>
    </Container>
  );
}
