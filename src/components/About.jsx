import { siteConfig } from '../config/site'
import scrollToSection from '../utils/scrollToSection'

const philosophy = [
  {
    title: 'Zhvillim i plotë teknik',
    text: 'Punojmë me posturën, precizionin e tingullit dhe kontrollin e harkut.',
  },
  {
    title: 'Repertor i personalizuar',
    text: 'Përzgjedhim pjesë që sfidojnë aftësitë tuaja dhe përmbushin synimet tuaja artistike.',
  },
  {
    title: 'Gjithëpërfshirje në zhanre',
    text: 'Pavarësisht nëse preferoni muzikën klasike, moderne apo stile të tjera, studioja ime është e hapur për çdo kërkesë tuajën.',
  },
]

export default function About() {
  return (
    <section id="rreth-meje" className="border-y border-chocolate/5 bg-white py-16 sm:py-24">
      <div className="section-container">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
          <div className="relative shrink-0">
            <div className="h-72 w-56 overflow-hidden rounded-2xl border-4 border-tan shadow-card sm:h-96 sm:w-72 lg:h-[28rem] lg:w-[22rem]">
              <img
                src={siteConfig.aboutImage}
                alt={`${siteConfig.teacherName} duke luajtur violinën`}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="section-label">Rreth Meje</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-chocolate sm:text-4xl">
              {siteConfig.teacherName}
            </h2>
            <p className="mt-1 text-sm font-medium text-walnut">{siteConfig.education}</p>
            <p className="mt-4 text-base leading-relaxed text-navy/70 sm:text-lg">
              Me më shumë se 20 vite përvojë me violinën dhe e diplomuar në Universitetin e Arteve
              në Tiranë, sot e ushtroj me pasion profesionin tim në studion time private. Mësimdhënia
              nuk është thjesht punë për mua—është një mision për të formuar instrumentistë të sigurt
              dhe të dashuruar me muzikën.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <h3 className="text-center font-serif text-2xl font-semibold text-chocolate md:text-left">
            Filozofia e Mësimdhënies
          </h3>
          <p className="mx-auto mt-3 max-w-3xl text-center text-base leading-relaxed text-navy/70 md:mx-0 md:text-left">
            Metoda ime bazohet në dy shtylla kryesore: precizion teknik dhe zhvillim artistik. Besoj
            se çdo student ka një rrugëtim unik muzikor, prandaj ofroj leksione individuale dhe në
            grup të përshtatura sipas nevojave tuaja.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {philosophy.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-chocolate/10 bg-cream/80 p-6 shadow-sm"
              >
                <h4 className="font-serif text-lg font-medium text-chocolate">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-tan/60 px-6 py-8 text-center sm:px-10">
            <h4 className="font-serif text-xl font-semibold text-chocolate">
              Gati për të nisur rrugëtimin tuaj muzikor?
            </h4>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-navy/75">
              Pavarësisht nëse jeni fillestar apo dëshironi të perfeksiononi teknikën tuaj, do të jem
              e lumtur t&apos;ju udhëheq drejt arritjes së qëllimeve tuaja muzikore.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection('kontakt')}
              className="btn-primary mt-6"
            >
              Rezervo një leksion
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
