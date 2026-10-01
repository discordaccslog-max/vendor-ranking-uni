import type { Review } from "@/lib/types";
import { TrustpilotStars } from "@/components/reviews/TrustpilotRating";
import { formatReviewDate } from "@/lib/reviews";

export function ReviewCard({ review }: { review: Review }) {
  const initial = review.author.trim()[0]?.toUpperCase() ?? "?";
  return (
    <article className="rounded-[22px] border border-white/10 bg-night-900/55 p-6 backdrop-blur-xl sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-medium text-white">
            {initial}
          </span>
          <p className="truncate font-medium text-mist-100">{review.author}</p>
        </div>
        <time dateTime={review.date} className="shrink-0 text-sm text-mist-500">
          {formatReviewDate(review.date)}
        </time>
      </div>
      <div className="mt-5">
        <TrustpilotStars rating={review.rating} size="sm" />
      </div>
      {review.title && <h3 className="mt-4 text-lg font-medium text-white">{review.title}</h3>}
      <p className="mt-2 leading-relaxed whitespace-pre-line text-mist-300">{review.body}</p>
    </article>
  );
}
