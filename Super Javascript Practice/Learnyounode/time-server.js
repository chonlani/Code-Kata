/* Create a file named time-server.js.

  Write a TCP time server!

  Your server should listen to TCP connections on the port provided by the  
  first argument to your program. For each connection you must write the    
  current date & 24 hour time in the format:

     "YYYY-MM-DD hh:mm"

  followed by a newline character. Month, day, hour and minute must be      
  zero-filled to 2 integers. For example:

     "2013-07-06 17:42"

  After sending the string, close the connection. */ 

var net = require('net');

var portNumber = process.argv[2];

function zeroPad(number) {
    if(number < 10) {
        return '0' + number;
    }
    return number;
}
 
var server = net.createServer(function(socket) {
    var date = new Date();

    var year = date.getFullYear();
    var mount = zeroPad(date.getMonth() + 1);
    var day = zeroPad(date.getDate());
    var hour = zeroPad(date.getHours());
    var minute = zeroPad(date.getMinutes());

    var dateString = year + '-' + mount + '-' + day;
    dateString = dateString + ' ' + hour + ':' + minute;

    socket.end(dateString + '\n');
})
   
server.listen(portNumber);

//Solution
const net = require('net')

function zeroFill (i) {
  return (i < 10 ? '0' : '') + i
}

function now () {
  const d = new Date()
  return d.getFullYear() + '-' +
    zeroFill(d.getMonth() + 1) + '-' +
    zeroFill(d.getDate()) + ' ' +
    zeroFill(d.getHours()) + ':' +
    zeroFill(d.getMinutes())
}

const server = net.createServer(function (socket) {
  socket.end(now() + '\n')
})

server.listen(Number(process.argv[2]))
