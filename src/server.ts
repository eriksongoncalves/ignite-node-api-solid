import { app } from './app'
import { env } from './env'

app
  .listen({ host: env.HOST, port: env.PORT })
  // eslint-disable-next-line no-console
  .then(() => console.log('Server running...'))
