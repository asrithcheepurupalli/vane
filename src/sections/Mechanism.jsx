import { useState } from 'react'
import Closure from '../components/Closure'

const MODES = [
  {
    k: 'engage',
    label: 'Engage',
    p: 1,
    t: 'Press anywhere.',
    b: 'There is no box and pin, so there is no place you have to start. Put a finger anywhere on the seam and draw it along, or press the two edges together flat. The hooks find ridges on the way past, the same way the beak does it.',
    spec: 'closing force 1.8 N · any point of entry',
  },
  {
    k: 'hold',
    label: 'Hold',
    p: 1,
    t: 'Pull it sideways and it tightens.',
    b: 'Load along the seam drives each hook further into its ridge. This is the only direction a garment ever actually pulls, which is why the closure gets stronger exactly when you need it to.',
    spec: 'shear hold 42 N per 100 mm',
  },
  {
    k: 'release',
    label: 'Release',
    p: 0,
    t: 'Lift one corner and it lets go.',
    b: 'Peel is the one direction the geometry gives up. Take an edge at ninety degrees and the hooks release in sequence rather than all at once, so the force stays low the whole way down the seam.',
    spec: 'peel release 3.1 N · one hand, either end',
  },
]

export default function Mechanism() {
  const [mode, setMode] = useState(1)
  const m = MODES[mode]

  return (
    <section className="plate plate--night mech" id="mechanism" data-tone="dark">
      <span className="tick tick--tl" />
      <span className="tick tick--br" />

      <div className="shell">
        <div className="plate-mark">
          <span>Plate III</span>
          <span>The mechanism</span>
          <span>VANE tape, 9 mm</span>
        </div>

        <div className="mech__head">
          <h2 className="display d-lg reveal">
            One tape.
            <br />
            <em>No</em> slider.
          </h2>
          <p className="body reveal" style={{ '--d': '120ms' }}>
            VANE is a single extruded polymer tape, moulded in one shot, carrying a row of
            hooked barbs along its edge. Two tapes face each other. That is the entire bill of
            materials. There is no slider to lose, no teeth to fall out of register, and no
            metal anywhere in it.
          </p>
        </div>

        <div className="mech__stage reveal">
          <Closure progress={m.p} interactive={false} hint={false} tone="dark" />
        </div>

        <div className="mech__ctl">
          <div className="seg" role="tablist" aria-label="Mechanism states">
            {MODES.map((x, i) => (
              <button
                key={x.k}
                role="tab"
                aria-selected={mode === i}
                className={`seg__b ${mode === i ? 'is-on' : ''}`}
                onClick={() => setMode(i)}
              >
                {x.label}
              </button>
            ))}
          </div>

          <div className="mech__copy" key={m.k}>
            <h3 className="display d-md">{m.t}</h3>
            <p className="body">{m.b}</p>
            <p className="label mech__spec">{m.spec}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
