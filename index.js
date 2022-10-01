const express = require('express');
const app = express();
const PORT = 5000;

const data = require('./data.json');
app.use(express.json());

app.get('/', (req,res)=>{
    return res.json(
        {
            message: "Horror Movies API"
        }
    )
});

//any random
app.get('/random', (req,res)=>{
    const numberOfElements = data.length;
    const randomNumber = parseInt(Math.random()*numberOfElements);
    return res.json(data[randomNumber])
});

//list

app.get('/director/:name', (req, res) => {
  if (!req.params.name) {
    return res.status(400).json({ message: 'missing name' })
  }
  const director = req.params.name.toString()
  const filterData = data.filter(movie => {
    return movie.director.includes(director)
  })
  return res.status(200).json(filterData)
})


app.listen(5000, ()=>{
    console.log("Server has stated");
});

module.exports = app;

