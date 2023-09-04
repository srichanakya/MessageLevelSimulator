var express = require('express');
var app = express();
var socket = require('socket.io');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
// App setup

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/BlogApp",{ useNewUrlParser: true });


var ml2 = require("./models/db_ml2");
var ml3 = require("./models/db_ml3");
var r_ml2 = require("./models/db_return_msg2");


var server = app.listen(3000, function(){
    console.log('listening for requests on port 3000,');
});

// Static files
app.use(express.static('public'));

app.get('/',function(req,res)
{
	res.render("select.ejs");
});
app.get('/home',function(req,res){
	if(req.query.sel==1)
	{
		res.redirect('/system1');
	}
	else
	{
		res.redirect('/system2');
	}
});

// system 1 routes
app.get('/system1',function(req,res)
{
	res.render("msglen.ejs");
});

app.get('/system1/msglen',function(req,res)
{
if(req.query.sel == 2)
{
	res.redirect('/system1/msglen2');
}
else
{
	res.render("msglen3.ejs");
}
});

app.get('/system1/msglen2',function(req,res)
{
	res.render("msglen2.ejs");
});
app.post('/system1/msglen2',function(req,res)
{
	var newData = new ml2({
		name:req.body.name,
		roll:req.body.roll
	});

		ml2.create(newData,function(err,newdata)
		{
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log("......."+newdata);
			res.redirect('/system1/display2');
		
		}
	})
});

// app.get('/display',function(req,res)
// {
// 	ml2.find({},function(err,all)
// 	{
// 		console.log(all);
// 		res.render("display.ejs",{alldata:all});
// 	})
// })

app.post('/system1/msglen3',function(req,res)
{
	var newData = new ml3({
		name:req.body.name,
		age:req.body.age,
		address:req.body.address
	});
	ml3.create(newData,function(err,newdata)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(newdata);
		}
	})
});

app.get('/system1/display2',function(req,res)
{
	res.render("display2.ejs");
if(req.query.name!=undefined)
{

var newData = new r_ml2({
	name:req.query.name,
	roll:req.query.roll,
	branch:req.query.branch,
	campus:req.query.campus
});
r_ml2.create(newData,function(err,newdata)
{
	if(err)
	{
		console.log(err);
	}
	else{
		console.log(newdata);
	}
});

}
});

app.get('/system1/result',function(req,res)
{
	r_ml2.find({},function(err,result)
	{
		res.render("result.ejs",{result:result});
	})
})


app.get('/system1/msglen3',function(req,res)
{
	res.render("msglen3.ejs");
})

// system 2 routes
app.get('/system2',function(req,res)
{
	res.render("second.ejs");
});

app.get('/system2/msglen2',function(req,res)
{
	console.log(req.query.msglen);
	res.render("secondmsglen2.ejs");
});

app.get('/system2/transfer',function(req,res)
{
	res.render("success.ejs");
})




// websocket part

var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('dataTransfer',function(data1)
    {
        console.log(data1);
        io.sockets.emit('dataTransfer',data1);
    })

    socket.on('dataReturn',function(data2)
    {
    	console.log(data2);
    	io.sockets.emit('dataReturn',data2);
    })
    // Handle typing event
    

});

