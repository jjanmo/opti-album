import mongoose from 'mongoose'
const { Schema } = mongoose

export interface ImageSchema {
  key: string
  originalName: string
  size: number
  type: string
}

export const imageSchema = new Schema<ImageSchema>(
  {
    key: { type: String, required: true },
    originalName: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
)
