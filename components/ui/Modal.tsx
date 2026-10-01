"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/ui/icons";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Centered glass dialog with a blurred backdrop. Closes on Escape, backdrop
 * click or the × button; locks page scroll and moves focus inside while open.
 * Rendered into <body> (a portal) so parent cards with blur/transform effects
 * can't trap it inside their box.
 */
export function Modal({ open, onClose, label, children, className = "" }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto p-4 sm:p-6">
      <div aria-hidden="true" onClick={onClose} className="animate-fade-in fixed inset-0 bg-night-950/70 backdrop-blur-md" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`animate-pop-in relative w-full max-w-lg rounded-[28px] border border-white/10 bg-night-900/90 p-7 shadow-[0_40px_120px_-30px_rgb(139_92_246/0.6)] outline-none sm:p-10 ${className}`}
      >
        {/* Gradient edge */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-300/80 to-transparent"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-full text-mist-400 transition-colors hover:bg-white/10 hover:text-mist-100"
        >
          <CloseIcon className="size-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
