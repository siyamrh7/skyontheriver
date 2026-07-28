'use client';
import CabinBlock from './CabinBlock';
import { buildDecks } from '../../lib/deckLogic';

function Pill({ children }) {
  return (
    <div style={{ padding: '9px 14px', border: '1px dashed rgba(201,164,92,0.35)', borderRadius: 999, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.6)', whiteSpace: 'nowrap' }}>
      {children}
    </div>
  );
}

function FacPill({ children }) {
  return (
    <div style={{ padding: '8px 12px', border: '1px dashed rgba(201,164,92,0.35)', borderRadius: 999, fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.6)', whiteSpace: 'nowrap', textAlign: 'center' }}>
      {children}
    </div>
  );
}

export default function DeckPlan({ settings, cabins, selNum, onSelect, mobiel }) {
  const decks = buildDecks(settings, cabins);

  if (mobiel) {
    return (
      <div>
        <div style={{ textAlign: 'center', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 14 }}>↑ Voorkant van het schip</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 10, flexWrap: 'wrap' }}>
          {decks.map((deck) => (
            <div key={deck.naam} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ background: 'linear-gradient(180deg,#16283f 0%,#0e1b2e 100%)', border: '1px solid rgba(201,164,92,0.35)', borderRadius: '58px 58px 14px 14px', padding: '26px 8px 12px', display: 'flex', flexDirection: 'column', gap: 5 }}>
                {deck.paren.map((paar, i) => (
                  <div key={i} style={{ display: 'flex', gap: 5 }}>
                    {paar.map((cab) => (
                      <CabinBlock key={cab.nummer} cabin={cab} selected={selNum === cab.nummer} onSelect={onSelect} size="mobile" />
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Italiana',serif", fontSize: 16, color: '#f4efe4', lineHeight: 1.2 }}>{deck.naam}</div>
                <div style={{ fontSize: 10.5, color: 'rgba(232,228,218,0.55)', marginTop: 2 }}>{deck.vrijTekst}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12.5, color: 'rgba(232,228,218,0.5)', lineHeight: 1.6, textAlign: 'center', marginTop: 16 }}>
          Elke kolom is een dek, van boeg (boven) naar achtersteven (onder). Het zonnedek met bar en ligstoelen is voor alle gasten toegankelijk.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10, padding: '0 4px' }}>
          <div style={{ fontFamily: "'Italiana',serif", fontSize: 24, color: '#f4efe4' }}>Zonnendeck</div>
          <div style={{ fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.45)' }}>Sun deck</div>
        </div>
        <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 'max-content', background: 'linear-gradient(180deg,#13233c 0%,#0e1b2e 100%)', border: '1px solid rgba(201,164,92,0.3)', borderRadius: '12px 160px 160px 12px / 12px 50% 50% 12px', padding: '18px 130px 18px 20px' }}>
            <Pill>Bar</Pill>
            <Pill>Zwembad</Pill>
            <Pill>Ligstoelen</Pill>
            <Pill>Putting green</Pill>
            <div style={{ marginLeft: 'auto' }}>
              <Pill>Stuurhuis</Pill>
            </div>
          </div>
        </div>
      </div>

      {decks.map((deck) => (
        <div key={deck.naam}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10, padding: '0 4px' }}>
            <div style={{ fontFamily: "'Italiana',serif", fontSize: 24, color: '#f4efe4' }}>{deck.naam}</div>
            <div style={{ fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#c9a45c' }}>{deck.sub}</div>
            <div style={{ flex: 1, height: 1, background: 'rgba(232,228,218,0.1)' }} />
            <div style={{ fontSize: 12.5, color: 'rgba(232,228,218,0.55)' }}>{deck.vrijTekst}</div>
          </div>
          <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: 14, minWidth: 'max-content', background: 'linear-gradient(180deg,#13233c 0%,#0e1b2e 100%)', border: '1px solid rgba(201,164,92,0.3)', borderRadius: '12px 160px 160px 12px / 12px 50% 50% 12px', padding: '16px 24px 16px 16px' }}>
              <div style={{ width: 60, flexShrink: 0, order: 99 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center', flexShrink: 0 }}>
                {deck.achter.map((fa, i) => (
                  <FacPill key={i}>{fa.label}</FacPill>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
                {deck.rows.map((row, i) => (
                  <div key={i} style={{ display: 'flex', gap: 5 }}>
                    {row.map((cab) => (
                      <CabinBlock key={cab.nummer} cabin={cab} selected={selNum === cab.nummer} onSelect={onSelect} size="desktop" />
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center', flexShrink: 0 }}>
                {deck.voor.map((fv, i) => (
                  <FacPill key={i}>{fv.label}</FacPill>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div style={{ fontSize: 13, color: 'rgba(232,228,218,0.5)', lineHeight: 1.6 }}>
        Zonnedek met ligstoelen en putting green voor alle gasten toegankelijk. Beschikbaarheid wordt live bijgewerkt.
      </div>
    </div>
  );
}
