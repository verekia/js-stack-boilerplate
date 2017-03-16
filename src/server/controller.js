// @flow

import mongoose from 'mongoose'

import Message from './model/message'

export const homePage = () => null

export const helloPage = () =>
  new Promise((resolve, reject) => {
    const helloMessage = new Message({
      key: 'hello',
      content: 'Server-side preloaded message from the DB',
    })

    mongoose.connection.db.collection('messages').drop()
    .then(
      /* eslint-disable no-console */
      () => console.log('Message collection dropped'),
      () => console.log('Message collection not found'),
      /* eslint-enable no-console */
    )
    .then(() => helloMessage.save(err => reject(err)))
    .then(() => Message
      .findOne({ key: 'hello' })
      .exec((err, result) => {
        if (err) reject(err)
        resolve({ hello: { message: result.content } })
      }),
    )
  })

export const helloAsyncPage = () => ({
  hello: { messageAsync: 'Server-side preloaded message for async page' },
})

export const helloEndpoint = (num: number) => ({
  serverMessage: `Hello from the server! (received ${num})`,
})
