import { Redis } from '@upstash/redis'

const MEDIA_KEY = 'mesuese-violine-media'

function getRedis() {
  try {
    return Redis.fromEnv()
  } catch {
    return null
  }
}

export default async function handler(request, response) {
  const redis = getRedis()

  if (request.method === 'GET') {
    if (!redis) return response.status(200).json({})
    try {
      const data = await redis.get(MEDIA_KEY)
      return response.status(200).json(data ?? {})
    } catch {
      return response.status(200).json({})
    }
  }

  if (request.method === 'POST') {
    const secret = request.headers['x-owner-secret']
    const expected = process.env.VITE_OWNER_PASSWORD
    if (!expected || secret !== expected) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    if (!redis) {
      return response.status(503).json({
        error: 'Shto Upstash Redis te Vercel (Storage) dhe bëj redeploy.',
      })
    }

    try {
      const { videos, audio } = request.body ?? {}
      if (!Array.isArray(videos) || !Array.isArray(audio)) {
        return response.status(400).json({ error: 'Invalid payload' })
      }
      await redis.set(MEDIA_KEY, { videos, audio })
      return response.status(200).json({ ok: true })
    } catch {
      return response.status(503).json({
        error: 'Ruajtja në server dështoi. Kontrollo Upstash Redis.',
      })
    }
  }

  response.setHeader('Allow', 'GET, POST')
  return response.status(405).end()
}
