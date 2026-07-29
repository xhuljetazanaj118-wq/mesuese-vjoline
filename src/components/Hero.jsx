import { siteConfig } from '../config/site'
import scrollToSection from '../utils/scrollToSection'
import ViolinBackground from './ViolinBackground'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] overflow-hidden bg-chocolate">
      <ViolinBackground variant="hero" />

      <div className="section-container relative z-10 flex min-h-[100dvh] flex-col-reverse justify-center gap-6 pb-8 pt-[4.5rem] sm:gap-8 sm:pt-20 md:flex-row md:items-center md:gap-10 md:pb-12 md:pt-24 lg:gap-16">
        <div className="relative flex shrink-0 items-center justify-center md:flex-1 md:justify-start">
          <img
            src={siteConfig.violinImage}
            alt="Violinë"
            className="h-[min(38vh,320px)] w-auto max-w-[min(92vw,360px)] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)] sm:h-[min(45vh,400px)] md:h-[min(52vh,480px)] lg:h-[min(68vh,620px)] lg:max-w-none"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center text-center md:text-left">
          <h1 className="font-serif text-[1.65rem] font-semibold leading-[1.2] text-cream sm:text-4xl md:text-[2.35rem] lg:text-5xl">
            Zbuloni Magjinë e Violinës – Mësime Profesionale &amp; Muzikë Live
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream/80 sm:mt-6 sm:text-lg md:mx-0">
            Nga hapat e parë në muzikë, te perfomancat elegante për eventet tuaja më të rëndësishme.
          </p>
          <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center md:mx-0 md:justify-start">
            <button type="button" onClick={() => scrollToSection('kurset')} className="btn-primary">
              Eksploro Kurset
            </button>
            <button type="button" onClick={() => scrollToSection('performanca')} className="btn-secondary">
              Rezervo për Event
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent sm:h-24" />
    </section>
  )
}
