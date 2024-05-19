import express from 'express'
import UserModel from '../models/User'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../constants'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { nickname, password, id } = req.body

  try {
    const user = await UserModel.findOne({ nickname })
    if (!user) {
      return res.status(400).json({
        status: 'failure',
        message: 'User does not exist',
      })
    }

    const result = await bcrypt.compare(password, user.password)
    if (!result) {
      return res.status(400).json({
        status: 'failure',
        message: 'Invalid password',
      })
    }

    return res.status(201).json({
      status: 'success',
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/signup', async (req, res) => {
  const { nickname, password, email } = req.body

  try {
    const result = await UserModel.findOne({ nickname })
    if (result) {
      return res.status(400).json({
        status: 'failure',
        message: 'User already exists',
      })
    }

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
