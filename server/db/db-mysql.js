const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  //password: "Ke1993mysql$",
  password: 'YourRootPassword',
  database: 'PictureOfLoves-test'
  //insecureAuth : true
})

module.exports = connection
