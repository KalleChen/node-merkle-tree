const { Model, DataTypes } = require('sequelize')
const sequelize = require('./database')

class MerkleTree extends Model {}

MerkleTree.init(
  {
    tree: {
      type: DataTypes.STRING,
    },
    root_hash: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'merkle_tree',
  }
)

module.exports = MerkleTree
