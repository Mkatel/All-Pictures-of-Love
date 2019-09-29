const router = require('express').Router()
const connection = require('../db/db-mysql')
router.get('/', async (req, res, next) => {
  await connection.query('SELECT * FROM authors order by id', function(
    error,
    results,
    fields
  ) {
    if (error) throw error
    res.send(results)
  })
})

module.exports = router
