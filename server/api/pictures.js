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

router.put('/filterBy', async (req, res, next) => {
  try {
    let data = {}
    if (!req.body.categoryId) {
      data = await Picture.findAll({where: {description: req.body.description}})
    } else {
      data = await Picture.findAll({
        where: {
          description: req.body.description,
          categoryId: req.body.categoryId
        }
      })
    }
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const data = await Picture.create(req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
