/**
 * Nxjerr ID-në e videos YouTube nga çdo format i zakonshëm URL.
 */
export function getYouTubeId(url) {
  if (!url || typeof url !== 'string') return null

  const trimmed = url.trim()

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]

  for (const pattern of patterns) {
    const match = trimmed.match(pattern)
    if (match?.[1]) return match[1]
  }

  return null
}

export function getYouTubeEmbedUrl(url) {
  const id = getYouTubeId(url)
  if (!id) return null
  return `https://www.youtube.com/embed/${id}`
}

export function isValidYouTubeUrl(url) {
  return getYouTubeId(url) !== null
}
