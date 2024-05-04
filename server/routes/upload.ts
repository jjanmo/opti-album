import express, { Request, Response } from 'express'
import iMulter from '../middlewares/image'

const router = express.Router()

router.post(
  '/upload',
  iMulter.single('image'),
  (req: Request, res: Response) => {
    res.send('File uploaded successfully')
  }
)

export default router
