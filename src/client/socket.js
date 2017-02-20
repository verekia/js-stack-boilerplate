// @flow

/* eslint-disable no-console */

import socketIOClient from 'socket.io-client'

import {
  IO_CONNECT,
  IO_DISCONNECT,
  IO_CLIENT_HELLO,
  IO_CLIENT_JOIN_ROOM,
  IO_SERVER_HELLO,
  } from '../shared/config'

const socket = socketIOClient(window.location.host)

export const setUpSocket = () => {
  socket.on(IO_CONNECT, () => {
    socket.emit(IO_CLIENT_JOIN_ROOM, 'hello-1234')
    console.log('[socket.io] Connected.')
  })

  socket.on(IO_SERVER_HELLO, (serverMessage) => {
    console.log(`[socket.io] Server: ${serverMessage}`)
  })

  socket.on(IO_DISCONNECT, () => {
    console.log('[socket.io] Disconnected.')
  })
}

export const emitHello = () => {
  socket.emit(IO_CLIENT_HELLO, 'Hello!')
}
