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
        <section id="section-opening">       <Opening />       </section>
        <section id="section-birthday">      <Birthday />      </section>
        <section id="section-story">         <Story />         </section>
        <section id="section-timeline">      <Timeline />      </section>
        <section id="section-memories">      <Memories />      </section>
        <section id="section-little-things"> <LittleThings />  </section>
        <section id="section-reflection">    <Reflection />    </section>
        <section id="section-realization">   <Realization />   </section>
        <section id="section-growth">        <Growth />        </section>
        <section id="section-feelings">      <Feelings />      </section>
        <section id="section-future">        <Future />        </section>
        <section id="section-choice">        <Choice />        </section>
        <section id="section-letter">        <Letter />        </section>
        <section id="section-final">         <Final />         </section>
      </main>
    </>
  )
}

export default App
