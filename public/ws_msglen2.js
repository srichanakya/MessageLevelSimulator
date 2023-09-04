var socket = io.connect('http://localhost:3000');

var name1 = document.getElementById('name'),
roll = document.getElementById('roll'),
btn = document.getElementById('send');




btn.addEventListener('click', function(){
	
    socket.emit('dataTransfer', {
        name: name1.value,
        roll:roll.value
        
    });
    
});