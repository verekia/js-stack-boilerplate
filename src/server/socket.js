// @flow

/* eslint-disable no-console */

import {
  IO_CONNECT,
  IO_DISCONNECT,
  IO_CLIENT_JOIN_ROOM,
  IO_CLIENT_HELLO,
  IO_SERVER_HELLO,
} from '../shared/config'

const setUpSocket = (io: Object) => {
  io.on(IO_CONNECT, (socket) => {
    socket.on(IO_CLIENT_JOIN_ROOM, (room) => {
      socket.join(room)
      console.log(`[socket.io] A user joined room ${room}.`)
      io.to(room).emit(IO_SERVER_HELLO, `Welcome to room ${room}.`)
    })

    socket.on(IO_CLIENT_HELLO, (clientMessage) => {
      console.log(`[socket.io] Client: ${clientMessage}`)
    })

    socket.on(IO_DISCONNECT, () => {
      console.log('[socket.io] A user disconnected.')
    })
  })
}

export default setUpSocket
