import express from 'express'
import UserModel from '../models/User'

const router = express.Router()

router.post('/login', async (req, res) => {
  res.status(201).json({
    status: 'success',
  })
})

router.post('/signup', async (req, res) => {
  const user = new UserModel(req.body)
  await user.save()

  res.status(201).json({
    status: 'success',
  })
})

router.post('/logout', (req, res) => {
  res.status(201).json({
    status: 'success',
  })
})

export default router
