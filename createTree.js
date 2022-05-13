const crypto = require('crypto')
const merkle = require('./merkle')
const fs = require('fs')

const sha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest()
}

const data = [
  ['cafebeef', 'ffffffff', 'aaaaaaaa', 'bbbbbbbb', 'cccccccc'],
  ['fkdalsfdj', 'fdafd', 'afdfa', 'fdfadfasdfa', 'fdasfefdasf'],
  ['fdfasdfasd', 'fdfadafd', 'fdafdafd', 'fdfasdfadsf', 'fdfadfe'],
].map((d) => d.map((x) => Buffer.from(x, 'hex')))

try {
  const trees = data.map((d) => merkle(d, sha256))
  fs.writeFileSync('./merkle_tree', JSON.stringify(trees))
} catch (e) {
  console.error(e)
}
