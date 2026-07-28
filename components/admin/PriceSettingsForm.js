'use client';
import { useState } from 'react';
import { apiPut, apiPost, apiPatch } from '../../lib/apiClient';

function basisPrijsVoorNummer(num, settings) {
  if ((settings.suites || []).includes(num)) return settings.suitePrijs;
  if ((settings.junior || []).includes(num)) return settings.juniorPrijs;
  const dek = (settings.dekken || []).find((d) => num >= d.van && num <= d.tot);
  return dek ? dek.prijs : 0;
}

const fieldStyle = (color, bold) => ({
  background: '#12233c',
  border: `1px solid ${bold ? 'rgba(201,164,92,0.3)' : 'rgba(232,228,218,0.15)'}`,
  color,
  padding: '10px 12px',
  fontFamily: "'Karla',sans-serif",
  fontSize: bold ? 14.5 : 14,
  fontWeight: bold ? 600 : 400,
  outline: 'none',
  width: '100%',
});

export default function PriceSettingsForm({ initialSettings, initialCabins }) {
  const [settings, setSettings] = useState(initialSettings);
  const [dekken, setDekken] = useState(initialSettings.dekken);
  const [suites, setSuites] = useState(initialSettings.suites.join(', '));
  const [suitePrijs, setSuitePrijs] = useState(String(initialSettings.suitePrijs));
  const [junior, setJunior] = useState(initialSettings.junior.join(', '));
  const [juniorPrijs, setJuniorPrijs] = useState(String(initialSettings.juniorPrijs));
  const [cabins, setCabins] = useState(initialCabins);
  const [nieuwNum, setNieuwNum] = useState('');
  const [nieuwPrijs, setNieuwPrijs] = useState('');
  const [error, setError] = useState('');

  const parseNums = (s) => String(s).split(',').map((x) => parseInt(x.trim(), 10)).filter((n) => !isNaN(n));

  const saveDekken = (next) => {
    setDekken(next);
    apiPut('/api/admin/settings', { dekken: next }).then((s) => setSettings(s));
  };
  const setDekVeld = (i, veld, waarde) => {
    const val = veld === 'naam' ? waarde : parseInt(waarde, 10) || 0;
    setDekken((prev) => prev.map((d, j) => (j === i ? { ...d, [veld]: val } : d)));
  };

  const saveSuites = () => apiPut('/api/admin/settings', { suites: parseNums(suites), suitePrijs: parseInt(suitePrijs, 10) || 0 }).then((s) => setSettings(s));
  const saveJunior = () => apiPut('/api/admin/settings', { junior: parseNums(junior), juniorPrijs: parseInt(juniorPrijs, 10) || 0 }).then((s) => setSettings(s));

  const overrides = cabins.filter((c) => c.prijsOverride != null).sort((a, b) => a.nummer - b.nummer);

  const verwijderOverride = async (num) => {
    const updated = await apiPatch(`/api/admin/cabins/${num}`, { prijsOverride: null });
    setCabins((prev) => prev.map((c) => (c.nummer === num ? { ...c, ...updated } : c)));
  };

  const voegOverrideToe = async () => {
    setError('');
    const num = parseInt(nieuwNum, 10);
    const prijs = parseInt(nieuwPrijs, 10);
    if (!num || !prijs) {
      setError('Vul een geldig hutnummer en prijs in.');
      return;
    }
    if (!cabins.some((c) => c.nummer === num)) {
      setError(`Hut ${num} bestaat niet.`);
      return;
    }
    const updated = await apiPatch(`/api/admin/cabins/${num}`, { prijsOverride: prijs });
    setCabins((prev) => prev.map((c) => (c.nummer === num ? { ...c, ...updated } : c)));
    setNieuwNum('');
    setNieuwPrijs('');
  };

  const reset = async () => {
    const updated = await apiPost('/api/admin/settings/reset', { wat: 'prijzen' });
    setSettings(updated);
    setDekken(updated.dekken);
    setSuites(updated.suites.join(', '));
    setSuitePrijs(String(updated.suitePrijs));
    setJunior(updated.junior.join(', '));
    setJuniorPrijs(String(updated.juniorPrijs));
    setCabins((prev) => prev.map((c) => ({ ...c, prijsOverride: null })));
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontFamily: "'Italiana',serif", fontSize: 36, fontWeight: 400, margin: 0, color: '#f4efe4' }}>Prijzen &amp; indeling</h1>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="/hutten" target="_blank" rel="noreferrer" className="outline-btn" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(201,164,92,0.5)', padding: '8px 14px' }}>
            Bekijk op website ↗
          </a>
          <div onClick={reset} className="danger-text" style={{ cursor: 'pointer', fontSize: 12.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.5)', border: '1px solid rgba(232,228,218,0.25)', padding: '8px 14px' }}>
            Herstel standaard
          </div>
        </div>
      </div>
      <div style={{ fontSize: 13.5, color: 'rgba(232,228,218,0.6)', marginBottom: 30 }}>
        Hutnummers, dekken en prijzen. Alle prijzen zijn per persoon o.b.v. 2 personen per hut. Wijzigingen zijn direct zichtbaar op de website.
      </div>

      <h2 style={{ fontFamily: "'Italiana',serif", fontSize: 22, fontWeight: 400, margin: '0 0 12px', color: '#f4efe4' }}>Dekken &amp; hutnummers</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 130px 110px', gap: 12, padding: '0 18px 8px', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.45)' }}>
        <div>Deknaam</div>
        <div>Eerste hut</div>
        <div>Laatste hut</div>
        <div>Basisprijs p.p.</div>
        <div></div>
      </div>
      {dekken.map((d, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 130px 110px', gap: 12, alignItems: 'center', background: '#0e1b2e', border: '1px solid rgba(201,164,92,0.2)', padding: '14px 18px', marginBottom: 8 }}>
          <input value={d.naam} onChange={(e) => setDekVeld(i, 'naam', e.target.value)} onBlur={() => saveDekken(dekken)} className="input-field" style={fieldStyle('#f4efe4', true)} />
          <input value={d.van} onChange={(e) => setDekVeld(i, 'van', e.target.value)} onBlur={() => saveDekken(dekken)} className="input-field" style={fieldStyle('#f4efe4', false)} />
          <input value={d.tot} onChange={(e) => setDekVeld(i, 'tot', e.target.value)} onBlur={() => saveDekken(dekken)} className="input-field" style={fieldStyle('#f4efe4', false)} />
          <input value={d.prijs} onChange={(e) => setDekVeld(i, 'prijs', e.target.value)} onBlur={() => saveDekken(dekken)} className="input-field" style={fieldStyle('#e2c284', false)} />
          <div style={{ fontSize: 12.5, color: 'rgba(232,228,218,0.5)' }}>{Math.max(0, d.tot - d.van + 1)} hutten</div>
        </div>
      ))}

      <h2 style={{ fontFamily: "'Italiana',serif", fontSize: 22, fontWeight: 400, margin: '28px 0 6px', color: '#f4efe4' }}>Afwijkende prijs per hut</h2>
      <div style={{ fontSize: 13, color: 'rgba(232,228,218,0.55)', marginBottom: 14 }}>Bijvoorbeeld bij schaarste: geef een hutnummer een eigen prijs. Deze gaat vóór de categorieprijs.</div>
      {overrides.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '140px 140px 1fr 36px', gap: 12, padding: '0 18px 8px', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.45)' }}>
          <div>Hutnummer</div>
          <div>Prijs p.p.</div>
          <div></div>
          <div></div>
        </div>
      )}
      {overrides.map((o) => (
        <OverrideRow
          key={o.nummer}
          cabin={o}
          standaard={basisPrijsVoorNummer(o.nummer, settings)}
          onSaved={(updated) => setCabins((prev) => prev.map((c) => (c.nummer === o.nummer ? { ...c, ...updated } : c)))}
          onDelete={() => verwijderOverride(o.nummer)}
        />
      ))}

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginTop: 4, marginBottom: 6 }}>
        <input placeholder="Hutnummer" value={nieuwNum} onChange={(e) => setNieuwNum(e.target.value)} className="input-field" style={{ ...fieldStyle('#f4efe4', false), width: 130 }} />
        <input placeholder="Prijs p.p." value={nieuwPrijs} onChange={(e) => setNieuwPrijs(e.target.value)} className="input-field" style={{ ...fieldStyle('#e2c284', false), width: 130 }} />
        <div onClick={voegOverrideToe} className="link-gold" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, color: '#c9a45c', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <span style={{ fontSize: 17 }}>+</span>
          <span>Hut toevoegen</span>
        </div>
      </div>
      {error && <div style={{ fontSize: 12.5, color: '#c96b5c', marginBottom: 12 }}>{error}</div>}

      <h2 style={{ fontFamily: "'Italiana',serif", fontSize: 22, fontWeight: 400, margin: '28px 0 12px', color: '#f4efe4' }}>Suites</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14 }}>
        <div style={{ background: '#0e1b2e', border: '1px solid rgba(201,164,92,0.2)', padding: '20px 22px' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#f4efe4', marginBottom: 12 }}>Suite</div>
          <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.45)', marginBottom: 6 }}>Hutnummers (komma-gescheiden)</div>
          <input value={suites} onChange={(e) => setSuites(e.target.value)} onBlur={saveSuites} className="input-field" style={{ ...fieldStyle('#f4efe4', false), marginBottom: 12 }} />
          <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.45)', marginBottom: 6 }}>Prijs p.p.</div>
          <input value={suitePrijs} onChange={(e) => setSuitePrijs(e.target.value)} onBlur={saveSuites} className="input-field" style={{ ...fieldStyle('#e2c284', false), width: 130 }} />
        </div>
        <div style={{ background: '#0e1b2e', border: '1px solid rgba(201,164,92,0.2)', padding: '20px 22px' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#f4efe4', marginBottom: 12 }}>Junior Suite</div>
          <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.45)', marginBottom: 6 }}>Hutnummers (komma-gescheiden)</div>
          <input value={junior} onChange={(e) => setJunior(e.target.value)} onBlur={saveJunior} className="input-field" style={{ ...fieldStyle('#f4efe4', false), marginBottom: 12 }} />
          <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.45)', marginBottom: 6 }}>Prijs p.p.</div>
          <input value={juniorPrijs} onChange={(e) => setJuniorPrijs(e.target.value)} onBlur={saveJunior} className="input-field" style={{ ...fieldStyle('#e2c284', false), width: 130 }} />
        </div>
      </div>
    </div>
  );
}

function OverrideRow({ cabin, standaard, onSaved, onDelete }) {
  const [prijs, setPrijs] = useState(String(cabin.prijsOverride));
  const commit = async () => {
    const val = parseInt(prijs, 10);
    if (!val || val === cabin.prijsOverride) return;
    const updated = await apiPatch(`/api/admin/cabins/${cabin.nummer}`, { prijsOverride: val });
    onSaved(updated);
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 140px 1fr 36px', gap: 12, alignItems: 'center', background: '#0e1b2e', border: '1px solid rgba(201,164,92,0.2)', padding: '12px 18px', marginBottom: 8 }}>
      <div style={{ fontSize: 14.5, fontWeight: 600, color: '#f4efe4', padding: '10px 12px' }}>Hut {cabin.nummer}</div>
      <input value={prijs} onChange={(e) => setPrijs(e.target.value)} onBlur={commit} className="input-field" style={fieldStyle('#e2c284', false)} />
      <div style={{ fontSize: 12.5, color: 'rgba(232,228,218,0.45)' }}>€ {standaard} standaard</div>
      <div onClick={onDelete} title="Verwijderen" className="danger-text" style={{ cursor: 'pointer', width: 36, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(232,228,218,0.35)', fontSize: 18 }}>
        ×
      </div>
    </div>
  );
}
