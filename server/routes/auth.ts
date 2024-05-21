import express from 'express'
import UserModel from '../models/User'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../constants'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { nickname, password } = req.body

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

    const updated = await UserModel.findOneAndUpdate(
      { nickname },
      { sessions: [...user.sessions, { createdAt: new Date() }] },
      { new: true }
    )

    return res.status(201).json({
      status: 'success',
      data: updated,
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

    bcrypt.hash(password, SALT_ROUNDS, async (_, hash) => {
      const user = new UserModel({
        nickname,
        password: hash,
        email,
        sessions: [
          {
            createdAt: new Date(),
          },
        ],
      })
      await user.save()

      return res.status(201).json({
        status: 'success',
        sessionId: user.sessions[0]._id,
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
