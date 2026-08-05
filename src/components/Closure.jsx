import { useEffect, useRef, useCallback, useId } from 'react'

/**
 * The closure itself.
 *
 * Two membranes meet along a centreline. Each carries a row of hooked barbs.
 * Closure travels as a wavefront: the seam ripples shut rather than snapping,
 * which is what a feather actually does when a bird draws it through its beak.
 *
 * Iridescence appears only where the barbs have locked. Structural colour is
 * a consequence of structure, so the seam has no colour until it has order.
 */

const H = 236          // drawing height in px units
const CY = H / 2       // centreline
const SPACING = 27     // barb pitch
const LEN = 21         // barb length
const HOOK = 6.6       // hook radius
const GAP = 34         // how far the membranes sit apart when open
const MEM = 54         // depth of the tape itself

// a barb: a shaft with a hook curling off the end
const topBarb = `M0 0 V${LEN} q0 ${HOOK} ${HOOK} ${HOOK} q${HOOK} 0 ${HOOK} -${HOOK}`
const botBarb = `M0 0 V-${LEN} q0 -${HOOK} ${HOOK} -${HOOK} q${HOOK} 0 ${HOOK} ${HOOK}`

export default function Closure({
  progress,            // 0..1 when controlled from outside
  onProgress,
  interactive = true,
  hint = true,
  tone = 'light',
  jam = 0,             // if > 0, travel stops here and the seam refuses
  className = '',
}) {
  const wrapRef = useRef(null)
  const svgRef = useRef(null)
  const topMemRef = useRef(null)
  const botMemRef = useRef(null)
  const seamRef = useRef(null)
  const handleRef = useRef(null)
  const gradRef = useRef(null)
  const barbsRef = useRef([])
  // every instance needs its own gradient id, or they all resolve to the first
  const gid = `iris-${useId().replace(/:/g, '')}`

  const stateRef = useRef({
    w: 1000,
    n: 60,
    target: 0,
    cur: 0,
    dragging: false,
    shake: 0,
    raf: 0,
    visible: true,
    dirty: true,
  })

  const ink = tone === 'dark' ? '#ece8df' : '#14130f'

  /* ---- geometry ------------------------------------------------------ */

  const build = useCallback(() => {
    const el = wrapRef.current
    if (!el) return
    const w = Math.max(320, el.clientWidth)
    const s = stateRef.current
    s.w = w
    s.n = Math.max(12, Math.floor((w - 40) / SPACING))
    s.dirty = true
    if (svgRef.current) {
      svgRef.current.setAttribute('viewBox', `0 0 ${w} ${H}`)
    }
  }, [])

  useEffect(() => {
    build()
    const ro = new ResizeObserver(build)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [build])

  /* ---- the frame loop ------------------------------------------------ */

  /* only draw when the strip is on screen */
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        stateRef.current.visible = e.isIntersecting
        stateRef.current.dirty = true
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const s = stateRef.current

    const closednessAt = (i, p) => {
      // a soft wavefront: barbs near the front are mid-close
      const front = p * (s.n + 3)
      const d = front - i
      return Math.min(1, Math.max(0, d / 2.4))
    }

    const frame = () => {
      // nothing to do: offscreen, settled, and not shaking
      const settled = Math.abs(s.target - s.cur) < 0.0004 && s.shake < 0.02
      if (settled && !s.dirty) {
        s.raf = requestAnimationFrame(frame)
        return
      }
      if (!s.visible && settled) {
        s.raf = requestAnimationFrame(frame)
        return
      }
      if (settled) {
        s.cur = s.target
        s.shake = 0
        s.dirty = false
      }

      const ease = s.dragging ? 0.34 : 0.14
      s.cur += (s.target - s.cur) * ease

      if (s.shake > 0) s.shake *= 0.86
      const shakeX = s.shake > 0.01 ? Math.sin(performance.now() / 22) * s.shake : 0

      const { w, n, cur } = s
      const pad = (w - (n - 1) * SPACING) / 2

      // membrane edges ripple with the wavefront
      let topEdge = ''
      let botEdge = ''
      let offFirst = 0
      let offLast = 0

      // barbs past the current count are parked out of sight
      for (let i = n; i < barbsRef.current.length; i++) {
        const g = barbsRef.current[i]
        if (g?.t) g.t.setAttribute('opacity', '0')
        if (g?.b) g.b.setAttribute('opacity', '0')
      }

      for (let i = 0; i < n; i++) {
        const c = closednessAt(i, cur)
        const x = pad + i * SPACING
        const off = (1 - c) * GAP
        if (i === 0) offFirst = off
        if (i === n - 1) offLast = off
        // both edges are traced right to left so the fill winds correctly
        topEdge = `L${x.toFixed(1)} ${(CY - off).toFixed(1)} ` + topEdge
        botEdge = `L${x.toFixed(1)} ${(CY + off).toFixed(1)} ` + botEdge

        const g = barbsRef.current[i]
        if (g) {
          g.t.setAttribute(
            'transform',
            `translate(${x + shakeX} ${CY - LEN - off})`,
          )
          g.b.setAttribute(
            'transform',
            `translate(${x + HOOK * 0.9 - shakeX} ${CY + LEN + off})`,
          )
          const o = 0.28 + c * 0.72
          g.t.setAttribute('opacity', o.toFixed(3))
          g.b.setAttribute('opacity', o.toFixed(3))
        }
      }

      const tTop = CY - GAP - MEM
      const tBot = CY + GAP + MEM
      if (topMemRef.current) {
        topMemRef.current.setAttribute(
          'd',
          `M0 ${tTop} L${w} ${tTop} L${w} ${(CY - offLast).toFixed(1)} ${topEdge} L0 ${(CY - offFirst).toFixed(1)} Z`,
        )
      }
      if (botMemRef.current) {
        botMemRef.current.setAttribute(
          'd',
          `M0 ${tBot} L${w} ${tBot} L${w} ${(CY + offLast).toFixed(1)} ${botEdge} L0 ${(CY + offFirst).toFixed(1)} Z`,
        )
      }
      if (gradRef.current) gradRef.current.setAttribute('x2', w)

      // the seam: only as long as the closed run
      if (seamRef.current) {
        const end = pad + Math.max(0, cur * (w - pad * 2))
        seamRef.current.setAttribute('x1', pad)
        seamRef.current.setAttribute('x2', end)
        seamRef.current.setAttribute('opacity', Math.min(1, cur * 1.4).toFixed(3))
      }

      if (handleRef.current) {
        const hx = pad + cur * (w - pad * 2)
        handleRef.current.setAttribute('transform', `translate(${hx + shakeX} ${CY})`)
      }

      s.raf = requestAnimationFrame(frame)
    }

    s.raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(s.raf)
  }, [])

  /* ---- controlled progress ------------------------------------------- */

  useEffect(() => {
    if (typeof progress === 'number') {
      stateRef.current.target = progress
      stateRef.current.dirty = true
    }
  }, [progress])

  /* ---- pointer ------------------------------------------------------- */

  useEffect(() => {
    if (!interactive) return
    const el = wrapRef.current
    if (!el) return
    const s = stateRef.current

    const set = (clientX) => {
      const r = el.getBoundingClientRect()
      const pad = 20
      let p = (clientX - r.left - pad) / Math.max(1, r.width - pad * 2)
      p = Math.min(1, Math.max(0, p))
      if (jam > 0 && p > jam) {
        if (s.target >= jam - 0.02) s.shake = 3.4
        p = jam
      }
      s.target = p
      onProgress?.(p)
    }

    const down = (e) => {
      s.dragging = true
      el.setPointerCapture?.(e.pointerId)
      set(e.clientX)
    }
    const move = (e) => {
      if (!s.dragging) return
      e.preventDefault()
      set(e.clientX)
    }
    const up = (e) => {
      s.dragging = false
      el.releasePointerCapture?.(e.pointerId)
    }

    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move, { passive: false })
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [interactive, jam, onProgress])

  /* ---- keyboard ------------------------------------------------------ */

  const onKey = (e) => {
    if (!interactive) return
    const s = stateRef.current
    const step = 0.08
    if (e.key === 'ArrowRight') {
      s.target = Math.min(jam > 0 ? jam : 1, s.target + step)
      if (jam > 0 && s.target >= jam - 0.001) s.shake = 3.4
      onProgress?.(s.target)
      e.preventDefault()
    }
    if (e.key === 'ArrowLeft') {
      s.target = Math.max(0, s.target - step)
      onProgress?.(s.target)
      e.preventDefault()
    }
  }

  const barbs = Array.from({ length: 90 })

  return (
    <div
      ref={wrapRef}
      className={`closure ${interactive ? 'closure--live' : ''} ${className}`}
      role={interactive ? 'slider' : 'img'}
      aria-label={interactive ? 'Drag to close the seam' : 'Closure diagram'}
      tabIndex={interactive ? 0 : -1}
      onKeyDown={onKey}
    >
      <svg ref={svgRef} viewBox={`0 0 1000 ${H}`} width="100%" height={H} aria-hidden="true">
        <defs>
          <linearGradient
            id={gid}
            ref={gradRef}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="1200"
            y2="0"
          >
            <stop offset="0%" stopColor="#0d6d62" />
            <stop offset="34%" stopColor="#27499b" />
            <stop offset="62%" stopColor="#6b3a8e" />
            <stop offset="100%" stopColor="#a96a2c" />
          </linearGradient>
        </defs>

        <path ref={topMemRef} fill={ink} fillOpacity={tone === 'dark' ? 0.1 : 0.07} />
        <path ref={botMemRef} fill={ink} fillOpacity={tone === 'dark' ? 0.1 : 0.07} />

        <g fill="none" stroke={ink} strokeWidth="1.7" strokeLinecap="round">
          {barbs.map((_, i) => (
            <g key={i}>
              <path
                ref={(n) => {
                  barbsRef.current[i] = barbsRef.current[i] || {}
                  barbsRef.current[i].t = n
                }}
                d={topBarb}
              />
              <path
                ref={(n) => {
                  barbsRef.current[i] = barbsRef.current[i] || {}
                  barbsRef.current[i].b = n
                }}
                d={botBarb}
              />
            </g>
          ))}
        </g>

        <line
          ref={seamRef}
          y1={CY}
          y2={CY}
          stroke={`url(#${gid})`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {interactive && (
          <g ref={handleRef} className="closure__handle">
            <circle r="17" fill={tone === 'dark' ? '#100f0c' : '#ece8df'} />
            <circle r="17" fill="none" stroke={ink} strokeWidth="1.25" />
            <line x1="-4" x2="-4" y1="-5" y2="5" stroke={ink} strokeWidth="1.25" />
            <line x1="0" x2="0" y1="-6.5" y2="6.5" stroke={ink} strokeWidth="1.25" />
            <line x1="4" x2="4" y1="-5" y2="5" stroke={ink} strokeWidth="1.25" />
          </g>
        )}
      </svg>

      {hint && interactive && (
        <div className="closure__hint label" aria-hidden="true">
          <span className="closure__hint-arrow">→</span> drag along the seam
        </div>
      )}
    </div>
  )
}
