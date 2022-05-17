const { Model, DataTypes } = require('sequelize')
const sequelize = require('./database')

class TreeMap extends Model {}

TreeMap.init(
  {
    txid: {
      type: DataTypes.STRING,
    },
    index: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'tree_map',
  }
)

module.exports = TreeMap
