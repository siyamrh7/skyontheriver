'use client';
import { useCallback, useEffect, useState } from 'react';
import { apiGet } from '../../lib/apiClient';
import { buildTypeCards } from '../../lib/deckLogic';
import TypeCard from './TypeCard';

export default function HuttenContent({ settings, initialCabins }) {
  const [cabins, setCabins] = useState(initialCabins);

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

  const typeCards = buildTypeCards(settings, cabins, settings.fotos);

  return (
    <div className="section-pad" style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 18 }}>Suites &amp; prijzen</div>
      <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 'clamp(38px,6vw,60px)', fontWeight: 500, margin: '0 0 20px', color: '#f4efe4' }}>Kies uw plek aan boord</h1>
      <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(232,228,218,0.78)', maxWidth: 660, margin: '0 0 56px' }}>
        Alle prijzen zijn per persoon, op basis van twee personen per hut, inclusief het volledige programma en alle maaltijden. Elke hut heeft airconditioning, minikoelkast, waterkoker en koffiezetapparaat.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
        {typeCards.map((t, i) => (
          <TypeCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}
