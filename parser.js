const { pluck, pathOr, curry, compose, composeP, split, map, reject, isEmpty, prop } = require('ramda')
const axios = require('axios')
const parser = require('rss-parser')
const { promisify } = require('util')
const path = require('path')
const fs = require('fs')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const parseString = promisify(parser.parseString)

const { createFolderIfExist } = require('./services')

const createFolderForVideos = curry((filePath, data) => {
  const { dir } = path.parse(filePath)
  const destinationDir = `${dir}/${pathOr('Unnamed', ['feed', 'title'], data)}`
  return createFolderIfExist(destinationDir, data)
})

const writeDataToDestinationFolder = ([destinationDir, data]) =>
  writeFile(`${destinationDir}/links.json`, JSON.stringify(data), 'utf8')

const parseFeed = ([destinationDir, feed]) => {
  const links = compose(map(prop('url')), pluck('enclosure'), pathOr([], ['feed', 'entries']))(feed)
  return [destinationDir, links]
}

const getRSS = link =>
  axios.get(link)
    .then(compose(parseString, prop('data')))

const parseRSSFile = filePath =>
  readFile(filePath, 'utf8')
    .then(compose(reject(isEmpty), split(/\n/)))
    .then(links => Promise.all(map(composeP(writeDataToDestinationFolder, parseFeed, createFolderForVideos(filePath), getRSS))(links)))
    // .then(map(parseFeed))

module.exports = {
  parseRSSFile,
}