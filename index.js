const MerkleTools = require('merkle-tools')

const treeOptions = {
  hashType: 'sha256',
}

const merkleTools = new MerkleTools(treeOptions)

const hexData =
  '05ae04314577b2783b4be98211d1b72476c59e9c413cfb2afa2f0c68e0d93911'
const otherData = 'Some text data, perhaps'

merkleTools.addLeaf(hexData)
merkleTools.addLeaf(otherData, true)

const hexDatas = [
  '05ae04314577b2783b4be98211d1b72476c59e9c413cfb2afa2f0c68e0d93913',
  'c5ed1192d909d1af814f64c7dc9e6a4983a63891a2c59ed14448d90271cb5519',
  '4bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f877',
]
const otherDatas = ['l', 'm', 'n', 'o', 'p']

merkleTools.addLeaves(hexDatas)
merkleTools.addLeaves(otherDatas, true)

console.log('Leaf count: ', merkleTools.getLeafCount())

// build tree
const doubleHash = false
merkleTools.makeTree(doubleHash)

const rootValue = merkleTools.getMerkleRoot()

console.log('root value: ', rootValue)

// Start proof process

const proof = merkleTools.getProof(2)
console.log('Proof: ', proof)

let targetHash = hexDatas[0]

let isValid = merkleTools.validateProof(proof, targetHash, rootValue)

console.log('leaf 2 is valid: ', isValid)

targetHash = targetHash.replace('0', '1')

isValid = merkleTools.validateProof(proof, targetHash, rootValue)

console.log('modified leaf 2 is valid: ', isValid)
