import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Uslovi Korišćenja - Nameštaj Carević',
    description: 'Opšti uslovi prodaje i korišćenja - Nameštaj Carević Kragujevac',
};

export default function TermsOfUsePage() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="container mx-auto px-4 md:px-6 py-24">
                <div className="max-w-4xl mx-auto prose prose-lg">
                    <h1 className="font-serif text-4xl font-bold text-primary mb-6">Opšti Uslovi Korišćenja i Prodaje</h1>
                    <p className="text-muted-foreground mb-8">Poslednje ažuriranje: 4. februar 2026.</p>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">1. Osnovne Informacije o Prodavcu</h2>
                        <p className="mb-4">
                            <strong>Prodavac:</strong><br />
                            DRAGAN CAREVIĆ PREDUZETNIK POPRAVKA NAMEŠTAJA I TRGOVINSKA RADNJA CAREVIĆ KRAGUJEVAC<br />
                            PIB: 105589582<br />
                            Matični broj: 61812504<br />
                            Adresa: Božidara Milosavljevića 12, 34000 Kragujevac, Srbija<br />
                            Email: salon@namestajcarevic.rs, carevicnamestaj@gmail.com<br />
                            Telefon: +381-64-119-31-83, +381-60-024-42-02<br />
                            Website: <a href="https://namestajcarevic.rs" className="text-primary underline">https://namestajcarevic.rs</a>
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">2. Opšte Odredbe</h2>
                        <p className="mb-4">
                            Ovi Opšti uslovi uređuju odnose između prodavca i kupca prilikom kupovine nameštaja putem internet sajta namestajcarevic.rs. Korišćenjem sajta i slanjem upita, prihvatate ove uslove u celosti.
                        </p>
                        <p className="mb-4">
                            Ovi uslovi su sačinjeni u skladu sa:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Zakonom o zaštiti potrošača Republike Srbije</li>
                            <li>Zakonom o trgovini Republike Srbije</li>
                            <li>Zakonom o elektronskoj trgovini Republike Srbije</li>
                            <li>Zakonom o obligacionim odnosima Republike Srbije</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">3. Proces Poručivanja i Sklapanje Ugovora</h2>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">3.1 Upit putem forme</h3>
                        <p className="mb-4">
                            Popunjavanjem kontakt forme ili forme za upit o proizvodu, kupac iskazuje interesovanje za kupovinu. <strong>Popunjavanje forme ne predstavlja obavezujuću porudžbinu niti fiskalni račun.</strong>
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">3.2 Kontaktiranje od strane prodavca</h3>
                        <p className="mb-4">
                            Nakon prijema upita, predstavnik Nameštaj Carević će vas kontaktirati u roku od <strong>24 sata tokom radne nedelje</strong> (ponedeljak-petak, 10:00-19:00h, subota 10:00-14:00h) radi:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Potvrde dostupnosti proizvoda</li>
                            <li>Dogovora o finalnoj ceni</li>
                            <li>Dogovora o načinu plaćanja</li>
                            <li>Dogovora o roku i načinu isporuke</li>
                            <li>Odgovora na dodatna pitanja</li>
                        </ul>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">3.3 Sklapanje ugovora</h3>
                        <p className="mb-4">
                            Ugovor se smatra zaključenim kada kupac i prodavac usmeno ili pisanim putem (email, SMS, WhatsApp) postignu saglasnost o svim bitnim elementima kupoprodaje (proizvod, cena, isporuka, plaćanje).
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">4. Informacije o Proizvodima</h2>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                            <p className="font-semibold text-yellow-800 mb-2">⚠️ VAŽNO OBAVEŠTENJE</p>
                            <ul className="list-disc pl-6 text-yellow-800">
                                <li><strong>Slike proizvoda</strong> mogu biti 3D modeli, renderovane slike ili slike generisane veštačkom inteligencijom i služe isključivo za ilustraciju.</li>
                                <li><strong>Dimenzije</strong> su okvirno određene i mogu varirati. Ne garantujemo apsolutnu tačnost dimenzija zbog velikog broja proizvoda u ponudi.</li>
                                <li><strong>Boje</strong> se mogu razlikovati od prikazanih na sajtu usled različitih postavki monitora, kao i prirodnih varijacija u materijalima.</li>
                                <li><strong>Cene</strong> prikazane na sajtu su informativne. Finalna cena će biti potvrđena prilikom kontaktiranja od strane Nameštaj Carević.</li>
                            </ul>
                        </div>

                        <p className="mb-4">
                            Kupac je dužan da pre finalizacije kupovine potvrdi sve detalje (dimenzije, boju, materijal, cenu) sa predstavnikom prodavca.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">5. Cene i Način Plaćanja</h2>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">5.1 Cene</h3>
                        <p className="mb-4">
                            Sve cene su izražene u dinarima (RSD) i uključuju PDV. <strong>Cene prikazane na sajtu su informativne i podložne su promenama.</strong> Finalna cena će biti potvrđena prilikom kontakta sa prodavcem.
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">5.2 Načini plaćanja</h3>
                        <p className="mb-4">Plaćanje se vrši na jedan od sledećih načina (u dogovoru sa prodavcem):</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Gotovinsko plaćanje prilikom preuzimanja (pouzećem)</li>
                            <li>Gotovinsko plaćanje u salonu</li>
                            <li>Virmansko plaćanje (uplata na račun)</li>
                            <li>Plaćanje karticom u salonu</li>
                            <li>Plaćanje na rate (u dogovoru sa prodavcem)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">6. Dostava</h2>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">6.1 Rokovi dostave</h3>
                        <p className="mb-4">
                            Rok isporuke zavisi od dostupnosti proizvoda i dogovara se individualno sa svakim kupcem. Orijentacioni rok je <strong>3-10 radnih dana</strong> od potvrde porudžbine, ali može biti i duži za proizvode koji se izrađuju po meri.
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">6.2 Troškovi dostave</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Besplatna dostava</strong> za grad Kragujevac</li>
                            <li>Za ostale gradove, troškovi dostave se dogovaraju individualno</li>
                        </ul>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">6.3 Preuzimanje proizvoda</h3>
                        <p className="mb-4">
                            Prilikom preuzimanja, kupac je dužan da pregleda proizvod i proveri da li postoje vidljiva oštećenja. Eventualne primedbe na fizička oštećenja nastala tokom transporta moraju biti zabeležene u zapisniku dostavljača.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">7. Pravo na Odustanak od Ugovora (14 Dana)</h2>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                            <p className="font-semibold text-blue-800 mb-2">✓ ZAKONSKO PRAVO POTROŠAČA</p>
                            <p className="text-blue-800">
                                U skladu sa Zakonom o zaštiti potrošača (Član 30-32), imate pravo da odustanete od ugovora u roku od <strong>14 dana od dana preuzimanja proizvoda, bez navođenja razloga.</strong>
                            </p>
                        </div>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">7.1 Kako odustati</h3>
                        <p className="mb-4">
                            Za odustanak od ugovora, potrebno je da nas obavestite putem:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Email: <a href="mailto:salon@namestajcarevic.rs" className="text-primary underline">salon@namestajcarevic.rs</a></li>
                            <li>Telefon: +381-64-119-31-83, +381-60-024-42-02</li>
                            <li>Pisanim putem na adresu: Božidara Milosavljevića 12, 34000 Kragujevac</li>
                        </ul>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">7.2 Vraćanje proizvoda</h3>
                        <p className="mb-4">
                            Nakon što nas obavestite o odustanku, imate <strong>14 dana</strong> da vratite proizvod na adresu:<br />
                            <strong>Božidara Milosavljevića 12, 34000 Kragujevac, Srbija</strong>
                        </p>
                        <p className="mb-4">
                            Proizvod mora biti vraćen u originalnom stanju, nekorišćen i neoštećen, sa svom originalnom ambalažom i dokumentacijom.
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">7.3 Troškovi vraćanja</h3>
                        <p className="mb-4">
                            <strong>Troškove vraćanja proizvoda snosi kupac</strong>, osim u slučaju kada je proizvod neispravan ili ne odgovara poručenom.
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">7.4 Povraćaj novca</h3>
                        <p className="mb-4">
                            Povraćaj novca vršimo u roku od <strong>14 dana od dana prijema vraćenog proizvoda</strong>, nakon što proverimo da je proizvod u ispravnom stanju. Povraćaj se vrši na isti način na koji je izvršeno plaćanje, osim ako kupac nije izričito pristao na drugi način.
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">7.5 Izuzeci</h3>
                        <p className="mb-4">
                            Pravo na odustanak ne postoji za:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Proizvode izrađene po posebnoj meri ili specifikaciji kupca</li>
                            <li>Proizvode koji su po svojoj prirodi nepovratni nakon otvaranja ambalaže (npr. madraci)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">8. Garancija i Reklamacije</h2>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">8.1 Garancija</h3>
                        <p className="mb-4">
                            Na sve proizvode dajemo garanciju u skladu sa zakonom i specifikacijama proizvođača. Period garancije zavisi od vrste proizvoda i biće naveden u garantnom listu koji dobijate uz proizvod.
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">8.2 Podnošenje reklamacije</h3>
                        <p className="mb-4">
                            Reklamacije se podnose putem:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Email: <a href="mailto:salon@namestajcarevic.rs" className="text-primary underline">salon@namestajcarevic.rs</a></li>
                            <li>Telefon: +381-64-119-31-83, +381-60-024-42-02</li>
                            <li>Lično u salonu: Božidara Milosavljevića 12, Kragujevac</li>
                        </ul>
                        <p className="mb-4">
                            Uz reklamaciju je potrebno priložiti:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Račun ili drugi dokaz o kupovini</li>
                            <li>Garantni list (ako postoji)</li>
                            <li>Opis nedostatka</li>
                            <li>Fotografije nedostatka (ako je moguće)</li>
                        </ul>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">8.3 Rešavanje reklamacije</h3>
                        <p className="mb-4">
                            Reklamacije rešavamo u zakonskom roku od <strong>8 dana</strong> od dana prijema. O ishodu reklamacije obaveštavamo kupca pisanim putem.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">9. Odgovornost</h2>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">9.1 Odgovornost prodavca</h3>
                        <p className="mb-4">
                            Prodavac odgovara za materijalne nedostatke proizvoda u skladu sa zakonom. Prodavac ne odgovara za štetu nastalu nenamenom upotrebom proizvoda ili nepridržavanjem uputstava za upotrebu.
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">9.2 Ograničenje odgovornosti za informacije na sajtu</h3>
                        <p className="mb-4">
                            S obzirom da se slike, dimenzije i cene na sajtu mogu razlikovati od stvarnih, prodavac ne odgovara za eventualne razlike ukoliko kupac nije potvrdio sve detalje sa predstavnikom prodavca pre finalizacije kupovine.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">10. Intelektualna Svojina</h2>
                        <p className="mb-4">
                            Sav sadržaj na sajtu namestajcarevic.rs (tekstovi, slike, logotipi, dizajn) je zaštićen autorskim pravima i vlasništvo je Nameštaj Carević. Zabranjeno je kopiranje, distribucija ili bilo kakva upotreba sadržaja bez pisane saglasnosti.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">11. Zaštita Podataka</h2>
                        <p className="mb-4">
                            Podaci koje nam dostavite biće korišćeni u skladu sa našom <a href="/privacy-policy" className="text-primary underline">Politikom Privatnosti</a>. Poštujemo vašu privatnost i primenjujemo sve potrebne mere zaštite.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">12. Rešavanje Sporova</h2>
                        <p className="mb-4">
                            Prodavac i kupac će sve eventualne sporove nastojati da reše sporazumno. U slučaju da to nije moguće, nadležan je sud u Kragujevcu.
                        </p>
                        <p className="mb-4">
                            Kupac ima pravo da se obrati i organizacijama za zaštitu potrošača ili da pokrene postupak vansudskog rešavanja potrošačkih sporova.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">13. Izmene Uslova</h2>
                        <p className="mb-4">
                            Zadržavamo pravo da izmenimo ove Opšte uslove. Izmene stupaju na snagu objavljivanjem na sajtu. Na ugovore zaključene pre izmena primenjuju se uslovi koji su važili u trenutku zaključenja ugovora.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">14. Kontakt</h2>
                        <p className="mb-4">
                            Za sva pitanja u vezi sa ovim uslovima, kontaktirajte nas:
                        </p>
                        <p className="mb-4">
                            <strong>Email:</strong> <a href="mailto:salon@namestajcarevic.rs" className="text-primary underline">salon@namestajcarevic.rs</a><br />
                            <strong>Telefon:</strong> +381-64-119-31-83, +381-60-024-42-02<br />
                            <strong>Adresa:</strong> Božidara Milosavljevića 12, 34000 Kragujevac, Srbija<br />
                            <strong>Radno vreme:</strong> Ponedeljak-Petak 10:00-19:00h, Subota 10:00-14:00h
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
