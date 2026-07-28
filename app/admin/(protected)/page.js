import { getStats } from '../../../lib/queries';
import StatCard from '../../../components/admin/StatCard';

export const dynamic = 'force-dynamic';

const statusKleur = (s) => (s === 'bevestigd' ? '#7fb069' : s === 'pending' ? '#c9a45c' : '#c96b5c');

export default async function OverzichtPage() {
  const { stats, dekStats, recenteBoekingen } = await getStats();

  const statCards = [
    { label: 'Bezetting', waarde: `${stats.bezettingPct}%`, sub: `${stats.bezetAantal} van ${stats.totaalHutten} hutten` },
    { label: 'Bevestigd', waarde: String(stats.bevestigd), sub: 'boekingen definitief' },
    { label: 'In optie', waarde: String(stats.pending), sub: 'wacht op bevestiging' },
    { label: 'Omzet', waarde: `€ ${stats.omzet.toLocaleString('nl-NL')}`, sub: 'bevestigde boekingen' },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 36, fontWeight: 400, margin: '0 0 28px', color: '#f4efe4' }}>Overzicht</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 36 }}>
        {statCards.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
        <h2 style={{ fontFamily: "'Italiana',serif", fontSize: 24, fontWeight: 400, margin: 0, color: '#f4efe4' }}>Bezetting per dek</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
        {dekStats.map((d) => (
          <div key={d.naam} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 120px', gap: 18, alignItems: 'center' }}>
            <div style={{ fontSize: 14, color: 'rgba(232,228,218,0.8)' }}>{d.naam}</div>
            <div style={{ height: 10, background: '#12233c', border: '1px solid rgba(201,164,92,0.2)', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, width: `${d.pct}%`, background: 'linear-gradient(90deg,#8a7347,#c9a45c)' }} />
            </div>
            <div style={{ fontSize: 13, color: 'rgba(232,228,218,0.6)', textAlign: 'right' }}>{`${d.bezet} / ${d.totaal} bezet`}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontFamily: "'Italiana',serif", fontSize: 24, fontWeight: 400, margin: '0 0 14px', color: '#f4efe4' }}>Recente boekingen</h2>
      {recenteBoekingen.map((b) => (
        <div key={b._id} style={{ display: 'grid', gridTemplateColumns: '80px 1.4fr 1.6fr 110px 120px', gap: 16, alignItems: 'center', padding: '13px 16px', background: '#0e1b2e', border: '1px solid rgba(201,164,92,0.15)', marginBottom: 8 }}>
          <div style={{ fontWeight: 600, color: '#c9a45c', fontSize: 14 }}>{b.cabinNummer}</div>
          <div style={{ fontSize: 14, color: '#f4efe4' }}>{b.naam}</div>
          <div style={{ fontSize: 13, color: 'rgba(232,228,218,0.55)' }}>{b.email}</div>
          <div style={{ fontSize: 13, color: 'rgba(232,228,218,0.55)' }}>{new Date(b.aangemaaktOp).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}</div>
          <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center', padding: '5px 8px', color: statusKleur(b.status), border: `1px solid ${statusKleur(b.status)}` }}>
            {b.status}
          </div>
        </div>
      ))}
    </div>
  );
}
