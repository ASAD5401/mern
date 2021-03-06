const mongoose= require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fathername:{
        type:String,
        required:true
    },
    rollno:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    enrolledclass:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});


const User=mongoose.model('USER',userSchema)

module.exports = User;