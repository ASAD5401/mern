const mongoose= require('mongoose')

const tableSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:true
    },
    starttime:{
        type:String,
        required:true
    },
    endtime:{
        type:String,
        required:true
    },
    enrolledclass:{
        type:String,
        required:true
    }
});


const TimeTable=mongoose.model('TIMETABLE',tableSchema)

module.exports = TimeTable;