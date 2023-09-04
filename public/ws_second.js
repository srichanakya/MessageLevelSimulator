var socket = io.connect('http://localhost:3000');




var msg = document.getElementById('msglen'),
btn = document.getElementById('send');




socket.on('chat', function(data){

msg.value = data.message;

});

