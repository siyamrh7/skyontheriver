import { getPublicSettings } from '../../../lib/queries';

export const dynamic = 'force-dynamic';

export default async function ProgrammaPage() {
  const settings = await getPublicSettings();

  return (
    <div className="section-pad" style={{ maxWidth: 960, margin: '0 auto' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 18 }}>Het programma</div>
      <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 'clamp(38px,6vw,60px)', fontWeight: 500, margin: '0 0 20px', color: '#f4efe4' }}>Drie dagen, uur voor uur</h1>
      <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(232,228,218,0.78)', maxWidth: 640, margin: '0 0 24px' }}>
        Opstapplaats: Prins Hendrikkade, Zaandam. Parkeertip: parkeergarage De Burcht — dagkaart € 10 per dag, in te stellen via de parkeerapp van vrijdag tot zondag.
      </p>
      <div style={{ height: 1, background: 'rgba(201,164,92,0.3)', margin: '40px 0 56px' }} />

      {(settings.programma || []).map((dag) => (
        <div key={dag.nr} className="grid-prog-dag">
          <div>
            <div style={{ fontFamily: "'Italiana',serif", fontSize: 64, lineHeight: 1, color: '#c9a45c' }}>{dag.nr}</div>
            <div style={{ fontFamily: "'Italiana',serif", fontSize: 26, color: '#f4efe4', marginTop: 6 }}>{dag.naam}</div>
            <div style={{ fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.55)', marginTop: 6 }}>{dag.datum}</div>
          </div>
          <div>
            {(dag.items || []).map((item, i) => (
              <div key={i} className="grid-prog-item">
                <div style={{ fontSize: 14, letterSpacing: '0.06em', color: '#c9a45c', fontWeight: 400 }}>{item.tijd}</div>
                <div style={{ fontSize: 15.5, color: 'rgba(232,228,218,0.88)', lineHeight: 1.6 }}>{item.wat}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
