'use client';
import { useState } from 'react';
import { apiPatch, apiPost } from '../../lib/apiClient';

const panelInput = { background: '#12233c', border: '1px solid rgba(201,164,92,0.35)', color: '#f4efe4', padding: '11px 12px', fontFamily: "'Karla',sans-serif", fontSize: 14, outline: 'none', width: '100%' };

function PanelHeader({ nummer, onClose }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 2 }}>
      <div style={{ fontFamily: "'Italiana',serif", fontSize: 26, color: '#f4efe4' }}>Hut {nummer}</div>
      <div onClick={onClose} className="close-x" style={{ cursor: 'pointer', color: 'rgba(232,228,218,0.4)', fontSize: 18 }}>×</div>
    </div>
  );
}

function LegendItem({ kleur, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 13, height: 13, background: kleur, borderRadius: 3 }} />
      <span style={{ fontSize: 12.5, color: 'rgba(232,228,218,0.6)' }}>{label}</span>
    </div>
  );
}

export default function CabinManager({ initialCabins, initialBookings, dekken }) {
  const [cabins, setCabins] = useState(initialCabins);
  const [bookings, setBookings] = useState(initialBookings);
  const [sel, setSel] = useState(null);
  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [notitie, setNotitie] = useState('');

  const selectCabin = (n) => {
    setSel(n);
    setNaam('');
    setEmail('');
    setTel('');
    setNotitie('');
  };

  const dekGroepen = (dekken || []).map((d) => {
    const hutten = cabins.filter((c) => c.nummer >= d.van && c.nummer <= d.tot).sort((a, b) => a.nummer - b.nummer);
    const vrij = hutten.filter((c) => c.status === 'vrij').length;
    return { naam: d.naam, hutten, vrijTekst: `${vrij} vrij · ${hutten.length - vrij} bezet` };
  });

  const zetGeboekt = async () => {
    if (!naam.trim()) return;
    const booking = await apiPost('/api/admin/bookings', { cabinNummer: sel, naam, email, tel });
    setBookings((prev) => [booking, ...prev]);
    setCabins((prev) => prev.map((c) => (c.nummer === sel ? { ...c, status: 'geboekt' } : c)));
    setSel(null);
  };

  const blokkeer = async () => {
    const updated = await apiPatch(`/api/admin/cabins/${sel}`, { actie: 'blokkeren', notitie });
    setCabins((prev) => prev.map((c) => (c.nummer === sel ? { ...c, ...updated } : c)));
    setSel(null);
  };

  const geefVrij = async () => {
    const updated = await apiPatch(`/api/admin/cabins/${sel}`, { actie: 'vrijgeven' });
    setCabins((prev) => prev.map((c) => (c.nummer === sel ? { ...c, ...updated } : c)));
    setSel(null);
  };

  const annuleerBoeking = async (bookingId, nummer) => {
    const updated = await apiPatch(`/api/admin/bookings/${bookingId}`, { status: 'geannuleerd' });
    setBookings((prev) => prev.map((b) => (b._id === bookingId ? updated : b)));
    setCabins((prev) => prev.map((c) => (c.nummer === nummer ? { ...c, status: 'vrij' } : c)));
    setSel(null);
  };

  const selCabin = sel ? cabins.find((c) => c.nummer === sel) : null;
  const selBoeking = sel ? bookings.find((b) => b.cabinNummer === sel && b.status !== 'geannuleerd') : null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 36, fontWeight: 400, margin: 0, color: '#f4efe4' }}>Hutten beheren</h1>
        <div style={{ fontSize: 13, color: 'rgba(232,228,218,0.5)' }}>Klik op een hut om te blokkeren of vrij te geven</div>
      </div>
      <div style={{ fontSize: 13.5, color: 'rgba(232,228,218,0.6)', marginBottom: 26 }}>
        Klik op een hut: vrij → handmatig boeken (met klantgegevens) of blokkeren met notitie; geboekt → klantgegevens bekijken; geblokkeerd → notitie bekijken en vrijgeven.
      </div>

      <div className="admin-grid-hutten">
        <div>
          {dekGroepen.map((dek) => (
            <div key={dek.naam} style={{ marginBottom: 26 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
                <div style={{ fontFamily: "'Italiana',serif", fontSize: 20, color: '#f4efe4' }}>{dek.naam}</div>
                <div style={{ fontSize: 12, color: 'rgba(232,228,218,0.5)' }}>{dek.vrijTekst}</div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {dek.hutten.map((h) => {
                  const label = h.status === 'geboekt' ? 'geboekt' : h.status === 'geblokkeerd' ? 'blok' : `€ ${h.prijs}`;
                  const bg = h.status === 'geboekt' ? '#c9a45c' : h.status === 'geblokkeerd' ? '#c96b5c' : '#1d3552';
                  const fg = h.status === 'geboekt' || h.status === 'geblokkeerd' ? '#0b1524' : '#f4efe4';
                  const subFg = h.status === 'geboekt' || h.status === 'geblokkeerd' ? 'rgba(11,21,36,0.7)' : 'rgba(232,228,218,0.55)';
                  const rand = sel === h.nummer ? '#e2c284' : 'rgba(232,228,218,0.12)';
                  return (
                    <div
                      key={h.nummer}
                      onClick={() => selectCabin(h.nummer)}
                      title={`Hut ${h.nummer} — klik voor details en acties`}
                      className="outline-btn"
                      style={{ width: 64, height: 48, cursor: 'pointer', background: bg, border: `1px solid ${rand}`, borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 600, color: fg }}>{h.nummer}</span>
                      <span style={{ fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase', color: subFg }}>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 20, marginTop: 6, flexWrap: 'wrap' }}>
            <LegendItem kleur="#1d3552" label="Vrij" />
            <LegendItem kleur="#c9a45c" label="Geboekt" />
            <LegendItem kleur="#c96b5c" label="Geblokkeerd door u" />
          </div>
        </div>

        <div>
          <div style={{ position: 'sticky', top: 24 }}>
            {!sel && (
              <div style={{ border: '1px dashed rgba(201,164,92,0.4)', padding: '36px 26px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Italiana',serif", fontSize: 21, color: '#f4efe4', marginBottom: 8 }}>Geen hut gekozen</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.7, color: 'rgba(232,228,218,0.6)' }}>Klik op een hut in het overzicht voor details en acties.</div>
              </div>
            )}

            {sel && selCabin && selCabin.status === 'vrij' && (
              <div style={{ background: '#0e1b2e', border: '1px solid #c9a45c', padding: '24px 24px 26px' }}>
                <PanelHeader nummer={sel} onClose={() => setSel(null)} />
                <div style={{ fontSize: 13, color: 'rgba(232,228,218,0.6)', marginBottom: 16 }}>{selCabin.dek} · € {selCabin.prijs} p.p. · vrij</div>
                <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 10 }}>Handmatig boeken</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 12 }}>
                  <input placeholder="Naam klant *" value={naam} onChange={(e) => setNaam(e.target.value)} className="input-field" style={panelInput} />
                  <input placeholder="E-mailadres" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" style={panelInput} />
                  <input placeholder="Telefoonnummer" value={tel} onChange={(e) => setTel(e.target.value)} className="input-field" style={panelInput} />
                </div>
                <div onClick={zetGeboekt} className="gold-btn" style={{ cursor: 'pointer', textAlign: 'center', padding: 13, background: '#c9a45c', color: '#0b1524', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
                  Zet op geboekt
                </div>
                <div style={{ borderTop: '1px solid rgba(232,228,218,0.1)', paddingTop: 16 }}>
                  <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 10 }}>Of alleen blokkeren</div>
                  <input placeholder="Notitie — voor wie / waarom" value={notitie} onChange={(e) => setNotitie(e.target.value)} className="input-field" style={{ ...panelInput, marginBottom: 10 }} />
                  <div onClick={blokkeer} className="danger-outline" style={{ cursor: 'pointer', textAlign: 'center', padding: 12, border: '1px solid rgba(201,107,92,0.6)', color: '#c96b5c', fontSize: 12.5, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    Blokkeer deze hut
                  </div>
                </div>
              </div>
            )}

            {sel && selCabin && selCabin.status === 'geboekt' && selBoeking && (
              <div style={{ background: '#0e1b2e', border: '1px solid #c9a45c', padding: '24px 24px 26px' }}>
                <PanelHeader nummer={sel} onClose={() => setSel(null)} />
                <div style={{ fontSize: 13, color: 'rgba(232,228,218,0.6)', marginBottom: 16 }}>{selCabin.dek} · € {selCabin.prijs} p.p.</div>
                <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c9a45c', marginBottom: 12 }}>
                  {selBoeking.status === 'pending' ? 'In optie' : 'Bevestigd'} · Geboekt op {new Date(selBoeking.aangemaaktOp).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#f4efe4' }}>{selBoeking.naam}</div>
                  <div style={{ fontSize: 13.5, color: 'rgba(232,228,218,0.65)' }}>{selBoeking.email}</div>
                  <div style={{ fontSize: 13.5, color: 'rgba(232,228,218,0.65)' }}>{selBoeking.tel}</div>
                </div>
                <div onClick={() => annuleerBoeking(selBoeking._id, sel)} className="danger-outline" style={{ cursor: 'pointer', textAlign: 'center', padding: 12, border: '1px solid rgba(201,107,92,0.6)', color: '#c96b5c', fontSize: 12.5, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Annuleer boeking — hut komt vrij
                </div>
              </div>
            )}

            {sel && selCabin && selCabin.status === 'geblokkeerd' && (
              <div style={{ background: '#0e1b2e', border: '1px solid #c96b5c', padding: '24px 24px 26px' }}>
                <PanelHeader nummer={sel} onClose={() => setSel(null)} />
                <div style={{ fontSize: 13, color: 'rgba(232,228,218,0.6)', marginBottom: 16 }}>{selCabin.dek} · € {selCabin.prijs} p.p. · geblokkeerd</div>
                <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c96b5c', marginBottom: 8 }}>Notitie</div>
                <div style={{ fontSize: 14, color: 'rgba(232,228,218,0.8)', lineHeight: 1.6, marginBottom: 18 }}>{selCabin.blokNotitie || 'Geen notitie'}</div>
                <div onClick={geefVrij} className="gold-btn" style={{ cursor: 'pointer', textAlign: 'center', padding: 12, background: '#c9a45c', color: '#0b1524', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Geef hut vrij
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
