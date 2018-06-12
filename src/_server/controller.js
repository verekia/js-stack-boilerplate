// @flow

export const homePage = () => null

export const helloPage = () =>
  new Promise((resolve, reject) => {
    const helloMessage = new Message({
      key: 'hello-msg',
      content: 'Server-side preloaded message from the DB',
    })

    mongoose.connection.db
      .collection('messages')
      .drop()
      .then(
        /* eslint-disable no-console */
        () => console.log('Message collection dropped'),
        () => console.log('Message collection already empty'),
        /* eslint-enable no-console */
      )
      .then(() =>
        helloMessage.save(err => {
          if (err) reject(err)
        }),
      )
      .then(() =>
        Message.findOne({ key: 'hello-msg' }).exec((err, result) => {
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
