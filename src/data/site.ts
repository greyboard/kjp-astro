// Zentrale Praxisdaten. Einzige Quelle für NAP, Zeiten und Embed-IDs.

export const site = {
  url: 'https://www.kinder-jugendpsychiater.org',
  name: 'Praxis Manfred Estrada Aguila & Dr. Christina Islinger',
  shortName: 'Estrada Aguila & Dr. Islinger',
  formerName: 'Praxis Manfred Wurstner',
  tagline: 'Kinder- und Jugendpsychiater mit interdisziplinärem Team',
  since: 2004,
  doctors: ['Manfred Estrada Aguila', 'Dr. med. Christina Islinger'],
  address: {
    street: 'Landshuter Straße 9',
    zip: '93047',
    city: 'Regensburg',
    region: 'Bayern',
    country: 'DE',
  },
  phone: { display: '0941 640 82 80', href: 'tel:+499416408280', intl: '+49 941 640 82 80' },
  fax: '0941 640 82 829',
  email: 'info@kinder-jugendpsychiater.de',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Landshuter+Stra%C3%9Fe+9%2C+93047+Regensburg',
  openingHours: [
    { label: 'Montag bis Donnerstag', time: '9:00 bis 17:00 Uhr', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '17:00' },
    { label: 'Freitag', time: '9:00 bis 16:00 Uhr', days: ['Friday'], opens: '09:00', closes: '16:00' },
  ],
  phoneHours: 'Montag bis Freitag, 9:00 bis 12:00 Uhr',
  ghl: {
    formAnmeldung: 'gWIs051AGGUfuDZYJcJk',
    formJugendliche: 'uA2MDTDNIdwShkhqI6BC',
    booking: 'akuipidboHSy7oZTDfX1',
  },
  downloads: [
    { label: 'Erstfragebogen Kinder', href: '/downloads/fragebogen-kinder.pdf', size: '2,7 MB' },
    { label: 'Erstfragebogen Jugendliche', href: '/downloads/fragebogen-jugendliche.pdf', size: '4,5 MB' },
    { label: 'Behandlungsvertrag', href: '/downloads/behandlungsvertrag-allg.pdf', size: '0,4 MB' },
  ],
};

// Bis die übrigen Seiten gebaut sind, zeigen Links auf die Altseite (vor Go-Live umstellen)
const OLD = 'https://www.kinder-jugendpsychiater.org';

export type MenuLink = { label: string; href: string; text?: string };
export type MenuGroup = {
  label: string;
  intro: string;
  feature: 'diagnose' | 'therapie' | 'praxis';
  columns: { title: string; links: MenuLink[] }[];
  cta: { label: string; href: string };
};

export const megaMenu: MenuGroup[] = [
  {
    label: 'Diagnose',
    intro: 'Am Anfang steht immer eine sorgfältige Abklärung, mit Zeit und mehreren Blickwinkeln.',
    feature: 'diagnose',
    columns: [
      {
        title: 'Aufmerksamkeit und Lernen',
        links: [
          { label: 'ADHS / ADS', href: '/diagnose/adhs-ads', text: 'Unruhe, Ablenkbarkeit, Impulsivität' },
          { label: 'Legasthenie und Dyskalkulie', href: `${OLD}/diagnose/legasthenie-dyskalkulie`, text: 'Lesen, Schreiben, Rechnen' },
          { label: 'Störungen des Sozialverhaltens', href: `${OLD}/diagnose/stoerungen-des-sozialverhaltens` },
        ],
      },
      {
        title: 'Gefühle und Belastung',
        links: [
          { label: 'Depression und emotionale Störungen', href: `${OLD}/diagnose/emotionale-stoerung` },
          { label: 'Ängste', href: `${OLD}/diagnose/angststoerung` },
          { label: 'Traumata und Belastungsstörungen', href: `${OLD}/diagnose/belastungsstoerung` },
          { label: 'Borderline-Störung', href: `${OLD}/diagnose/borderline-stoerung` },
        ],
      },
      {
        title: 'Körper und Seele',
        links: [
          { label: 'Psychosomatische Beschwerden', href: `${OLD}/diagnose` },
          { label: 'Kopfschmerzen und Migräne', href: `${OLD}/diagnose/kopfschmerzen/migraene` },
          { label: 'Einnässen und Einkoten', href: `${OLD}/diagnose/einnaessen-einkoten` },
        ],
      },
    ],
    cta: { label: 'Alle Krankheitsbilder', href: `${OLD}/diagnose` },
  },
  {
    label: 'Therapie',
    intro: 'Ärztliche, psychologische und pädagogische Angebote, verbunden zu einem Plan, der zu Ihrem Kind passt.',
    feature: 'therapie',
    columns: [
      {
        title: 'Für Kinder und Jugendliche',
        links: [
          { label: 'Einzeltherapie', href: `${OLD}/therapie/einzeltherapie`, text: 'Ein geschützter Raum im eigenen Tempo' },
          { label: 'Gruppentherapie', href: `${OLD}/therapie/gruppentherapie`, text: 'Mit Gleichaltrigen üben und wachsen' },
          { label: 'Ärztliche Behandlung', href: `${OLD}/therapie/medikation`, text: 'Fachärztliche Begleitung und Medikation' },
        ],
      },
      {
        title: 'Für Eltern und Familien',
        links: [
          { label: 'Familientherapie', href: `${OLD}/therapie/familientherapie`, text: 'Neue Wege im Miteinander' },
          { label: 'Beratung', href: `${OLD}/therapie/beratung`, text: 'Orientierung für Eltern und Schule' },
          { label: 'Elterngruppe', href: `${OLD}/therapie/elterngruppe`, text: 'Austausch und konkrete Strategien' },
        ],
      },
    ],
    cta: { label: 'Alle Therapieangebote', href: `${OLD}/therapie` },
  },
  {
    label: 'Praxis',
    intro: `Ein erfahrener Kinder- und Jugendpsychiater und sein Team, seit ${site.since} in Regensburg.`,
    feature: 'praxis',
    columns: [
      {
        title: 'Über uns',
        links: [
          { label: 'Team und Praxis', href: `${OLD}/ueber-uns` },
          { label: 'Ablauf Ersttermin', href: `${OLD}/ueber-uns/ablauf-ersttermin` },
          { label: 'Diagnostik', href: `${OLD}/ueber-uns/diagnostik` },
          { label: 'Testpsychologie', href: `${OLD}/ueber-uns/testpsychologie` },
        ],
      },
      {
        title: 'Lesen',
        links: [
          { label: 'Aktuelles', href: `${OLD}/aktuelles` },
          { label: 'Gedanken aus dem Praxisalltag', href: `${OLD}/gedanken` },
          { label: 'Fallbeispiele', href: `${OLD}/fallbeispiele/lukas-wenn-energie-ihren-platz-sucht` },
        ],
      },
      {
        title: 'Service',
        links: [
          { label: 'Erstanmeldung', href: '/kontakt#anmeldung' },
          { label: 'Rezept vorbestellen', href: '/kontakt#rezept' },
          { label: 'Unterlagen herunterladen', href: '/kontakt#download' },
          { label: 'Anfahrt und Parken', href: '/kontakt#anfahrt' },
        ],
      },
    ],
    cta: { label: 'Kontakt aufnehmen', href: '/kontakt' },
  },
];

// Vorschau-Modus: alles außer explizit "false" gilt als Demo (noindex).
export const isDemo = import.meta.env.PUBLIC_DEMO_MODE !== 'false';

export function clinicSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${site.url}/#praxis`,
    name: site.name,
    alternateName: [site.formerName, 'Kinder- und Jugendpsychiater Regensburg'],
    description: `${site.tagline} in Regensburg. Diagnostik, Therapie und Beratung für Kinder, Jugendliche und Familien.`,
    url: site.url,
    logo: `${site.url}/favicon.svg`,
    telephone: site.phone.intl,
    faxNumber: site.fax,
    email: site.email,
    foundingDate: String(site.since),
    medicalSpecialty: ['Psychiatric', 'Pediatric'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: site.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    employee: site.doctors.map((name) => ({
      '@type': 'Physician',
      name,
      medicalSpecialty: 'Psychiatric',
    })),
  };
}
