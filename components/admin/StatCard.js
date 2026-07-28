export default function StatCard({ label, waarde, sub }) {
  return (
    <div style={{ background: '#0e1b2e', border: '1px solid rgba(201,164,92,0.25)', padding: '22px 24px' }}>
      <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 10 }}>{label}</div>
      <div style={{ fontFamily: "'Italiana',serif", fontSize: 38, color: '#f4efe4', lineHeight: 1 }}>{waarde}</div>
      <div style={{ fontSize: 12.5, color: 'rgba(232,228,218,0.5)', marginTop: 8 }}>{sub}</div>
    </div>
  );
}
