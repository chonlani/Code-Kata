/* HTTP JSON API SERVER (Exercise 13 of 13)

  Create a file named http-json-api-server.js.

  Write an HTTP server that serves JSON data when it receives a GET request   
  to the path '/api/parsetime'. Expect the request to contain a query string  
  with a key 'iso' and an ISO-format time as the value.

  For example:

  /api/parsetime?iso=2013-08-10T12:10:15.474Z

  The JSON response should contain only 'hour', 'minute' and 'second'
  properties. For example:

     {
       "hour": 14,
       "minute": 23,
       "second": 15
     }

  Add second endpoint for the path '/api/unixtime' which accepts the same
  query string but returns UNIX epoch time in milliseconds (the number of
  milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.
  For example:

     { "unixtime": 1376136615474 }

  Your server should listen on the port provided by the first argument to
  your program. */

var http = require('http');
var url = require('url');

var portNumber = process.argv[2];

function formatDate(date) {
    return{
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()  
    };
}

function formateUnix(date) {
    return {
        unixtime: date.getTime()
    };
}

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});

    var urlObj = url.parse(req.url, true);

    var route = urlObj.pathname;
    var date = new Date(urlObj.query.iso);

    if (route == '/api/parsetime') {
        var data = formatDate(date);
    } else if (route == '/api/unixtime') {
        var data = formateUnix(date);
    }

    res.end(JSON.stringify(data));
});

server.listen(portNumber);


//Solution
const http = require('http')

function parsetime (time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

function unixtime (time) {
  return { unixtime: time.getTime() }
}

const server = http.createServer(function (req, res) {
  const parsedUrl = new URL(req.url, 'http://example.com')
  const time = new Date(parsedUrl.searchParams.get('iso'))
  let result

  if (/^\/api\/parsetime/.test(req.url)) {
    result = parsetime(time)
  } else if (/^\/api\/unixtime/.test(req.url)) {
    result = unixtime(time)
  }

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))
