const Sequelize = require('sequelize')
const db = require('../db')

const Folder = db.define('folder', {
  folder: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Folder
