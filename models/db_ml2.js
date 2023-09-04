var mongoose = require("mongoose");

var ml2 = new mongoose.Schema({
	name:String,
	roll:String,
	date:{type:Date,default:Date.now}
});


module.exports=mongoose.model("db_ml2",ml2);