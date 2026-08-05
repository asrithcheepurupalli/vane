import { useRef, useState, useCallback } from 'react'

/** hold force as a function of pull angle: shear drives the hooks in, peel walks them out */
const forceAt = (deg) => {
  const r = (deg * Math.PI) / 180
  return 3.1 + 38.9 * Math.pow(Math.max(0, Math.cos(r)), 2.6)
}

const R = 150
const CX = 200
const CY = 250

export default function Forces() {
  const [deg, setDeg] = useState(12)
  const stage = useRef(null)
  const f = forceAt(deg)

  const fromPointer = useCallback((e) => {
    const el = stage.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * 400
    const py = ((e.clientY - r.top) / r.height) * 400 + 50
    const a = Math.atan2(CY - py, px - CX) * (180 / Math.PI)
    setDeg(Math.min(90, Math.max(0, a)))
  }, [])

  const drag = useRef(false)

  const label =
    deg < 18 ? 'shear' : deg < 55 ? 'oblique' : 'peel'

  const rad = (deg * Math.PI) / 180
  const nx = CX + Math.cos(rad) * R
  const ny = CY - Math.sin(rad) * R

  // curve of force against angle
  const curve = Array.from({ length: 46 }).map((_, i) => {
    const d = i * 2
    const x = 60 + (d / 90) * 300
    const y = 150 - (forceAt(d) / 42) * 104
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')

  return (
    <section className="plate forces" id="forces">
      <span className="tick tick--tl" />
      <span className="tick tick--tr" />

      <div className="shell">
        <div className="plate-mark">
          <span>Plate IV</span>
          <span>The asymmetry</span>
          <span>100 mm test seam</span>
        </div>

        <div className="forces__head">
          <h2 className="display d-lg reveal">
            Strong one way.
            <br />
            <em>Weak</em> the other.
            <br />
            On purpose.
          </h2>
          <p className="body reveal" style={{ '--d': '120ms' }}>
            A closure does not need to be strong in every direction. It needs to be strong in
            the directions a garment pulls, and weak in the one direction a hand pulls. Those
            are not the same direction, and that gap is the entire product.
          </p>
        </div>

        <div className="forces__rig reveal" style={{ '--d': '160ms' }}>
          <div
            className="forces__dial"
            ref={stage}
            role="slider"
            aria-label="Pull angle"
            aria-valuemin={0}
            aria-valuemax={90}
            aria-valuenow={Math.round(deg)}
            tabIndex={0}
            onPointerDown={(e) => {
              drag.current = true
              e.currentTarget.setPointerCapture?.(e.pointerId)
              fromPointer(e)
            }}
            onPointerMove={(e) => {
              if (!drag.current) return
              e.preventDefault()
              fromPointer(e)
            }}
            onPointerUp={() => (drag.current = false)}
            onPointerCancel={() => (drag.current = false)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { setDeg((d) => Math.min(90, d + 3)); e.preventDefault() }
              if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { setDeg((d) => Math.max(0, d - 3)); e.preventDefault() }
            }}
          >
            <svg viewBox="0 50 400 260" width="100%">
              <defs>
                <linearGradient id="iris3" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="360" y2="0">
                  <stop offset="0%" stopColor="#0d6d62" />
                  <stop offset="50%" stopColor="#27499b" />
                  <stop offset="100%" stopColor="#a96a2c" />
                </linearGradient>
              </defs>

              {/* the seam */}
              <line x1="40" y1={CY} x2="360" y2={CY} stroke="currentColor" strokeWidth="2" opacity="0.35" />
              <line x1="40" y1={CY} x2={CX} y2={CY} stroke="url(#iris3)" strokeWidth="3.5" strokeLinecap="round" />

              {/* protractor */}
              <path
                d={`M${CX + R} ${CY} A${R} ${R} 0 0 0 ${CX} ${CY - R}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.25"
              />
              {[0, 15, 30, 45, 60, 75, 90].map((d) => {
                const rr = (d * Math.PI) / 180
                const x1 = CX + Math.cos(rr) * (R - 8)
                const y1 = CY - Math.sin(rr) * (R - 8)
                const x2 = CX + Math.cos(rr) * R
                const y2 = CY - Math.sin(rr) * R
                return <line key={d} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" opacity="0.4" />
              })}

              {/* the pull */}
              <line x1={CX} y1={CY} x2={nx} y2={ny} stroke="currentColor" strokeWidth="2.4" />
              <circle cx={nx} cy={ny} r="9" fill="var(--paper)" stroke="currentColor" strokeWidth="2.4" />
              <circle cx={CX} cy={CY} r="4" fill="currentColor" />

              <text x={CX + R - 4} y={CY + 22} textAnchor="end" className="dgm__cap">0° shear</text>
              <text x={CX + 10} y={CY - R + 4} className="dgm__cap">90° peel</text>
            </svg>
            <span className="forces__grab label">drag the arm</span>
          </div>

          <div className="forces__meta">
            <div className="forces__readout">
              <span className="label">Hold force</span>
              <div className="forces__big">
                <span className="num iris-text">{f.toFixed(1)}</span>
                <span className="forces__unit">N</span>
              </div>
              <div className="forces__tags">
                <span className="num">{Math.round(deg)}°</span>
                <span className={`forces__tag forces__tag--${label}`}>{label}</span>
              </div>
            </div>

            <svg viewBox="0 0 380 170" className="forces__curve">
              <line x1="60" y1="150" x2="360" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              <line x1="60" y1="20" x2="60" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              <path d={curve} fill="none" stroke="url(#iris3)" strokeWidth="2.5" />
              <line
                x1={60 + (deg / 90) * 300}
                y1="20"
                x2={60 + (deg / 90) * 300}
                y2="150"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.55"
              />
              <circle cx={60 + (deg / 90) * 300} cy={150 - (f / 42) * 104} r="4.5" fill="currentColor" />
              <text x="60" y="166" className="dgm__cap">0°</text>
              <text x="345" y="166" className="dgm__cap">90°</text>
              <text x="14" y="26" className="dgm__cap">42 N</text>
            </svg>

            <p className="body forces__note">
              A coat pulls on its closure at nought to about fifteen degrees, all day. Your hand,
              lifting one corner, pulls at ninety. The seam holds{' '}
              <strong>{(forceAt(0) / forceAt(90)).toFixed(0)} times harder</strong> against the
              first than the second, and neither number is a compromise.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
