const { last, split, tap, compose, ifElse } = require('ramda')
const fs = require('fs')
const { promisify } = require('util')
const mkdir = promisify(fs.mkdir)

const log = (message, CODE = 0) => {
  console.log(`****** ${message}`)
  return CODE
}

const infoMessage = (operation, dirName) => {
  const folderName = compose(last, split('/'))(dirName)
  console.log(`****** Log: Folder '${folderName}' is ${operation}.`)
  return Promise.resolve([operation, dirName])
}

const exitWithMessage = compose(process.exit, log)

const createFolderIfExist = ifElse(
  (dir) => fs.existsSync(dir),
  (dir, data) => Promise.resolve([dir, data])
    .then(tap(() => infoMessage('existed', dir))),
  (dir, data) => mkdir(dir)
    .then(() => tap(infoMessage('created', dir)))
    .then(() => [dir, data])
)

module.exports = {
  log,
  exitWithMessage,
  createFolderIfExist,
}