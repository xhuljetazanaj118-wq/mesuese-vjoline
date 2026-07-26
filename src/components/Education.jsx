import scrollToSection from '../utils/scrollToSection'
import ViolinBackground from './ViolinBackground'

const cards = [
  {
    title: 'Mësime Individuale',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    features: [
      'Posturë, tingull dhe kontroll harku',
      'Repertor i personalizuar',
      'Zhvillim teknik dhe artistik',
      'Orare fleksibël në studio private',
    ],
    cta: 'Mëso më shumë',
  },
  {
    title: 'Kurse në Grup',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    features: [
      'Leksione në grup të përshtatura',
      'Dëgjim dhe luajtje bashkë',
      'Klasike, moderne dhe më gjerë',
      'Fillestarë dhe nivele të avancuara',
    ],
    cta: 'Mëso më shumë',
  },
]

export default function Education() {
  return (
    <section id="kurset" className="relative bg-cream py-20 sm:py-28">
      <ViolinBackground variant="subtle" />
      <div className="section-container relative z-10">
        <div className="text-center">
          <p className="section-label">Educational Services</p>
          <h2 className="section-title mt-2">Mësoni Violinën</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy/70">
            Precizion teknik dhe zhvillim artistik — leksione individuale dhe në grup, të përshtatura
            për nevojat tuaja.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.title}
              className="group flex flex-col rounded-2xl border border-chocolate/10 bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover sm:p-10"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-tan text-walnut">
                {card.icon}
              </div>
              <h3 className="font-serif text-2xl font-semibold text-chocolate">{card.title}</h3>
              <ul className="mt-6 flex-1 space-y-3">
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-navy/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-walnut" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => scrollToSection('kontakt')}
                className="btn-primary mt-8 w-full sm:w-auto"
              >
                {card.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
