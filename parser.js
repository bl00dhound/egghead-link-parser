const { compose, split, tap, map, reject, isEmpty, prop } = require('ramda')
const axios = require('axios')
const parser = require('rss-parser')
const { promisify } = require('util')
const fs = require('fs')
const readFile = promisify(fs.readFile)
const parseString = promisify(parser.parseString)

const getRSS = link =>
  axios.get(link)
    .then(compose(parseString, prop('data')))

const parseRSSFile = filePath =>
  readFile(filePath, 'utf8')
    .then(compose(reject(isEmpty), split(/\n/)))
    .then(links => Promise.all(map(getRSS, links)))
    .then(tap(console.log))

module.exports = {
  parseRSSFile,
}