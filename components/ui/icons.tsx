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

const TechnologyIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4.5" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16.5V20M9.5 9l-2 1.5 2 1.5M14.5 9l2 1.5-2 1.5" />
  </Svg>
);
const ManufacturingIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 20.5V10l5 3V10l5 3V10l5 3V4.5h3v16H3Z" />
    <path d="M7 17h2M11 17h2M15 17h2" />
  </Svg>
);
const MarketingIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);
const LogisticsIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 6.5h11v10H3zM14 10h4l3 3v3.5h-7" />
    <circle cx="7" cy="18" r="1.8" />
    <circle cx="17" cy="18" r="1.8" />
  </Svg>
);
const FinanceIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 9.5 12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20.5h18" />
  </Svg>
);

export const CATEGORY_ICONS: Record<CategoryIcon, (p: IconProps) => React.ReactElement> = {
  technology: TechnologyIcon,
  manufacturing: ManufacturingIcon,
  marketing: MarketingIcon,
  logistics: LogisticsIcon,
  finance: FinanceIcon,
  generic: GridIcon,
};
