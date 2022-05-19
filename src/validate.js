const crypto = require('crypto')
const merkleProof = require('./proof')
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
      console.log('result: ', false)
      return
    }
    const tree = await MerkleTree.findOne({
      where: { root_hash: rootHash.index },
    })
    if (!tree) {
      console.log('Not found tree')
      console.log('result: ', false)
      return
    }
    let merkleTree = JSON.parse(tree.tree)
    merkleTree = merkleTree.map((t) => Buffer.from(t))
    const targetTxid = Buffer.from(txid, 'hex')
    const proof = merkleProof(merkleTree, targetTxid)
    if (proof === null) {
      console.log('No proof exists!')
      console.log('result: ', false)
    } else {
      console.log('result: ', merkleProof.verify(proof, sha256))
    }
  } catch (e) {
    console.log(e)
    console.log('result: ', false)
  }
}
validate('cafebeef1')
