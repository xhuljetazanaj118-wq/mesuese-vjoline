import { siteConfig } from '../config/site'

/**
 * Dërgon formularin në Gmail përmes FormSubmit (formsubmit.co).
 * Herën e parë, Gmail duhet të konfirmojë linkun e aktivizimit nga FormSubmit.
 */
export async function sendContactEmail(formData) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(siteConfig.email)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone.trim() || '—',
        service: formData.service,
        message: formData.message.trim() || '—',
        _subject: `Rezervim violinë – ${formData.name}`,
        _template: 'table',
        _captcha: 'false',
      }),
    },
  )

  let data = {}
  try {
    data = await response.json()
  } catch {
    /* FormSubmit sometimes returns empty body on success */
  }

  if (!response.ok) {
    throw new Error(typeof data.message === 'string' ? data.message : 'Dërgimi dështoi')
  }

  return data
}
