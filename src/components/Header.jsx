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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = (id) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  const showSolidHeader = scrolled || menuOpen
  const onHeroHeader = !scrolled && !menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        showSolidHeader
          ? 'border-b border-chocolate/10 bg-cream/95 shadow-sm backdrop-blur-md'
          : 'bg-chocolate/40 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="section-container flex h-14 items-center justify-between sm:h-16 md:h-20">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className={`max-w-[55%] text-left transition-colors sm:max-w-none ${
            showSolidHeader ? 'text-chocolate hover:text-walnut' : 'text-cream hover:text-amber'
          }`}
        >
          <span className="block font-serif text-sm font-bold leading-tight tracking-wide sm:text-lg md:text-xl">
            {siteConfig.brandName}
          </span>
          <span
            className={`block text-xs sm:text-sm ${
              showSolidHeader ? 'text-navy/50' : 'text-cream/70'
            }`}
          >
            {siteConfig.teacherName}
          </span>
        </button>

        <nav className="hidden items-center gap-5 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`min-h-[44px] px-1 text-sm font-medium transition-colors lg:text-base ${
                onHeroHeader ? 'text-cream/85 hover:text-cream' : 'text-navy/75 hover:text-walnut'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNavClick('kontakt')}
            className="btn-primary !min-h-[44px] !w-auto !py-2 !text-sm lg:!text-base"
          >
            Rezervo Tani
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => handleNavClick('kontakt')}
            className="min-h-[44px] rounded-lg bg-walnut px-3.5 py-2.5 text-sm font-semibold text-cream"
          >
            Rezervo
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-11 w-11 items-center justify-center rounded-lg transition-colors ${
              showSolidHeader ? 'text-chocolate hover:bg-chocolate/5' : 'text-cream hover:bg-cream/10'
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
        <nav className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-t border-chocolate/10 bg-cream px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="min-h-[48px] rounded-lg px-4 py-3 text-left text-base font-medium text-navy/80 active:bg-chocolate/10"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick('kontakt')}
              className="btn-primary mt-2 min-h-[48px] w-full"
            >
              Rezervo Tani
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}
