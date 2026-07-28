'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../../../components/site/Logo';
import { apiPost } from '../../../lib/apiClient';

const inputStyle = { width: '100%', background: '#12233c', border: '1px solid rgba(201,164,92,0.35)', color: '#f4efe4', padding: '13px 14px', fontFamily: "'Karla',sans-serif", fontSize: 14.5, outline: 'none' };

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fout, setFout] = useState(false);
  const [busy, setBusy] = useState(false);

  const login = async () => {
    setBusy(true);
    setFout(false);
    try {
      await apiPost('/api/auth/login', { email, password });
      router.push('/admin');
      router.refresh();
    } catch (e) {
      setFout(true);
    } finally {
      setBusy(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') login();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, background: 'radial-gradient(ellipse at 50% 0%, #12233c 0%, #0b1524 70%)' }}>
      <div style={{ width: 400, maxWidth: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'center' }}>
            <Logo size={56} />
          </div>
          <div style={{ fontFamily: "'Italiana',serif", fontSize: 26, letterSpacing: '0.12em', color: '#f4efe4' }}>STARS ON THE RIVER</div>
          <div style={{ fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#c9a45c', marginTop: 6 }}>Beheeromgeving</div>
        </div>
        <div style={{ background: '#0e1b2e', border: '1px solid rgba(201,164,92,0.3)', padding: '34px 32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.6)', marginBottom: 7 }}>E-mailadres</div>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="eigenaar@starsontheriver.nl" className="input-field" style={inputStyle} />
            </div>
            <div>
              <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(232,228,218,0.6)', marginBottom: 7 }}>Wachtwoord</div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={onKeyDown} placeholder="••••••••" className="input-field" style={inputStyle} />
            </div>
            {fout && <div style={{ fontSize: 13, color: '#c96b5c' }}>Onjuiste inloggegevens. Probeer het opnieuw.</div>}
            <div
              onClick={busy ? undefined : login}
              className="gold-btn"
              style={{ cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.7 : 1, textAlign: 'center', padding: 14, background: '#c9a45c', color: '#0b1524', fontSize: 13.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 6 }}
            >
              {busy ? 'Bezig…' : 'Inloggen'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
