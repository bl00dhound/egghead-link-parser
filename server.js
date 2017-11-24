const http = require('http')

http.createServer((request, response) => {
  request.pipe(response)
}).listen(80, '127.0.0.1')

console.log('Listening on port 80...')
