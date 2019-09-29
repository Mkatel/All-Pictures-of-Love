const Sequelize = require('sequelize')
const db = require('../db')

const Picture = db.define('piture', {
  description: {
    type: Sequelize.TEXT
  },
  imageDir: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

module.exports = Picture
