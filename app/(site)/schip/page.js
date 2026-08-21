import { getPublicSettings } from '../../../lib/queries';

export const dynamic = 'force-dynamic';

export default async function SchipPage() {
  const settings = await getPublicSettings();
  const f = settings.fotos;

  return (
    <div className="section-pad" style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 18 }}>Het schip</div>
      <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 'clamp(38px,6vw,60px)', fontWeight: 500, margin: '0 0 20px', color: '#f4efe4' }}>MS Joy</h1>
      <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(232,228,218,0.78)', maxWidth: 680, margin: '0 0 64px' }}>
        De MS JOY behoort sinds 2016 tot de Scylla-vloot. Ze is 135 meter lang, 11,45 meter breed en heeft een diepgang van 1,97 meter. Dit biedt ruimte aan 142 gasten, verdeeld over 22 master suites, 32 suites (waarvan 8 zich over twee dekken uitstrekken), 4 junior suites en 13 double rooms. De boven- en middendekken hebben Franse balkons en alle hutten kijken uit op de rivier.
      </p>

      <div className="grid-schip-groot">
        <img src={f.schipA} alt="Lobby met kroonluchter" style={{ width: '100%', height: 460, objectFit: 'cover', display: 'block' }} />
        <div style={{ display: 'grid', gap: 16 }}>
          <img src={f.schipB} alt="Lounge met ronde bank" style={{ width: '100%', height: 222, objectFit: 'cover', display: 'block' }} />
          <img src={f.schipC} alt="Wellness" style={{ width: '100%', height: 222, objectFit: 'cover', display: 'block' }} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginBottom: 72 }}>
        <img src={f.schipD} alt="Restaurant met wijnkast" style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
        <img src={f.schipE} alt="Panoramasalon met piano" style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
        <img src={f.schipF} alt="Fitness" style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 40 }}>
        <Blok titel="Restaurant, bistro & brasserie" tekst="Diner in het restaurant met wijnklimaatkast, of informeel tafelen in de bistro met live cooking. Vrijdag high tea, zaterdag galadiner met dinershow." />
        <Blok titel="Panoramasalon & bar" tekst="Ramen rondom, een vleugel en een ronde bar onder kristallen kroonluchters — hier speelt de muziek en dansen we tot de bar sluit." />
        <Blok titel="Wellness & fitness" tekst="Massageruimte, verwarmd zwembad en een fitnessruimte met Technogym-apparatuur. Bijkomen doet u op het zonnedek met ligstoelen en putting green." />
      </div>
    </div>
  );
}

function Blok({ titel, tekst }) {
  return (
    <div style={{ borderTop: '1px solid rgba(201,164,92,0.4)', paddingTop: 22 }}>
      <h3 style={{ fontFamily: "'Italiana',serif", fontSize: 26, fontWeight: 500, margin: '0 0 10px', color: '#f4efe4' }}>{titel}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(232,228,218,0.72)', margin: 0 }}>{tekst}</p>
    </div>
  );
}
