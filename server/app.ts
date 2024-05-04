import express from 'express'
import 'dotenv/config'
import uploadRouter from './routes/upload'

const app = express()
const port = process.env.PORT || 4000

app.use('/', uploadRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
