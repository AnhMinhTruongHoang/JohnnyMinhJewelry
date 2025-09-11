"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { siInstagram, siFacebook, siX, siZalo } from "simple-icons/icons";
import { ArrowUp } from "lucide-react";

export type FooterProps = SliceComponentProps<Content.FooterSlice>;

const Icon = ({ path }: { path: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6 md:h-5 md:w-5"
  >
    <path d={path} />
  </svg>
);

const socialLinks = [
  {
    name: "Instagram",
    link: "https://instagram.com/",
    icon: <Icon path={siInstagram.path} />,
  },
  {
    name: "Facebook",
    link: "https://facebook.com/",
    icon: <Icon path={siFacebook.path} />,
  },
  { name: "Twitter", link: "https://X.com/", icon: <Icon path={siX.path} /> },
  { name: "Zalo", link: "https://zalo.me/", icon: <Icon path={siZalo.path} /> },
];

const support = {
  title: "Support",
  items: [
    { label: "Contact", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
    { label: "Warranty", href: "/warranty" },
    { label: "Shipping & Returns", href: "/shipping" },
  ],
};

const quickLinks = {
  title: "Quick Links",
  items: [
    { label: "Custom Jewelry", href: "/custom" },
    { label: "Shop Rings", href: "/rings" },
    { label: "Shop Necklaces", href: "/necklaces" },
    { label: "Blog", href: "/blog" },
  ],
};

const category = {
  title: "Category",
  items: [
    { label: "Necklaces", href: "/necklaces" },
    { label: "Rings", href: "/rings" },
    { label: "Earrings", href: "/earrings" },
    { label: "Bracelets", href: "/bracelets" },
  ],
};

const contact = {
  address: "123 Diamond Street, Ho Chi Minh City, Vietnam",
  phone: "+84 912 345 678",
  email: "support@johnnyminhjewelry.com",
};

const Footer: FC<FooterProps> = ({ slice }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <footer className="bg-[#191F33] text-[#767E94]">
        <div className="mx-auto max-w-7xl px-4">
          {/* Grid chính */}
          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand & Contact */}
            <div>
              <a href="/" className="mb-6 flex items-center gap-4 text-white">
                <img
                  src="/images/logo.png"
                  className="h-10 w-auto"
                  alt="Johnny Minh Jewelry"
                />
                <h6 className="text-xl font-semibold tracking-wide md:text-2xl">
                  Johnny Minh Jewelry
                </h6>
              </a>
              <address className="space-y-2 text-sm not-italic md:text-base">
                <p>{contact.address}</p>
                <p>Phone: {contact.phone}</p>
                <p>Mail: {contact.email}</p>
              </address>
            </div>

            {/* Support */}
            <div>
              <h6 className="mb-4 text-lg font-semibold text-white">
                {support.title}
              </h6>
              <ul className="space-y-2">
                {support.items.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="underline-offset-4 transition hover:text-white hover:underline hover:decoration-[#D4AF37]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h6 className="mb-4 text-lg font-semibold text-white">
                {quickLinks.title}
              </h6>
              <ul className="space-y-2">
                {quickLinks.items.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="underline-offset-4 transition hover:text-white hover:underline hover:decoration-[#D4AF37]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category */}
            <div>
              <h6 className="mb-4 text-lg font-semibold text-white">
                {category.title}
              </h6>
              <ul className="space-y-2">
                {category.items.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="underline-offset-4 transition hover:text-white hover:underline hover:decoration-[#D4AF37]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative bg-[#2E3447]">
          <button
            aria-label="ToTheTop"
            onClick={scrollToTop}
            className="absolute -top-7 right-6 flex h-14 w-14 items-center justify-center rounded-full border-[6px] border-[#191F33] bg-[#D4AF37] transition hover:bg-[#b8932f] md:right-12"
          >
            <ArrowUp color="#fff" size={22} />
          </button>
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 md:flex-row md:justify-between">
            <p className="text-center text-sm md:text-base">
              © {new Date().getFullYear()}{" "}
              <span className="text-white">Johnny Minh Jewelry</span>. Crafted
              with ❤️ in Vietnam.
            </p>
            <ul className="flex items-center gap-5">
              {socialLinks.map(({ name, icon, link }) => (
                <li key={name}>
                  <a
                    href={link}
                    title={name}
                    className="text-[#767E94] transition hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {icon}
                  </a>
                  <span className="sr-only">{name} account</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
