
import got from 'got'
import process from 'process'
import KeyvRedis from '@keyv/redis'
import { BinLookupResponse, BinLookupOptions } from './models/binlist';

import debugConsole from 'debug'
const debug = debugConsole('binlookup')

// Default cache in map data structure
const map = new Map()

// Alternative: Redis cache
let cache;
if (process.env.REDIS_CACHE) {
  const { REDIS_CACHE } = process.env
  debug('using redis cache: %s', REDIS_CACHE)
  cache = new KeyvRedis(REDIS_CACHE)
  cache.on('error', (err) => console.error('[redis] Connection Error', err))
} else {
  debug('using in-memory cache')
  new Map()
}

const client = got.extend({
  prefixUrl: 'https://lookup.binlist.net/',
  headers: {
    'Accept-Version': '3',
    'X-Client': process.versions.node,
  },
  cache: redis ?? map,
  hooks: {
    beforeRetry: [
      (error, retryCount) => {
        console.debug(`Retrying [${retryCount}]: ${error.code}`)
      }
    ],
    afterResponse: [
      async (response) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return response
      }
    ],
  },
  mutableDefaults: true,
  responseType: 'json'
})

export default async function binlookup(opts: BinLookupOptions ): Promise<Function> {
  if (opts.key) {
    client.defaults.options.headers = {
      ...client.defaults.options.headers,
      'Authorization': `Basic ${Buffer.from(opts.key + ':').toString('base64')}`
    }
  }

  debug('binlookup headers: %O', client.defaults.options.headers)

  return async (bin: string): Promise<BinLookupResponse> => client.get(bin).json()
}
