const Sequelize = require('sequelize')
const db = require('../db')

const Picture = db.define('piture', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
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
