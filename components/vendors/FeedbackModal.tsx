"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { CheckIcon } from "@/components/ui/icons";
import { inputClass } from "@/components/report/fields";

const STAR = "M12 2.5l2.9 6.26 6.85.74-5.1 4.63 1.42 6.75L12 17.5l-6.07 3.38 1.42-6.75L2.25 9.5l6.85-.74L12 2.5z";
const LABELS = ["", "Bad", "Poor", "Average", "Great", "Excellent"];

/**
 * "Leave feedback" form for a vendor. Front-end only: submitting shows a
 * thank-you message and nothing is sent or saved.
 */
export function FeedbackModal({ vendorName, open, onClose }: { vendorName: string; open: boolean; onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [missingRating, setMissingRating] = useState(false);

  const close = () => {
    onClose();
    // Reset after the dialog closes so it's fresh next time.
    setTimeout(() => {
      setRating(0);
      setSubmitted(false);
      setMissingRating(false);
    }, 200);
  };

  const shown = hover || rating;

  return (
    <Modal open={open} onClose={close} label={`Leave feedback for ${vendorName}`}>
      {submitted ? (
        <div role="status" className="py-4 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-[linear-gradient(135deg,#a78bfa,#f0abfc,#67e8f9)] text-night-950">
            <CheckIcon className="size-6" />
          </span>
          <h2 className="mt-6 font-display text-3xl text-mist-100">Thank you!</h2>
          <p className="mx-auto mt-3 max-w-sm leading-relaxed text-mist-400">
            Your review has been submitted and is now under review.
          </p>
          <button
            type="button"
            onClick={close}
            className="mt-8 inline-flex h-11 items-center rounded-full bg-mist-100 px-6 text-sm font-medium text-night-950 transition-colors hover:bg-white"
          >
            Done
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!rating) {
              setMissingRating(true);
              return;
            }
            setSubmitted(true);
          }}
        >
          <p className="text-xs font-medium tracking-[0.22em] text-violet-300 uppercase">Leave feedback</p>
          <h2 className="mt-3 pr-8 font-display text-3xl leading-tight text-mist-100">{vendorName}</h2>

          <fieldset className="mt-7">
            <legend className="text-sm font-medium text-mist-100">Your rating</legend>
            <div className="mt-3 flex items-center gap-3" onMouseLeave={() => setHover(0)}>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <label key={n} onMouseEnter={() => setHover(n)} className="cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={n}
                      checked={rating === n}
                      onChange={() => {
                        setRating(n);
                        setMissingRating(false);
                      }}
                      className="peer sr-only"
                    />
                    <span className="sr-only">
                      {n} star{n > 1 ? "s" : ""}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className={`size-8 transition-all duration-200 peer-focus-visible:scale-110 ${
                        n <= shown ? "scale-105 fill-fuchsia-300" : "fill-white/15"
                      }`}
                    >
                      <path d={STAR} />
                    </svg>
                  </label>
                ))}
              </div>
              <span className="text-sm text-mist-400">{LABELS[shown]}</span>
            </div>
            {missingRating && <p className="mt-2 text-sm text-rose-300">Please choose a star rating.</p>}
          </fieldset>

          <div className="mt-6">
            <label htmlFor="feedback-text" className="text-sm font-medium text-mist-100">
              Your experience
            </label>
            <textarea
              id="feedback-text"
              name="feedback"
              required
              rows={4}
              maxLength={2000}
              placeholder="What went well, or what didn't?"
              className={`${inputClass} mt-2 resize-y py-3 leading-relaxed`}
            />
          </div>

          <div className="mt-5">
            <label htmlFor="feedback-name" className="flex justify-between text-sm font-medium text-mist-100">
              Your name <span className="text-xs font-normal text-mist-500">Optional</span>
            </label>
            <input
              id="feedback-name"
              name="name"
              type="text"
              maxLength={80}
              placeholder="e.g. Jordan"
              className={`${inputClass} mt-2 h-12`}
            />
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(110deg,#a78bfa,#f0abfc_45%,#67e8f9)] text-[15px] font-medium text-night-950 shadow-[0_10px_40px_-10px_rgb(192_132_252/0.7)] transition-all duration-500 hover:brightness-110"
          >
            Submit review
          </button>
        </form>
      )}
    </Modal>
  );
}
