var socket = io.connect('http://localhost:3000');

var name1 = document.getElementById('name'),
roll1 = document.getElementById('roll'),
branch1 = document.getElementById('branch'),
campus1 = document.getElementById('campus'),
btn = document.getElementById('send');

btn.addEventListener('click', function(){
	


    socket.emit('dataReturn', {
        r_name: name1.value,
        r_roll:roll1.value,
        r_branch:branch1.value,
        r_campus:campus1.value
        
    });
})



socket.on('dataTransfer', function(data){

name1.value = data.name;
roll1.value = data.roll;

});