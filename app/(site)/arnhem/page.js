export default function ArnhemPage() {
  return (
    <div className="section-pad" style={{ maxWidth: 960, margin: '0 auto' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 18 }}>Zaterdag in Arnhem</div>
      <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 'clamp(38px,6vw,60px)', fontWeight: 500, margin: '0 0 20px', color: '#f4efe4' }}>Een dag om de stad te ontdekken</h1>
      <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(232,228,218,0.78)', maxWidth: 640, margin: '0 0 64px' }}>
        Zaterdag ligt de MS Joy van 09:00 tot 18:00 uur aan de kade in Arnhem. Stap van boord — of blijf aan boord en geniet van lunch en high tea.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40 }}>
        <Blok titel="De binnenstad" tekst="Winkelen in de Modekwartier-straatjes, de Grote Kerk en de Korenmarkt liggen op wandelafstand van de kade. Proef Arnhem op een van de vele terrassen aan de Rijnkade." />
        <Blok titel="Burgers' Zoo & Openluchtmuseum" tekst="Twee topattracties op korte afstand: het overdekte Burgers' Zoo en het Nederlands Openluchtmuseum. Ideaal te combineren met een middag vrije tijd." />
        <Blok titel="Fietsen huren" tekst="Verken de omgeving op de fiets: langs de Rijn richting Park Sonsbeek of de Veluwezoom. Huurfietsen zijn op loopafstand van de aanlegplaats te reserveren — vraag ernaar bij uw boeking." />
        <Blok titel="Of blijf aan boord" tekst="Light lunch in de bistro, à-la-carte lunch in het restaurant en om 16:00 uur high tea met prosecco. Het schip is de hele dag van u." />
      </div>
    </div>
  );
}

function Blok({ titel, tekst }) {
  return (
    <div style={{ borderTop: '1px solid rgba(201,164,92,0.4)', paddingTop: 22 }}>
      <h3 style={{ fontFamily: "'Italiana',serif", fontSize: 26, fontWeight: 500, margin: '0 0 10px', color: '#f4efe4' }}>{titel}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(232,228,218,0.72)', margin: 0 }}>{tekst}</p>
    </div>
  );
}
