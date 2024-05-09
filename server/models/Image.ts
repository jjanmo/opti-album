import mongoose from 'mongoose'
const { Schema } = mongoose

export const imageSchema = new Schema({
  id: { type: String, required: true },
  originalFileName: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
})
