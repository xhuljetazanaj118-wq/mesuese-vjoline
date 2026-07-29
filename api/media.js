import { createClient } from 'redis'
import { Redis } from '@upstash/redis'

const MEDIA_KEY = 'mesuese-violine-media'

/** @type {import('redis').RedisClientType | null} */
let redisClient = null

async function getUrlRedis() {
  const url = process.env.REDIS_URL
  if (!url) return null
  try {
    if (!redisClient?.isOpen) {
      redisClient = createClient({ url })
      redisClient.on('error', () => {})
      await redisClient.connect()
    }
    return redisClient
  } catch {
    return null
  }
}

function getUpstashRedis() {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return Redis.fromEnv()
    } catch {
      return null
    }
  }
  return null
}

async function loadMedia() {
  const urlRedis = await getUrlRedis()
  if (urlRedis) {
    const raw = await urlRedis.get(MEDIA_KEY)
    if (!raw) return {}
    return typeof raw === 'string' ? JSON.parse(raw) : raw
  }

  const upstash = getUpstashRedis()
  if (upstash) {
    const data = await upstash.get(MEDIA_KEY)
    return data ?? {}
  }

  return null
}

async function saveMedia(payload) {
  const urlRedis = await getUrlRedis()
  if (urlRedis) {
    await urlRedis.set(MEDIA_KEY, JSON.stringify(payload))
    return true
  }

  const upstash = getUpstashRedis()
  if (upstash) {
    await upstash.set(MEDIA_KEY, payload)
    return true
  }

  return false
}

function hasRedisConfig() {
  return Boolean(
    process.env.REDIS_URL ||
      (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
  )
}

export default async function handler(request, response) {
  if (request.method === 'GET') {
    if (!hasRedisConfig()) return response.status(200).json({})
    try {
      const data = await loadMedia()
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

    if (!hasRedisConfig()) {
      return response.status(503).json({
        error: 'Redis nuk është lidhur. Vercel → Storage → Connect → Redeploy.',
      })
    }

    try {
      const { videos, audio } = request.body ?? {}
      if (!Array.isArray(videos) || !Array.isArray(audio)) {
        return response.status(400).json({ error: 'Invalid payload' })
      }
      const saved = await saveMedia({ videos, audio })
      if (!saved) {
        return response.status(503).json({ error: 'Ruajtja në Redis dështoi.' })
      }
      return response.status(200).json({ ok: true })
    } catch {
      return response.status(503).json({
        error: 'Ruajtja në server dështoi. Kontrollo REDIS_URL në Vercel.',
      })
    }
  }

  response.setHeader('Allow', 'GET, POST')
  return response.status(405).end()
}
