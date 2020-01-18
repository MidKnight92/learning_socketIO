// This is the server side
const io = require('socket.io')(); //notice the second pair of parenthesis this is automatically invoking the io server;

// ALWAYS MOST DO THE CONNECTION
// Listen for new connection from clients(socket)
	// this is a built in message; this code will run whenever a client connects to our server
		// socket is a client (browser)
io.on('connection', (socket) => {
	console.log('Client connected to socket.io');
	// all code goes in here
	socket.on('add-circle', (data) => {
		io.emit('add-circle', data)
	});
	socket.on('clear-circle', () => {
		io.emit('clear-circle');
	})


});

// io represents socket.io on the server
module.exports = io;


// Code Logic
// 1. Listen for add-circle messages being sent from the clients
// 2. When an add-circle message is received, forward (emit) it (along with the data received with the message to begin with)