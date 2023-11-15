import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Funfou, pae!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
