import { useState } from 'react'
import Closure from '../components/Closure'

export default function Hero() {
  const [p, setP] = useState(0)
  const state = p > 0.985 ? 'closed' : p > 0.02 ? 'sealing' : 'open'

  return (
    <section className="plate hero" id="top">
      <span className="tick tick--tl" />
      <span className="tick tick--tr" />

      <div className="shell">
        <div className="hero__mark plate-mark">
          <span>VANE</span>
          <span>Closure system</span>
          <span>Concept study, 2026</span>
        </div>

        <div className="hero__grid">
          <h1 className="display d-xl hero__title reveal">
            Zips jam.
            <br />
            <em>Feathers</em> don't.
          </h1>

          <div className="hero__aside reveal" style={{ '--d': '160ms' }}>
            <p className="lede">
              VANE is a closure with no slider and no teeth, taken from the way a bird's
              feather locks itself back together.
            </p>
            <p className="hero__spec label">
              One material · one gesture · one hand
            </p>
          </div>
        </div>
      </div>

      <div className="hero__stage reveal" style={{ '--d': '260ms' }}>
        <Closure progress={undefined} onProgress={setP} />
      </div>

      <div className="shell hero__foot">
        <div className="hero__readout">
          <span className={`hero__state hero__state--${state}`}>{state}</span>
          <span className="num hero__pct">{String(Math.round(p * 100)).padStart(3, '0')}%</span>
        </div>
        <p className={`hero__done ${p > 0.985 ? 'is-on' : ''}`}>
          That was the entire interaction.
        </p>
        <span className="label hero__scroll">Scroll</span>
      </div>
    </section>
  )
}
