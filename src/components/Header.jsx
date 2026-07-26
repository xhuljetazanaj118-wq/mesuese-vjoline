import { useEffect, useState } from 'react'
import { siteConfig } from '../config/site'
import scrollToSection from '../utils/scrollToSection'

const navLinks = [
  { label: 'Home', id: 'hero' },
  { label: 'Kurset', id: 'kurset' },
  { label: 'Evente', id: 'performanca' },
  { label: 'Rreth Meje', id: 'rreth-meje' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  const isDark = !scrolled

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-chocolate/10 bg-cream/95 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container flex h-[4.25rem] items-center justify-between sm:h-24">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className={`text-left transition-colors ${
            isDark ? 'text-cream hover:text-amber' : 'text-chocolate hover:text-walnut'
          }`}
        >
          <span className="block font-serif text-lg font-bold tracking-wide sm:text-xl">
            {siteConfig.brandName}
          </span>
          <span className={`block text-sm ${isDark ? 'text-cream/70' : 'text-navy/50'}`}>
            {siteConfig.teacherName}
          </span>
        </button>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`text-base font-medium transition-colors ${
                isDark ? 'text-cream/85 hover:text-cream' : 'text-navy/75 hover:text-walnut'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button type="button" onClick={() => handleNavClick('kontakt')} className="btn-primary !py-2.5 !text-base">
            Rezervo Tani
          </button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => handleNavClick('kontakt')}
            className="rounded-lg bg-walnut px-3.5 py-2.5 text-sm font-semibold text-cream transition-colors"
          >
            Rezervo
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
              isDark ? 'text-cream hover:bg-cream/10' : 'text-chocolate hover:bg-chocolate/5'
            }`}
            aria-label={menuOpen ? 'Mbyll menunë' : 'Hap menunë'}
            aria-expanded={menuOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-chocolate/10 bg-cream px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="rounded-lg px-4 py-3.5 text-left text-base font-medium text-navy/80 transition-colors hover:bg-chocolate/5 hover:text-walnut"
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
