const { nth, isNil } = require('ramda')
const { exitWithMessage } = require('./services')
const { parseRSSFile } = require('./parser')
const filePath = nth(2, process.argv)

if (isNil(filePath)) exitWithMessage('Error: enter path to file with list of links.')

parseRSSFile(filePath)
  .then(response => exitWithMessage(`\n Success: saved files: 
        ${response}`))
  .catch(err => exitWithMessage(`Error: ${err}`, 1))

