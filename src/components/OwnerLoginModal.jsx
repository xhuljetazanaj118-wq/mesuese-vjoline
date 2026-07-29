import { useState } from 'react'
import { useOwnerAuth } from '../context/OwnerAuthContext'

export default function OwnerLoginModal({ open, onClose }) {
  const { login } = useOwnerAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const result = login(password.trim())
    setSubmitting(false)
    if (result.ok) {
      setPassword('')
      onClose()
      return
    }
    setError(result.error || 'Hyrja dështoi.')
  }

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-chocolate/60 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="owner-login-title"
      onClick={handleBackdrop}
    >
      <div className="w-full max-w-md rounded-2xl border border-chocolate/10 bg-cream p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="owner-login-title" className="font-serif text-xl font-semibold text-chocolate">
              Hyrje pronari
            </h2>
            <p className="mt-1 text-sm text-navy/60">Vetëm për menaxhimin e medias në faqe.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-navy/50 transition hover:bg-tan/50 hover:text-chocolate"
            aria-label="Mbyll"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <p className="rounded-lg border border-red-300/50 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="owner-password" className="mb-1.5 block text-sm font-medium text-chocolate">
              Fjalëkalimi
            </label>
            <input
              id="owner-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              disabled={submitting}
              className="admin-input w-full"
              placeholder="Fjalëkalimi juaj"
            />
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="btn-outline w-full sm:w-auto">
              Anulo
            </button>
            <button type="submit" disabled={submitting || !password} className="btn-primary w-full sm:w-auto">
              {submitting ? 'Duke hyrë...' : 'Hyr'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
