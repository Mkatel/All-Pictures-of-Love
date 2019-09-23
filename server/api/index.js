const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/pictures', require('./pictures'))
router.use('/categories', require('./categories'))
router.use('/authors', require('./authors'))
router.use('/folders', require('./folders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
