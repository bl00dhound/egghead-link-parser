const { nth, isNil } = require('ramda')
const { exitWithMessage } = require('./services')
const { parseRSSFile } = require('./parser')
const filePath = nth(2, process.argv)

if (isNil(filePath)) exitWithMessage('Error: enter path to file with list of links.')

parseRSSFile(filePath)
  .then(filename => exitWithMessage(`Success: all links saved to file ${filename}`))
  .catch(err => exitWithMessage(`Error: ${err}`, 1))

