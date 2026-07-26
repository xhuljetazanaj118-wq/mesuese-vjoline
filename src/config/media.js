/**
 * ═══════════════════════════════════════════════════════════════
 *  MEDIA GALLERY – Si të shtoni video/audio
 * ═══════════════════════════════════════════════════════════════
 *
 *  VIDEO YouTube:
 *  Kopjoni linkun e videos (p.sh. https://www.youtube.com/watch?v=ABC123)
 *  dhe vendoseni fushën "url" më poshtë.
 *
 *  AUDIO:
 *  Skedar .mp3: "/audio/emri.mp3"
 *  Ose link YouTube (luhet si player në faqe):
 *  https://www.youtube.com/watch?v=...
 *
 *  Ose përdorni panelin "Menaxho Media" direkt në faqe (ruhet në shfletues).
 * ═══════════════════════════════════════════════════════════════
 */

export const defaultVideos = [
  {
    id: 'lesson-1',
    title: 'Nga një Orë Mësimi',
    category: 'Mësim',
    url: 'https://www.youtube.com/watch?v=8kooIgKESWE',
  },
  {
    id: 'wedding-1',
    title: 'Performancë në Dasmë',
    category: 'Performancë',
    url: 'https://www.youtube.com/watch?v=0zL_3vZT3LQ',
  },
]

export const defaultAudio = [
  {
    id: 'audio-1',
    title: 'Interpretim',
    subtitle: 'YouTube',
    src: 'https://www.youtube.com/watch?v=To5eyIXAHJI&list=RDTo5eyIXAHJI&start_radio=1',
  },
  {
    id: 'audio-2',
    title: 'Fragment Romantik',
    subtitle: 'Canon in D – Johann Pachelbel',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
]

export const MEDIA_STORAGE_KEY = 'mesuese-violine-media'
