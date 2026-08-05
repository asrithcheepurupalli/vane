import useLenis from './lib/useLenis'
import useReveal from './lib/useReveal'
import Nav from './components/Nav'
import Grain from './components/Grain'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Feather from './sections/Feather'
import Mechanism from './sections/Mechanism'
import Forces from './sections/Forces'
import Material from './sections/Material'
import Spec from './sections/Spec'
import Close from './sections/Close'

export default function App() {
  useLenis()
  useReveal()

  return (
    <>
      <Grain />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Feather />
        <Mechanism />
        <Forces />
        <Material />
        <Spec />
        <Close />
      </main>
    </>
  )
}
