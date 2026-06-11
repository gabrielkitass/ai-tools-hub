import type { IconProps } from "./types";

export default function IconIdea({ size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={style}>
      <polygon points="18,3 21,13 32,13 23,19 26,30 18,24 10,30 13,19 4,13 15,13" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" strokeLinejoin="round" />
      <polygon points="18,9 20,15 26,15 21,19 23,25 18,21 13,25 15,19 10,15 16,15" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}
