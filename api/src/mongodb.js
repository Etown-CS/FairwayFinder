import { MongoClient } from 'mongodb'

export const mongodb = (app) => {
  const connection = app.get('mongodb')
  const database = new URL(connection).pathname.substring(1)
  const mongoClient = MongoClient.connect(connection).then((client) => client.db(database))

  app.set('mongodbClient', mongoClient)
}
