const mongoose= require('mongoose')

const attendanceSchema=new mongoose.Schema({
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
    attendance:{
        type:Number,
        required:true
    },
    totalAttendance:{
        type:Number,
        required:true
    },
    percentage:{
        type:Number,
        required:true
    },
    
});


const Attendance=mongoose.model('ATTENDANC',attendanceSchema)

module.exports = Attendance;