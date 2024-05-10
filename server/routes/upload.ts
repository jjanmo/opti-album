import express, { Request, Response } from 'express'
import iMulter from '../middlewares/image'
import mongoose, { model } from 'mongoose'
import { imageSchema, ImageSchema } from '../models/Image'

const router = express.Router()

router.post(
  '/upload',
  iMulter.single('image'),
  async (req: Request, res: Response) => {
    const file = req.file
    if (!file) {
      res.status(400).json({ status: 'error' })
      return
    }

    const { originalname, mimetype, filename, size } = file

    const Image = model<ImageSchema>('Image', imageSchema)
    const image = new Image({
      key: filename,
      originalName: originalname,
      size,
      type: mimetype,
    })
    await image.save()

    res.status(201).json({
      status: 'success',
      data: file,
      message: 'File uploaded successfully.',
    })
  }
)

export default router
