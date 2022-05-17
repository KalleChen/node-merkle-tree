const crypto = require('crypto')
const merkle = require('./merkle')
const fs = require('fs')
const sequelize = require('./database')
const MerkleTree = require('./MerkleTree')
const TreeMap = require('./TreeMap')

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
    const roots = trees.map((tree) => tree[tree.length - 1].toString('hex'))
    trees.forEach((tree, index) => {
      MerkleTree.create({
        tree: JSON.stringify(tree),
        root_hash: roots[index],
      })
    })
    data.forEach((d, index) => {
      const root = roots[index]
      d.forEach((x) => {
        TreeMap.create({
          txid: x,
          index: root,
        })
      })
    })
    fs.writeFileSync('./roots', JSON.stringify(roots))
  } catch (e) {
    console.error(e)
  }
}

createTree()
