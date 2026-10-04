import Closure from '../components/Closure'

export default function Close() {
  return (
    <>
      <section className="plate honest">
        <span className="tick tick--tl" />
        <span className="tick tick--tr" />

        <div className="shell shell--narrow">
          <div className="plate-mark">
            <span>Colophon</span>
            <span>The honest part</span>
            <span>Read this bit</span>
          </div>

          <h2 className="display d-md honest__h reveal">
            What this is, and what it is not.
          </h2>

          <div className="honest__cols">
            <div className="reveal">
              <p className="label">It is</p>
              <p className="body">
                A concept study. The biology is real: a feather vane is held by hooked
                barbules, and a bird does re-link them in a single pass. The material argument
                is real too, and mono-material design is already how the recycling side of the
                industry thinks.
              </p>
            </div>
            <div className="reveal" style={{ '--d': '110ms' }}>
              <p className="label">It is not</p>
              <p className="body">
                A manufactured product. Nothing here has been tooled, moulded or pull tested.
                Every number on this page is a design target we set for ourselves, not a
                result off a rig, and we would rather say that plainly than let a spec table
                imply otherwise.
              </p>
            </div>
          </div>

          <p className="body honest__end reveal">
            We build these to find out whether an idea survives being made properly. This one
            got as far as a mechanism, an interaction model and a name, which is the point at
            which it becomes worth showing to somebody who owns a moulding line.
          </p>
        </div>
      </section>

      <footer className="plate plate--night foot" data-tone="dark">
        <div className="shell">
          <div className="foot__strip">
            <Closure progress={1} interactive={false} hint={false} tone="dark" />
          </div>

          <div className="foot__grid">
            <div>
              <p className="display d-lg foot__mark">VANE</p>
              <p className="label">Closure system · concept study · 2026</p>
            </div>

            <div className="foot__cta">
              <p className="lede">
                We are made. by ac. We design and build products, and sometimes we build the
                ones nobody asked for yet.
              </p>
              <a className="btn" href="https://made-by-ac.com" target="_blank" rel="noreferrer">
                made-by-ac.com <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="foot__colophon label">
              <p>Set in Instrument Serif, Inter Tight and JetBrains Mono.</p>
              <p>Drawings are ours. Prior art belongs to the birds.</p>
              <p><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
