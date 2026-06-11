import type { IconProps } from "./types";

export default function IconTranslate({ size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={style}>
      <rect x="3" y="6" width="13" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <rect x="20" y="12" width="13" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M16 10 L20 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 18 L20 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="10" r="2" fill="currentColor" />
      <circle cx="16" cy="18" r="2" fill="currentColor" />
      <circle cx="20" cy="14" r="2" fill="currentColor" />
      <circle cx="20" cy="22" r="2" fill="currentColor" />
    </svg>
  );
}
