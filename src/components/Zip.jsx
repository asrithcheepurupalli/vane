import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * The incumbent.
 *
 * A working zip you can drag. It jams, every time, at the same place,
 * because that is the point being made. Two attempts and the copy relents.
 */

const H = 168
const CY = H / 2
const PITCH = 17
const TOOTH_W = 9
const TOOTH_H = 13
const OPEN = 26
const JAM_AT = 0.62

export default function Zip({ onJam }) {
  const wrapRef = useRef(null)
  const svgRef = useRef(null)
  const topRef = useRef(null)
  const botRef = useRef(null)
  const teethRef = useRef([])
  const sliderRef = useRef(null)
  const [jammed, setJammed] = useState(false)
  const [tries, setTries] = useState(0)

  const s = useRef({ w: 1000, n: 50, target: 0, cur: 0, dragging: false, shake: 0, raf: 0, fired: false, dirty: true })

  const build = useCallback(() => {
    const el = wrapRef.current
    if (!el) return
    const w = Math.max(320, el.clientWidth)
    s.current.w = w
    s.current.n = Math.max(10, Math.floor((w - 40) / PITCH))
    s.current.dirty = true
    svgRef.current?.setAttribute('viewBox', `0 0 ${w} ${H}`)
  }, [])

  useEffect(() => {
    build()
    const ro = new ResizeObserver(build)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [build])

  useEffect(() => {
    const st = s.current
    const frame = () => {
      if (Math.abs(st.target - st.cur) < 0.0004 && st.shake < 0.02 && !st.dirty) {
        st.raf = requestAnimationFrame(frame)
        return
      }
      st.dirty = false
      st.cur += (st.target - st.cur) * (st.dragging ? 0.32 : 0.12)
      if (st.shake > 0) st.shake *= 0.87
      const sh = st.shake > 0.01 ? Math.sin(performance.now() / 18) * st.shake : 0

      const { w, n, cur } = st
      const pad = (w - (n - 1) * PITCH) / 2
      const front = cur * (n + 2)

      for (let i = 0; i < n; i++) {
        const c = Math.min(1, Math.max(0, (front - i) / 1.6))
        const x = pad + i * PITCH
        const off = (1 - c) * OPEN
        const t = teethRef.current[i]
        if (!t) continue
        // past the jam the teeth sit visibly out of register
        const skew = cur >= JAM_AT - 0.01 && i > front - 3 && i < front + 2 ? sh * 0.9 : 0
        t.t?.setAttribute('transform', `translate(${x + skew} ${CY - TOOTH_H - off})`)
        t.b?.setAttribute('transform', `translate(${x + PITCH / 2 - skew} ${CY + off})`)
      }

      const edgeTop = CY - OPEN
      const edgeBot = CY + OPEN
      topRef.current?.setAttribute(
        'd',
        `M0 0 L${w} 0 L${w} ${edgeTop} L${pad + cur * (w - pad * 2)} ${edgeTop} L${pad + cur * (w - pad * 2)} ${CY} L0 ${CY} Z`,
      )
      botRef.current?.setAttribute(
        'd',
        `M0 ${H} L${w} ${H} L${w} ${edgeBot} L${pad + cur * (w - pad * 2)} ${edgeBot} L${pad + cur * (w - pad * 2)} ${CY} L0 ${CY} Z`,
      )

      sliderRef.current?.setAttribute(
        'transform',
        `translate(${pad + cur * (w - pad * 2) + sh} ${CY})`,
      )

      st.raf = requestAnimationFrame(frame)
    }
    st.raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(st.raf)
  }, [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const st = s.current

    const set = (clientX) => {
      const r = el.getBoundingClientRect()
      const pad = 20
      let p = (clientX - r.left - pad) / Math.max(1, r.width - pad * 2)
      p = Math.min(1, Math.max(0, p))
      if (p >= JAM_AT) {
        if (!st.fired || st.target < JAM_AT - 0.05) {
          st.shake = 4.2
          setJammed(true)
          setTries((t) => t + 1)
          onJam?.()
          st.fired = true
        }
        p = JAM_AT
      } else if (p < JAM_AT - 0.08) {
        st.fired = false
        setJammed(false)
      }
      st.target = p
    }

    const down = (e) => { st.dragging = true; el.setPointerCapture?.(e.pointerId); set(e.clientX) }
    const move = (e) => { if (!st.dragging) return; e.preventDefault(); set(e.clientX) }
    const up = (e) => { st.dragging = false; el.releasePointerCapture?.(e.pointerId) }

    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move, { passive: false })
    window.addEventListener('pointerup', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [onJam])

  const teeth = Array.from({ length: 80 })
  const ink = '#ece8df'

  return (
    <div className="zip">
      <div
        ref={wrapRef}
        className="zip__stage"
        role="slider"
        aria-label="Drag the zip closed"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            const st = s.current
            const next = Math.min(JAM_AT, st.target + 0.08)
            if (next >= JAM_AT) { st.shake = 4.2; setJammed(true); onJam?.() }
            st.target = next
            e.preventDefault()
          }
          if (e.key === 'ArrowLeft') {
            s.current.target = Math.max(0, s.current.target - 0.08)
            setJammed(false)
            e.preventDefault()
          }
        }}
      >
        <svg ref={svgRef} viewBox={`0 0 1000 ${H}`} width="100%" height={H} aria-hidden="true">
          <path ref={topRef} fill={ink} fillOpacity="0.09" />
          <path ref={botRef} fill={ink} fillOpacity="0.09" />
          <g fill={ink} fillOpacity="0.82">
            {teeth.map((_, i) => (
              <g key={i}>
                <rect
                  ref={(n) => {
                    teethRef.current[i] = teethRef.current[i] || {}
                    teethRef.current[i].t = n
                  }}
                  width={TOOTH_W}
                  height={TOOTH_H}
                  rx="2.5"
                />
                <rect
                  ref={(n) => {
                    teethRef.current[i] = teethRef.current[i] || {}
                    teethRef.current[i].b = n
                  }}
                  width={TOOTH_W}
                  height={TOOTH_H}
                  rx="2.5"
                />
              </g>
            ))}
          </g>
          <g ref={sliderRef}>
            <path
              d="M-13 -19 L13 -19 L10 19 L-10 19 Z"
              fill="#100f0c"
              stroke={ink}
              strokeWidth="1.4"
            />
            <rect x="-3.5" y="14" width="7" height="18" rx="3" fill="none" stroke={ink} strokeWidth="1.4" />
          </g>
        </svg>
      </div>

      <div className="zip__readout label">
        <span className={jammed ? 'zip__state zip__state--bad' : 'zip__state'}>
          {jammed ? 'jammed' : 'travelling'}
        </span>
        <span>
          {jammed
            ? tries > 1
              ? 'it will do this again'
              : 'try it once more'
            : 'drag the slider'}
        </span>
      </div>
    </div>
  )
}
