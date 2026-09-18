import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const workerMode = process.env.MEDUSA_WORKER_MODE || 'shared'
if (!['shared', 'server', 'worker'].includes(workerMode)) {
  throw new Error('MEDUSA_WORKER_MODE must be shared, server, or worker')
}

// The build loads this config but does not connect to runtime services.
const isBuild = process.argv[2] === 'build'
const redisUrl = process.env.REDIS_URL
if (!isBuild && workerMode !== 'shared' && !redisUrl) {
  throw new Error('REDIS_URL is required for separate server and worker instances')
}

const isProduction = process.env.NODE_ENV === 'production'
if (isProduction && !isBuild && (!process.env.JWT_SECRET || !process.env.COOKIE_SECRET ||
    process.env.JWT_SECRET === 'supersecret' || process.env.COOKIE_SECRET === 'supersecret')) {
  throw new Error('Set unique JWT_SECRET and COOKIE_SECRET values for production')
}

module.exports = defineConfig({
  admin: {
    disable: workerMode === 'worker' || process.env.DISABLE_MEDUSA_ADMIN === 'true',
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl,
    workerMode: workerMode as 'shared' | 'server' | 'worker',
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: redisUrl ? [
    {
      resolve: '@medusajs/medusa/event-bus-redis',
      options: { redisUrl },
    },
    {
      resolve: '@medusajs/medusa/workflow-engine-redis',
      options: { redis: { redisUrl } },
    },
    {
      resolve: '@medusajs/medusa/locking',
      options: {
        providers: [{
          resolve: '@medusajs/medusa/locking-redis',
          id: 'locking-redis',
          is_default: true,
          options: { redisUrl: process.env.LOCKING_REDIS_URL || redisUrl },
        }],
      },
    },
  ] : [],
})
