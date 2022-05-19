const express = require('express')
const createTree = require('./createTree')

const app = express()
const port = 3000
app.use(express.json())

app.get('/upload', async (req, res, next) => {
  try {
    await createTree(req?.body?.hashes)
    res.send('Success')
  } catch (err) {
    console.error(err)
    next(err)
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
