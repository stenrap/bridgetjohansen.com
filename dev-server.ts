import { createServer, Server, ServerOptions } from 'https'
import { IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import fs from 'fs'
import next from 'next'

import logger from './src/server/logger'

const app = next({ dev: true })
const handle = app.getRequestHandler()
const port = 3000

;(async (): Promise<void> => {
  await app.prepare()
  const options: ServerOptions = {
    cert: fs.readFileSync('./certs/local.bridgetjohansen.com.crt'),
    key: fs.readFileSync('./certs/local.bridgetjohansen.com.key')
  }
  const server: Server = createServer(
    options, (req: IncomingMessage, res: ServerResponse): void => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    handle(req, res, parse(req.url!, true))
  })
  server.on('listen', (): void => {
    logger.info(`bridgetjohansen.com listening on ${port}`)
  })
  server.listen(port)
})()
