import { useState } from 'react'
import { isValidYouTubeUrl } from '../utils/youtube'

const emptyVideo = { title: '', category: 'Mësim', url: '' }
const emptyAudio = { title: '', subtitle: '', src: '' }

export default function MediaAdmin({ videos, audio, onSave, onReset, onClose }) {
  const [localVideos, setLocalVideos] = useState(videos)
  const [localAudio, setLocalAudio] = useState(audio)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [saving, setSaving] = useState(false)

  const updateVideo = (index, field, value) => {
    setLocalVideos((prev) => prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)))
  }

  const addVideo = () => {
    setLocalVideos((prev) => [...prev, { ...emptyVideo, id: `video-${Date.now()}` }])
  }

  const removeVideo = (index) => {
    setLocalVideos((prev) => prev.filter((_, i) => i !== index))
  }

  const updateAudioItem = (index, field, value) => {
    setLocalAudio((prev) => prev.map((a, i) => (i === index ? { ...a, [field]: value } : a)))
  }

  const addAudio = () => {
    setLocalAudio((prev) => [...prev, { ...emptyAudio, id: `audio-${Date.now()}` }])
  }

  const removeAudio = (index) => {
    setLocalAudio((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    for (const video of localVideos) {
      if (!video.title.trim()) {
        setError('Çdo video duhet të ketë një titull.')
        return
      }
      if (!isValidYouTubeUrl(video.url)) {
        setError(`URL e pavlefshme YouTube për: "${video.title || 'video pa titull'}"`)
        return
      }
    }
    setError('')
    setInfo('')
    setSaving(true)
    try {
      const result = await onSave(localVideos, localAudio)
      if (result?.warning) {
        setInfo(result.warning)
        return
      }
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-chocolate/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-cream shadow-2xl">
        <div className="sticky top-0 z-10 border-b border-chocolate/10 bg-cream px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-semibold text-chocolate">Menaxho Media</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-chocolate/60 hover:bg-chocolate/5"
              aria-label="Mbyll"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-1 text-sm text-navy/60">
            Ngjitni linkun e videos YouTube dhe klikoni Ruaj. Ndryshimet mbeten për të gjithë vizitorët (pas ruajtjes
            në server).
          </p>
        </div>

        <div className="space-y-8 px-6 py-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-medium text-chocolate">Video YouTube</h4>
              <button type="button" onClick={addVideo} className="text-sm font-medium text-walnut hover:underline">
                + Shto Video
              </button>
            </div>

            <div className="space-y-4">
              {localVideos.map((video, index) => (
                <div key={video.id || index} className="rounded-xl border border-chocolate/10 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wider text-walnut">
                      Video {index + 1}
                    </span>
                    {localVideos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Fshi
                      </button>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Titulli (p.sh. Nga një Orë Mësimi)"
                      value={video.title}
                      onChange={(e) => updateVideo(index, 'title', e.target.value)}
                      className="admin-input"
                    />
                    <select
                      value={video.category}
                      onChange={(e) => updateVideo(index, 'category', e.target.value)}
                      className="admin-input"
                    >
                      <option value="Mësim">Mësim</option>
                      <option value="Performancë">Performancë</option>
                      <option value="Koncert">Koncert</option>
                      <option value="Tjetër">Tjetër</option>
                    </select>
                  </div>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={video.url}
                    onChange={(e) => updateVideo(index, 'url', e.target.value)}
                    className="admin-input mt-3"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-medium text-chocolate">Audio</h4>
              <button type="button" onClick={addAudio} className="text-sm font-medium text-walnut hover:underline">
                + Shto Audio
              </button>
            </div>

            <div className="space-y-4">
              {localAudio.map((item, index) => (
                <div key={item.id || index} className="rounded-xl border border-chocolate/10 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wider text-walnut">
                      Audio {index + 1}
                    </span>
                    {localAudio.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAudio(index)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Fshi
                      </button>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Titulli"
                      value={item.title}
                      onChange={(e) => updateAudioItem(index, 'title', e.target.value)}
                      className="admin-input"
                    />
                    <input
                      type="text"
                      placeholder="Nëntitulli (p.sh. Vivaldi – Spring)"
                      value={item.subtitle}
                      onChange={(e) => updateAudioItem(index, 'subtitle', e.target.value)}
                      className="admin-input"
                    />
                  </div>
                  <input
                    type="url"
                    placeholder="Link YouTube ose /audio/skedari.mp3"
                    value={item.src}
                    onChange={(e) => updateAudioItem(index, 'src', e.target.value)}
                    className="admin-input mt-3"
                  />
                </div>
              ))}
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          )}
          {info && (
            <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">{info}</p>
          )}
        </div>

        <div className="sticky bottom-0 flex flex-wrap gap-3 border-t border-chocolate/10 bg-cream px-6 py-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex-1 sm:flex-none disabled:opacity-60"
          >
            {saving ? 'Duke ruajtur...' : 'Ruaj Ndryshimet'}
          </button>
          <button
            type="button"
            onClick={() => {
              onReset()
              onClose()
            }}
            className="btn-outline flex-1 sm:flex-none"
          >
            Rivendos Default
          </button>
          <button type="button" onClick={onClose} className="btn-ghost flex-1 sm:flex-none">
            Anulo
          </button>
        </div>
      </div>
    </div>
  )
}
