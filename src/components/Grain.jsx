/** Paper grain. Fixed, multiplied, never interactive. */
export default function Grain() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="grain-f">
        <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-f)" opacity="0.5" />
    </svg>
  )
}
