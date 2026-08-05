import { useState } from 'react'
import Zip from '../components/Zip'

const FAILURES = [
  {
    n: '01',
    t: 'It jams',
    b: 'A zip has a slider, two tapes, and a few hundred teeth that must stay in register. Any one of them can fail, and when one does the whole garment is finished. Nothing else on a jacket fails this often.',
  },
  {
    n: '02',
    t: 'It excludes',
    b: 'Closing a zip needs two hands, a pinch grip, and enough fine motor control to start the box and pin. Arthritis takes that away. So does a tremor, a prosthesis, an infant, or cold hands on a mountain.',
  },
  {
    n: '03',
    t: 'It outlives the garment',
    b: 'A metal or polyester zip on a cotton coat makes that coat mixed waste. Textile recyclers have to cut every closure out by hand, so most of them do not bother. The closure is why the garment is landfill.',
  },
]

export default function Problem() {
  const [jammed, setJammed] = useState(false)

  return (
    <section className="plate plate--night problem" id="problem" data-tone="dark">
      <span className="tick tick--tl" />
      <span className="tick tick--br" />

      <div className="shell">
        <div className="plate-mark">
          <span>Plate I</span>
          <span>The incumbent</span>
          <span>Sundback, 1913</span>
        </div>

        <div className="problem__head">
          <h2 className="display d-lg reveal">
            The last serious idea
            <br />
            about closing things
            <br />
            was <em>a hundred and thirteen</em>
            <br />
            years ago.
          </h2>
          <p className="body reveal" style={{ '--d': '140ms' }}>
            Gideon Sundback fixed Whitcomb Judson's clasp locker in 1913 and the object has
            barely moved since. We put it on every bag, every coat, every tent and every pair
            of trousers, and we quietly organise our lives around its failures. Here is one.
          </p>
        </div>

        <div className="problem__demo reveal" style={{ '--d': '200ms' }}>
          <Zip onJam={() => setJammed(true)} />
          <p className={`problem__verdict ${jammed ? 'is-on' : ''}`}>
            You already knew it would do that. That is the part worth sitting with.
          </p>
        </div>

        <ol className="problem__list">
          {FAILURES.map((f, i) => (
            <li key={f.n} className="problem__item reveal" style={{ '--d': `${i * 90}ms` }}>
              <span className="num problem__n">{f.n}</span>
              <h3 className="display d-md">{f.t}</h3>
              <p className="body">{f.b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
