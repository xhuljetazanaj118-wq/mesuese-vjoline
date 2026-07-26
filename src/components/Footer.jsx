import { siteConfig } from '../config/site'
import scrollToSection from '../utils/scrollToSection'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-chocolate/20 bg-chocolate py-10 text-cream">
      <div className="section-container">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="font-serif text-lg font-semibold transition-colors hover:text-amber"
            >
              {siteConfig.brandName} – {siteConfig.teacherName}
            </button>
            <p className="mt-1 text-sm text-cream/50">
              &copy; {currentYear} Të gjitha të drejtat e rezervuara.
            </p>
          </div>

          <div className="text-center text-sm text-cream/70 sm:text-right">
            <p>{siteConfig.email}</p>
            <p className="mt-0.5">{siteConfig.phone}</p>
            <p className="mt-0.5 text-cream/50">{siteConfig.location}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
