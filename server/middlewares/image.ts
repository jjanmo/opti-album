import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { randomUUID } from 'crypto'
import mime from 'mime-types'
import { LIMIT_SIZE } from '../constants'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const filename = randomUUID()
    const ext = mime.extension(file.mimetype)
    cb(null, `${filename}.${ext}`)
  },
})

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const type = file.mimetype.split('/')[0]
  const isImage = type === 'image'

  if (isImage) cb(null, true)
  else cb(new Error('Only image file supported'))
}

/** multer instance */
const iMulter = multer({
  storage,
  fileFilter,
  limits: { fileSize: LIMIT_SIZE },
})

export default iMulter
