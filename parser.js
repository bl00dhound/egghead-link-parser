const { curry, __ } = require('ramda')
const parser = require('rss-parser')
const { promisify } = require('util')
const fs = require('fs')
const readFile = promisify(fs.readFile)
const path = require('path')

const parseRSSFile = filePath => readFile(filePath, 'utf8')

module.exports = {
  parseRSSFile,
}