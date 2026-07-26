import { useState } from 'react'
import { siteConfig } from '../config/site'
import { sendContactEmail } from '../utils/sendContactEmail'
import ViolinBackground from './ViolinBackground'

const serviceOptions = [
  'Kurse Violinë – Individual',
  'Kurse Violinë – Grup',
  'Performancë Live për Event',
]

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

export default function ContactForm() {
  const [formData, setFormData] = useState(initialFormState)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Ju lutem shkruani emrin tuaj.'
    if (!formData.email.trim()) {
      newErrors.email = 'Ju lutem shkruani email-in tuaj.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email i pavlefshëm.'
    }
    if (!formData.service) newErrors.service = 'Ju lutem zgjidhni një shërbim.'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    if (submitError) setSubmitError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSending(true)
    setSubmitError('')

    try {
      await sendContactEmail(formData)
      setSubmitted(true)
      setFormData(initialFormState)
      setErrors({})
    } catch {
      setSubmitError(
        `Dërgimi dështoi. Provoni përsëri ose na shkruani direkt në ${siteConfig.email}`,
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="kontakt" className="relative overflow-hidden bg-chocolate py-20 text-cream sm:py-28">
      <ViolinBackground variant="dark" />
      <div className="section-container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-amber">Contact &amp; Booking</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-cream sm:text-4xl">
            Hapi tjetër drejt Muzikës
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream/70">
            Plotësoni formularin dhe mesazhi do të arrijë në{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-amber underline-offset-2 hover:underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          {submitted ? (
            <div className="rounded-2xl border border-cream/10 bg-chocolate/80 p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber/20">
                <svg className="h-7 w-7 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold">Faleminderit!</h3>
              <p className="mt-2 text-cream/70">Mesazhi juaj u dërgua. Do ta gjeni në Gmail.</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-cream mt-6"
              >
                Dërgo mesazh tjetër
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {submitError && (
                <p className="rounded-lg border border-red-400/40 bg-red-950/30 px-4 py-3 text-sm text-red-200">
                  {submitError}
                </p>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-cream/90">
                    Emri
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={sending}
                    className={`form-input-dark ${errors.name ? '!border-red-400' : ''}`}
                    placeholder="Emri dhe mbiemri"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-300">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-cream/90">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={sending}
                    className={`form-input-dark ${errors.email ? '!border-red-400' : ''}`}
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-cream/90">
                    Telefoni
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={sending}
                    className="form-input-dark"
                    placeholder="0695226854"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-cream/90">
                    Po kërkoj...
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    disabled={sending}
                    className={`form-input-dark ${errors.service ? '!border-red-400' : ''}`}
                  >
                    <option value="">Zgjidhni një shërbim</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option} className="text-chocolate">
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="mt-1 text-sm text-red-300">{errors.service}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-cream/90">
                  Mesazh Special
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={sending}
                  className="form-input-dark resize-none"
                  placeholder="Na tregoni më shumë rreth nevojave tuaja..."
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-cream w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[200px]"
                >
                  {sending ? 'Duke dërguar...' : 'Dërgo'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
