import express, { Request, Response } from 'express'
import multer from 'multer'
import 'dotenv/config'
import { storage } from './middlewares/image'

const app = express()
const upload = multer({ storage })
const port = process.env.PORT || 4000

app.post('/upload', upload.single('image'), (req: Request, res: Response) => {
  console.log('uploaded', req.body, req.file)
  res.send('File uploaded successfully')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
