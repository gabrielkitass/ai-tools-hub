import type { IconProps } from "./types";

export default function IconReport({ size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={style}>
      <polygon points="18,4 32,12 32,24 18,32 4,24 4,12" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <polygon points="18,10 26,15 26,21 18,26 10,21 10,15" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.15" />
      <line x1="18" y1="4" x2="18" y2="10" stroke="currentColor" strokeWidth="1.5" />
      <line x1="32" y1="12" x2="26" y2="15" stroke="currentColor" strokeWidth="1.5" />
      <line x1="32" y1="24" x2="26" y2="21" stroke="currentColor" strokeWidth="1.5" />
      <line x1="18" y1="32" x2="18" y2="26" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="24" x2="10" y2="21" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="12" x2="10" y2="15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
