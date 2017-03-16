// @flow

import mongoose, { Schema } from 'mongoose'

const messageSchema = Schema({
  key: String,
  content: String,
})

export default mongoose.model('message', messageSchema)
