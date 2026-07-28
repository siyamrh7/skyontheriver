'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { apiPost } from '../../lib/apiClient';

const MENU = [
  { href: '/admin', label: 'Overzicht' },
  { href: '/admin/boekingen', label: 'Boekingen' },
  { href: '/admin/hutten', label: 'Hutten beheren' },
  { href: '/admin/programma', label: 'Programma' },
  { href: '/admin/fotos', label: "Foto's" },
  { href: '/admin/instellingen', label: 'Prijzen & indeling' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));

  const logout = async () => {
    try {
      await apiPost('/api/auth/logout', {});
    } catch (e) {}
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="admin-sidebar">
      <div style={{ padding: '0 22px 0' }}>
        <div style={{ fontFamily: "'Italiana',serif", fontSize: 17, letterSpacing: '0.1em', color: '#f4efe4' }}>STARS ON THE RIVER</div>
        <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a45c', marginTop: 4 }}>Beheer</div>
      </div>
      {MENU.map((m) => {
        const active = isActive(m.href);
        return (
          <Link
            key={m.href}
            href={m.href}
            className="nav-tab"
            style={{ cursor: 'pointer', padding: '12px 22px', fontSize: 14, letterSpacing: '0.04em', color: active ? '#e2c284' : 'rgba(232,228,218,0.65)', background: active ? 'rgba(201,164,92,0.08)' : 'transparent', borderLeft: `2px solid ${active ? '#c9a45c' : 'transparent'}`, textDecoration: 'none' }}
          >
            {m.label}
          </Link>
        );
      })}
      <div style={{ flex: 1 }} />
      <div onClick={logout} className="danger-text" style={{ cursor: 'pointer', padding: '12px 22px', fontSize: 13.5, color: 'rgba(232,228,218,0.5)' }}>
        Uitloggen
      </div>
    </div>
  );
}
