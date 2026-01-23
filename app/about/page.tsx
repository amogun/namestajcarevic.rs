import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MapPin } from "lucide-react";

export const revalidate = 86400; // Revalidate daily

export const metadata = {
  title: 'O Nama - Nameštaj Carevic Kragujevac',
  description: 'Saznajte više o Nameštaj Carevic - salonu nameštaja sa 20+ godina tradicije u Kragujevcu. Kvalitet, udobnost i stil za vaš dom.',
  keywords: 'o nama, nameštaj Carevic, Kragujevac, tradicija, kvalitet, salon nameštaja',
  openGraph: {
    title: 'O Nama - Nameštaj Carevic',
    description: 'Saznajte više o našoj 20+ godina dugoj tradiciji u proizvodnji i prodaji kvalitetnog nameštaja.',
    type: 'website',
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navigation />

      {/* Hero */}
      <div className="relative pt-24 pb-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">O Nama</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Tradicija, kvalitet i posvećenost detaljima od 2004. godine.
              Dobrodošli u salon nameštaja Nameštaj Carevic.
            </p>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          {/* Decorative element or pattern */}
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="60"/>
            <circle cx="400" cy="400" r="200" stroke="currentColor" strokeWidth="40"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-primary block text-xl mb-2 font-serif">Naša priča</strong>
              Počeli smo kao mala porodična radionica sa velikim snom - da domovima u Kragujevcu i okolini pružimo nameštaj koji nije samo funkcionalan, već i estetski doživljaj.
            </p>
            <p>
              Danas, salon nameštaja "Nameštaj Carevic" predstavlja sinonim za kvalitet i pouzdanost. U našem asortimanu nalaze se komadi nameštaja renomiranih domaćih i stranih proizvođača, pažljivo odabrani da zadovolje najrazličitije ukuse i potrebe.
            </p>
            <p>
              Verujemo da je dom mesto gde počinje svaki dobar dan. Zato se trudimo da vam ponudimo rešenja koja će vaš životni prostor učiniti udobnijim, toplijim i lepšim.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Showroom images */}
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop"
                alt="Sofa detail"
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800&auto=format&fit=crop"
                alt="Wood texture"
                className="rounded-2xl shadow-lg w-full h-40 object-cover"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop"
                alt="Living room"
                className="rounded-2xl shadow-lg w-full h-40 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop"
                alt="Chair detail"
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-24 bg-brand-beige/50 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="font-serif text-3xl font-bold mb-6 text-primary">Posetite Nas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Najbolji način da doživite kvalitet našeg nameštaja je da nas posetite. Naše ljubazno osoblje će vam rado pomoći pri odabiru.
          </p>

          <div className="inline-flex items-center gap-2 text-primary font-bold text-lg bg-white px-6 py-3 rounded-xl shadow-sm border border-primary/10">
            <MapPin />
            Božidara Milosavljevica 12, Kragujevac
          </div>

          <div className="mt-12 rounded-xl overflow-hidden h-96 shadow-md border border-border">
            <iframe
              src="https://www.google.com/maps?q=Božidara+Milosavljevica+12,+Kragujevac+34000&output=embed&hl=sr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Nameštaj Carevic - Lokacija: Božidara Milosavljevica 12, Kragujevac"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}