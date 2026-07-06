import React from "react";

// IAS wordmark shown on the Payload admin login screen — keeps the CMS on-brand
// with the public site (same logo as the site nav/footer).
export const Logo = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/assets/ias-logo.png"
    alt="Industrial Analytical Services"
    style={{ height: 58, width: "auto" }}
  />
);

export default Logo;
