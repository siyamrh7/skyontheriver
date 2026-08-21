export default function Footer() {
  return (
    <div style={{ borderTop: '1px solid rgba(201,164,92,0.25)', background: '#081120' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 24px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 40 }}>
        <div>
          <div style={{ fontFamily: "'Italiana',serif", fontSize: 22, letterSpacing: '0.12em', color: '#f4efe4', marginBottom: 12 }}>STARS ON THE RIVER</div>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(232,228,218,0.55)', maxWidth: 360 }}>
            Een muzikale riviercruise gepresenteerd door Denny Braaf aan boord van de MS Joy. 19, 20 en 21 maart 2027, vanuit Zaandam.
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 14 }}>Praktisch</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'rgba(232,228,218,0.65)' }}>
            <span>Opstappen: Prins Hendrikkade, Zaandam</span>
            <span>Inschepen vrijdag vanaf 15:00 uur</span>
            <span>Parkeren: garage De Burcht, € 10 per dag</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 14 }}>Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'rgba(232,228,218,0.65)' }}>
            <a href="mailto:info@starsontheriver.nl" style={{ color: 'inherit', textDecoration: 'none' }}>info@starsontheriver.nl</a>
            <span>starsontheriver.nl</span>
            <a
              href="https://www.instagram.com/starsontheriver.nl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'inherit', textDecoration: 'none', marginTop: 4 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
              </svg>
              <span>@starsontheriver.nl</span>
            </a>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px 32px', fontSize: 12, color: 'rgba(232,228,218,0.35)' }}>
        © 2027 Stars on the River · Alle prijzen per persoon o.b.v. 2 personen per hut
      </div>
    </div>
  );
}
