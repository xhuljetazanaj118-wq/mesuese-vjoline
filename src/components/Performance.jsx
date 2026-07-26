import scrollToSection from '../utils/scrollToSection'

const eventTypes = [
  {
    title: 'Dasma',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Evente Korporative',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: 'Festa Private',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
        />
      </svg>
    ),
  },
  {
    title: 'Koncerte',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
        />
      </svg>
    ),
  },
]

export default function Performance() {
  return (
    <section id="performanca" className="bg-tan py-20 sm:py-28">
      <div className="section-container">
        <div className="text-center">
          <p className="section-label">Performance Services</p>
          <h2 className="section-title mt-2">Muzikë Live për Eventet Tuaja</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy/70">
            Shtoni elegancë dhe emocion ceremonive tuaja me interpretim profesional në violinë.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {eventTypes.map((event) => (
            <div
              key={event.title}
              className="group flex flex-col items-center rounded-2xl border border-chocolate/10 bg-cream p-6 text-center shadow-card transition-all duration-300 hover:shadow-card-hover sm:p-8"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-walnut/10 text-walnut transition-colors group-hover:bg-walnut group-hover:text-cream">
                {event.icon}
              </div>
              <h3 className="font-serif text-base font-medium text-chocolate sm:text-lg">{event.title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button type="button" onClick={() => scrollToSection('kontakt')} className="btn-primary">
            Rezervo për Event
          </button>
        </div>
      </div>
    </section>
  )
}
