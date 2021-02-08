import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import bodyParser from 'body-parser'
import cors from 'cors'

import environment from './types/EnvTypes'
import schema from './schema'

export const defaultAdmin = admin.initializeApp()
const env: environment = process.env.ENVIRONMENT as environment

console.info(`In ${env} environment`)

const isDev = env === "dev"

console.info('Defining server')

const server = express()

server.use(cors({ origin: true }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use('/', graphqlHTTP({
      schema: schema,
      graphiql: isDev,
    }),
  );


// IN Dev only Remove when deploying
if (isDev) {
  server.listen(3000)
}

exports.api = functions.runWith({ memory: "2GB", timeoutSeconds: 120 }).https.onRequest(server)