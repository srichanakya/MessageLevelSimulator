var mongoose = require("mongoose");

var ml3 = new mongoose.Schema({
	name:String,
	age:String,
	address:String,
	date:{type:Date,default:Date.now}
});


module.exports=mongoose.model("db_ml3",ml3);