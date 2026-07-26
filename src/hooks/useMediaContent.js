import { useCallback, useEffect, useState } from 'react'
import { defaultAudio, defaultVideos, MEDIA_STORAGE_KEY } from '../config/media'

function loadStoredMedia() {
  try {
    const raw = localStorage.getItem(MEDIA_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.videos || parsed?.audio) return parsed
  } catch {
    /* ignore corrupt storage */
  }
  return null
}

function saveStoredMedia(data) {
  localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(data))
}

export default function useMediaContent() {
  const [videos, setVideos] = useState(defaultVideos)
  const [audio, setAudio] = useState(defaultAudio)

  useEffect(() => {
    const stored = loadStoredMedia()
    if (stored) {
      if (stored.videos?.length) setVideos(stored.videos)
      if (stored.audio?.length) setAudio(stored.audio)
    }
  }, [])

  const persist = useCallback((nextVideos, nextAudio) => {
    saveStoredMedia({ videos: nextVideos, audio: nextAudio })
  }, [])

  const updateVideos = useCallback(
    (nextVideos) => {
      setVideos(nextVideos)
      persist(nextVideos, audio)
    },
    [audio, persist],
  )

  const updateAudio = useCallback(
    (nextAudio) => {
      setAudio(nextAudio)
      persist(videos, nextAudio)
    },
    [videos, persist],
  )

  const resetToDefaults = useCallback(() => {
    setVideos(defaultVideos)
    setAudio(defaultAudio)
    localStorage.removeItem(MEDIA_STORAGE_KEY)
  }, [])

  return { videos, audio, updateVideos, updateAudio, resetToDefaults }
}
