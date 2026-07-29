const SESSION_KEY = 'mesuese_owner_session'
const SESSION_MS = 24 * 60 * 60 * 1000

export function isOwnerAuthConfigured() {
  const p = import.meta.env.VITE_OWNER_PASSWORD
  return typeof p === 'string' && p.length > 0
}

export function isOwnerLoggedIn() {
  if (!isOwnerAuthConfigured()) return false
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return false
    const { exp } = JSON.parse(raw)
    if (typeof exp !== 'number' || Date.now() >= exp) {
      sessionStorage.removeItem(SESSION_KEY)
      return false
    }
    return true
  } catch {
    return false
  }
}

export function loginOwner(password) {
  if (!isOwnerAuthConfigured()) {
    return {
      ok: false,
      error:
        'Fjalëkalimi nuk është aktiv në faqe. Vercel → VITE_OWNER_PASSWORD → Redeploy (pa cache).',
    }
  }
  const expected = import.meta.env.VITE_OWNER_PASSWORD
  if (password !== expected) {
    return { ok: false, error: 'Fjalëkalim i gabuar.' }
  }
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ exp: Date.now() + SESSION_MS }),
  )
  return { ok: true }
}

export function logoutOwner() {
  sessionStorage.removeItem(SESSION_KEY)
}
