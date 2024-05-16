import express from 'express'
import imageRouter from './routes/image'
import authRouter from './routes/auth'
import { connectDB } from './db'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 4000

app.use('/static/images', express.static('uploads'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', imageRouter)
app.use('/auth', authRouter)

const init = async () => {
  await connectDB()

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

init()
