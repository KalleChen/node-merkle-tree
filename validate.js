const crypto = require('crypto')
const merkleProof = require('./proof')
const fs = require('fs')

const sha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest()
}

const validate = (txid) => {
  try {
    let data = fs.readFileSync('./merkle_tree')
    data = JSON.parse(data)
    const trees = data.map((d) => d.map((x) => Buffer.from(x)))
    const targetTxid = Buffer.from(txid, 'hex')
    let proof = null
    trees.forEach((tree) => {
      const p = merkleProof(tree, targetTxid)
      if (p) proof = p
    })
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
