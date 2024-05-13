import express from 'express'

const router = express.Router()

router.post('/login', (req, res) => {
  res.status(201).json({
    status: 'success',
  })
})
router.post('/signup', (req, res) => {
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
