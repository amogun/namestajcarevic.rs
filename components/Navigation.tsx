'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartIcon } from "./CartIcon";

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Početna" },
    { href: "/catalog", label: "Katalog" },
    { href: "/about", label: "O nama" },
    { href: "/contact", label: "Kontakt" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-brand-accent shadow-lg py-2"
          : "bg-brand-accent/95 py-3"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <img 
              src="/logo.svg" 
              alt="Nameštaj Carevic" 
              className="h-10 md:h-12 w-auto transition-opacity group-hover:opacity-90"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white/70 relative py-1 whitespace-nowrap",
                  pathname === link.href
                    ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white"
                    : "text-white/80 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all"
                )}
              >
                {link.label}
              </Link>
            ))}
            <CartIcon className="text-white hover:text-white/70" />
            <Link href="/catalog">
              <button className="bg-white text-brand-brown px-4 lg:px-5 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-all hover:shadow-lg flex items-center gap-2 whitespace-nowrap">
                <ShoppingBag size={16} />
                Naruči
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 z-50 relative"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-brand-brown z-40 md:hidden transition-all duration-300 ease-in-out flex flex-col items-center justify-center space-y-8 pointer-events-none",
          isOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0"
        )}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "font-serif text-3xl font-medium transition-colors hover:text-white/60",
              pathname === link.href ? "text-white underline decoration-white/30" : "text-white/80"
            )}
          >
            {link.label}
          </Link>
        ))}

        <div className="pt-8 border-t border-white/10 w-48 flex flex-col gap-4 items-center">
          <CartIcon className="text-white hover:text-white/70" />
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <button className="flex items-center gap-2 text-white/70 hover:text-white">
              <Phone size={18} />
              <span className="text-sm font-medium">064 119 31 83</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
