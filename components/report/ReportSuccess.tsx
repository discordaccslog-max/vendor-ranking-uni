import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";

export function ReportSuccess() {
  return (
    <div role="status" className="animate-rise py-6 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-ink-950 text-gold-300 shadow-[0_0_0_10px_var(--color-gold-100)]">
        <CheckIcon className="size-7" />
      </span>
      <h2 className="mt-8 font-display text-4xl tracking-[-0.01em] text-ink-950 sm:text-5xl">
        Thank you for your submission.
      </h2>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-stone-600">
        We appreciate you taking the time to help keep the directory reliable.
      </p>
      <Button href="/" variant="dark" arrow className="mt-10">
        Back to homepage
      </Button>
    </div>
  );
}
