import { siteConfig } from '../config/site'
import scrollToSection from '../utils/scrollToSection'
import ViolinBackground from './ViolinBackground'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-chocolate">
      <ViolinBackground variant="hero" />

      <div className="section-container relative z-10 flex min-h-screen flex-col pt-20 lg:flex-row lg:items-center lg:gap-10 lg:pt-24 xl:gap-16">
        <div className="relative flex flex-1 items-center justify-center py-8 lg:justify-start lg:py-20">
          <img
            src={siteConfig.violinImage}
            alt="Violinë"
            className="h-[min(50vh,480px)] w-auto max-w-[min(100%,440px)] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)] sm:h-[min(58vh,540px)] lg:h-[min(68vh,620px)] lg:max-w-none"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center pb-16 lg:py-20 lg:pl-4">
          <h1 className="font-serif text-4xl font-semibold leading-[1.15] text-cream sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
            Zbuloni Magjinë e Violinës – Mësime Profesionale &amp; Muzikë Live
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            Nga hapat e parë në muzikë, te perfomancat elegante për eventet tuaja më të rëndësishme.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button type="button" onClick={() => scrollToSection('kurset')} className="btn-primary">
              Eksploro Kurset
            </button>
            <button type="button" onClick={() => scrollToSection('performanca')} className="btn-secondary">
              Rezervo për Event
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}
