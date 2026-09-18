# Medusa backend on Coolify (test environment)

Deploy `apps/backend` twice from the same commit: `secun-store-server` and
`secun-store-worker`. Both use the same PostgreSQL database and Redis instance.
The Next.js storefront is a third application. No additional VM is required.

## Environment variables

| Variable | Server | Worker |
| --- | --- | --- |
| NODE_ENV | production | production |
| MEDUSA_WORKER_MODE | server | worker |
| DISABLE_MEDUSA_ADMIN | false | true |
| DATABASE_URL | Internal PostgreSQL URL | Same URL |
| REDIS_URL | Internal Redis URL | Same URL |
| JWT_SECRET | Random secret | Same secret |
| COOKIE_SECRET | Another random secret | Same secret |
| PORT | 9000 | 9000 |
| MEDUSA_BACKEND_URL | Browser-accessible backend URL | Same URL |
| STORE_CORS | Storefront origin | Same value |
| ADMIN_CORS | Admin origin | Same value |
| AUTH_CORS | Storefront and Admin origins, comma-separated | Same value |

Generate each secret separately with `openssl rand -hex 32`. Store credentials
in Coolify, never in Git. The default development secrets are rejected when
NODE_ENV is production. Set Admin build variables before building, including
DISABLE_MEDUSA_ADMIN and MEDUSA_BACKEND_URL. Origins include scheme and port,
but not paths such as `/app`.

## Build and release ordering

1. Keep the build context at repository root for Yarn workspaces. Install with
   Yarn 4.6.0 using `yarn install --immutable`.
2. Build only the backend with `yarn workspace @dtc/backend build`.
3. Medusa produces `apps/backend/.medusa/server`. Install the generated
   application's dependencies there and run it from that directory; do not run
   the root `start` command, which also starts the storefront through Turbo.
4. Before starting either new instance, run `yarn predeploy` from the generated
   server directory once. This runs `medusa db:migrate`, including link sync.
   Use one controlled release step, not simultaneous server/worker startup hooks.
5. Start each instance with `yarn start` from the generated server directory,
   with its own environment above. Set up server routing to container port 9000.
   The worker needs no public domain or published host port, and must not use
   the server's HTTP health check.
6. Verify server `/health`, open `/app`, and create the first admin using the
   Medusa CLI inside the running server. Test a known subscriber or scheduled
   job and inspect worker logs to verify background processing.

The exact Coolify build/start settings still need validation against its build
image and the generated application's Yarn configuration before deployment.

## Redis and files

When REDIS_URL is set, events, workflows and locks use Redis. These providers
are already included through the pinned Medusa 2.15.2 dependency. Without Redis,
only local `shared` mode is allowed. Cache remains local for this test setup;
this is not the complete production infrastructure configuration.

Keep PostgreSQL and Redis private and make sure both backend containers can
reach their internal hostnames. Retain persistent database/Redis volumes.

For the default local file provider, persist the generated server's `static`
directory at its actual absolute container path. If worker code accesses local
files, mount the same storage into both instances. Keep this directory separate
from source/build mounts. Confirm uploaded product images survive redeployment.

References:
- https://docs.medusajs.com/learn/deployment/general
- https://docs.medusajs.com/learn/production/worker-mode
