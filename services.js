const { compose, tap } = require('ramda')

const log = (message, CODE = 0) => {
  console.log(`****** ${message} ******`)
  return CODE
}

const exitWithMessage = compose(process.exit, log)

module.exports = {
  log,
  exitWithMessage,
}