'use client';
import { useState } from 'react';
import { apiPost } from '../../lib/apiClient';

function inputStyle() {
  return { background: '#12233c', border: '1px solid rgba(201,164,92,0.35)', color: '#f4efe4', padding: '10px 12px', fontFamily: "'Karla',sans-serif", fontSize: 13.5, outline: 'none', width: '100%' };
}

export default function TypeCard({ t }) {
  const [stap, setStap] = useState('idle');
  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const uitverkocht = t.beschikbaar === 'Uitverkocht';

  const submit = async () => {
    if (!naam.trim()) {
      setError('Naam is verplicht');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await apiPost('/api/bookings', { type: t.type, naam, email, tel });
      setStap('klaar');
    } catch (e) {
      setError(e.message || 'Er ging iets mis — probeer het opnieuw.');
      if (e.status === 409) setStap('idle');
    } finally {
      setBusy(false);
    }
  };

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
        {t.beschikbaar && <div style={{ fontSize: 12.5, color: t.beschKleur, marginBottom: 4 }}>{t.beschikbaar}</div>}

        {stap === 'idle' && (
          <div
            onClick={uitverkocht ? undefined : () => setStap('form')}
            className="gold-btn"
            style={{ cursor: uitverkocht ? 'not-allowed' : 'pointer', opacity: uitverkocht ? 0.5 : 1, textAlign: 'center', padding: 13, background: '#c9a45c', color: '#0b1524', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}
          >
            {uitverkocht ? 'Uitverkocht' : 'Reserveer'}
          </div>
        )}

        {stap === 'form' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
            <input placeholder="Naam *" value={naam} onChange={(e) => setNaam(e.target.value)} className="input-field" style={inputStyle()} />
            <input placeholder="E-mailadres" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" style={inputStyle()} />
            <input placeholder="Telefoon" value={tel} onChange={(e) => setTel(e.target.value)} className="input-field" style={inputStyle()} />
            <div
              onClick={busy ? undefined : submit}
              className="gold-btn"
              style={{ cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.6 : 1, textAlign: 'center', padding: 13, background: '#c9a45c', color: '#0b1524', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              {busy ? 'Bezig…' : 'Bevestig reservering'}
            </div>
            {error && <div style={{ fontSize: 12.5, color: '#c96b5c' }}>{error}</div>}
          </div>
        )}

        {stap === 'klaar' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid #7fb069', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7fb069', fontSize: 15, flexShrink: 0 }}>✓</div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(232,228,218,0.75)' }}>
              Voor u vastgehouden — u ontvangt binnen 24 uur een bevestiging met betaalinstructies.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
