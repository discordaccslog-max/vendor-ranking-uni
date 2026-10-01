import { SITE_NAME } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
        {/* TODO: replace with your own disclosure statement if needed. */}
        <p>Rankings are editorial and updated periodically.</p>
      </div>
    </footer>
  );
}
