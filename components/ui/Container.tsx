type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/** Centered, max-width page container with responsive side padding. */
export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
