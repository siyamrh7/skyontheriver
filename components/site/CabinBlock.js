'use client';

function typeColor(type) {
  if (type === 'suite') return '#2c4f7c';
  if (type === 'junior') return '#4d729e';
  return '#8a7347';
}

export default function CabinBlock({ cabin, selected, onSelect, size = 'desktop' }) {
  const bezet = cabin.status !== 'vrij';
  const bg = selected ? '#c9a45c' : bezet ? '#22304a' : typeColor(cabin.type);
  const fg = selected ? '#0b1524' : bezet ? 'rgba(232,228,218,0.35)' : '#f4efe4';
  const subFg = selected ? 'rgba(11,21,36,0.75)' : bezet ? 'rgba(232,228,218,0.25)' : 'rgba(244,239,228,0.75)';
  const border = selected ? '#e2c284' : bezet ? 'rgba(232,228,218,0.08)' : 'rgba(232,228,218,0.15)';
  const subLabel = bezet ? 'bezet' : `€ ${cabin.prijs}`;
  const dims = size === 'mobile' ? { width: 47, height: 40 } : { width: 42, height: 42 };
  const fontSize = size === 'mobile' ? 11 : 11.5;
  const subFontSize = size === 'mobile' ? 8 : 8.5;

  return (
    <div
      onClick={bezet ? undefined : () => onSelect(cabin.nummer)}
      title={bezet ? `Hut ${cabin.nummer} — bezet` : `Hut ${cabin.nummer} — ${cabin.typeNaam}, € ${cabin.prijs} p.p.`}
      className={`cabin-block${bezet ? ' cabin-block--disabled' : ''}`}
      style={{
        ...dims,
        flexShrink: 0,
        cursor: bezet ? 'not-allowed' : 'pointer',
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        transition: 'transform .12s, background .15s',
      }}
    >
      <span style={{ fontSize, fontWeight: 500, color: fg, letterSpacing: '0.02em' }}>{cabin.nummer}</span>
      <span style={{ fontSize: subFontSize, color: subFg }}>{subLabel}</span>
    </div>
  );
}
