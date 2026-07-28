'use client';
import { useState } from 'react';
import { apiPut, apiPost } from '../../lib/apiClient';

const dagInputStyle = (bold) => ({
  background: '#12233c',
  border: '1px solid rgba(201,164,92,0.3)',
  color: bold ? '#f4efe4' : 'rgba(232,228,218,0.7)',
  padding: '10px 12px',
  fontFamily: "'Karla',sans-serif",
  fontSize: bold ? 15 : 14,
  fontWeight: bold ? 600 : 400,
  outline: 'none',
});

const itemInputStyle = (color) => ({
  background: '#12233c',
  border: '1px solid rgba(232,228,218,0.15)',
  color,
  padding: '10px 12px',
  fontFamily: "'Karla',sans-serif",
  fontSize: color === '#c9a45c' ? 13.5 : 14,
  outline: 'none',
  width: '100%',
});

export default function ProgrammaEditor({ initialProgramma }) {
  const [programma, setProgramma] = useState(initialProgramma);
  const [saving, setSaving] = useState(false);

  const save = async (next) => {
    setSaving(true);
    try {
      await apiPut('/api/admin/settings', { programma: next });
    } finally {
      setSaving(false);
    }
  };

  const setDagVeld = (dagI, veld, waarde) => setProgramma((prev) => prev.map((d, i) => (i === dagI ? { ...d, [veld]: waarde } : d)));
  const setItemVeld = (dagI, itemI, veld, waarde) =>
    setProgramma((prev) => prev.map((d, i) => (i !== dagI ? d : { ...d, items: d.items.map((it, j) => (j !== itemI ? it : { ...it, [veld]: waarde })) })));

  const addItem = (dagI) => {
    const next = programma.map((d, i) => (i === dagI ? { ...d, items: [...d.items, { tijd: '00:00', wat: 'Nieuw programmaonderdeel' }] } : d));
    setProgramma(next);
    save(next);
  };

  const delItem = (dagI, itemI) => {
    const next = programma.map((d, i) => (i !== dagI ? d : { ...d, items: d.items.filter((_, j) => j !== itemI) }));
    setProgramma(next);
    save(next);
  };

  const reset = async () => {
    const updated = await apiPost('/api/admin/settings/reset', { wat: 'programma' });
    setProgramma(updated.programma);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 36, fontWeight: 400, margin: 0, color: '#f4efe4' }}>Programma bewerken</h1>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="/programma" target="_blank" rel="noreferrer" className="outline-btn" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(201,164,92,0.5)', padding: '8px 14px' }}>
            Bekijk pagina ↗
          </a>
          <div onClick={reset} className="danger-text" style={{ cursor: 'pointer', fontSize: 12.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.5)', border: '1px solid rgba(232,228,218,0.25)', padding: '8px 14px' }}>
            Herstel standaard
          </div>
        </div>
      </div>
      <div style={{ fontSize: 13.5, color: 'rgba(232,228,218,0.6)', marginBottom: 30 }}>
        Wijzigingen worden automatisch opgeslagen (verlaat een veld om op te slaan) en zijn direct zichtbaar op de website.{saving ? ' Opslaan…' : ''}
      </div>

      {programma.map((dag, dagI) => (
        <div key={dagI} style={{ background: '#0e1b2e', border: '1px solid rgba(201,164,92,0.2)', padding: '24px 26px', marginBottom: 22 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ fontFamily: "'Italiana',serif", fontSize: 30, color: '#c9a45c', width: 52 }}>{dag.nr}</div>
            <input
              value={dag.naam}
              onChange={(e) => setDagVeld(dagI, 'naam', e.target.value)}
              onBlur={() => save(programma)}
              className="input-field"
              style={{ ...dagInputStyle(true), width: 160 }}
            />
            <input
              value={dag.datum}
              onChange={(e) => setDagVeld(dagI, 'datum', e.target.value)}
              onBlur={() => save(programma)}
              className="input-field"
              style={{ ...dagInputStyle(false), width: 170 }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {dag.items.map((it, itemI) => (
              <div key={itemI} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 36px', gap: 10, alignItems: 'center' }}>
                <input
                  value={it.tijd}
                  onChange={(e) => setItemVeld(dagI, itemI, 'tijd', e.target.value)}
                  onBlur={() => save(programma)}
                  className="input-field"
                  style={itemInputStyle('#c9a45c')}
                />
                <input
                  value={it.wat}
                  onChange={(e) => setItemVeld(dagI, itemI, 'wat', e.target.value)}
                  onBlur={() => save(programma)}
                  className="input-field"
                  style={itemInputStyle('#f4efe4')}
                />
                <div
                  onClick={() => delItem(dagI, itemI)}
                  title="Regel verwijderen"
                  className="danger-text"
                  style={{ cursor: 'pointer', width: 36, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(232,228,218,0.35)', fontSize: 18 }}
                >
                  ×
                </div>
              </div>
            ))}
            <div onClick={() => addItem(dagI)} className="link-gold" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, color: '#c9a45c', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 0', width: 'fit-content' }}>
              <span style={{ fontSize: 17 }}>+</span>
              <span>Regel toevoegen</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
