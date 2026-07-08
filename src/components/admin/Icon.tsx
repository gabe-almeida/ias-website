import React from "react";

// Compact IAS mark (hexagon flask badge) shown in the collapsed admin sidebar / nav
// — the full lockup is illegible at this size, so we use the badge alone.
export const Icon = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/assets/ias-mark.png" alt="IAS" style={{ height: 30, width: "auto" }} />
);

export default Icon;
