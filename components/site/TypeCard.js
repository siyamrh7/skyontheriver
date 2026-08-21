const WEEZTIX_URL = 'https://shop.weeztix.com/839a630b-7adb-11f1-8e27-d65b0659bc31';

export default function TypeCard({ t }) {
  const uitverkocht = t.beschikbaar === 'Uitverkocht';

  return (
    <div style={{ background: '#0e1b2e', border: '1px solid rgba(201,164,92,0.25)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative' }}>
        <img src={t.foto} alt={t.naam} style={{ width: '100%', height: 170, objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, background: '#c9a45c', color: '#0b1524', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '5px 10px' }}>
          {t.badge}
        </div>
      </div>
      <div style={{ padding: '22px 22px 26px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <div style={{ fontFamily: "'Italiana',serif", fontSize: 25, color: '#f4efe4' }}>{t.naam}</div>
        <div style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a45c' }}>{t.maat}</div>
        <div style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(232,228,218,0.7)', flex: 1 }}>{t.omschrijving}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
          <span style={{ fontFamily: "'Italiana',serif", fontSize: 32, color: '#f4efe4' }}>€ {t.prijs}</span>
          <span style={{ fontSize: 12.5, color: 'rgba(232,228,218,0.6)' }}>p.p.</span>
        </div>
        {/* {t.beschikbaar && <div style={{ fontSize: 12.5, color: t.beschKleur, marginBottom: 4 }}>{t.beschikbaar}</div>} */}

        {uitverkocht ? (
          <div
            className="gold-btn"
            style={{ cursor: 'not-allowed', opacity: 0.5, textAlign: 'center', padding: 13, background: '#c9a45c', color: '#0b1524', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}
          >
            Uitverkocht
          </div>
        ) : (
          <a
            href={WEEZTIX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn"
            style={{ cursor: 'pointer', textAlign: 'center', padding: 13, background: '#c9a45c', color: '#0b1524', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6, textDecoration: 'none', display: 'block' }}
          >
            Reserveer
          </a>
        )}
      </div>
    </div>
  );
}
