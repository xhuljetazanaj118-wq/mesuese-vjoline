import { useState } from 'react'

import { getYouTubeEmbedUrl, isValidYouTubeUrl } from '../utils/youtube'

import useMediaContent from '../hooks/useMediaContent'

import { useOwnerAuth } from '../context/OwnerAuthContext'

import MediaAdmin from './MediaAdmin'



function VideoCard({ video }) {

  const embedUrl = getYouTubeEmbedUrl(video.url)



  return (

    <div className="overflow-hidden rounded-xl border border-chocolate/10 bg-chocolate shadow-lg">

      <div className="aspect-video bg-chocolate">

        {embedUrl ? (

          <iframe

            className="h-full w-full"

            src={embedUrl}

            title={video.title}

            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

            allowFullScreen

          />

        ) : (

          <div className="flex h-full items-center justify-center text-cream/50">

            <p className="text-sm">URL YouTube e pavlefshme</p>

          </div>

        )}

      </div>

      <div className="border-t border-cream/10 bg-chocolate px-5 py-4">

        <span className="text-xs font-medium uppercase tracking-wider text-amber">{video.category}</span>

        <h3 className="mt-1 font-serif text-lg font-medium text-cream">{video.title}</h3>

      </div>

    </div>

  )

}



function AudioCard({ item }) {

  const youtubeEmbed = item.src && isValidYouTubeUrl(item.src) ? getYouTubeEmbedUrl(item.src) : null



  return (

    <div className="rounded-xl border border-chocolate/10 bg-tan/50 p-5">

      <div className={youtubeEmbed ? 'space-y-3' : 'flex items-start gap-3'}>

        {!youtubeEmbed && (

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-walnut/15 text-walnut">

            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

              <path

                strokeLinecap="round"

                strokeLinejoin="round"

                strokeWidth={1.5}

                d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0-12a9 9 0 019 9m-9-9a9 9 0 00-9 9"

              />

            </svg>

          </div>

        )}

        <div className="min-w-0 flex-1">

          <h3 className="font-serif text-lg font-medium text-chocolate">{item.title}</h3>

          {item.subtitle && <p className="mt-0.5 text-sm text-navy/60">{item.subtitle}</p>}

          {youtubeEmbed ? (

            <div className="mt-3 overflow-hidden rounded-lg border border-chocolate/10 bg-chocolate shadow-sm">

              <div className="aspect-video">

                <iframe

                  className="h-full w-full"

                  src={youtubeEmbed}

                  title={item.title}

                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

                  allowFullScreen

                />

              </div>

            </div>

          ) : (

            item.src && (

              <audio controls className="mt-3 w-full" preload="metadata">

                <source src={item.src} type="audio/mpeg" />

                Shfletuesi juaj nuk mbështet audio player-in.

              </audio>

            )

          )}

        </div>

      </div>

    </div>

  )

}



export default function MediaGallery() {

  const { videos, audio, saveMedia, resetToDefaults } = useMediaContent()

  const { loggedIn } = useOwnerAuth()

  const [adminOpen, setAdminOpen] = useState(false)



  return (

    <section id="galeria" className="bg-cream py-14 sm:py-20 md:py-28">

      <div className="section-container">

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div className="min-w-0">

            <p className="text-sm font-medium uppercase tracking-[0.15em] text-walnut">Media Gallery</p>

            <h2 className="section-title mt-2">Dëgjoni Interpretatimin Tim</h2>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-navy/70">

              Shikoni fragmente nga mësime dhe performanca live.

            </p>

          </div>

          {loggedIn && (

            <button

              type="button"

              onClick={() => setAdminOpen(true)}

              className="btn-outline w-full shrink-0 text-sm sm:w-auto"

              title="Menaxho videot dhe audiot"

            >

              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                <path

                  strokeLinecap="round"

                  strokeLinejoin="round"

                  strokeWidth={2}

                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"

                />

              </svg>

              Menaxho Media

            </button>

          )}

        </div>



        {videos.length > 0 && (

          <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">

            {videos.map((video) => (

              <VideoCard key={video.id} video={video} />

            ))}

          </div>

        )}



        {audio.length > 0 && (

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            {audio.map((item) => (

              <AudioCard key={item.id} item={item} />

            ))}

          </div>

        )}



        {videos.length === 0 && audio.length === 0 && (

          <div className="mt-12 rounded-xl border-2 border-dashed border-chocolate/20 py-16 text-center">

            <p className="text-navy/60">Nuk ka media të shtuar ende.</p>

            {loggedIn && (

              <button type="button" onClick={() => setAdminOpen(true)} className="btn-primary mt-4">

                Shto Video YouTube

              </button>

            )}

          </div>

        )}

      </div>



      {loggedIn && adminOpen && (

        <MediaAdmin

          videos={videos}

          audio={audio}

          onSave={saveMedia}

          onReset={resetToDefaults}

          onClose={() => setAdminOpen(false)}

        />

      )}

    </section>

  )

}


