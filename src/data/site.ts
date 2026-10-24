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

export const nav = [
  { label: 'Start', href: '/' },
  { label: 'ADHS / ADS', href: '/diagnose/adhs-ads' },
  { label: 'Kontakt', href: '/kontakt' },
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
