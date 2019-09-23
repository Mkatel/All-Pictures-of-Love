const router = require('express').Router()
const {Picture} = require('../db/models')

// api/pictures/
router.get('/', async (req, res, next) => {
  try {
    const data = await Picture.findAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
