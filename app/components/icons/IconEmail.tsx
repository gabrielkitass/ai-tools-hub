import type { IconProps } from "./types";

export default function IconEmail({ size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={style}>
      <rect x="4" y="8" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M4 10 L18 20 L32 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
  );
}
