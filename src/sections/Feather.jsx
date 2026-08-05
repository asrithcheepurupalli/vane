import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    n: '01',
    t: 'The vane',
    b: "A flight feather is not a solid surface. It is a shaft with several hundred branches, and the flat part you can see is only what those branches make together. It has to be airtight enough to push against air, and loose enough to survive being bent double.",
    cap: 'Rachis and barbs, greater covert',
  },
  {
    n: '02',
    t: 'The barbs',
    b: 'Each branch runs off the shaft at roughly forty five degrees, parallel to its neighbours and not attached to them. Pull two apart and the feather splits open with almost no resistance. Nothing is glued. Nothing is sewn.',
    cap: 'Barbs, separated, no adhesion',
  },
  {
    n: '03',
    t: 'The barbules',
    b: 'Every barb carries its own smaller branches. The ones on the leading side end in hooks. The ones on the trailing side are plain ridges. A single feather holds something like a million of these, and the hooks only ever meet the ridges of the neighbour in front.',
    cap: 'Hooked barbules meeting ridged barbules',
  },
  {
    n: '04',
    t: 'The repair',
    b: 'When the vane splits, the bird does not repair each hook. It draws the feather through its beak once and every hook finds a ridge on the way past. The structure reassembles itself because the geometry only fits one way.',
    cap: 'Preening: one pass, full re-engagement',
  },
]

function Diagram({ i }) {
  return (
    <div className="fplate__art" aria-hidden="true">
      <svg viewBox="0 0 520 520" className="fplate__svg">
        <defs>
          <linearGradient id="iris2" gradientUnits="userSpaceOnUse" x1="70" y1="0" x2="450" y2="0">
            <stop offset="0%" stopColor="#0d6d62" />
            <stop offset="40%" stopColor="#27499b" />
            <stop offset="70%" stopColor="#6b3a8e" />
            <stop offset="100%" stopColor="#a96a2c" />
          </linearGradient>
        </defs>

        {/* 01 the whole vane */}
        <g className={`dgm ${i === 0 ? 'is-on' : ''}`}>
          <line x1="260" y1="60" x2="260" y2="470" stroke="currentColor" strokeWidth="2.2" />
          {Array.from({ length: 26 }).map((_, k) => {
            const y = 84 + k * 15
            const len = 150 * Math.sin((k / 26) * Math.PI) + 34
            return (
              <g key={k} opacity={0.75}>
                <line x1="260" y1={y} x2={260 - len} y2={y - 44} stroke="currentColor" strokeWidth="1" />
                <line x1="260" y1={y} x2={260 + len} y2={y - 44} stroke="currentColor" strokeWidth="1" />
              </g>
            )
          })}
          <rect x="286" y="180" width="86" height="86" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <text x="378" y="200" className="dgm__cap">detail 02</text>
        </g>

        {/* 02 barbs, parallel and separable */}
        <g className={`dgm ${i === 1 ? 'is-on' : ''}`}>
          {[0, 1, 2, 3].map((k) => (
            <line
              key={k}
              x1={90 + k * 60}
              y1="430"
              x2={230 + k * 60}
              y2="110"
              stroke="currentColor"
              strokeWidth="2"
              opacity={k === 1 || k === 2 ? 1 : 0.4}
            />
          ))}
          <path d="M232 270 L288 246" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="232" cy="270" r="3" fill="currentColor" />
          <circle cx="288" cy="246" r="3" fill="currentColor" />
          <text x="300" y="243" className="dgm__cap">no bond</text>
          <text x="96" y="462" className="dgm__cap">barb</text>
        </g>

        {/* 03 barbules, hooks and ridges */}
        <g className={`dgm ${i === 2 ? 'is-on' : ''}`}>
          <line x1="70" y1="196" x2="450" y2="196" stroke="currentColor" strokeWidth="2.4" />
          <line x1="70" y1="330" x2="450" y2="330" stroke="currentColor" strokeWidth="2.4" />
          {Array.from({ length: 13 }).map((_, k) => {
            const x = 92 + k * 28
            return (
              <g key={k}>
                <path
                  d={`M${x} 196 V236 q0 11 11 11 q11 0 11 -11`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d={`M${x + 14} 330 V292`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  opacity="0.8"
                />
              </g>
            )
          })}
          <text x="70" y="180" className="dgm__cap">hooked barbules</text>
          <text x="70" y="360" className="dgm__cap">ridged barbules</text>
        </g>

        {/* 04 engaged, and the preen */}
        <g className={`dgm ${i === 3 ? 'is-on' : ''}`}>
          <line x1="70" y1="214" x2="450" y2="214" stroke="currentColor" strokeWidth="2.4" />
          <line x1="70" y1="312" x2="450" y2="312" stroke="currentColor" strokeWidth="2.4" />
          {Array.from({ length: 13 }).map((_, k) => {
            const x = 92 + k * 28
            return (
              <g key={k}>
                <path
                  d={`M${x} 214 V252 q0 11 11 11 q11 0 11 -11`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d={`M${x + 14} 312 V274 q0 -11 -11 -11 q-11 0 -11 11`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </g>
            )
          })}
          <line x1="70" y1="263" x2="450" y2="263" stroke="url(#iris2)" strokeWidth="3" strokeLinecap="round" />
          <path d="M92 404 H430" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
          <path d="M410 396 L432 404 L410 412" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <text x="92" y="392" className="dgm__cap">one pass</text>
        </g>
      </svg>
      <p className="fplate__cap label">{STEPS[i].cap}</p>
    </div>
  )
}

export default function Feather() {
  const [active, setActive] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.dataset.idx)
            setActive(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="plate fplate" id="feather">
      <span className="tick tick--tl" />
      <span className="tick tick--tr" />

      <div className="shell">
        <div className="plate-mark">
          <span>Plate II</span>
          <span>Prior art, 150 million years</span>
          <span>Order Aves</span>
        </div>

        <div className="fplate__head">
          <h2 className="display d-lg reveal">
            Nature shipped this
            <br />
            a <em>long</em> time ago.
          </h2>
          <p className="body reveal" style={{ '--d': '120ms' }}>
            Velcro came from a burr stuck to a dog. Nobody went back for the better idea on the
            same walk, which was the bird overhead. A feather is a closure that holds against a
            gale, opens without damage, repairs in one gesture and is made entirely of one
            material.
          </p>
        </div>

        <div className="fplate__body">
          <div className="fplate__sticky">
            <Diagram i={active} />
          </div>

          <ol className="fplate__steps">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                data-idx={i}
                ref={(el) => (refs.current[i] = el)}
                className={`fstep ${active === i ? 'is-active' : ''}`}
              >
                <span className="num fstep__n">{s.n}</span>
                <h3 className="display d-md">{s.t}</h3>
                <p className="body">{s.b}</p>
                <div className="fstep__art">
                  <Diagram i={i} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
