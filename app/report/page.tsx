import type { Metadata } from "next";
import Link from "next/link";
import { ReportForm } from "@/components/report/ReportForm";
import { Container } from "@/components/ui/Container";
import { AlertIcon, ClockIcon, ShieldCheckIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Report a Vendor",
  description: "Had a problem with a vendor listed on our platform? Report it so we can review it.",
};

type Props = { searchParams: Promise<{ vendor?: string | string[] }> };

export default async function ReportPage({ searchParams }: Props) {
  // Vendor cards link to /report?vendor=Name to pre-fill the form.
  const { vendor } = await searchParams;
  const defaultVendor = (Array.isArray(vendor) ? vendor[0] : vendor)?.slice(0, 120) ?? "";

  return (
    <>
      <section className="relative pt-36 pb-16 sm:pt-44">
        <Container>
          <nav aria-label="Breadcrumb" className="animate-rise text-sm text-mist-500">
            <Link href="/" className="transition-colors hover:text-mist-100">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-mist-300">Report a vendor</span>
          </nav>
          <h1
            className="animate-rise mt-8 max-w-3xl font-display text-5xl leading-[0.98] tracking-[-0.02em] text-white sm:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            Report a <em className="text-aurora animate-shimmer italic">vendor.</em>
          </h1>
          <p className="animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-mist-300" style={{ animationDelay: "240ms" }}>
            Had a negative experience with a vendor listed on our platform? Tell us what happened and our team will
            review the situation.
          </p>
        </Container>
      </section>

      <section className="relative pb-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <div
            className="animate-rise relative self-start rounded-[32px] border border-white/10 bg-night-900/80 p-6 shadow-[0_40px_120px_-50px_rgb(139_92_246/0.6)] backdrop-blur-xl sm:p-10 lg:p-12"
            style={{ animationDelay: "320ms" }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-300/80 to-transparent"
            />
            <ReportForm defaultVendor={defaultVendor} />
          </div>

          <aside className="space-y-4">
            <InfoCard Icon={ClockIcon} title="What happens next">
              Every report is read by our team. We review the listing and may reach out to you or the vendor before
              deciding whether to update, flag or remove it.
            </InfoCard>
            <InfoCard Icon={ShieldCheckIcon} title="Before you submit">
              Stick to what you experienced first-hand, and leave out passwords, payment details or other people&apos;s
              personal information.
            </InfoCard>
            <InfoCard Icon={AlertIcon} title="Lost money?">
              If you think you&apos;ve been defrauded, contact your bank or payment provider and your local authorities
              as well as reporting it here.
            </InfoCard>
          </aside>
        </Container>
      </section>
    </>
  );
}

function InfoCard({
  Icon,
  title,
  children,
}: {
  Icon: (p: { className?: string }) => React.ReactElement;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <span className="grid size-10 place-items-center rounded-xl bg-white/[0.06] text-fuchsia-300">
        <Icon className="size-5" />
      </span>
      <h2 className="mt-5 font-medium text-mist-100">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-mist-400">{children}</p>
    </div>
  );
}
