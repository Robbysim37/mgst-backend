require("dotenv").config()
const express = require("express")
const server = express()
const cors = require("cors")
const {
    getAllStudents,
    createStudent,
    deleteStudent,
    updateStudentInfo,
    createStaff}
     = require("./data/dataServices")
const {generateCredentials,updateCourseCompletion,updateCourseOrder,staffPasswordHash} = require("./services/backendServices")

server.use(cors())

server.use(express.json())


server.get(`/`,async (req,res) => {
    const students =  await getAllStudents()
    res.send(students)
})

server.post(`/newStudents`, async (req,res) => {
    const studentsFirstTimeInfo = generateCredentials(req.body)
    await createStudent(studentsFirstTimeInfo.students)

    res.send(
        studentsFirstTimeInfo.firstPasswords.map(currStudent => {

            return `${currStudent.firstName + currStudent.lastName} - 
            username: ${currStudent.username} - 
            password: ${currStudent.firstTimePassword}`
        })
    )
})

server.delete(`/deleteStudent`, async (req,res) => {
    const deleteResult = await deleteStudent(req.body.username)
    res.send(`successfully deleted ${deleteResult.deletedCount} student(s) `)
})

server.get('/generateSchedule', (req,res) => {
    res.send("completed")
})

server.put(`/editStudentInfo`, (req,res) => {
    updateStudentInfo(req.body)
    res.send("completed")
})

server.put(`/editCourseCompletion`, async (req,res) => {
    const updatedStudent = await updateCourseCompletion(req.body)
    res.send(updatedStudent)
})

server.put(`/updateCourseOrder`, async (req,res) => {
    const updatedStudent = await updateCourseOrder(req.body)
    res.send(updatedStudent)
})

server.post(`/createStaff`, async (req,res) => {
    console.log(req.body)
    const staff = staffPasswordHash(req.body)
    const createStaffResult = await createStaff(staff)
    if(createStaffResult){
        res.status(200).send("Staff created Successfully")
    }else{
        res.status(500).send("Staff not created")
    }
})

server.post(`/staffLogin`, async (req,res) => {
    
})

server.listen(8000, () => {
    console.log("server running on port: 8000")
})