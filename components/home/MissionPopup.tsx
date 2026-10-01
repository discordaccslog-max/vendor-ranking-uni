"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { BadgeCheckIcon, KeyIcon, ShieldCheckIcon } from "@/components/ui/icons";
import { LINKS } from "@/config/site";

const POINTS = [
  { Icon: KeyIcon, label: "Free of charge" },
  { Icon: BadgeCheckIcon, label: "Peer-reviewed" },
  { Icon: ShieldCheckIcon, label: "Third-party tested" },
];

/** "Our Mission" pop-up, shown 2 seconds after the homepage loads. */
export function MissionPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal open={open} onClose={() => setOpen(false)} label="Our mission" className="max-w-xl">
      <p className="text-xs font-medium tracking-[0.28em] text-violet-300 uppercase">Our mission</p>
      <h2 className="mt-4 pr-8 font-display text-4xl leading-[1.05] text-white sm:text-5xl">
        Finding a vendor should <em className="text-aurora italic">never cost you a thing.</em>
      </h2>
      <p className="mt-6 leading-relaxed text-mist-300">
        We stand firmly against the growing trend of people being charged just to get access to suppliers and
        vendors. Here, everything is free — no paywalls, no memberships, no hidden fees.
      </p>
      <p className="mt-4 leading-relaxed text-mist-300">
        Every vendor on our list has been peer-reviewed, evaluated and tested by independent third parties before
        earning its place.
      </p>

      <ul className="mt-7 grid grid-cols-3 gap-2">
        {POINTS.map(({ Icon, label }) => (
          <li
            key={label}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-4 text-center text-xs text-mist-300"
          >
            <Icon className="size-5 text-fuchsia-300" />
            {label}
          </li>
        ))}
      </ul>

      <a
        href={LINKS.viewVendors}
        onClick={() => setOpen(false)}
        className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(110deg,#a78bfa,#f0abfc_45%,#67e8f9)] text-[15px] font-medium text-night-950 shadow-[0_10px_40px_-10px_rgb(192_132_252/0.7)] transition-all duration-500 hover:brightness-110"
      >
        Start browsing
      </a>
    </Modal>
  );
}
