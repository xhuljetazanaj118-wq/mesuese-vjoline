# Emri Mësueses – Violinë

Modern single-page website for a professional violinist offering lessons and live performance services.

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Playfair Display (headings) + Poppins (body)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Si të shtoni video YouTube

### Metoda 1: Direkt nga faqja (më e lehtë)

1. Hapni faqen dhe shkoni te seksioni **Media Gallery**
2. Klikoni butonin **Menaxho Media**
3. Ngjitni linkun e videos YouTube (p.sh. `https://www.youtube.com/watch?v=ABC123`)
4. Shkruani titullin dhe klikoni **Ruaj Ndryshimet**

Ndryshimet ruhen në shfletuesin tuaj (localStorage).

### Metoda 2: Nëpërmjet skedarit të konfigurimit

Hapni `src/config/media.js` dhe ndryshoni listën `defaultVideos`:

```js
{
  id: 'lesson-1',
  title: 'Nga një Orë Mësimi',
  category: 'Mësim',
  url: 'https://www.youtube.com/watch?v=VIDEO_ID_KETU',
}
```

Formatet e mbështetura:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`
- Vetëm ID-ja: `VIDEO_ID`

### Audio

Vendosni skedarët `.mp3` në `public/audio/` dhe referojini si `/audio/emri.mp3`.

## Personalizim

Ndryshoni emrin, kontaktin dhe fotot në `src/config/site.js`.

## Build

```bash
npm run build
npm run preview
```
