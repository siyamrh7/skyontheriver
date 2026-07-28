'use client';
import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint = 780) {
  const [mobiel, setMobiel] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setMobiel(mq.matches);
    const handler = (e) => setMobiel(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return mobiel;
}
