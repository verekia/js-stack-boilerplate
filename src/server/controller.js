// @flow

import mongoose from 'mongoose'

import Message from './model/message'

export const homePage = () => null

export const helloPage = async () => {
  const helloMessage = new Message({
    key: 'hello-msg',
    content: 'Server-side preloaded message from the DB',
  })

  try {
    await mongoose.connection.db.collection('messages').drop()
    // eslint-disable-next-line no-console
    console.log('Message collection dropped')
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Message collection already empty')
  }

  try {
    await helloMessage.save((err) => { if (err) throw err })
    const foundMessage = await Message
      .findOne({ key: 'hello-msg' })
      .exec(() => { throw Error('Fake error') })
    return { hello: { message: foundMessage.content } }
  } catch (err) {
    throw err
  }
}

export const helloAsyncPage = () => ({
  hello: { messageAsync: 'Server-side preloaded message for async page' },
})

export const helloEndpoint = (num: number) => ({
  serverMessage: `Hello from the server! (received ${num})`,
})
