export const SITE = {
  name: "Industrial Analytical Services",
  short: "IAS",
  baseUrl: "https://ias.zokago.com",
  phone: "(978) 466-3422",
  phoneHref: "tel:9784663422",
  email: "info@iasamerica.com",
  address: {
    street: "60 Elm Hill Ave.",
    locality: "Leominster",
    region: "MA",
    postal: "01453",
    country: "US",
  },
};

export type NavItem = { key: string; label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { key: "about", label: "About IAS", href: "/about" },
  { key: "services", label: "Services", href: "/services" },
  { key: "instrumentation", label: "Instrumentation", href: "/instrumentation" },
  { key: "industries", label: "Industries", href: "/industries" },
  { key: "pricing", label: "Pricing", href: "/pricing" },
  { key: "contact", label: "Contact", href: "/contact" },
];
