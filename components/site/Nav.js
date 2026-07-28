'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';
import { useIsMobile } from '../../lib/useIsMobile';

const TABS = [
  { href: '/', label: 'Home' },
  { href: '/schip', label: 'Het schip' },
  { href: '/programma', label: 'Programma' },
  { href: '/hutten', label: 'Hutten & prijzen' },
  { href: '/arnhem', label: 'Arnhem' },
  { href: '/gastheer', label: 'Gastheer' },
];

export default function Nav() {
  const pathname = usePathname();
  const mobiel = useIsMobile(780);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(11,21,36,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(201,164,92,0.25)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: mobiel ? '10px 18px' : '12px 24px', minHeight: mobiel ? 60 : 76, flexWrap: 'wrap' }}>
        <Link href="/" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: mobiel ? 9 : 12, textDecoration: 'none' }}>
          <Logo size={mobiel ? 26 : 42} />
          <div>
            <div style={{ fontFamily: "'Italiana',serif", fontSize: mobiel ? 12 : 20, letterSpacing: '0.12em', color: '#f4efe4', lineHeight: 1, whiteSpace: 'nowrap' }}>STARS ON THE RIVER</div>
            {!mobiel && (
              <div style={{ fontSize: 10, letterSpacing: '0.32em', color: '#c9a45c', marginTop: 3 }}>19 · 20 · 21 MAART 2027</div>
            )}
          </div>
        </Link>

        {!mobiel && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {TABS.map((tab) => {
              const active = isActive(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="nav-tab"
                  style={{ cursor: 'pointer', padding: '8px 14px', fontSize: 13.5, letterSpacing: '0.09em', textTransform: 'uppercase', color: active ? '#e2c284' : 'rgba(232,228,218,0.75)', borderBottom: `2px solid ${active ? '#c9a45c' : 'transparent'}`, transition: 'color .2s', whiteSpace: 'nowrap', textDecoration: 'none' }}
                >
                  {tab.label}
                </Link>
              );
            })}
            <Link
              href="/hutten"
              className="gold-btn"
              style={{ cursor: 'pointer', marginLeft: 14, padding: '11px 22px', background: '#c9a45c', color: '#0b1524', fontSize: 13, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}
            >
              Boek nu
            </Link>
          </div>
        )}

        {mobiel && (
          <div
            onClick={() => setMenuOpen((v) => !v)}
            title="Menu"
            style={{ cursor: 'pointer', width: 40, height: 40, flexShrink: 0, marginLeft: 'auto', border: '1px solid rgba(201,164,92,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}
          >
            <div style={{ width: 17, height: 2, background: '#c9a45c' }} />
            <div style={{ width: 17, height: 2, background: '#c9a45c' }} />
            <div style={{ width: 17, height: 2, background: '#c9a45c' }} />
          </div>
        )}
      </div>

      {mobiel && menuOpen && (
        <div style={{ borderTop: '1px solid rgba(201,164,92,0.25)', background: '#0b1524', boxShadow: '0 24px 40px rgba(4,9,18,0.6)' }}>
          {TABS.map((tab) => {
            const active = isActive(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setMenuOpen(false)}
                className="nav-tab"
                style={{ cursor: 'pointer', display: 'block', padding: '16px 24px', fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: active ? '#e2c284' : 'rgba(232,228,218,0.75)', borderLeft: `3px solid ${active ? '#c9a45c' : 'transparent'}`, borderBottom: '1px solid rgba(232,228,218,0.06)', textDecoration: 'none' }}
              >
                {tab.label}
              </Link>
            );
          })}
          <Link
            href="/hutten"
            onClick={() => setMenuOpen(false)}
            className="gold-btn"
            style={{ cursor: 'pointer', display: 'block', margin: '14px 24px 18px', padding: 15, textAlign: 'center', background: '#c9a45c', color: '#0b1524', fontSize: 13, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            Boek nu
          </Link>
        </div>
      )}
    </div>
  );
}
