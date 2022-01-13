const mongoose = require("mongoose");
const validator=require("validator");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
         minLength:[3, "Mini lenth 3"],
    },
    email:{
        type:String,
       required:true,
       validate(value) 
    {
      if (!validator.isEmail(value)) 
      {
        throw new Error("email is invalid");
      }
    },
    },
    phone:{
        type:String,
   required:true,
        min:10
    },
    subject:{
        type:String,
        required:true,
         minLength:[3, "Mini lenth 3"],
    }
})
const User=new mongoose.model("User",userSchema);
module.exports=User;