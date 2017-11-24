const { compose, tap } = require('ramda')

const log = message => console.log(`****** ${message} ******`)

const exitWithMessage = compose(process.exit, log)

module.exports = {
  log,
  exitWithMessage,
}