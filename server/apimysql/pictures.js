const router = require('express').Router()
const connection = require('../db/db-mysql')

router.get('/', async (req, res, next) => {
  await connection.query('SELECT * FROM pictures order by id', function(
    error,
    results,
    fields
  ) {
    if (error) throw error
    res.send(results)
  })
})

router.get('/filterBy/:filter', async (req, res, next) => {
  // select from view: for the search by description.
  const filter = req.params.filter
  let sql = ''
  if (filter.includes('where')) {
    console.log(filter)
    sql = `SELECT * FROM view_allpictures_bydesc`
  } else {
    const filterBy = ` where description like '%${filter}%' ;`
    sql = `SELECT * FROM view_allpictures_bydesc ${filterBy} `
  }
  await connection.query(sql, function(error, results, fields) {
    if (error) throw error
    res.send(results)
  })
})

router.post('/', async (req, res, next) => {
  // insert single picture
  let sql = ` CALL insert_piture('${req.body.description}', '${
    req.body.imageDir
  }', ${req.body.author_id}, ${req.body.album_id}, ${req.body.category_id}); `
  await connection.query(sql, function(error, results, fields) {
    if (error) throw error
    console.log(results)
    res.send(results)
  })
})

router.delete('/:id', async (req, res, next) => {
  if (!req.params.id) {
    res.sendStatus(404)
  }
  connection.query(`DELETE FROM pictures where id = ${req.params.id}`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error
    res.send('Picture deleted. ')
  })
})

module.exports = router
