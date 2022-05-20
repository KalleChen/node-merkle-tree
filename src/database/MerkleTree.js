const { Model, DataTypes } = require('sequelize')
const sequelize = require('./database')

class MerkleTree extends Model {}

MerkleTree.init(
  {
    tree: {
      type: DataTypes.STRING,
    },
    tree_id: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'merkle_tree',
  }
)

module.exports = MerkleTree
