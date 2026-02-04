import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Politika Kolačića - Nameštaj Carević',
    description: 'Politika korišćenja kolačića i tehnologija praćenja - Nameštaj Carević Kragujevac',
};

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="container mx-auto px-4 md:px-6 py-24">
                <div className="max-w-4xl mx-auto prose prose-lg">
                    <h1 className="font-serif text-4xl font-bold text-primary mb-6">Politika Kolačića</h1>
                    <p className="text-muted-foreground mb-8">Poslednje ažuriranje: 4. februar 2026.</p>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">1. Šta su Kolačići?</h2>
                        <p className="mb-4">
                            Kolačići (cookies) su male tekstualne datoteke koje se pohranjuju na vašem uređaju (računar, telefon, tablet) kada posetite internet sajt. Kolačići omogućavaju sajtu da zapamti vaše radnje i postavke (kao što su jezik, veličina fonta, i druge preferencije) tokom određenog perioda, tako da ih ne morate ponovo unositi svaki put kada posetite sajt ili pređete sa jedne stranice na drugu.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">2. Zašto Koristimo Kolačiće?</h2>
                        <p className="mb-4">
                            Nameštaj Carević koristi kolačiće iz sledećih razloga:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Funkcionisanje sajta:</strong> Da bi sajt ispravno radio i da biste mogli da koristite sve funkcionalnosti</li>
                            <li><strong>Analitika:</strong> Da razumemo kako korisnici koriste naš sajt i kako možemo da ga unapredimo</li>
                            <li><strong>Marketing:</strong> Da vam prikažemo relevantne oglase i merimo efikasnost naših marketinških kampanja</li>
                            <li><strong>Personalizacija:</strong> Da zapamtimo vaše preferencije i pružimo vam bolje korisničko iskustvo</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">3. Vrste Kolačića Koje Koristimo</h2>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">3.1 Neophodni Kolačići</h3>
                        <p className="mb-4">
                            Ovi kolačići su neophodne za funkcionisanje sajta i ne mogu se isključiti. Obično se postavljaju samo kao odgovor na vaše radnje koje predstavljaju zahtev za uslugama, kao što su podešavanje privatnosti, prijavljivanje ili popunjavanje formi.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <p className="font-semibold mb-2">Primeri:</p>
                            <ul className="list-disc pl-6">
                                <li><strong>session_id:</strong> Identifikacija sesije korisnika (trajanje: sesija)</li>
                                <li><strong>cookie_consent:</strong> Čuvanje vaših postavki za kolačiće (trajanje: 1 godina)</li>
                            </ul>
                        </div>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">3.2 Analitički Kolačići (Google Analytics)</h3>
                        <p className="mb-4">
                            Ovi kolačići nam omogućavaju da brojimo posete i izvore saobraćaja kako bismo mogli da merimo i poboljšamo performanse našeg sajta. Pomažu nam da saznamo koje stranice su najpopularnije, koje najmanje, i kako se posetioci kreću kroz sajt.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <p className="font-semibold mb-2">Google Analytics kolačići:</p>
                            <ul className="list-disc pl-6">
                                <li><strong>_ga:</strong> Razlikuje korisnike (trajanje: 2 godine)</li>
                                <li><strong>_gid:</strong> Razlikuje korisnike (trajanje: 24 sata)</li>
                                <li><strong>_gat:</strong> Ograničava broj zahteva (trajanje: 1 minut)</li>
                                <li><strong>_ga_[container-id]:</strong> Čuva stanje sesije (trajanje: 2 godine)</li>
                            </ul>
                            <p className="mt-2 text-sm">
                                <strong>Podaci koji se prikupljaju:</strong> IP adresa (anonimizovana), tip uređaja, operativni sistem, pregledač, posećene stranice, vreme provedeno na sajtu, geografska lokacija (grad/država)
                            </p>
                        </div>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">3.3 Marketinški Kolačići</h3>
                        <p className="mb-4">
                            Ovi kolačići se koriste za praćenje posetilaca kroz različite sajtove. Cilj je prikazivanje oglasa koji su relevantni i zanimljivi pojedinačnom korisniku.
                        </p>

                        <h4 className="font-semibold mb-2">Google Ads</h4>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <ul className="list-disc pl-6">
                                <li><strong>_gcl_au:</strong> Google Ads konverzije (trajanje: 3 meseca)</li>
                                <li><strong>IDE:</strong> Google DoubleClick za remarketing (trajanje: 1 godina)</li>
                                <li><strong>test_cookie:</strong> Provera da li pregledač podržava kolačiće (trajanje: 15 minuta)</li>
                            </ul>
                            <p className="mt-2 text-sm">
                                <strong>Podaci koji se prikupljaju:</strong> Informacije o oglasima koje ste videli, oglasima na koje ste kliknuli, stranicama koje ste posetili pre i posle klika na oglas
                            </p>
                            <p className="mt-2 text-sm">
                                <strong>Svrha:</strong> Prikazivanje personalizovanih oglasa, merenje efikasnosti kampanja, remarketing
                            </p>
                        </div>

                        <h4 className="font-semibold mb-2">Meta Pixel (Facebook/Instagram)</h4>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <ul className="list-disc pl-6">
                                <li><strong>_fbp:</strong> Facebook Pixel (trajanje: 3 meseca)</li>
                                <li><strong>fr:</strong> Facebook remarketing (trajanje: 3 meseca)</li>
                                <li><strong>_fbc:</strong> Facebook klik identifikator (trajanje: 2 godine)</li>
                            </ul>
                            <p className="mt-2 text-sm">
                                <strong>Podaci koji se prikupljaju:</strong> Informacije o vašoj aktivnosti na sajtu, proizvodi koje gledate, radnje koje preduzmete (klik na dugme, popunjavanje forme)
                            </p>
                            <p className="mt-2 text-sm">
                                <strong>Svrha:</strong> Prikazivanje personalizovanih oglasa na Facebooku i Instagramu, merenje konverzija, kreiranje publike sličnih korisnika (lookalike audiences), remarketing
                            </p>
                        </div>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">3.4 Funkcionalni Kolačići</h3>
                        <p className="mb-4">
                            Ovi kolačići omogućavaju sajtu da pruži poboljšane funkcionalnosti i personalizaciju. Mogu biti postavljeni od strane nas ili trećih strana čije smo usluge dodali na naše stranice.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <p className="font-semibold mb-2">Primeri:</p>
                            <ul className="list-disc pl-6">
                                <li><strong>language:</strong> Čuva izbor jezika (trajanje: 1 godina)</li>
                                <li><strong>theme:</strong> Čuva postavke teme (svetla/tamna) (trajanje: 1 godina)</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">4. Kolačići Trećih Strana</h2>
                        <p className="mb-4">
                            Pored naših kolačića, koristimo i kolačiće trećih strana za analitiku i marketing. Ove treće strane mogu prikupljati informacije o vašoj aktivnosti na našem sajtu i drugim sajtovima.
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">4.1 Google (Analytics, Ads)</h3>
                        <p className="mb-4">
                            Google može koristiti prikupljene podatke za kontekstualizaciju i personalizaciju oglasa u svojoj oglasnoj mreži.
                        </p>
                        <p className="mb-4">
                            <strong>Politika privatnosti:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://policies.google.com/privacy</a><br />
                            <strong>Odjava:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Analytics Opt-out</a>, <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Ads Settings</a>
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">4.2 Meta (Facebook, Instagram)</h3>
                        <p className="mb-4">
                            Meta koristi podatke prikupljene putem Pixela za prikazivanje personalizovanih oglasa na Facebooku i Instagramu, kao i za merenje efikasnosti kampanja.
                        </p>
                        <p className="mb-4">
                            <strong>Politika privatnosti:</strong> <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://www.facebook.com/privacy/policy/</a><br />
                            <strong>Odjava:</strong> <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="text-primary underline">Facebook Ad Preferences</a>
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">5. Vaša Saglasnost</h2>
                        <p className="mb-4">
                            Kada prvi put posetite naš sajt, prikazujemo vam banner za kolačiće gde možete da:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Prihvatite sve kolačiće:</strong> Dozvoljavate korišćenje svih kolačića (neophodnih, analitičkih, marketinških, funkcionalnih)</li>
                            <li><strong>Prilagodite postavke:</strong> Birate koje kategorije kolačića želite da dozvolite</li>
                            <li><strong>Odbijete opcione kolačiće:</strong> Dozvoljavate samo neophodne kolačiće</li>
                        </ul>
                        <p className="mb-4">
                            Vaša saglasnost se čuva 12 meseci, nakon čega ćete ponovo biti upitani.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">6. Kako Upravljati Kolačićima?</h2>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">6.1 Putem našeg sajta</h3>
                        <p className="mb-4">
                            Možete promeniti svoje postavke kolačića u bilo kom trenutku klikom na link "Postavke kolačića" u footeru sajta.
                        </p>

                        <h3 className="font-serif text-xl font-semibold text-primary mb-3">6.2 Putem pregledača</h3>
                        <p className="mb-4">
                            Većina internet pregledača je podešena da automatski prihvata kolačiće, ali možete promeniti postavke da blokirate kolačiće ili da vas upozore kada se kolačić šalje na vaš uređaj.
                        </p>
                        <p className="mb-4">Uputstva za upravljanje kolačićima u popularnim pregledačima:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Chrome</a></li>
                            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary underline">Mozilla Firefox</a></li>
                            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary underline">Safari</a></li>
                            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary underline">Microsoft Edge</a></li>
                        </ul>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                            <p className="font-semibold text-yellow-800 mb-2">⚠️ Napomena</p>
                            <p className="text-yellow-800">
                                Ako blokirate ili obrišete kolačiće, neke funkcionalnosti sajta možda neće raditi ispravno.
                            </p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">7. Do Not Track (DNT)</h2>
                        <p className="mb-4">
                            Neki pregledači imaju "Do Not Track" (DNT) funkciju koja signalizira sajtovima da ne želite da budete praćeni. Trenutno ne postoji industrijski standard za DNT signale, ali poštujemo vaš izbor i ne postavljamo opcione kolačiće ako ste odbili saglasnost putem našeg cookie bannera.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">8. Ažuriranja Politike Kolačića</h2>
                        <p className="mb-4">
                            Možemo povremeno ažurirati ovu Politiku kolačića kako bismo odražavali promene u tehnologijama koje koristimo ili zakonskim zahtevima. Datum poslednjeg ažuriranja je naveden na vrhu dokumenta.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">9. Više Informacija</h2>
                        <p className="mb-4">
                            Za više informacija o tome kako koristimo vaše podatke, pročitajte našu <a href="/privacy-policy" className="text-primary underline">Politiku Privatnosti</a>.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-4">10. Kontakt</h2>
                        <p className="mb-4">
                            Ako imate pitanja o našoj upotrebi kolačića, kontaktirajte nas:
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
