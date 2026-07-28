'use client';
import { useCallback, useEffect, useState } from 'react';
import { apiGet } from '../../lib/apiClient';
import { useIsMobile } from '../../lib/useIsMobile';
import { buildTypeCards } from '../../lib/deckLogic';
import DeckPlan from './DeckPlan';
import TypeCard from './TypeCard';
import BookingBar from './BookingBar';

const LEGEND = [
  ['#8a7347', 'Double Cabin'],
  ['#4d729e', 'Junior Suite'],
  ['#2c4f7c', 'Suite'],
  ['#22304a', 'Bezet'],
  ['#c9a45c', 'Uw selectie'],
];

export default function HuttenContent({ settings, initialCabins }) {
  const [cabins, setCabins] = useState(initialCabins);
  const [selNum, setSelNum] = useState(null);
  const mobiel = useIsMobile(780);

  const refresh = useCallback(async () => {
    try {
      const data = await apiGet('/api/cabins');
      setCabins(data);
    } catch (e) {
      // silent — next 30s poll will retry
    }
  }, []);

  useEffect(() => {
    const id = setInterval(refresh, 30000);
    return () => clearInterval(id);
  }, [refresh]);

  const selCabin = cabins.find((c) => c.nummer === selNum) || null;
  const kamerFoto = settings.fotos.kamer;

  const handleSelect = (num) => {
    const cab = cabins.find((c) => c.nummer === num);
    if (!cab || cab.status !== 'vrij') return;
    setSelNum(num);
  };

  const handleBooked = (num) => {
    setCabins((prev) => prev.map((c) => (c.nummer === num ? { ...c, status: 'optie' } : c)));
    refresh();
  };

  const typeCards = buildTypeCards(settings, cabins, kamerFoto);

  return (
    <div className="section-pad" style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 18 }}>Hutten &amp; prijzen</div>
      <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 'clamp(38px,6vw,60px)', fontWeight: 500, margin: '0 0 20px', color: '#f4efe4' }}>Kies uw plek aan boord</h1>
      <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(232,228,218,0.78)', maxWidth: 660, margin: '0 0 56px' }}>
        Alle prijzen zijn per persoon, op basis van twee personen per hut, inclusief het volledige programma en alle maaltijden. Elke hut heeft airconditioning, minikoelkast, waterkoker en koffiezetapparaat.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginBottom: 90 }}>
        {typeCards.map((t, i) => (
          <TypeCard key={i} t={t} />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, marginBottom: 8 }}>
        <h2 style={{ fontFamily: "'Italiana',serif", fontSize: 42, fontWeight: 500, margin: 0, color: '#f4efe4' }}>Het dekkenplan</h2>
        <div style={{ fontSize: 14, color: 'rgba(232,228,218,0.6)' }}>Klik op een hut voor prijs en beschikbaarheid</div>
      </div>
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginBottom: 34 }}>
        {LEGEND.map(([kleur, label]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 14, background: kleur }} />
            <span style={{ fontSize: 13, color: 'rgba(232,228,218,0.75)' }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ order: -1, position: 'sticky', top: mobiel ? 64 : 84, zIndex: 10 }}>
          <BookingBar cabin={selCabin} kamerFoto={kamerFoto} onBooked={handleBooked} onConflict={refresh} />
        </div>
        <DeckPlan settings={settings} cabins={cabins} selNum={selNum} onSelect={handleSelect} mobiel={mobiel} />
      </div>
    </div>
  );
}
