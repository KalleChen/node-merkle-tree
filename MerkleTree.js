const { Model, DataTypes } = require('sequelize')
const sequelize = require('./database')

class MerkleTree extends Model {}

MerkleTree.init(
  {
    data: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'merkle_tree',
  }
)

module.exports = MerkleTree
