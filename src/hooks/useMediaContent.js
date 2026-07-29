import { useCallback, useEffect, useState } from 'react'
import { defaultAudio, defaultVideos, MEDIA_STORAGE_KEY } from '../config/media'

function loadStoredMedia() {
  try {
    const raw = localStorage.getItem(MEDIA_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed?.videos) || Array.isArray(parsed?.audio)) return parsed
  } catch {
    /* ignore corrupt storage */
  }
  return null
}

function saveStoredMedia(data) {
  localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(data))
}

function applyMedia(stored, setVideos, setAudio) {
  if (Array.isArray(stored.videos) && stored.videos.length > 0) {
    setVideos(stored.videos)
  }
  if (Array.isArray(stored.audio) && stored.audio.length > 0) {
    setAudio(stored.audio)
  }
}

export default function useMediaContent() {
  const [videos, setVideos] = useState(defaultVideos)
  const [audio, setAudio] = useState(defaultAudio)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('/api/media')
        if (res.ok) {
          const remote = await res.json()
          if (
            !cancelled &&
            (Array.isArray(remote?.videos) || Array.isArray(remote?.audio))
          ) {
            if (Array.isArray(remote.videos) && remote.videos.length > 0) {
              setVideos(remote.videos)
            }
            if (Array.isArray(remote.audio) && remote.audio.length > 0) {
              setAudio(remote.audio)
            }
            saveStoredMedia({
              videos: remote.videos?.length ? remote.videos : defaultVideos,
              audio: remote.audio?.length ? remote.audio : defaultAudio,
            })
            return
          }
        }
      } catch {
        /* offline or API not configured */
      }

      if (!cancelled) {
        const stored = loadStoredMedia()
        if (stored) applyMedia(stored, setVideos, setAudio)
      }
    }

    load().finally(() => {
      if (!cancelled) setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [])

  const saveMedia = useCallback(async (nextVideos, nextAudio) => {
    setVideos(nextVideos)
    setAudio(nextAudio)
    saveStoredMedia({ videos: nextVideos, audio: nextAudio })

    const ownerSecret = import.meta.env.VITE_OWNER_PASSWORD
    if (!ownerSecret) return { ok: true, remote: false }

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-owner-secret': ownerSecret,
        },
        body: JSON.stringify({ videos: nextVideos, audio: nextAudio }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        return {
          ok: true,
          remote: false,
          warning:
            err.error ||
            'U ruajt vetëm në këtë shfletues. Shto Upstash Redis te Vercel që të shohin të gjithë.',
        }
      }
      return { ok: true, remote: true }
    } catch {
      return {
        ok: true,
        remote: false,
        warning: 'U ruajt në shfletues; serveri nuk u arrit.',
      }
    }
  }, [])

  const resetToDefaults = useCallback(async () => {
    setVideos(defaultVideos)
    setAudio(defaultAudio)
    localStorage.removeItem(MEDIA_STORAGE_KEY)

    const ownerSecret = import.meta.env.VITE_OWNER_PASSWORD
    if (ownerSecret) {
      try {
        await fetch('/api/media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-owner-secret': ownerSecret,
          },
          body: JSON.stringify({ videos: defaultVideos, audio: defaultAudio }),
        })
      } catch {
        /* ignore */
      }
    }
  }, [])

  return { videos, audio, loading, saveMedia, resetToDefaults }
}
