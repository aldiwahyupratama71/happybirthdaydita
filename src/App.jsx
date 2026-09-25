import { useEffect } from 'react'
import Lenis from 'lenis'

import ProgressIndicator from './components/ProgressIndicator'
import MusicPlayer     from './components/MusicPlayer'
import ThemeToggle     from './components/ThemeToggle'
import Opening      from './components/Opening'
import Birthday     from './components/Birthday'
import Story        from './components/Story'
import Timeline     from './components/Timeline'
import Memories     from './components/Memories'
import LittleThings from './components/LittleThings'
import Reflection   from './components/Reflection'
import Realization  from './components/Realization'
import Growth       from './components/Growth'
import Feelings     from './components/Feelings'
import Future       from './components/Future'
import Choice       from './components/Choice'
import Gift         from './components/Gift'
import Letter       from './components/Letter'
import Final        from './components/Final'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration:          1.4,
      easing:            (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:       'vertical',
      gestureOrientation:'vertical',
      smoothWheel:       true,
      wheelMultiplier:   1,
      touchMultiplier:   2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      {/* Fixed progress indicator — sits outside <main> to stay on top */}
      <ProgressIndicator />
      <MusicPlayer />
      <ThemeToggle />

      <main>
        <Opening id="section-opening" />
        <Birthday id="section-birthday" />
        <Story id="section-story" />
        <Timeline id="section-timeline" />
        <Memories id="section-memories" />
        <LittleThings id="section-little-things" />
        <Reflection id="section-reflection" />
        <Realization id="section-realization" />
        <Growth id="section-growth" />
        <Feelings id="section-feelings" />
        <Future id="section-future" />
        <Choice id="section-choice" />
        <Gift   id="section-gift" />
        <Letter id="section-letter" />
        <Final id="section-final" />
      </main>
    </>
  )
}

export default App
