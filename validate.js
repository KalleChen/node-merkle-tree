const crypto = require('crypto')
const merkleProof = require('./proof')
const fs = require('fs')
const TreeMap = require('./TreeMap')
const MerkleTree = require('./MerkleTree')

const sha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest()
}

const validate = async (txid) => {
  try {
    const rootHash = await TreeMap.findOne({ where: { txid: txid } })
    if (!rootHash) {
      console.log('Not found this txis')
      return
    }
    const tree = await MerkleTree.findOne({
      where: { root_hash: rootHash.index },
    })
    if (!tree) {
      console.log('Not found tree')
      return
    }
    const merkleTree = JSON.parse(tree.tree)
    const targetTxid = Buffer.from(txid, 'hex')
    const proof = merkleProof(merkleTree, targetTxid)
    if (proof === null) {
      console.log('No proof exists!')
    } else {
      return merkleProof.verify(proof, sha256)
    }
  } catch (e) {
    console.log(e)
  }
}
console.log(validate('fdfadfe'))
