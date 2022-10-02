const express = require('express')
const app = express()
const data = require('./data.json')

const PORT = 5000

app.use(express.json())

app.get('/', (req, res) => {
  return res.json({
    message: 'Horror Movies API',
    totalMovies: data.length,
  })
})

//any random
app.get('/random', (req, res) => {
  const numberOfElements = data.length
  const randomNumber = parseInt(Math.random() * numberOfElements)
  return res.json(data[randomNumber])
})

app.listen(PORT, () => {
  console.info('Server has stated', 'http://localhost:' + PORT)
})

module.exports = app
