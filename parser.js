const { addIndex, last, pluck, pathOr, curry, compose, composeP, split, map, reject, isEmpty,
        prop, tap, nth, concat, __ } = require('ramda')
const axios = require('axios')
const parser = require('rss-parser')
const { promisify } = require('util')
const path = require('path')
const fs = require('fs')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const parseString = promisify(parser.parseString)
const mapIndexed = addIndex(map)

const { createFolderIfExist } = require('./services')

const createFolderForVideos = curry((filePath, data) => {
  const { dir } = path.parse(filePath)
  const destinationDir = `${dir}/${pathOr('Unnamed', ['feed', 'title'], data)}`
  return createFolderIfExist(destinationDir, data)
})

const writeListInFileToDestinationFolder = ([destinationDir, data]) =>
  writeFile(`${destinationDir}/links.json`, JSON.stringify(data), 'utf8')

const parseFeed = ([destinationDir, feed]) => {
  const links = compose(map(prop('url')), pluck('enclosure'), pathOr([], ['feed', 'entries']))(feed)
  return [destinationDir, links]
}

const getRSS = link =>
  axios.get(link)
    .then(compose(parseString, prop('data')))

const getFile = curry((destinationDir, link, idx) =>
  axios.request({
    url: link,
    method: 'get',
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'image/gif',
    }
  })
    .then(prop('data'))
    .then(fileData => {
      const formattedIdx = idx > 8 ? `${idx + 1}-` : `0${idx + 1}-`
      const courseDir = compose(concat(__, '/'), last, split('/'))(destinationDir)
      const fileName = compose(concat(__, '.mp4'), concat(formattedIdx), nth(4), split('/'))(link)
      console.log(`****** ${fileName} is downloaded.`)
      return writeFile(`${destinationDir}/${fileName}`, fileData)
        .then(() => {
          console.log(`      ${concat(courseDir, fileName)} is saved.`)
          return '\n' + fileName
        })
        .catch(err => {
          console.log(`      ${concat(courseDir, fileName)} isn't saved.`)
          return 'fault'
        })
    })
    // .then(fileData => writeFile(`${destinationDir}/${toString(Date.now())}`, fileData))
    // .catch(err => {
    //   console.error(err)
    //   return true
    // })
)

const getFilesFromEgghead = ([destinationDir, links]) =>
  Promise.all(mapIndexed(getFile(destinationDir))(links))


const parseRSSFile = filePath =>
  readFile(filePath, 'utf8')
    .then(compose(reject(isEmpty), split(/\n/)))
    .then(links => Promise.all(map(composeP(
      getFilesFromEgghead,
      tap(writeListInFileToDestinationFolder),
      parseFeed,
      createFolderForVideos(filePath),
      getRSS
    ))(links)))
    // .then(map(parseFeed))

module.exports = {
  parseRSSFile,
}