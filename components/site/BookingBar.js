'use client';
import { useState, useEffect } from 'react';
import { apiPost } from '../../lib/apiClient';

function inputStyle(width) {
  return { background: '#12233c', border: '1px solid rgba(201,164,92,0.35)', color: '#f4efe4', padding: '11px 12px', fontFamily: "'Karla',sans-serif", fontSize: 14, outline: 'none', width };
}

export default function BookingBar({ cabin, kamerFoto, onBooked, onConflict }) {
  const [stap, setStap] = useState('keuze');
  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setStap('keuze');
    setNaam('');
    setEmail('');
    setTel('');
    setError('');
  }, [cabin?.nummer]);

  if (!cabin) {
    return (
      <div style={{ border: '1px dashed rgba(201,164,92,0.45)', background: 'rgba(11,21,36,0.92)', backdropFilter: 'blur(8px)', padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ color: '#c9a45c', fontSize: 16 }}>✦</span>
        <span style={{ fontSize: 14.5, color: 'rgba(232,228,218,0.75)' }}>Klik op een beschikbare hut in het dekkenplan hieronder — hier verschijnen de prijs en de reserveerknop.</span>
      </div>
    );
  }

  const submit = async () => {
    if (!naam.trim()) {
      setError('Naam is verplicht');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await apiPost('/api/bookings', { cabinNummer: cabin.nummer, naam, email, tel });
      setStap('klaar');
      onBooked(cabin.nummer);
    } catch (e) {
      if (e.status === 409) {
        setError('Deze hut is zojuist door iemand anders vastgehouden — kies een andere hut.');
        onConflict();
      } else {
        setError(e.message || 'Er ging iets mis — probeer het opnieuw.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ background: '#0e1b2e', border: '1px solid #c9a45c', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', boxShadow: '0 12px 30px rgba(4,9,18,0.5)' }}>
      <img src={kamerFoto} alt={cabin.typeNaam} style={{ width: 92, height: 62, objectFit: 'cover', display: 'block', flexShrink: 0 }} />
      <div style={{ minWidth: 150 }}>
        <div style={{ fontFamily: "'Italiana',serif", fontSize: 23, color: '#f4efe4', lineHeight: 1.1 }}>Hut {cabin.nummer}</div>
        <div style={{ fontSize: 12.5, color: 'rgba(232,228,218,0.65)', marginTop: 3 }}>{cabin.typeNaam} · {cabin.dek}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontFamily: "'Italiana',serif", fontSize: 28, color: '#f4efe4' }}>€ {cabin.prijs}</span>
        <span style={{ fontSize: 12, color: 'rgba(232,228,218,0.55)' }}>p.p. · 2 pers.</span>
      </div>
      <div style={{ flex: 1 }} />

      {stap === 'keuze' && (
        <div
          onClick={() => setStap('form')}
          className="gold-btn"
          style={{ cursor: 'pointer', padding: '13px 26px', background: '#c9a45c', color: '#0b1524', fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}
        >
          Reserveer deze hut
        </div>
      )}

      {stap === 'form' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <input placeholder="Naam" value={naam} onChange={(e) => setNaam(e.target.value)} className="input-field" style={inputStyle(150)} />
          <input placeholder="E-mailadres" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" style={inputStyle(190)} />
          <input placeholder="Telefoon" value={tel} onChange={(e) => setTel(e.target.value)} className="input-field" style={inputStyle(140)} />
          <div
            onClick={busy ? undefined : submit}
            className="gold-btn"
            style={{ cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.6 : 1, padding: '12px 20px', background: '#c9a45c', color: '#0b1524', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            {busy ? 'Bezig…' : 'Bevestig'}
          </div>
          {error && <div style={{ fontSize: 12.5, color: '#c96b5c', width: '100%' }}>{error}</div>}
        </div>
      )}

      {stap === 'klaar' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid #7fb069', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7fb069', fontSize: 16, flexShrink: 0 }}>✓</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'rgba(232,228,218,0.75)', maxWidth: 340 }}>
            Hut {cabin.nummer} is voor u vastgehouden — u ontvangt binnen 24 uur een bevestiging met betaalinstructies.
          </div>
        </div>
      )}
    </div>
  );
}
