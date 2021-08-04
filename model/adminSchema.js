const mongoose= require('mongoose')

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fathername:{
        type:String,
        required:true
    },
    adminId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
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


const Admin=mongoose.model('ADMIN',adminSchema)

module.exports = Admin;