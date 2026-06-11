import type { IconProps } from "./types";

export default function IconChat({ size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={style}>
      <path d="M4 8 L32 8 L32 24 L20 24 L14 32 L14 24 L4 24 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" strokeLinejoin="round" />
      <circle cx="12" cy="16" r="2" fill="currentColor" />
      <circle cx="18" cy="16" r="2" fill="currentColor" />
      <circle cx="24" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}
