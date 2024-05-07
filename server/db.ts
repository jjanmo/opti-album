import mongoose from 'mongoose'
import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI

export const connectDB = async () => {
  if (!MONGO_URI) return // TODO retry connection

  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error)
  }
}
