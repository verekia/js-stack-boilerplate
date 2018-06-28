// @flow

/* eslint-disable no-console */

import socketIOClient from 'socket.io-client'

import {
  IO_CONNECT,
  IO_DISCONNECT,
  IO_CLIENT_HELLO,
  IO_CLIENT_JOIN_ROOM,
  IO_SERVER_HELLO,
} from '_shared/socket-events'

const socket = socketIOClient(window.location.host)

// eslint-disable-next-line no-unused-vars
const setUpSocket = (store: Object) => {
  socket.on(IO_CONNECT, () => {
    console.log('[socket.io] Connected.')
    socket.emit(IO_CLIENT_JOIN_ROOM, 'hello-1234')
    socket.emit(IO_CLIENT_HELLO, 'Hello!')
  })

  socket.on(IO_SERVER_HELLO, serverMessage => console.log(`[socket.io] Server: ${serverMessage}`))

  socket.on(IO_DISCONNECT, () => console.log('[socket.io] Disconnected.'))
}

export default setUpSocket
