import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'problem', label: 'The problem' },
  { id: 'feather', label: 'The feather' },
  { id: 'mechanism', label: 'The mechanism' },
  { id: 'forces', label: 'The forces' },
  { id: 'material', label: 'The material' },
]

export default function Nav() {
  const [dark, setDark] = useState(false)
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)

  /* flip the nav to light-on-dark over night plates */
  useEffect(() => {
    const plates = document.querySelectorAll('[data-tone="dark"]')
    if (!plates.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // the nav sits in the top 92px; a plate owns it when it crosses that band
          const r = e.target.getBoundingClientRect()
          if (r.top <= 64 && r.bottom >= 64) setDark(true)
          else if (e.target.dataset.owns === 'true') setDark(false)
        })
      },
      { threshold: [0, 0.01, 0.5, 1], rootMargin: '-60px 0px -80% 0px' },
    )
    plates.forEach((p) => io.observe(p))

    const onScroll = () => {
      setLifted(window.scrollY > 40)
      let hit = false
      plates.forEach((p) => {
        const r = p.getBoundingClientRect()
        if (r.top <= 64 && r.bottom >= 64) hit = true
      })
      setDark(hit)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    return () => document.body.classList.remove('is-locked')
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* the open menu is always a night surface, so the nav must flip with it */}
      <header
        className={`nav ${dark || open ? 'nav--dark' : ''} ${
          lifted && !open ? 'nav--lifted' : ''
        }`}
      >
        <a href="#top" className="nav__mark" onClick={(e) => go(e, 'top')}>
          VANE
          <span className="nav__mark-sub">closure system</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => go(e, l.id)}>
              {l.label}
            </a>
          ))}
        </nav>

        <a
          className="nav__studio"
          href="https://made-by-ac.com"
          target="_blank"
          rel="noreferrer"
        >
          a concept by made.
        </a>

        <button
          className="nav__burger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`menu ${open ? 'menu--open' : ''}`} aria-hidden={!open}>
        <div className="menu__inner">
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => go(e, l.id)}
              style={{ '--i': `${i * 45}ms` }}
            >
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              {l.label}
            </a>
          ))}
          <a
            className="menu__studio"
            href="https://made-by-ac.com"
            target="_blank"
            rel="noreferrer"
          >
            <span className="num">—</span> a concept by made.
          </a>
        </div>
      </div>
    </>
  )
}
