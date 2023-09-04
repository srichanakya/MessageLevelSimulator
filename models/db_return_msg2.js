var mongoose = require("mongoose");

var r_ml2 = new mongoose.Schema({
	name:String,
	roll:String,
	branch:String,
	campus:String,
	date:{type:Date,default:Date.now}
});


module.exports=mongoose.model("db_return_msg2",r_ml2);