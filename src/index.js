const express = require('express')
const createTree = require('./createTree')
const validate = require('./validate')

const app = express()
const port = 3000
app.use(express.json())

app.post('/upload', async (req, res, next) => {
  try {
    const root = await createTree(req?.body?.hashes)
    res.json({ merkle_tree_id: root })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

app.get('/validate', async (req, res, next) => {
  try {
    const { merkle_tree_id, hash } = req.body
    const result = await validate(hash, merkle_tree_id)
    res.json({ validation_result: result })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
