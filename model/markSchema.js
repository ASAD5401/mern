const mongoose= require('mongoose')

const markSchema=new mongoose.Schema({
    enrolledclass:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    studentName:{
        type:String,
        required:true
    },
    studentId:{
        type:String,
        required:true
    },
    created_at: {
        type: String,
        required:true
    },    
    marks:{
        type:Number,
        required:true
    },
    totalMarks:{
        type:Number,
        required:true
    },
    percentage:{
        type:Number,
        required:true
    },
    
});


const MARKS=mongoose.model('MARKS',markSchema)

module.exports = MARKS;