const router = require('express').Router()
const {Category} = require('../db/models')

// api/pictures/
router.get('/', async (req, res, next) => {
  try {
    const data = await Category.findAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
