const router = require('express').Router()
const {Author} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const data = await Author.findAll()
    return res.json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
