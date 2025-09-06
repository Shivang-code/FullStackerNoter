const mongoose=require("mongoose");

const Schema=new  mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
},
dob:{
    type:Date,
    required:true,
}
},{timestamps:true});

const User=mongoose.model("User",Schema);
module.exports=User