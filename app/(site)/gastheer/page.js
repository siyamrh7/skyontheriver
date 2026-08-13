import { getPublicSettings } from '../../../lib/queries';

export const dynamic = 'force-dynamic';

export default async function GastheerPage() {
  const settings = await getPublicSettings();

  return (
    <div className="section-pad grid-gastheer" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: -16, left: -16, right: 16, bottom: 16, border: '1px solid rgba(201,164,92,0.4)' }} />
        <img
          src={settings.fotos.gastheer}
          alt="Denny Braaf"
          style={{ position: 'relative', width: '100%', height: 520, objectFit: 'cover', objectPosition: 'center 55%', display: 'block' }}
        />
      </div>
      <div>
        <div style={{ fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 18 }}>Uw muzikale gastheer</div>
        <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 'clamp(38px,6vw,60px)', fontWeight: 500, margin: '0 0 24px', color: '#f4efe4' }}>Denny Braaf</h1>
        <p style={{ fontSize: 16.5, lineHeight: 1.85, color: 'rgba(232,228,218,0.78)', margin: '0 0 32px' }}>
          Drie dagen lang is Denny Braaf uw gastheer aan boord. En zal hij u samen met zijn gastartiesten begeleiden op de gala avond. Na het diner neemt DJ Barry Brand het over in de brasserie en danst u tot in de kleine uurtjes — twee avonden lang.
        </p>
        <div style={{ display: 'flex', gap: 40 }}>
          <Stat cijfer="2" label="Feestavonden" />
          <Stat cijfer="1" label="Galadinershow" />
          <Stat cijfer="3" label="Dagen muziek" />
        </div>
      </div>
    </div>
  );
}

function Stat({ cijfer, label }) {
  return (
    <div>
      <div style={{ fontFamily: "'Italiana',serif", fontSize: 34, color: '#c9a45c' }}>{cijfer}</div>
      <div style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.6)' }}>{label}</div>
    </div>
  );
}
