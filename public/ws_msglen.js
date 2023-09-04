var socket = io.connect('http://localhost:3000');

// Query DOM
var msg = document.getElementById('sel'),
     
      btn = document.getElementById('send');
    
      

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: msg.value
        
    });
    
});




