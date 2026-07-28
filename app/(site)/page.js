import Link from 'next/link';
import { getPublicSettings } from '../../lib/queries';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const settings = await getPublicSettings();
  const minPrijs = Math.min(...(settings.dekken || []).map((d) => d.prijs));

  return (
    <div>
      {/* Hero */}
      <div className="hero-height" style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={settings.fotos.hero}
          alt="Lobby MS Viva Moments"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,21,36,0.72) 0%, rgba(11,21,36,0.45) 45%, rgba(11,21,36,0.96) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(95deg, rgba(11,21,36,0.94) 0%, rgba(11,21,36,0.82) 38%, rgba(11,21,36,0.35) 68%, rgba(11,21,36,0.1) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1240, margin: '0 auto', padding: '0 32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ animation: 'fadeUp .8s ease both' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
              <div style={{ width: 56, height: 1, background: '#c9a45c' }} />
              <div style={{ fontSize: 13, letterSpacing: '0.38em', textTransform: 'uppercase', color: '#c9a45c' }}>Denny Braaf presenteert</div>
            </div>
            <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 'clamp(56px,7.4vw,108px)', fontWeight: 400, lineHeight: 1.03, margin: 0, color: '#f4efe4', maxWidth: 940, letterSpacing: '0.02em', textShadow: '0 2px 30px rgba(8,17,32,0.85), 0 1px 6px rgba(8,17,32,0.6)' }}>
              Stars on the<br />
              <span style={{ color: '#e2c284' }}>River Cruise</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(232,228,218,0.85)', maxWidth: 540, margin: '28px 0 40px' }}>
              Een muzikale riviercruise aan boord van de vijfsterren MS Viva Moments. Van Zaandam naar Arnhem — met livemuziek, galadiner en feest tot in de kleine uurtjes.
            </p>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/hutten" className="gold-btn" style={{ cursor: 'pointer', padding: '16px 34px', background: '#c9a45c', color: '#0b1524', fontSize: 14, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>
                Bekijk hutten &amp; prijzen
              </Link>
              <Link href="/programma" className="outline-btn" style={{ cursor: 'pointer', padding: '15px 34px', border: '1px solid rgba(232,228,218,0.4)', color: '#f4efe4', fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>
                Het programma
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feiten strip */}
      <div style={{ borderTop: '1px solid rgba(201,164,92,0.25)', borderBottom: '1px solid rgba(201,164,92,0.25)', background: '#0e1b2e' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 24 }}>
          <Feit label="Afvaart" waarde="Zaandam, Prins Hendrikkade" />
          <Feit label="Data" waarde="Vr 19 – zo 21 maart 2027" />
          <Feit label="Schip" waarde="MS Viva Moments ★★★★★" />
          <Feit label="Vanaf" waarde={`€ ${minPrijs} per persoon`} />
        </div>
      </div>

      {/* Intro + foto's */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(56px,8vw,110px) 24px 60px' }} className="grid-intro">
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 18 }}>De ervaring</div>
          <h2 style={{ fontFamily: "'Italiana',serif", fontSize: 44, fontWeight: 500, lineHeight: 1.15, margin: '0 0 24px', color: '#f4efe4' }}>Een varend vijfsterrenhotel, gevuld met muziek</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(232,228,218,0.78)', margin: '0 0 18px' }}>
            U stapt vrijdagmiddag aan boord in Zaandam. Terwijl de skyline langzaam voorbijglijdt, geniet u van high tea, een diner met muzikale begeleiding en een feestavond met DJ Barry Brand. Zaterdag ligt het schip in Arnhem — de stad is van u, of blijf aan boord voor lunch en high tea met prosecco.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(232,228,218,0.78)', margin: '0 0 32px' }}>
            Alle hutten zijn voorzien van airconditioning, minikoelkast, waterkoker en koffiezetapparaat. Aan boord: restaurant, bistro met live cooking, panoramasalon met bar, wellness, fitness en kapper.
          </p>
          <Link href="/schip" className="link-gold" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12, color: '#c9a45c', fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>
            <span>Ontdek het schip</span>
            <span style={{ fontSize: 18 }}>→</span>
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <img src={settings.fotos.introA} alt="Bar en lounge" style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }} />
          <img src={settings.fotos.introB} alt="Suite met balkon" style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block', marginTop: 40 }} />
          <img src={settings.fotos.introC} alt="Restaurant" style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }} />
          <img src={settings.fotos.introD} alt="Panoramasalon" style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block', marginTop: 40 }} />
        </div>
      </div>

      {/* CTA band */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 32px 120px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(36px,5vw,72px) clamp(24px,5vw,64px)', background: 'linear-gradient(120deg, #12233c 0%, #0e1b2e 100%)', border: '1px solid rgba(201,164,92,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, border: '1px solid rgba(201,164,92,0.2)', transform: 'rotate(45deg)' }} />
          <div>
            <h3 style={{ fontFamily: "'Italiana',serif", fontSize: 36, fontWeight: 500, margin: '0 0 10px', color: '#f4efe4' }}>Kies uw hut op de plattegrond</h3>
            <p style={{ fontSize: 15.5, color: 'rgba(232,228,218,0.75)', margin: 0, maxWidth: 520, lineHeight: 1.7 }}>Zie per hut direct de beschikbaarheid en de prijs — van Smaragd Deck tot de suites op het Diamant Deck.</p>
          </div>
          <Link href="/hutten" className="gold-btn" style={{ cursor: 'pointer', flexShrink: 0, padding: '17px 36px', background: '#c9a45c', color: '#0b1524', fontSize: 14, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Naar het dekkenplan
          </Link>
        </div>
      </div>
    </div>
  );
}

function Feit({ label, waarde }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a45c' }}>{label}</span>
      <span style={{ fontFamily: "'Italiana',serif", fontSize: 22, color: '#f4efe4' }}>{waarde}</span>
    </div>
  );
}
