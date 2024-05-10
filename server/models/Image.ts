import mongoose from 'mongoose'
const { Schema } = mongoose

export const ImageSchema = new Schema(
  {
    id: { type: String, required: true },
    originalName: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
)
