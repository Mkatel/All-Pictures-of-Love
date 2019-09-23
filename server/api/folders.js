const router = require('express').Router()
const {Folder} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const data = await Folder.findAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
