import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold">Nameštaj Carevic</h3>
              <p className="text-xs uppercase tracking-widest opacity-70">Salon Nameštaja</p>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Kvalitet, udobnost i stil za Vaš dom. Nameštaj koji traje generacijama, sa ljubavlju izrađen i pažljivo odabran.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/namestaj.carevic/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity p-2 bg-white/5 rounded-full">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/namestaj.carevic" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity p-2 bg-white/5 rounded-full">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Navigacija</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="/" className="hover:text-white transition-colors">Početna</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition-colors">Katalog Proizvoda</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">O Nama</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Kontakt</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>Božidara Milosavljevica 12<br />Kragujevac</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" />
                <span>064 119 31 83</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" />
                <span>060 024 42 02</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0" />
                <span>namestajcarevic@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Radno Vreme</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Pon - Pet</span>
                <span>10:00 - 19:00</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Subota</span>
                <span>10:00 - 14:00</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Nedelja</span>
                <span>Zatvoreno</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p>© {new Date().getFullYear()} Nameštaj Carevic. Sva prava zadržana.</p>
            <p className="text-primary-foreground/40">PIB: 105589582 | MB: 61812504</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Politika Privatnosti</a>
            <a href="#" className="hover:text-white transition-colors">Uslovi Korišćenja</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
