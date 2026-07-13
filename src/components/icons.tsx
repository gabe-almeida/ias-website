import React from "react";

/** Faithful port of build.py's svg(): renders a 24x24 stroke icon from raw path markup. */
export function Svg({
  paths,
  sw = "2",
  className,
  size,
}: {
  paths: string;
  sw?: string | number;
  className?: string;
  /** Optional explicit width/height in px. Omit to size via CSS (default). */
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}

// ---- shared icon path data ----
export const P = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.07 4.18 2 2 0 0 1 5.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L9.1 9.9a16 16 0 0 0 6 6l1.26-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  pin: '<path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  chevronR: '<path d="M9 6l6 6-6 6"/>',
};

export const Arrow = () => <Svg paths={P.arrow} sw="2.4" />;
export const Check = () => <Svg paths={P.check} sw="2.5" />;
export const Phone = () => <Svg paths={P.phone} />;
export const Mail = () => <Svg paths={P.mail} />;
export const Pin = () => <Svg paths={P.pin} />;
export const Send = () => <Svg paths={P.send} sw="2.4" />;
