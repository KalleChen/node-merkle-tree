const crypto = require('crypto')
const merkleProof = require('./utils/proof')
const MerkleTree = require('./database/MerkleTree')

const sha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest()
}

const validate = async (txid, root) => {
  try {
    const tree = await MerkleTree.findOne({
      where: { root_hash: root },
    })
    if (!tree) {
      return false
    }
    let merkleTree = JSON.parse(tree.tree)
    merkleTree = merkleTree.map((t) => Buffer.from(t))
    const targetTxid = Buffer.from(txid)
    const proof = merkleProof(merkleTree, targetTxid)
    if (proof === null) {
      return false
    } else {
      return merkleProof.verify(proof, sha256)
    }
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}

module.exports = validate
