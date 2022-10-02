#!/usr/bin/env node

var readline = require('readline')
const { randomUUID } = require('crypto')
const movies = require('../data.json')

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('1/4: Enter the movie name: ', function (name) {
  const lowercaseName = name.toLowerCase()
  const duplicates = movies.filter((item) => {
    return lowercaseName === `${item.name}`.toLowerCase()
  })

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

    if (duplicatesInSameYear.length > 0) {
      console.error('Sorry, this movie has been added already. Try again. ')
      console.error(duplicatesInSameYear[0])
      rl.close()
      return
    }

    rl.question("3/4: Who's the director? ", function (director) {
      console.log(director)

      rl.question('4/4: Language? ', function (language) {
        console.log({ id: randomUUID(), movieName, year, director, language })
        // Add move it data.json.

        rl.close()
      })
    })
  })
})
