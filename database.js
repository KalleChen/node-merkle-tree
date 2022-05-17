const { Sequelize } = require('sequelize')

const sequlize = new Sequelize('test-db', 'user', 'pass', {
  dialect: 'sqlite',
  host: './dev.sqlite',
})

module.exports = sequlize
