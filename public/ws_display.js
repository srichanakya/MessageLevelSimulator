var socket = io.connect('http://localhost:3000');

var name1 = document.getElementById('name'),
roll1 = document.getElementById('roll'),
branch1 = document.getElementById('branch'),
campus1 = document.getElementById('campus'),
btn = document.getElementById('send');


socket.on('dataReturn', function(data2){

name1.value = data2.r_name;
roll1.value = data2.r_roll;
branch1.value=data2.r_branch;
campus1.value=data2.r_campus;

});