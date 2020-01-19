// This is the server side
const io = require('socket.io')(); //notice the second pair of parenthesis this is automatically invoking the io server;

// object to hold player's initials as keys
const players = {}; 

// ALWAYS MOST DO THE CONNECTION
// Listen for new connection from clients(socket)
	// this is a built in message; this code will run whenever a client connects to our server
		// socket is a client (browser)
io.on('connection', (socket) => {
	console.log('Client connected to socket.io');
	// all code goes in here
	socket.on('add-circle', (data) => {
		io.emit('add-circle', data);
	});

	socket.on('register-player', (initials) => {
		// each socket has unique id
		players[socket.id] = initials;
		io.emit('update-player-list', Object.values(players));
	});

	socket.on('disconnect', () => {
		delete players[socket.id];
		io.emit('update-player-list', Object.values(players));
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


// Track Players - Server Code Logic

// When a client connects, set up a listener for a register-player message from that client. The client will send their initials as data with the message.

// When a client emits the register-player message, the server will:
// (a) Add the player's socket.id and initials to a players object variable.
// (b) Then we will then emit an update-player-list message, along with the updated list of initials, as an array, to all clients.

// When a client disconnects, we will remove the player from the players object and again, emit the update-player-list message.