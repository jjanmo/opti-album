import express, { Request, Response } from 'express'
import iMulter from '../middlewares/image'
import ImageModel from '../models/Image'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await ImageModel.find()

    res.status(200).json({
      status: 'success',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
})

router.post(
  '/',
  iMulter.single('image'),
  async (req: Request, res: Response) => {
    const file = req.file
    if (!file) {
      res.status(400).json({ status: 'error' })
      return
    }

    const { originalname, mimetype, filename, size } = file
    const image = new ImageModel({
      key: filename,
      originalName: originalname,
      size,
      type: mimetype,
    })
    await image.save()

    res.status(201).json({
      status: 'success',
      data: file,
    })
  }
)

export default router
