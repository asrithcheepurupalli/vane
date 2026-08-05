const USES = [
  { t: 'Outerwear', b: 'The seam runs the full length of a front closure and never needs a start point. Gloves on, in the dark, at speed.' },
  { t: 'Adaptive clothing', b: 'One hand, no pinch grip, no fine motor control, no help from anyone else. This is the case the zip has never served.' },
  { t: 'Luggage', b: 'Nothing to burst under load. Shear resistance rises with the weight of what is inside the bag.' },
  { t: 'Medical and clean', b: 'No metal, nothing to harbour contamination in a slider channel, and it can be autoclaved with the garment.' },
  { t: 'Shelter and outdoor', b: 'Silent to open. No slider to freeze, ice up, or lose in a tent porch at two in the morning.' },
  { t: 'Upholstery', b: 'Covers that come off for washing without the closure becoming the thing that fails first.' },
]

const SPECS = [
  ['Tape width', '9 mm'],
  ['Barb pitch', '1.6 mm'],
  ['Material', 'Single polymer, matched to shell'],
  ['Shear hold', '42 N per 100 mm'],
  ['Peel release', '3.1 N'],
  ['Closing force', '1.8 N, any point'],
  ['Cycles', '20,000 to 90 percent retention'],
  ['Metal content', 'None'],
  ['Operation', 'One hand, either direction'],
  ['Acoustic', 'Effectively silent'],
]

export default function Spec() {
  return (
    <section className="plate plate--night spec" data-tone="dark">
      <span className="tick tick--tl" />
      <span className="tick tick--br" />

      <div className="shell">
        <div className="plate-mark">
          <span>Plate VI</span>
          <span>Application and specification</span>
          <span>Target values</span>
        </div>

        <h2 className="display d-lg spec__h reveal">
          Everywhere a zip
          <br />
          is currently <em>tolerated</em>.
        </h2>

        <div className="spec__uses">
          {USES.map((u, i) => (
            <article key={u.t} className="use reveal" style={{ '--d': `${i * 70}ms` }}>
              <h3>{u.t}</h3>
              <p>{u.b}</p>
            </article>
          ))}
        </div>

        <div className="spec__table reveal">
          <div className="spec__thead label">
            <span>Property</span>
            <span>Target</span>
          </div>
          {SPECS.map(([a, b]) => (
            <div key={a} className="spec__row">
              <span>{a}</span>
              <span className="num">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
