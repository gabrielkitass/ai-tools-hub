import type { IconProps } from "./types";

export default function IconSeo({ size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={style}>
      <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M10 18 Q14 10 18 18 Q22 26 26 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="4" y1="18" x2="32" y2="18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="18" y1="4" x2="18" y2="32" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="18" cy="18" r="2.5" fill="currentColor" />
    </svg>
  );
}
