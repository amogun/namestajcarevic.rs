import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt - Nameštaj Carevic Kragujevac',
  description: 'Kontaktirajte nas za sva pitanja o nameštaju. Adresa: Božidara Milosavljevica 12, Kragujevac. Telefon: 064 119 31 83, 060 024 42 02.',
  keywords: 'kontakt, nameštaj Carevic, Kragujevac, telefon, email, lokacija',
  openGraph: {
    title: 'Kontakt - Nameštaj Carevic',
    description: 'Kontaktirajte nas za sve informacije o našem nameštaju i uslugama.',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
