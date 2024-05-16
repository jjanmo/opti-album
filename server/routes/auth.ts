import express from 'express'
import UserModel from '../models/User'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { nickname, password, id } = req.body

  const result = await UserModel.findOne({ nickname, _id: id })

  if (result?.password !== password) {
    return res.status(400).json({
      status: 'failure',
      message: 'Invalid password',
    })
  }

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
