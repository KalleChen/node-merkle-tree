const crypto = require('crypto')
const merkle = require('./merkle')
const fs = require('fs')
const sequelize = require('./database')
const MerkleTree = require('./MerkleTree')

const sha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest()
}

const data = [
  ['cafebeef', 'ffffffff', 'aaaaaaaa', 'bbbbbbbb', 'cccccccc'],
  ['fkdalsfdj', 'fdafd', 'afdfa', 'fdfadfasdfa', 'fdasfefdasf'],
  ['fdfasdfasd', 'fdfadafd', 'fdafdafd', 'fdfasdfadsf', 'fdfadfe'],
].map((d) => d.map((x) => Buffer.from(x, 'hex')))

const createTree = async () => {
  await sequelize.sync()
  try {
    const trees = data.map((d) => merkle(d, sha256))
    trees.forEach((tree) => {
      MerkleTree.create({
        data: JSON.stringify(tree),
      })
    })
    const roots = trees.map((tree) => tree[tree.length - 1])
  } catch (e) {
    console.error(e)
  }
}

createTree()
