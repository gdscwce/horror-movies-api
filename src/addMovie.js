#!/usr/bin/env node

var readline = require('readline')
const { randomUUID } = require('crypto')
const fs = require('fs')

const movies = require('../data.json')

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log('#### 🧟🔪🩸💀 ####')
console.log('Hello! ')
console.log('Thank you for helping us build a database of HORROR movies.')
console.log(
  'Use this tool to enter the Name, Year, Director and Language of the film.'
)
console.log('#### 🧟🔪🩸💀 ####')

rl.question('1/4: Movie name? ', function (name) {
  const lowercaseName = name.toLowerCase()
  const duplicates = movies.filter((item) => {
    return lowercaseName === `${item.name}`.toLowerCase()
  })

  // Warn user if there are duplicates.
  // Could be a remake of an old movie from a different year,
  // So don't close yet.
  if (duplicates.length > 0) {
    console.warn('Warning: someone may already have submitted ' + name, {
      duplicates,
    })
  }

  rl.question('2/4: Year released? (eg. 2022): ', function (yearReleased) {
    console.log(yearReleased)
    const duplicatesInSameYear = duplicates.filter((item) => {
      const yearReleasedStr = `${item.yearRealeased}`
      const itemYearStr = `${item.yearRealeased}`
      return yearReleasedStr === itemYearStr
    })

    // Don't let the user add a movie with the same name in the same year.
    if (duplicatesInSameYear.length > 0) {
      console.error('Sorry, this movie has been added already. Try again. ')
      console.error(duplicatesInSameYear[0])
      rl.close()
      return
    }

    rl.question("3/4: Who's the director? ", function (director) {
      console.log(director)

      rl.question('4/4: Language? ', function (language) {
        const newMovie = {
          id: randomUUID(),
          name,
          // year should be string, for consistency.
          yearReleased: `${yearReleased}`,
          director,
          language,
        }
        const newMovies = JSON.stringify([...movies, newMovie], null, 2)

        fs.writeFile('./data.json', newMovies, (err) => {
          if (err) {
            console.error('We tried, but the file could not be updatred')
            console.error(e?.message)
          } else {
            console.info(`Thanks! ${name} was added to the database.`)
            console.info(newMovie)
            console.error('Now please create a PR to merge your contribution!.')
          }
          rl.close()
        })
      })
    })
  })
})
