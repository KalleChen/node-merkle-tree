const express = require('express')
const createTree = require('./createTree')
const validate = require('./validate')

const app = express()
const port = 3000
app.use(express.json())

app.post('/upload', async (req, res, next) => {
  try {
    const result = await createTree(req?.body?.hashes)
    res.json(result)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

app.get('/validate', async (req, res, next) => {
  try {
    const { merkle_tree_id, hash } = req.query
    const result = await validate(hash, merkle_tree_id)
    res.json({ validation_result: result })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
