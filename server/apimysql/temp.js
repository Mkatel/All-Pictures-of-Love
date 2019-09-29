const router = require('express').Router()
const connection = require('../db/db-mysql')

router.get('/', async (req, res, next) => {
  //connection.connect();
  connection.query('SELECT * FROM Temp', function(error, results, fields) {
    if (error) throw error
    res.send(results)
  })
  //connection.end();
})

module.exports = router
