const router = require('express').Router()

router.use('/pictures', require('./pictures'))
router.use('/authors', require('./authors'))
router.use('/categories', require('./categories'))
router.use('/albums', require('./albums'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
