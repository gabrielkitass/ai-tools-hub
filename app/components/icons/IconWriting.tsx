import type { IconProps } from "./types";

export default function IconWriting({ size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={style}>
      <path d="M8 28 L10 20 L24 6 L30 12 L16 26 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" strokeLinejoin="round" />
      <line x1="10" y1="20" x2="16" y2="26" stroke="currentColor" strokeWidth="1.5" />
      <line x1="20" y1="10" x2="26" y2="16" stroke="currentColor" strokeWidth="1" />
      <rect x="6" y="26" width="8" height="3" rx="1" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}
