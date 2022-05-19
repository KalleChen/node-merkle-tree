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
    const findTree = await MerkleTree.findOne({
      where: { root_hash: root },
    })
    if (findTree) {
      throw new Error('tree already exists')
    }
    MerkleTree.create({
      tree: JSON.stringify(tree),
      root_hash: root,
    })
    return root
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}

module.exports = createTree
