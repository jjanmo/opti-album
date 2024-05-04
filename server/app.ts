import express from 'express'
import path from 'path'
import uploadRouter from './routes/upload'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 4000

app.use('/static/uploads', express.static('uploads'))
app.use('/', uploadRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
