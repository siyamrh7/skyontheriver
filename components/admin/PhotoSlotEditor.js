'use client';
import { useState } from 'react';
import { apiPost, apiPatch, apiDelete } from '../../lib/apiClient';

const PAGINA_VOLGORDE = ['Home', 'Het schip', 'Suites & prijzen', 'Gastheer'];
const PAGINA_ANCHOR = { Home: '', 'Het schip': 'schip', 'Suites & prijzen': 'hutten', Gastheer: 'gastheer' };

export default function PhotoSlotEditor({ initialSlots, library }) {
  const [slots, setSlots] = useState(initialSlots);
  const [openSlot, setOpenSlot] = useState(null);
  const [uploadingKey, setUploadingKey] = useState(null);

  const applySlot = (key, patch) => setSlots((prev) => prev.map((s) => (s.key === key ? { ...s, ...patch } : s)));

  const upload = async (key, file) => {
    setUploadingKey(key);
    try {
      const form = new FormData();
      form.append('foto', file);
      const res = await apiPost(`/api/admin/photos/${key}`, form);
      applySlot(key, { huidigSrc: res.src, isAangepast: true });
    } finally {
      setUploadingKey(null);
    }
  };

  const kiesUitBibliotheek = async (key, src) => {
    await apiPatch(`/api/admin/photos/${key}`, { src });
    applySlot(key, { huidigSrc: src, isAangepast: true });
    setOpenSlot(null);
  };

  const verwijder = async (key) => {
    const res = await apiDelete(`/api/admin/photos/${key}`);
    applySlot(key, { huidigSrc: res.src, isAangepast: false });
  };

  const paginas = PAGINA_VOLGORDE.map((pg) => ({
    pagina: pg,
    anchor: PAGINA_ANCHOR[pg],
    slots: slots.filter((s) => s.pagina === pg),
  }));

  return (
    <div>
      <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 36, fontWeight: 400, margin: '0 0 10px', color: '#f4efe4' }}>Foto&apos;s per pagina</h1>
      <div style={{ fontSize: 13.5, color: 'rgba(232,228,218,0.6)', marginBottom: 8 }}>Elke pagina heeft een vast aantal fotoplekken. Kies per plek een foto uit de bibliotheek of upload een eigen foto.</div>
      <div style={{ fontSize: 13, color: 'rgba(232,228,218,0.5)', marginBottom: 30 }}>
        <span style={{ color: '#c9a45c' }}>Beste resultaat:</span> JPG of PNG, scherp en goed belicht. Grote foto&apos;s worden automatisch opgeslagen — het aanbevolen minimumformaat staat per plek vermeld.
      </div>

      {paginas.map((pg) => {
        const plekkenTekst = pg.slots.length === 1
          ? '1 fotoplek — er past 1 foto op deze pagina'
          : `${pg.slots.length} fotoplekken — er passen maximaal ${pg.slots.length} foto's op deze pagina`;
        return (
          <div key={pg.pagina} style={{ background: '#0e1b2e', border: '1px solid rgba(201,164,92,0.2)', padding: '22px 26px', marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: "'Italiana',serif", fontSize: 23, color: '#f4efe4' }}>{pg.pagina}</div>
              <div style={{ flex: 1 }} />
              <a
                href={pg.anchor ? `/${pg.anchor}` : '/'}
                target="_blank"
                rel="noreferrer"
                className="outline-btn"
                style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(201,164,92,0.5)', padding: '7px 13px' }}
              >
                Bekijk pagina ↗
              </a>
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(232,228,218,0.5)', marginBottom: 18 }}>{plekkenTekst}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {pg.slots.map((slot) => {
                const isOpen = openSlot === slot.key;
                return (
                  <div key={slot.key} style={{ border: '1px solid rgba(232,228,218,0.1)', padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img src={slot.huidigSrc} alt={slot.label} style={{ width: 118, height: 76, objectFit: 'cover', display: 'block', border: '2px solid rgba(201,164,92,0.5)' }} />
                        {slot.isAangepast && (
                          <div style={{ position: 'absolute', bottom: 2, left: 2, right: 2, background: 'rgba(11,21,36,0.8)', color: '#e2c284', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', padding: 2 }}>
                            Eigen foto
                          </div>
                        )}
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: 14.5, fontWeight: 600, color: '#f4efe4' }}>{slot.label}</div>
                        <div style={{ fontSize: 12.5, color: 'rgba(232,228,218,0.5)', marginTop: 4 }}>Aanbevolen: {slot.formaat}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        <div
                          onClick={() => setOpenSlot(isOpen ? null : slot.key)}
                          className="outline-btn"
                          style={{ cursor: 'pointer', fontSize: 11.5, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(201,164,92,0.5)', color: '#c9a45c', padding: '8px 12px' }}
                        >
                          {isOpen ? 'Sluit bibliotheek' : 'Kies uit bibliotheek'}
                        </div>
                        <label className="gold-btn" style={{ cursor: 'pointer', fontSize: 11.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0b1524', background: '#c9a45c', padding: '9px 12px', fontWeight: 600 }}>
                          {uploadingKey === slot.key ? 'Bezig…' : 'Eigen foto'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const f = e.target.files && e.target.files[0];
                              if (f) upload(slot.key, f);
                            }}
                            style={{ display: 'none' }}
                            disabled={uploadingKey === slot.key}
                          />
                        </label>
                        {slot.isAangepast && (
                          <div
                            onClick={() => verwijder(slot.key)}
                            title="Verwijder deze foto van de plek (standaardfoto keert terug)"
                            className="danger-outline"
                            style={{ cursor: 'pointer', fontSize: 11.5, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(201,107,92,0.5)', color: '#c96b5c', padding: '8px 12px' }}
                          >
                            Verwijder foto
                          </div>
                        )}
                      </div>
                    </div>
                    {isOpen && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(232,228,218,0.08)' }}>
                        {library.map((o) => (
                          <img
                            key={o.src}
                            src={o.src}
                            onClick={() => kiesUitBibliotheek(slot.key, o.src)}
                            title={o.naam}
                            className="photo-option"
                            style={{ width: 104, height: 70, objectFit: 'cover', display: 'block', cursor: 'pointer', border: `2px solid ${o.src === slot.huidigSrc ? '#c9a45c' : 'rgba(232,228,218,0.12)'}`, opacity: o.src === slot.huidigSrc ? 1 : 0.55 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
