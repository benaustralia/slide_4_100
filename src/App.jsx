import { useEffect, useRef, useState } from 'react'
import SlidePanel from './components/SlidePanel'
import './App.css'

function App() {
  const containerRef = useRef(null)
  const [gsapLoaded, setGsapLoaded] = useState(false)

  useEffect(() => {
    // Lazy load GSAP only after initial paint
    let scrollTriggers = []
    let cleanup = () => {}

    const loadGSAPAndInit = async () => {
      // Wait for next frame to ensure initial render completes
      await new Promise(resolve => requestAnimationFrame(resolve))
      
      // Dynamically import GSAP after initial paint
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      setGsapLoaded(true)

      // Initialize animations after GSAP loads
      const panels = document.querySelectorAll('.slide-panel')
      
      panels.forEach((panel, index) => {
        const viewportWidth = window.innerWidth
        const direction = index % 2 === 0 ? -viewportWidth : viewportWidth
        
        const animation = gsap.fromTo(
          panel,
          {
            x: direction,
            opacity: 0,
            immediateRender: false,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            force3D: true,
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          }
        )
        scrollTriggers.push(animation)
      })

      cleanup = () => {
        scrollTriggers.forEach(trigger => {
          const scrollTrigger = trigger.scrollTrigger
          if (scrollTrigger) scrollTrigger.kill()
          trigger.kill()
        })
        scrollTriggers = []
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }

    // Load GSAP after a short delay to allow hero section to paint first
    // Use requestIdleCallback to not block critical rendering
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadGSAPAndInit, { timeout: 500 })
    } else {
      setTimeout(loadGSAPAndInit, 500)
    }

    return () => {
      cleanup()
    }
  }, [])

  return (
    <div className="app" ref={containerRef}>
      <header className="hero">
        <h1>Scroll to See Slide-In Panels</h1>
        <p>Scroll down to see panels slide in from different directions</p>
      </header>

      <SlidePanel
        title="Panel 1"
        content="This panel slides in from the left as you scroll."
        color="#6366f1"
        index={0}
      />

      <SlidePanel
        title="Panel 2"
        content="This panel slides in from the right as you scroll."
        color="#8b5cf6"
        index={1}
      />

      <SlidePanel
        title="Panel 3"
        content="This panel slides in from the left again."
        color="#ec4899"
        index={2}
      />

      <SlidePanel
        title="Panel 4"
        content="This panel slides in from the right again."
        color="#f59e0b"
        index={3}
      />
    </div>
  )
}

export default App

