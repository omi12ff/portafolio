import { useEffect, useRef, useState } from 'react'

export function usePortfolioEffects() {
  const portfolioRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('inicio')
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const root = portfolioRef.current
    if (!root) return

    const sections = Array.from(root.querySelectorAll<HTMLElement>('main > section[id]'))
    const header = root.querySelector<HTMLElement>('.navbar')
    let frame: number | undefined

    const updateScroll = () => {
      frame = undefined
      const distance = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0
      root.style.setProperty('--scroll-progress', String(progress))
      setIsScrolled(window.scrollY > 24)
      setShowBackToTop(window.scrollY > window.innerHeight * 0.7)

      const offset = (header?.getBoundingClientRect().height ?? 80) + 64
      let current = sections[0]?.id ?? 'inicio'
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) current = section.id
      }
      if (distance > 0 && window.scrollY >= distance - 4) {
        current = sections.at(-1)?.id ?? current
      }
      setActiveSection(current)
    }

    const scheduleUpdate = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(updateScroll)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('load', scheduleUpdate)
    const resizeObserver = typeof ResizeObserver === 'function'
      ? new ResizeObserver(scheduleUpdate)
      : undefined
    resizeObserver?.observe(root)

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('load', scheduleUpdate)
      resizeObserver?.disconnect()
    }
  }, [])

  useEffect(() => {
    const root = portfolioRef.current
    if (!root || typeof IntersectionObserver !== 'function' || !Element.prototype.animate) return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const targets = Array.from(root.querySelectorAll<HTMLElement>([
      '.hero-content > *', '.hero-portrait', '.section-heading', '.about-text',
      '.skills-card', '.value-intro', '.value-card', '.value-message',
      '.education-intro', '.education-column > h3', '.timeline-item',
      '.projects-intro', '.project-card', '.reflection-intro', '.reflection-card',
      '.reflection-quote', '.contact-intro', '.contact-card',
      '.skill-tag', '.timeline-tags span', '.project-technologies span',
    ].join(', ')))
    const revealed = new WeakSet<Element>()
    const animations = new Set<Animation>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)
        revealed.add(entry.target)
        if (preference.matches) continue

        const siblings = Array.from(entry.target.parentElement?.children ?? [])
        const compact = entry.target.matches('.skill-tag, .timeline-tags span, .project-technologies span')
        const delay = Math.min(siblings.indexOf(entry.target) * (compact ? 35 : 55), 165)
        const animation = entry.target.animate([
          { opacity: 0, transform: `translateY(${compact ? 10 : 22}px)` },
          { opacity: 1, transform: 'translateY(0)' },
        ], {
          duration: compact ? 440 : 680,
          delay,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'backwards',
        })
        animations.add(animation)
        animation.onfinish = () => animations.delete(animation)
        animation.oncancel = () => animations.delete(animation)
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })

    const syncPreference = () => {
      observer.disconnect()
      for (const animation of animations) animation.cancel()
      animations.clear()
      if (!preference.matches) {
        for (const target of targets) {
          if (!revealed.has(target)) observer.observe(target)
        }
      }
    }

    syncPreference()
    preference.addEventListener('change', syncPreference)
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', syncPreference)
      for (const animation of animations) animation.cancel()
    }
  }, [])

  return { portfolioRef, activeSection, isScrolled, showBackToTop }
}
