import express from 'express'
import imageRouter from './routes/images'
import { connectDB } from './db'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 4000

app.use('/static/images', express.static('uploads'))
app.use('/', imageRouter)

const init = async () => {
  await connectDB()

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

init()
