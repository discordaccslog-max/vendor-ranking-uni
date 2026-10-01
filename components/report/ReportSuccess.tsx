import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";

export function ReportSuccess() {
  return (
    <div role="status" className="animate-rise py-6 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-[linear-gradient(135deg,#a78bfa,#f0abfc,#67e8f9)] text-night-950 shadow-[0_0_0_10px_rgb(167_139_250/0.15)]">
        <CheckIcon className="size-7" />
      </span>
      <h2 className="mt-8 font-display text-4xl tracking-[-0.01em] text-white sm:text-5xl">
        Thank you for your submission.
      </h2>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-mist-300">
        We appreciate you taking the time to help keep the directory reliable.
      </p>
      <Button href="/" variant="light" arrow className="mt-10">
        Back to homepage
      </Button>
    </div>
  );
}
