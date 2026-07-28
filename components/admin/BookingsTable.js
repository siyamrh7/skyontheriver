'use client';
import { useState } from 'react';
import { apiPatch, apiPost } from '../../lib/apiClient';

const FILTERS = [
  ['alle', 'Alle'],
  ['pending', 'In optie'],
  ['bevestigd', 'Bevestigd'],
  ['geannuleerd', 'Geannuleerd'],
];

const statusKleur = (s) => (s === 'bevestigd' ? '#7fb069' : s === 'pending' ? '#c9a45c' : '#c96b5c');

function inlineStyle(fontSize, color) {
  return { background: 'transparent', border: '1px solid transparent', borderBottom: '1px dashed rgba(232,228,218,0.2)', color, padding: '7px 4px', fontFamily: "'Karla',sans-serif", fontSize, outline: 'none', width: '100%', minWidth: 0 };
}

export default function BookingsTable({ initialBookings, prijsPerCabin }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState('alle');

  const applyUpdate = (updated) => setBookings((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
  const patchField = async (id, body) => applyUpdate(await apiPatch(`/api/admin/bookings/${id}`, body));
  const uploadFactuur = async (id, file) => {
    const form = new FormData();
    form.append('factuur', file);
    applyUpdate(await apiPost(`/api/admin/bookings/${id}/factuur`, form));
  };

  const zichtbaar = filter === 'alle' ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 36, fontWeight: 400, margin: 0, color: '#f4efe4' }}>Boekingen</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {FILTERS.map(([id, label]) => (
            <div
              key={id}
              onClick={() => setFilter(id)}
              className="outline-btn"
              style={{ cursor: 'pointer', padding: '8px 16px', fontSize: 12.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: filter === id ? '#e2c284' : 'rgba(232,228,218,0.55)', border: `1px solid ${filter === id ? '#c9a45c' : 'rgba(232,228,218,0.2)'}` }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 13, color: 'rgba(232,228,218,0.55)', marginBottom: 16 }}>
        Klantgegevens zijn direct bewerkbaar in de lijst (verlaat het veld om op te slaan). Vink &quot;betaald&quot; af zodra de betaling binnen is en upload de factuur erbij.
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 1060 }}>
          <div className="admin-boekingen-row" style={{ padding: '0 16px 10px', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.45)' }}>
            <div>Hut</div>
            <div>Naam</div>
            <div>E-mail</div>
            <div>Telefoon</div>
            <div>Bedrag</div>
            <div>Status</div>
            <div>Betaald</div>
            <div>Factuur</div>
            <div>Acties</div>
          </div>
          {zichtbaar.map((b) => (
            <BookingRow key={b._id} booking={b} prijs={prijsPerCabin[b.cabinNummer] || 0} onPatchField={patchField} onUploadFactuur={uploadFactuur} />
          ))}
          {zichtbaar.length === 0 && <div style={{ padding: '24px 16px', color: 'rgba(232,228,218,0.5)', fontSize: 14 }}>Geen boekingen in dit filter.</div>}
        </div>
      </div>
    </div>
  );
}

function BookingRow({ booking, prijs, onPatchField, onUploadFactuur }) {
  const [naam, setNaam] = useState(booking.naam);
  const [email, setEmail] = useState(booking.email);
  const [tel, setTel] = useState(booking.tel);
  const [uploading, setUploading] = useState(false);

  const blurCommit = (veld, waarde) => {
    if (waarde === (booking[veld] || '')) return;
    onPatchField(booking._id, { [veld]: waarde });
  };

  const handleUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      await onUploadFactuur(booking._id, file);
    } finally {
      setUploading(false);
    }
  };

  const kleur = statusKleur(booking.status);

  return (
    <div className="admin-boekingen-row" style={{ alignItems: 'center', padding: '12px 16px', background: '#0e1b2e', border: '1px solid rgba(201,164,92,0.15)', marginBottom: 8 }}>
      <div style={{ fontWeight: 600, color: '#c9a45c', fontSize: 14 }}>{booking.cabinNummer}</div>
      <input value={naam} onChange={(e) => setNaam(e.target.value)} onBlur={() => blurCommit('naam', naam)} className="inline-edit" style={inlineStyle(14, '#f4efe4')} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => blurCommit('email', email)} className="inline-edit" style={inlineStyle(13, 'rgba(232,228,218,0.7)')} />
      <input value={tel} onChange={(e) => setTel(e.target.value)} onBlur={() => blurCommit('tel', tel)} className="inline-edit" style={inlineStyle(13, 'rgba(232,228,218,0.7)')} />
      <div style={{ fontSize: 13.5, color: '#f4efe4' }}>€ {prijs * 2}</div>
      <div style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', padding: '5px 4px', color: kleur, border: `1px solid ${kleur}` }}>{booking.status}</div>
      <div
        onClick={() => onPatchField(booking._id, { betaald: !booking.betaald })}
        title={booking.betaald ? 'Betaald — klik om ongedaan te maken' : 'Nog niet betaald — klik om af te vinken'}
        className="paid-toggle"
        style={{ cursor: 'pointer', width: 30, height: 30, margin: '0 auto', border: `1px solid ${booking.betaald ? '#7fb069' : 'rgba(232,228,218,0.3)'}`, background: booking.betaald ? 'rgba(127,176,105,0.15)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7fb069', fontSize: 16, fontWeight: 700 }}
      >
        {booking.betaald ? '✓' : ''}
      </div>
      <div style={{ minWidth: 0 }}>
        {booking.factuur ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
            <a href={booking.factuur.url} download={booking.factuur.naam} title={booking.factuur.naam} style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>
              {booking.factuur.naam}
            </a>
            <div onClick={() => onPatchField(booking._id, { factuur: null })} title="Factuur verwijderen" className="danger-text" style={{ cursor: 'pointer', color: 'rgba(232,228,218,0.35)', fontSize: 15, flexShrink: 0 }}>
              ×
            </div>
          </div>
        ) : (
          <label className="outline-btn" style={{ cursor: 'pointer', display: 'inline-block', fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(201,164,92,0.5)', color: '#c9a45c', padding: '7px 10px' }}>
            {uploading ? 'Bezig…' : 'Upload factuur'}
            <input type="file" accept=".pdf,image/*" onChange={handleUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
        )}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {booking.status === 'pending' && (
          <div onClick={() => onPatchField(booking._id, { status: 'bevestigd' })} className="gold-btn" style={{ cursor: 'pointer', padding: '7px 10px', fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#c9a45c', color: '#0b1524', fontWeight: 600 }}>
            Bevestig
          </div>
        )}
        {booking.status !== 'geannuleerd' && (
          <div onClick={() => onPatchField(booking._id, { status: 'geannuleerd' })} className="danger-outline" style={{ cursor: 'pointer', padding: '7px 10px', fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(201,107,92,0.6)', color: '#c96b5c' }}>
            Annuleer
          </div>
        )}
        {booking.status === 'geannuleerd' && <div style={{ fontSize: 11.5, color: 'rgba(232,228,218,0.35)' }}>Hut weer vrij</div>}
      </div>
    </div>
  );
}
