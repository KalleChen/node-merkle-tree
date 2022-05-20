const crypto = require('crypto')
const merkle = require('./utils/merkle')
const sequelize = require('./database/database')
const MerkleTree = require('./database/MerkleTree')

const sha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest()
}

const createTree = async (data) => {
  if (!Array.isArray(data)) throw new Error('data must be an array')
  const dataBuffer = data.map((x) => Buffer.from(x))
  await sequelize.sync()
  try {
    const tree = merkle(dataBuffer, sha256)
    const root = tree[tree.length - 1].toString('hex')
    const trees = await MerkleTree.findAll()
    console.log(trees.length)
    const treeId = sha256(root + trees.length).toString('hex')
    MerkleTree.create({
      tree: JSON.stringify(tree),
      tree_id: treeId,
    })
    return {
      merkle_tree_id: treeId,
      root: root,
    }
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}

module.exports = createTree
