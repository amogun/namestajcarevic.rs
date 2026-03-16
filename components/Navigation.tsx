'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingBag, Phone, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartIcon } from "./CartIcon";
import { CATEGORIES } from "@/lib/categoryConfig";

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const checkScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    requestAnimationFrame(() => {
      requestAnimationFrame(checkScroll);
    });
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (megaMenuTimeout.current) {
        clearTimeout(megaMenuTimeout.current);
      }
    };
  }, []);

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeout.current) {
      clearTimeout(megaMenuTimeout.current);
      megaMenuTimeout.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeout.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  const links = [
    { href: "/", label: "Početna" },
    { href: "/catalog", label: "Katalog" },
    { href: "/about", label: "O nama" },
    { href: "/contact", label: "Kontakt" },
  ];

  const navClassName = scrolled
    ? "bg-brand-accent shadow-lg py-2"
    : "bg-brand-accent/95 py-3";

  // Split categories into 2 columns
  const col1 = CATEGORIES.slice(0, 3);
  const col2 = CATEGORIES.slice(3, 6);

  const isOnCategoryPage = pathname?.startsWith("/kategorija");

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        navClassName
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
            {/* Početna */}
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-white/70 relative py-1 whitespace-nowrap",
                pathname === "/"
                  ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white"
                  : "text-white/80 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all"
              )}
            >
              Početna
            </Link>

            {/* Nameštaj — Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white/70 relative py-1 whitespace-nowrap flex items-center gap-1",
                  isOnCategoryPage
                    ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white"
                    : "text-white/80 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all"
                )}
              >
                Nameštaj
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    megaMenuOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Mega Dropdown */}
              <div
                className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200",
                  megaMenuOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                )}
              >
                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 w-[480px]">
                  {/* Arrow */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 -translate-y-full">
                    <div className="w-3 h-3 bg-white rotate-45 border-l border-t border-gray-100" />
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    {/* Column 1 */}
                    <div className="space-y-1">
                      {col1.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/kategorija/${cat.slug}`}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group/item",
                            pathname === `/kategorija/${cat.slug}`
                              ? "bg-brand-beige text-primary"
                              : "hover:bg-brand-beige/50 text-gray-700"
                          )}
                          onClick={() => setMegaMenuOpen(false)}
                        >
                          <span className="font-medium text-sm group-hover/item:text-primary transition-colors">
                            {cat.displayName}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-1">
                      {col2.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/kategorija/${cat.slug}`}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group/item",
                            pathname === `/kategorija/${cat.slug}`
                              ? "bg-brand-beige text-primary"
                              : "hover:bg-brand-beige/50 text-gray-700"
                          )}
                          onClick={() => setMegaMenuOpen(false)}
                        >
                          <span className="font-medium text-sm group-hover/item:text-primary transition-colors">
                            {cat.displayName}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* View All */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href="/catalog"
                      className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary/70 transition-colors py-2"
                      onClick={() => setMegaMenuOpen(false)}
                    >
                      Pogledaj kompletan katalog
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Remaining nav links */}
            {links.slice(1).map((link) => (
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
          "fixed inset-0 bg-brand-brown z-40 md:hidden transition-all duration-300 ease-in-out flex flex-col items-center justify-center space-y-6 pointer-events-none overflow-y-auto",
          isOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0"
        )}
      >
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className={cn(
            "font-serif text-3xl font-medium transition-colors hover:text-white/60",
            pathname === "/" ? "text-white underline decoration-white/30" : "text-white/80"
          )}
        >
          Početna
        </Link>

        {/* Mobile Nameštaj with expandable list */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
            className={cn(
              "font-serif text-3xl font-medium transition-colors hover:text-white/60 flex items-center gap-2",
              isOnCategoryPage ? "text-white underline decoration-white/30" : "text-white/80"
            )}
          >
            Nameštaj
            <ChevronDown
              size={20}
              className={cn(
                "transition-transform duration-200",
                mobileCategoriesOpen && "rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "flex flex-col items-center gap-3 overflow-hidden transition-all duration-300",
              mobileCategoriesOpen ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategorija/${cat.slug}`}
                onClick={() => {
                  setIsOpen(false);
                  setMobileCategoriesOpen(false);
                }}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-white/60",
                  pathname === `/kategorija/${cat.slug}`
                    ? "text-white"
                    : "text-white/60"
                )}
              >
                {cat.displayName}
              </Link>
            ))}
          </div>
        </div>

        {links.slice(1).map((link) => (
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
