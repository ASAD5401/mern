const express = require('express')
const router = express.Router();


require('../db/conn')


//REGISTRATION OF STUDENT
const User = require('../model/userSchema')
const Teacher=require('../model/teacherRegistration')
const Admin=require('../model/adminSchema')
router.post('/register-admin', async (req, res) => {

    const { name, fathername, adminId, email, phone, password, cpassword } = req.body;
    if (!name || !fathername || !adminId || !email || !phone || !password || !cpassword) {
        return (res.status(422).json({ error: "Plz filled all the required fields" }))
    }

    try {
        const userExist = await Admin.findOne({ adminId: adminId })
        if (userExist) {
            return res.status(422).json({ error: "Admin already exsists" })
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password Doesn't Match" })

        } else {
            const user = new Admin({ name, fathername,adminId, email, phone,password, cpassword })
            //yahan pe hum hashing kar rahe hain schema mn or osmn next laga wa ha jiske waja se age save hoga data
            const userRegister = await user.save()
            if (userRegister) {
                res.status(201).json({ message: "Admin registered succesfully" })
            } else {
                res.status(500).json({ error: "Failed to register" })
            }

        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/register-teacher', async (req, res) => {

    const { name, fathername, teacherId, email, phone, instructorOf, password, cpassword } = req.body;
    if (!name || !fathername || !teacherId || !email || !phone || !instructorOf || !password || !cpassword) {
        return (res.status(422).json({ error: "Plz filled all the required fields" }))
    }

    try {
        const userExist = await Teacher.findOne({ teacherId: teacherId })
        if (userExist) {
            return res.status(422).json({ error: "Teacher already exsists" })
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password Doesn't Match" })

        } else {
            const user = new Teacher({ name, fathername,teacherId, email, phone, instructorOf, password, cpassword })
            //yahan pe hum hashing kar rahe hain schema mn or osmn next laga wa ha jiske waja se age save hoga data
            const userRegister = await user.save()
            if (userRegister) {
                res.status(201).json({ message: "Teacher registered succesfully" })
            } else {
                res.status(500).json({ error: "Failed to register" })
            }

        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/register', async (req, res) => {

    const { name, fathername, rollno, email, phone, enrolledclass, password, cpassword } = req.body;
    if (!name || !fathername || !rollno || !email || !phone || !enrolledclass || !password || !cpassword) {
        return (res.status(422).json({ error: "Plz filled all the required fields" }))
    }

    try {
        const userExist = await User.findOne({ rollno: rollno })
        if (userExist) {
            return res.status(422).json({ error: "student already exsists" })
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password Doesn't Match" })

        } else {
            const user = new User({ name, fathername, rollno, email, phone, enrolledclass, password, cpassword })
            //yahan pe hum hashing kar rahe hain schema mn or osmn next laga wa ha jiske waja se age save hoga data
            const userRegister = await user.save()
            if (userRegister) {
                res.status(201).json({ message: "student registered succesfully" })
            } else {
                res.status(500).json({ error: "Failed to register" })
            }

        }
    } catch (err) {
        console.log(err)
    }
})


//course content
const CourseCont = require('../model/courseSchema')
router.post('/course', async (req, res) => {

    const { subject,enrolledclass,courseContent } = req.body;
    if ( !subject || !enrolledclass || !courseContent ) {
        return (res.status(422).json({ error: "Plz filled all the required fields" }))
    }

    try {
            const table = new CourseCont({ subject,enrolledclass,courseContent })
            //yahan pe hum hashing kar rahe hain schema mn or osmn next laga wa ha jiske waja se age save hoga data
            const tableRegister = await table.save()
            if (tableRegister) {
                res.status(201).json({ message: "Table registered succesfully" })
            } else {
                res.status(500).json({ error: "Failed to register" })
            }

        
    } catch (err) {
        console.log(err)
    }
})





//post data in timetable schema
const TimeTable = require('../model/tableSchema')
router.post('/timetable', async (req, res) => {
    const { subject, day, starttime, endtime,enrolledclass } = req.body;
    console.log(req.body)
    if (!subject || !day || !starttime || !endtime || !enrolledclass) {
        return (res.status(422).json({ error: "Plz filled all the required fields" }))
    }
    try {
        const table = new TimeTable({ subject, day, starttime, endtime,enrolledclass })
        //yahan pe hum hashing kar rahe hain schema mn or osmn next laga wa ha jiske waja se age save hoga data
        const tableRegister = await table.save()
        if (tableRegister) {
            res.status(201).json({ message: "Table registered succesfully" })
        } else {
            res.status(500).json({ error: "Failed to register" })
        }
    } catch (error) {
        console.log(error)
    }
})


//get data from TIME table
router.get('/timetable', async (req, res) => {
    try {
        const table = await TimeTable.find()
        res.json(table)

    } catch (error) {
        console.log(error)
    }
})
//GET subjects STUDENT WITH Enrolledclass
router.get('/course/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const table = await TimeTable.find({ "enrolledclass":id })
        res.json(table)

    } catch (error) {
        console.log(error)
    }
})

// GET ALL STUDENTS LIST
router.get('/students', async (req, res) => {
    try {
        const table = await User.find()
        res.json(table)

    } catch (error) {
        console.log(error)
    }
})

//GET SPECIFIC STUDENT WITH EMIAL
router.get('/student/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const table = await User.find({ "email":id })
        res.json(table)

    } catch (error) {
        console.log(error)
    }
})
//GET SPECIFIC ADMIN WITH EMIAL
router.get('/admin/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const table = await Admin.find({ "email":id })
        res.json(table)

    } catch (error) {
        console.log(error)
    }
})

//GET SPECIFIC Teacher WITH EMIAL
router.get('/teacher/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const table = await Teacher.find({ "email":id })
        res.json(table)

    } catch (error) {
        console.log(error)
    }
})

//GET SPECIFIC STUDENT WITH enrolled class
router.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const table = await User.find({ "enrolledclass":id })
        res.json(table)

    } catch (error) {
        console.log(error)
    }
})
 //GET COURSE CONTENT OF SPECIFIC FIELD
 router.get('/courses/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const table = await CourseCont.find({ "enrolledclass":id })
        res.json(table)

    } catch (error) {
        console.log(error)
    }
})



//change password
router.put('/student/:id', async (req, res) => {
    
    const id = req.params.id;
    console.log(id)
    const { name, fathername, rollno, email, phone, enrolledclass, password, cpassword } = req.body;

    try {
        const table = await User.findByIdAndUpdate(id,{ name, fathername, rollno, email, phone, enrolledclass, password, cpassword })

        res.json(table)
        console.log(table)

    } catch (error) {
        console.log(error)
    }
})




// FIND ATTENDANCE OF SPECIFIC STUDENT
router.get('/attendance/:id/:student', async (req, res) => {
    const id = req.params.id;
    const studentName=req.params.student;
    try {
        const table = await Attendance.find({$and:[{"enrolledclass":id},{"studentName":studentName}]  })
        console.log(table)
        res.json(table)

    } catch (error) {
        console.log(error)
    }
})

// FIND MARKS OF SPECIFIC STUDENT
const Marks = require('../model/markSchema');

router.get('/mark/:id/:student', async (req, res) => {
    const id = req.params.id;
    const studentName=req.params.student;
    try {
        const table = await Marks.find({$and:[{"enrolledclass":id},{"studentName":studentName}]  })
        console.log(table)
        res.json(table)

    } catch (error) {
        console.log(error)
    }
})



//FIND ALL TIME TABLES WHERE ENROLLEDCLASS MATCHES
router.get('/timetable/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const table = await TimeTable.find({ "enrolledclass":id })
        res.json(table)
        console.log(table)

    } catch (error) {
        console.log(error)
    }
})


//FIND ALL TIME TABLES WHERE subject MATCHES
router.get('/timetable_subject/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const table = await TimeTable.find({ "subject":id })
        res.json(table)
        console.log(table)

    } catch (error) {
        console.log(error)
    }
})
//FIND ALL ATTENDANCE WHERE subject MATCHES
router.get('/attendance_subject/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const table = await Attendance.find({ "subject":id })
        res.json(table)
        console.log(table)

    } catch (error) {
        console.log(error)
    }
})
//FIND ALL MARKS WHERE subject MATCHES
router.get('/mark_subject/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const table = await Marks.find({ "subject":id })
        res.json(table)
        console.log(table)

    } catch (error) {
        console.log(error)
    }
})
//FIND ALL Course Content WHERE subject MATCHES
router.get('/course_subject/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const table = await CourseCont.find({ "subject":id })
        res.json(table)
        console.log(table)

    } catch (error) {
        console.log(error)
    }
})


//update data in timetable
router.put('/timetable/:id', async (req, res) => {
    const id = req.params.id;
    const { subject, day, starttime, endtime,enrolledclass } = req.body;
    try {
        const table = await TimeTable.findByIdAndUpdate(id, { subject, day, starttime, endtime,enrolledclass })
        res.json(table)

    } catch (error) {
        console.log(error)
    }
})

//delete data from TIME table WHERE ID MATCHES
router.delete('/timetable/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const table = await TimeTable.findByIdAndDelete(id)
    } catch (error) {
        console.log(error)
    }
})



//signin VALIDATION
const bcrypt = require('bcryptjs')
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "Plz Filled all the required fields" })
        }

        const userLogIn = await User.findOne({ email })
        const teacherLogIn=await Teacher.findOne({email})
        const adminLogIn=await Admin.findOne({email})
        // console.log(userLogIn)
        if (userLogIn) {
            const isMatch = await bcrypt.compare(password, userLogIn.password)
            // console.log(userLogIn.password)
            // console.log(password)
            // token=await userLogIn.generateAuthToken()
            // console.log(token)
            // res.cookie("jwtoken",token,{
            //     expires:new Date(Date.now()+25892000000),
            //     httpOnly:true
            // })
            if (userLogIn.password != password) {
                res.status(400).json({ error: "Ivallid ID or Password or something " })
            } else {
                res.json({ message: "User sign in successfully" })
            }
        }
        
        else if (teacherLogIn) {
            const isMatch = await bcrypt.compare(password, teacherLogIn.password)
            // console.log(userLogIn.password)
            // console.log(password)
            // token=await userLogIn.generateAuthToken()
            // console.log(token)
            // res.cookie("jwtoken",token,{
            //     expires:new Date(Date.now()+25892000000),
            //     httpOnly:true
            // })
            if (teacherLogIn.password != password) {
                res.status(400).json({ error: "Ivallid ID or Password or something " })
            } else {
                res.json({ message: "User sign in successfully" })
            }
        }
        else if (adminLogIn) {
            const isMatch = await bcrypt.compare(password, adminLogIn.password)
            // console.log(userLogIn.password)
            // console.log(password)
            // token=await userLogIn.generateAuthToken()
            // console.log(token)
            // res.cookie("jwtoken",token,{
            //     expires:new Date(Date.now()+25892000000),
            //     httpOnly:true
            // })
            if (adminLogIn.password != password) {
                res.status(400).json({ error: "Ivallid ID or Password or something " })
            } else {
                res.json({ message: "User sign in successfully" })
            }
        }
        else {
            res.status(400).json({ error: "Ivallid ID or Password" })

        }
    } catch (error) {
        console.log(error)
    }
})




//insert AND UPDATE in attendance

const Attendance = require('../model/attendanceSchema');
router.put('/attendance', async (req, res) => {
    console.log(req.body)
    // var { subject, studentName, studentId, attendance } = req.body;
    var allRecords = req.body;
    for (let x = 0; x < allRecords.length; x++) {

        console.log(allRecords[x])
        var { enrolledclass,subject, studentName, studentId, attendance } = allRecords[x];
        console.log(subject, studentName)
        var dateTime = require('node-datetime');
        var dt = dateTime.create();
        var created_at = dt.format('Y-m-d');


        const allrecord = await Attendance.find()
        var subjectf = await Attendance.findOne({ subject })
        var stud = await Attendance.findOne({ studentId })
        if (!subjectf) {
            var totalAttendance = 1
            var percentage = (attendance * 100) / totalAttendance
            try {
                var dateTime = require('node-datetime');
                var dt = dateTime.create();
                var created_at = dt.format('Y-m-d');


                const table = new Attendance({enrolledclass, subject, studentName, studentId, created_at, attendance, totalAttendance, percentage })
                //yahan pe hum hashing kar rahe hain schema mn or osmn next laga wa ha jiske waja se age save hoga data
                const tableRegister = await table.save()
                if (tableRegister) {
                    // res.status(201).json({ message: "Table registered succesfully" })
                } else {
                    res.status(500).json({ error: "Failed to register" })
                }
            } catch (error) {
                console.log(error)
            }
        } else if (subjectf != null && !stud) {
            var totalAttendance = 1
            var percentage = (attendance * 100) / totalAttendance
            try {
                var dateTime = require('node-datetime');
                var dt = dateTime.create();
                var created_at = dt.format('Y-m-d');


                const table = new Attendance({ enrolledclass,subject, studentName, studentId, created_at, attendance, totalAttendance, percentage })
                //yahan pe hum hashing kar rahe hain schema mn or osmn next laga wa ha jiske waja se age save hoga data
                const tableRegister = await table.save()
                if (tableRegister) {
                    // res.status(201).json({ message: "Table registered succesfully" })
                } else {
                    res.status(500).json({ error: "Failed to register" })
                }
            } catch (error) {
                console.log(error)
            }


        }
        else if (subjectf != null && stud != null) {
            var ifupdate = 0
            for (let i = 0; i < allrecord.length; i++) {
                if (allrecord[i].subject == subjectf.subject) {
                    if (allrecord[i].studentId == stud.studentId) {
                        ifupdate = 1
                        var id = allrecord[i]._id
                        attendance = allrecord[i].attendance + Number(attendance)
                        var totalAttendance = allrecord[i].totalAttendance + 1
                        var percentage = Math.round((attendance * 100) / totalAttendance)
                        // percentage=Math.round(percentage)

                        try {
                            const table = await Attendance.findByIdAndUpdate(id, {enrolledclass, subject, studentName, studentId, created_at, attendance, totalAttendance, percentage })
                            res.json(table)
                            console.log("record updated successfully")
                            // res.status(201).json({ message: "updated succesfully" })
                            break

                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            }
            if (ifupdate == 0) {
                var count = 0

                var filtered = []
                for (let i = 0; i < allrecord.length; i++) {

                    if (allrecord[i].subject == subjectf.subject) {
                        console.log(allrecord[i])
                        count += 1
                        filtered.push(allrecord[i])

                    }
                }
                for (let j = 0; j < count; j++) {
                    if (filtered[j].studentId != stud.studentId) {
                        var totalAttendance = 1
                        var percentage = (attendance * 100) / totalAttendance
                        try {
                            var dateTime = require('node-datetime');
                            var dt = dateTime.create();
                            var created_at = dt.format('Y-m-d');


                            const table = new Attendance({enrolledclass, subject, studentName, studentId, created_at, attendance, totalAttendance, percentage })
                            //yahan pe hum hashing kar rahe hain schema mn or osmn next laga wa ha jiske waja se age save hoga data
                            const tableRegister = await table.save()
                            if (tableRegister) {
                                // res.status(201).json({ message: "Table registered succesfully" })
                                break
                            } else {
                                res.status(500).json({ error: "Failed to register" })
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }

                }
            }

        }
    }
    // if (!subject || !studentName || !studentId) {
    //     return (res.status(422).json({ error: "Plz filled all the required fields" }))
    // }

})










//marks
router.put('/mark', async (req, res) => {
    console.log(req.body)
    // var { subject, studentName, studentId, attendance } = req.body;
    var allRecords = req.body;
    for (let x = 0; x < allRecords.length; x++) {

        console.log(allRecords[x])
        var { enrolledclass,subject, studentName, studentId, marks,totalMarks } = allRecords[x];
        console.log(subject, studentName)
        var dateTime = require('node-datetime');
        var dt = dateTime.create();
        var created_at = dt.format('Y-m-d');


        const allrecord = await Marks.find()
        var subjectf = await Marks.findOne({ subject })
        var stud = await Marks.findOne({ studentId })
        if (!subjectf) {
            // var totalAttendance = 1
            var percentage = Math.round((marks * 100) / totalMarks)
            try {
                var dateTime = require('node-datetime');
                var dt = dateTime.create();
                var created_at = dt.format('Y-m-d');


                const table = new Marks({ enrolledclass,subject, studentName, studentId, created_at, marks, totalMarks, percentage })
                //yahan pe hum hashing kar rahe hain schema mn or osmn next laga wa ha jiske waja se age save hoga data
                const tableRegister = await table.save()
                if (tableRegister) {
                    // res.status(201).json({ message: "Table registered succesfully" })
                } else {
                    res.status(500).json({ error: "Failed to register" })
                }
            } catch (error) {
                console.log(error)
            }
        } else if (subjectf != null && !stud) {
            // var totalAttendance = 1
            var percentage = Math.round((marks * 100) / totalMarks)
            try {
                var dateTime = require('node-datetime');
                var dt = dateTime.create();
                var created_at = dt.format('Y-m-d');


                const table = new Marks({ enrolledclass,subject, studentName, studentId, created_at, marks, totalMarks, percentage })
                //yahan pe hum hashing kar rahe hain schema mn or osmn next laga wa ha jiske waja se age save hoga data
                const tableRegister = await table.save()
                if (tableRegister) {
                    // res.status(201).json({ message: "Table registered succesfully" })
                } else {
                    res.status(500).json({ error: "Failed to register" })
                }
            } catch (error) {
                console.log(error)
            }


        }
        else if (subjectf != null && stud != null) {
            var ifupdate = 0
            for (let i = 0; i < allrecord.length; i++) {
                if (allrecord[i].subject == subjectf.subject) {
                    if (allrecord[i].studentId == stud.studentId) {
                        ifupdate = 1
                        var id = allrecord[i]._id
                        marks = allrecord[i].marks + Number(marks)
                        var totalMarks = allrecord[i].totalMarks + Number(totalMarks)
                        var percentage = Math.round((marks * 100) / totalMarks)
                        try {
                            const table = await Marks.findByIdAndUpdate(id, { enrolledclass,subject, studentName, studentId, created_at, marks, totalMarks, percentage })
                            res.json(table)
                            console.log("record updated successfully")
                            // res.status(201).json({ message: "updated succesfully" })
                            break
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            }
            if (ifupdate == 0) {
                var count = 0

                var filtered = []
                for (let i = 0; i < allrecord.length; i++) {

                    if (allrecord[i].subject == subjectf.subject) {
                        console.log(allrecord[i])
                        count += 1
                        filtered.push(allrecord[i])

                    }
                }
                for (let j = 0; j < count; j++) {
                    if (filtered[j].studentId != stud.studentId) {
                        // var totalAttendance = 1
                        var percentage = Math.round((marks * 100) / totalMarks)
                        try {
                            var dateTime = require('node-datetime');
                            var dt = dateTime.create();
                            var created_at = dt.format('Y-m-d');


                            const table = new Marks({ enrolledclass,subject, studentName, studentId, created_at, marks, totalMarks, percentage })
                            //yahan pe hum hashing kar rahe hain schema mn or osmn next laga wa ha jiske waja se age save hoga data
                            const tableRegister = await table.save()
                            if (tableRegister) {
                                // res.status(201).json({ message: "Table registered succesfully" })
                                break
                            } else {
                                res.status(500).json({ error: "Failed to register" })
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }

                }
            }

        }
    }
    

})

module.exports = router;