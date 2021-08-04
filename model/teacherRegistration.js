const mongoose= require('mongoose')

const teacherSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fathername:{
        type:String,
        required:true
    },
    teacherId:{
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
    instructorOf:{
        type:[String],
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


const Teacher=mongoose.model('TEACHER',teacherSchema)

module.exports = Teacher;