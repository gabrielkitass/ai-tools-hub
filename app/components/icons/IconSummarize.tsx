import type { IconProps } from "./types";

export default function IconSummarize({ size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={style}>
      <rect x="4" y="4" width="28" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
      <rect x="4" y="14" width="20" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <rect x="4" y="22" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <polygon points="28,20 36,26 28,32" fill="currentColor" fillOpacity="0.8" />
      <line x1="28" y1="26" x2="20" y2="26" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
