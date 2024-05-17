import express from 'express'
import UserModel from '../models/User'
import bcrypt from 'bcrypt'

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
  const { nickname, password, email } = req.body

  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      const user = new UserModel({
        nickname,
        password: hash,
        email,
      })
      await user.save()

      return res.status(201).json({
        status: 'success',
      })
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/logout', (req, res) => {
  res.status(201).json({
    status: 'success',
  })
})

export default router
