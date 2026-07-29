import { useState } from 'react'
import { siteConfig } from '../config/site'
import scrollToSection from '../utils/scrollToSection'
import { useOwnerAuth } from '../context/OwnerAuthContext'
import SocialLinks from './SocialLinks'
import OwnerLoginModal from './OwnerLoginModal'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { loggedIn, adminConfigured, logout } = useOwnerAuth()
  const [loginOpen, setLoginOpen] = useState(false)

  const hasSocial =
    siteConfig.social?.instagram?.trim() ||
    siteConfig.social?.youtube?.trim() ||
    siteConfig.social?.facebook?.trim() ||
    siteConfig.social?.tiktok?.trim()

  return (
    <footer
      className="border-t border-chocolate/20 bg-chocolate py-10 text-cream"
      style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="section-container">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-start">
          <div className="text-center lg:text-left">
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
            {hasSocial && (
              <div className="mt-4 flex justify-center lg:justify-start">
                <SocialLinks />
              </div>
            )}
          </div>

          <div className="text-center text-sm text-cream/70 lg:text-right">
            <p>{siteConfig.email}</p>
            <p className="mt-0.5">{siteConfig.phone}</p>
            <p className="mt-0.5 text-cream/50">{siteConfig.location}</p>
            {hasSocial && (
              <p className="mt-3 text-xs text-cream/40">Na ndiqni në rrjetet sociale</p>
            )}
            {adminConfigured && (
              <div className="mt-4 border-t border-cream/10 pt-3">
                {loggedIn ? (
                  <button
                    type="button"
                    onClick={logout}
                    className="text-xs text-cream/45 underline-offset-2 hover:text-amber hover:underline"
                  >
                    Dil (pronar)
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setLoginOpen(true)}
                    className="text-xs text-cream/45 underline-offset-2 hover:text-amber hover:underline"
                  >
                    Hyr si pronar
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <OwnerLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </footer>
  )
}
