import multer from 'multer'
import { randomUUID } from 'crypto'
import mime from 'mime-types'

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const filename = randomUUID()
    const ext = mime.extension(file.mimetype)
    cb(null, `${filename}.${ext}`)
  },
})
