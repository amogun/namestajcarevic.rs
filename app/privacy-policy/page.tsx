import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Politika Privatnosti - Nameštaj Carević',
    description: 'Politika privatnosti i zaštite podataka - Nameštaj Carević Kragujevac',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="container mx-auto px-4 md:px-6 py-24">
                <div className="max-w-4xl mx-auto prose prose-lg">
                    <h1 className="font-serif text-4xl font-bold text-primary mb-6">Politika Privatnosti</h1>
                    <p className="text-muted-foreground mb-8">Poslednje ažuriranje: 4. februar 2026.</p>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">1. Osnovne Informacije</h2>
                        <p className="mb-4">
                            <strong>Rukovalac podacima:</strong><br />
                            DRAGAN CAREVIĆ PREDUZETNIK POPRAVKA NAMEŠTAJA I TRGOVINSKA RADNJA CAREVIĆ KRAGUJEVAC<br />
                            PIB: 105589582<br />
                            Matični broj: 61812504<br />
                            Adresa: Božidara Milosavljevića 12, 34000 Kragujevac, Srbija<br />
                            Email: salon@namestajcarevic.rs, carevicnamestaj@gmail.com<br />
                            Telefon: +381-64-119-31-83, +381-60-024-42-02
                        </p>
                        <p>
                            Nameštaj Carević poštuje vašu privatnost i posvećen je zaštiti vaših ličnih podataka u skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije i Opštom uredbom o zaštiti podataka (GDPR).
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">2. Podaci Koje Prikupljamo</h2>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">2.1 Podaci koje nam direktno dostavljate</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Ime i prezime</li>
                            <li>Email adresa</li>
                            <li>Broj telefona</li>
                            <li>Adresa za dostavu</li>
                            <li>Informacije o porudžbini i preferiranim proizvodima</li>
                            <li>Sadržaj komunikacije sa nama (poruke, upiti, reklamacije)</li>
                        </ul>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">2.2 Podaci prikupljeni automatski</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li>IP adresa</li>
                            <li>Tip uređaja i operativnog sistema</li>
                            <li>Tip i verzija internet pregledača</li>
                            <li>Podaci o korišćenju sajta (posećene stranice, vreme provedeno na sajtu)</li>
                            <li>Podaci prikupljeni putem kolačića i sličnih tehnologija</li>
                            <li>Referrer URL (odakle ste došli na naš sajt)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">3. Svrha i Pravni Osnov Obrade Podataka</h2>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">3.1 Obrada upita i porudžbina</h3>
                        <p className="mb-4">
                            <strong>Pravni osnov:</strong> Izvršenje ugovora (član 12. stav 1. tačka 2. Zakona o zaštiti podataka o ličnosti)<br />
                            <strong>Svrha:</strong> Prijem i obrada vaših upita, kontaktiranje radi potvrde porudžbine, dogovor o detaljima kupovine, isporuka proizvoda
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">3.2 Marketing i komunikacija</h3>
                        <p className="mb-4">
                            <strong>Pravni osnov:</strong> Vaša saglasnost (član 12. stav 1. tačka 1. Zakona)<br />
                            <strong>Svrha:</strong> Slanje promotivnih poruka, obaveštenja o novim proizvodima i akcijama (samo uz vašu prethodnu saglasnost koju možete opozvati u bilo kom trenutku)
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">3.3 Analitika i unapređenje usluga</h3>
                        <p className="mb-4">
                            <strong>Pravni osnov:</strong> Legitimni interes (član 12. stav 1. tačka 6. Zakona)<br />
                            <strong>Svrha:</strong> Analiza korišćenja sajta, unapređenje korisničkog iskustva, optimizacija sadržaja
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">3.4 Zakonske obaveze</h3>
                        <p className="mb-4">
                            <strong>Pravni osnov:</strong> Zakonska obaveza (član 12. stav 1. tačka 3. Zakona)<br />
                            <strong>Svrha:</strong> Računovodstvo, poreske obaveze, odgovor na zahteve državnih organa
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">4. Kolačići i Tehnologije Praćenja</h2>
                        <p className="mb-4">
                            Naš sajt koristi kolačiće (cookies) i slične tehnologije za praćenje. Detaljne informacije o kolačićima možete pronaći u našoj <a href="/cookie-policy" className="text-primary underline">Politici Kolačića</a>.
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">4.1 Alati trećih strana</h3>
                        <p className="mb-4">Koristimo sledeće alate za analitiku i marketing:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Google Analytics:</strong> Za analizu posećenosti i ponašanja korisnika na sajtu</li>
                            <li><strong>Google Ads:</strong> Za prikazivanje personalizovanih oglasa i praćenje konverzija</li>
                            <li><strong>Meta Pixel (Facebook/Instagram):</strong> Za praćenje efikasnosti oglasa i remarketinga na društvenim mrežama</li>
                        </ul>
                        <p className="mb-4">
                            Ovi alati mogu prikupljati podatke o vašoj aktivnosti na našem sajtu i koristiti ih u skladu sa njihovim politikama privatnosti:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Privacy Policy</a></li>
                            <li><a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Meta Privacy Policy</a></li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">5. Deljenje Podataka sa Trećim Stranama</h2>
                        <p className="mb-4">Vaše podatke delimo samo u sledećim slučajevima:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Dobavljači usluga:</strong> Kompanije koje nam pomažu u poslovanju (hosting, email servisi, platni procesori) - samo u obimu neophodnom za pružanje usluge</li>
                            <li><strong>Kurirske službe:</strong> Za dostavu proizvoda (ime, adresa, telefon)</li>
                            <li><strong>Analitički i marketinški alati:</strong> Google, Meta (Facebook/Instagram) - u skladu sa vašom saglasnošću</li>
                            <li><strong>Zakonski zahtevi:</strong> Kada je to potrebno po zakonu ili na zahtev nadležnih organa</li>
                        </ul>
                        <p className="mb-4">
                            <strong>Napomena:</strong> Ne prodajemo vaše lične podatke trećim stranama.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">6. Period Čuvanja Podataka</h2>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Podaci o porudžbinama:</strong> 5 godina (računovodstvene i poreske obaveze)</li>
                            <li><strong>Podaci o upitima:</strong> 2 godine od poslednje komunikacije</li>
                            <li><strong>Marketing saglasnosti:</strong> Do opoziva saglasnosti ili 3 godine neaktivnosti</li>
                            <li><strong>Kolačići:</strong> Prema periodu definisanom u Politici Kolačića (od sesije do 2 godine)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">7. Vaša Prava</h2>
                        <p className="mb-4">U skladu sa zakonom, imate sledeća prava:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Pravo na pristup:</strong> Možete zatražiti kopiju podataka koje čuvamo o vama</li>
                            <li><strong>Pravo na ispravku:</strong> Možete zatražiti ispravku netačnih podataka</li>
                            <li><strong>Pravo na brisanje:</strong> Možete zatražiti brisanje vaših podataka (uz određene zakonske izuzetke)</li>
                            <li><strong>Pravo na ograničenje obrade:</strong> Možete zatražiti privremeno ograničenje obrade</li>
                            <li><strong>Pravo na prenosivost:</strong> Možete zatražiti prenos podataka u strukturisanom formatu</li>
                            <li><strong>Pravo na prigovor:</strong> Možete uložiti prigovor na obradu zasnovanu na legitimnom interesu</li>
                            <li><strong>Pravo na opoziv saglasnosti:</strong> Možete opozvati saglasnost za marketing u bilo kom trenutku</li>
                        </ul>
                        <p className="mb-4">
                            Za ostvarivanje svojih prava, kontaktirajte nas na: <a href="mailto:salon@namestajcarevic.rs" className="text-primary underline">salon@namestajcarevic.rs</a>
                        </p>
                        <p className="mb-4">
                            Takođe imate pravo da podnesete pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti Republike Srbije.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">8. Bezbednost Podataka</h2>
                        <p className="mb-4">
                            Primenjujemo odgovarajuće tehničke i organizacione mere zaštite kako bismo zaštitili vaše podatke od neovlašćenog pristupa, gubitka, zloupotrebe ili otkrivanja. To uključuje:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>SSL/TLS enkripciju za prenos podataka</li>
                            <li>Bezbedne servere i baze podataka</li>
                            <li>Ograničen pristup podacima samo ovlašćenom osoblju</li>
                            <li>Redovne bezbednosne provere i ažuriranja</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">9. Prava Dece</h2>
                        <p className="mb-4">
                            Naš sajt nije namenjen deci mlađoj od 16 godina. Svesno ne prikupljamo podatke od dece. Ako saznamo da smo prikupili podatke deteta bez saglasnosti roditelja, preduzećemo korake da te podatke obrišemo.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">10. Izmene Politike Privatnosti</h2>
                        <p className="mb-4">
                            Zadržavamo pravo da ažuriramo ovu Politiku privatnosti. O značajnim izmenama ćemo vas obavestiti putem email-a ili obaveštenja na sajtu. Datum poslednjeg ažuriranja je naveden na vrhu dokumenta.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">11. Kontakt</h2>
                        <p className="mb-4">
                            Za sva pitanja u vezi sa zaštitom podataka, kontaktirajte nas:
                        </p>
                        <p className="mb-4">
                            <strong>Email:</strong> <a href="mailto:salon@namestajcarevic.rs" className="text-primary underline">salon@namestajcarevic.rs</a><br />
                            <strong>Telefon:</strong> +381-64-119-31-83, +381-60-024-42-02<br />
                            <strong>Adresa:</strong> Božidara Milosavljevića 12, 34000 Kragujevac, Srbija
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
