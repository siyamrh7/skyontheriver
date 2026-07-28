export default function Logo({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
      <circle cx="20" cy="20" r="19" fill="none" stroke="#c9a45c" strokeWidth="1" />
      <path d="M20 5 L22.4 13.6 L31 16 L22.4 18.4 L20 27 L17.6 18.4 L9 16 L17.6 13.6 Z" fill="#c9a45c" />
      <path d="M8 30.5 Q11 27.8 14 30.5 T20 30.5 T26 30.5 T32 30.5" fill="none" stroke="#c9a45c" strokeWidth="1.1" />
    </svg>
  );
}
