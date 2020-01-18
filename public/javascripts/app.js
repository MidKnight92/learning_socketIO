// The client
let socket = io();

socket.on('add-circle', (data) => {
  console.log(data);
  addCircle(data);
});

socket.on('clear-circle', () => {
  circles.innerHTML = '';
});

var circles = document.getElementById('circles');
var initials = '';

circles.addEventListener('click', function(evt) {
  socket.emit('add-circle', {
    initials,
    x: evt.clientX,
    y: evt.clientY,
    dia: randomBetween(10, 125),
    rgba: getRandomRGBA()
  });
});

document.getElementsByTagName('button')[0].addEventListener('click', function() {
  socket.emit('clear-circle');
});

do {
  initials = getInitials();
} while (initials.length < 2 || initials.length > 3);

function getInitials() {
  var input = prompt("Please enter your initials");
  return input ? input.toUpperCase() : '';
}

function addCircle({x, y, dia, rgba, initials}) {
  var el = document.createElement('div');
  el.style.left = x - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.top = y - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.width = el.style.height = dia + 'px';
  el.style.backgroundColor = rgba;
  el.style.fontSize = Math.floor(dia / 3) + 'px';
  el.style.color = 'white';
  el.style.textAlign = 'center';
  el.style.lineHeight = dia + 'px';
  el.innerHTML = initials;
  circles.appendChild(el);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRGBA() {
  return ['rgba(', randomBetween(0, 255), ',', randomBetween(0, 255), ',',
    randomBetween(0, 255), ',', randomBetween(2, 10) / 10, ')'].join('');
}



// Code Logic
// 1. Listen for add-circle messages from the server
// 2. When the add-circle message is recived, it will contain data object with the properties necessary to the existing addCircle() that creates circles
// 3. in the existing click handles, emit the add-circle message to the server, passing along an object containing initials, x,y, dia and rgba properties