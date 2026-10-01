/**
 * Inline SVG icons (outline, 1.5px stroke). Add new ones here.
 * Category icons are looked up by key in CATEGORY_ICONS.
 */
import type { CategoryIcon } from "@/lib/types";

type IconProps = { className?: string };

function Svg({ className = "size-6", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
export const ArrowUpRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
);
export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);
export const ShieldCheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </Svg>
);
export const BadgeCheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 2.8 14.3 4.5l2.8-.1.9 2.7 2.3 1.6-.9 2.7.9 2.7-2.3 1.6-.9 2.7-2.8-.1L12 21.2l-2.3-1.7-2.8.1-.9-2.7-2.3-1.6.9-2.7-.9-2.7 2.3-1.6.9-2.7 2.8.1L12 2.8Z" />
    <path d="m8.8 12 2.2 2.2 4.2-4.4" />
  </Svg>
);
export const StarIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8L12 3.5Z" />
  </Svg>
);
export const GridIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </Svg>
);
export const KeyIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="8" cy="15" r="4" />
    <path d="m11 12 8.5-8.5M16 7l2.5 2.5M14 9l2 2" />
  </Svg>
);
export const SearchIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </Svg>
);
export const CompassIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </Svg>
);
export const HandshakeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m11 17 2 2a1.5 1.5 0 0 0 2.1-2.1M14 15l2.5 2.5a1.5 1.5 0 0 0 2.1-2.1L15 11.8" />
    <path d="m3 12 3.5-6 4 1.5 2-1 5 1.5L21 12l-2.4 3.4M3 12l2.5 3.5L11 21" />
    <path d="M10.5 7.5 7.5 11a1.6 1.6 0 0 0 2.4 2.1l2.6-2.3" />
  </Svg>
);
export const FlagIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
  </Svg>
);
export const ChevronDownIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);
export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);
export const AlertIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4 2.8 19.5h18.4L12 4Z" />
    <path d="M12 10v4M12 17h.01" />
  </Svg>
);
export const MessageIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 5.5h16v11H9l-5 4v-15Z" />
    <path d="M8 9.5h8M8 12.5h5" />
  </Svg>
);
export const SparkleIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" />
    <path d="M19 16c.2 1.4.9 2.1 2 2.5-1.1.4-1.8 1.1-2 2.5-.2-1.4-.9-2.1-2-2.5 1.1-.4 1.8-1.1 2-2.5Z" />
  </Svg>
);
export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 8h16M4 16h16" />
  </Svg>
);
export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
);

// Category icons ------------------------------------------------------------

const FashionIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8.5 3.5 4 5.8 2.8 10l3.2 1.2V20.5h12V11.2l3.2-1.2L20 5.8l-4.5-2.3c-.6 1.6-2 2.5-3.5 2.5s-2.9-.9-3.5-2.5Z" />
  </Svg>
);
const DisposablesIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 6.5h13M7 6.5l1.3 14h7.4l1.3-14M8.5 6.5 9 3.5h6l.5 3M7.6 11h8.8" />
  </Svg>
);
const ElectronicsIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="6.5" y="6.5" width="11" height="11" rx="1.5" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
    <path d="M9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21" />
  </Svg>
);

export const CATEGORY_ICONS: Record<CategoryIcon, (p: IconProps) => React.ReactElement> = {
  fashion: FashionIcon,
  disposables: DisposablesIcon,
  electronics: ElectronicsIcon,
  generic: GridIcon,
};
