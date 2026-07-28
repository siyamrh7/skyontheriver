export default function TypeCard({ t }) {
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
        <div style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a45c' }}>{t.dek}</div>
        <div style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(232,228,218,0.7)', flex: 1 }}>{t.omschrijving}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
          <span style={{ fontFamily: "'Italiana',serif", fontSize: 32, color: '#f4efe4' }}>€ {t.prijs}</span>
          <span style={{ fontSize: 12.5, color: 'rgba(232,228,218,0.6)' }}>p.p.</span>
        </div>
        <div style={{ fontSize: 12.5, color: t.beschKleur }}>{t.beschikbaar}</div>
      </div>
    </div>
  );
}
