import { useState } from 'react'

const PATHS = {
  zip: {
    k: 'zip',
    label: 'Garment with a zip',
    steps: [
      { t: 'Collected', ok: true },
      { t: 'Sorted by fibre', ok: true },
      { t: 'Closure cut out by hand', ok: false },
      { t: 'Cost exceeds value', ok: false },
      { t: 'Landfill or incineration', ok: false },
    ],
    end: 'A coat is cotton. Its zip is brass on polyester tape. To recycle the cotton somebody has to stand at a bench and cut the zip out of every single coat, so almost nobody does.',
  },
  vane: {
    k: 'vane',
    label: 'Garment with VANE',
    steps: [
      { t: 'Collected', ok: true },
      { t: 'Sorted by fibre', ok: true },
      { t: 'Closure stays in', ok: true },
      { t: 'Shredded whole', ok: true },
      { t: 'Back into the stream', ok: true },
    ],
    end: 'Specify the tape in the same polymer family as the shell and the closure stops being contamination. Nothing gets cut out, because there is nothing foreign left in the garment.',
  },
}

export default function Material() {
  const [k, setK] = useState('vane')
  const p = PATHS[k]

  return (
    <section className="plate material" id="material">
      <span className="tick tick--bl" />
      <span className="tick tick--tr" />

      <div className="shell">
        <div className="plate-mark">
          <span>Plate V</span>
          <span>The material</span>
          <span>Mono-polymer</span>
        </div>

        <div className="material__head">
          <h2 className="display d-lg reveal">
            The closure is why
            <br />
            the coat is <em>rubbish</em>.
          </h2>
          <p className="body reveal" style={{ '--d': '120ms' }}>
            This is the part nobody puts on the swing tag. A garment is recyclable right up
            until you attach something made of a different material to it, and the closure is
            almost always the thing that does it. Solve the closure and the garment survives
            its own end of life.
          </p>
        </div>

        <div className="material__rig reveal" style={{ '--d': '160ms' }}>
          <div className="seg seg--wide" role="tablist" aria-label="Disposal route">
            {Object.values(PATHS).map((x) => (
              <button
                key={x.k}
                role="tab"
                aria-selected={k === x.k}
                className={`seg__b ${k === x.k ? 'is-on' : ''}`}
                onClick={() => setK(x.k)}
              >
                {x.label}
              </button>
            ))}
          </div>

          <ol className={`route route--${p.k}`} key={p.k}>
            {p.steps.map((s, i) => (
              <li key={s.t} className={s.ok ? 'route__s' : 'route__s route__s--dead'} style={{ '--i': `${i * 70}ms` }}>
                <span className="route__dot" />
                <span className="num route__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="route__t">{s.t}</span>
              </li>
            ))}
          </ol>

          <p className="body material__end" key={p.k + 'e'}>{p.end}</p>
        </div>
      </div>
    </section>
  )
}
