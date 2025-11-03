import { useEffect } from 'react'
import SlidePanel from './components/SlidePanel'
import './App.css'

const panels = [
  { title: "Modern Web Animations", content: "Experience smooth, performant animations powered by GSAP ScrollTrigger. Our panels slide in seamlessly as you scroll, creating an engaging user experience without compromising performance.", additionalText: "Built with React and optimized for speed, these animations are hardware-accelerated and lazy-loaded to ensure fast initial page loads.", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=450&fit=crop&q=80", imageAlt: "Modern web development with code on screen", color: "#6366f1" },
  { title: "Performance First", content: "Every animation is optimized for performance. Images are lazy-loaded, JavaScript is code-split, and all assets are compressed for lightning-fast delivery.", additionalText: "Achieve perfect Lighthouse scores with our optimization techniques including deferred loading, GPU acceleration, and efficient resource management.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop&q=80", imageAlt: "Performance optimization dashboard showing fast load times", color: "#8b5cf6" },
  { title: "Accessible Design", content: "Our components follow WCAG guidelines with proper semantic HTML, ARIA labels, and keyboard navigation support. Everyone can enjoy a smooth, accessible experience.", additionalText: "All images include descriptive alt text, proper heading hierarchy, and screen reader support built into every panel.", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=450&fit=crop&q=80", imageAlt: "Accessibility icon showing inclusive design principles", color: "#ec4899" },
  { title: "SEO Optimized", content: "Built with search engines in mind. Proper meta tags, semantic HTML structure, and optimized content help your site rank better in search results.", additionalText: "Each section uses proper heading tags, descriptive content, and optimized images to maximize your SEO potential while maintaining performance.", image: "https://images.unsplash.com/photo-1432882742826-0de456956e9e?w=800&h=450&fit=crop&q=80", imageAlt: "SEO optimization graph showing search engine rankings", color: "#f59e0b" }
]

function App() {
  useEffect(() => {
    let scrollTriggers = [], scrollTimeout, cleanup = () => {}
    const loadGSAPAndInit = async () => {
      await new Promise(resolve => requestAnimationFrame(resolve))
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { ScrollToPlugin } = await import('gsap/ScrollToPlugin')
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
      const panelElements = document.querySelectorAll('.slide-panel')
      const snapPoints = [0]
      panelElements.forEach((panel, index) => {
        const viewportWidth = Math.max(window.innerWidth, document.documentElement.clientWidth)
        const direction = index % 2 === 0 ? -viewportWidth : viewportWidth
        const panelRect = panel.getBoundingClientRect()
        snapPoints.push(panelRect.top + (window.pageYOffset || document.documentElement.scrollTop))
        gsap.set(panel, { x: direction, opacity: 0, force3D: true })
        scrollTriggers.push(gsap.to(panel, {
          x: 0, opacity: 1, duration: 1, ease: 'power2.out', force3D: true,
          scrollTrigger: { trigger: panel, start: 'top bottom+=100vh', end: 'center center', scrub: true }
        }))
      })
      const snap = gsap.utils.snap(snapPoints)
      const handleScroll = () => {
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          const scrollY = window.scrollY || window.pageYOffset
          const snappedPosition = snap(scrollY)
          if (Math.abs(scrollY - snappedPosition) < 100) {
            gsap.to(window, { duration: 0.3, scrollTo: { y: snappedPosition, autoKill: false }, ease: 'power2.out' })
          }
        }, 150)
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      cleanup = () => {
        window.removeEventListener('scroll', handleScroll)
        if (scrollTimeout) clearTimeout(scrollTimeout)
        scrollTriggers.forEach(trigger => { if (trigger.scrollTrigger) trigger.scrollTrigger.kill(); trigger.kill() })
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }
    const initTimer = 'requestIdleCallback' in window ? requestIdleCallback(loadGSAPAndInit, { timeout: 500 }) : setTimeout(loadGSAPAndInit, 500)
    return () => {
      cleanup()
      if (typeof initTimer === 'number') clearTimeout(initTimer)
      else if (initTimer) cancelIdleCallback(initTimer)
    }
  }, [])

  return (
    <div className="app">
      <header className="hero">
        <h1>Scroll to See Slide-In Panels</h1>
        <p>Scroll down to see panels slide in from different directions</p>
      </header>
      {panels.map((panel, index) => <SlidePanel key={index} {...panel} index={index} />)}
    </div>
  )
}

export default App

