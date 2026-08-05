import { useEffect } from 'react'

/** Adds .is-in to every .reveal once it enters the viewport. */
export default function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add('js')

    const els = document.querySelectorAll('.reveal:not(.is-in)')
    if (!els.length) return

    // safety net: anything sitting in the viewport gets revealed regardless,
    // so a missed observer callback can never leave content hidden
    const sweep = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in')
      })
    }, 1500)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    els.forEach((el) => io.observe(el))
    return () => {
      clearTimeout(sweep)
      io.disconnect()
    }
  }, [])
}
