const { Model, DataTypes } = require('sequelize')
const sequelize = require('./database')

class TreeMap extends Model {}

TreeMap.init(
  {
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
