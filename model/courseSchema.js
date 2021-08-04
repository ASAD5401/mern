const mongoose= require('mongoose')

const courseSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    enrolledclass:{
        type:String,
        required:true
    },
    courseContent:{
        type:[String],
        required:true
    }
});


const CourseContent=mongoose.model('COURSE',courseSchema)

module.exports = CourseContent;