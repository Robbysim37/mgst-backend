require("dotenv").config()
const express = require("express")
const server = express()
const cors = require("cors")
const {
    getAllStudents,
    createStudent,
    deleteStudent,
    updateStudentInfo,
    updateCourseCompletion}
     = require("./data/dataServices")
const {generateCredentials} = require("./services/backendServices")

const {createSchedule} = require("./scheduleSchema/schedule")

server.use(cors())

server.use(express.json())


server.get(`/`,async (req,res) => {
    const students =  await getAllStudents()
    res.send(students)
})

server.post(`/newStudents`, async (req,res) => {
    const newStudentAccounts = generateCredentials(req.body)
    await createStudent(newStudentAccounts)

    res.send(
        newStudentAccounts.map(currStudent => {
            return `${currStudent.firstName + currStudent.lastName} - 
            username: ${currStudent.username} - 
            password: ${currStudent.password}`
        })
    )
})

server.delete(`/deleteStudent`, async (req,res) => {
    const deleteResult = await deleteStudent(req.body.username)
    res.send(`successfully deleted ${deleteResult.deletedCount} student(s) `)
})

server.get('/generateSchedule', (req,res) => {
    console.log(createSchedule()[0][0])
    res.send("completed")
})

server.put(`/editStudentInfo`, (req,res) => {
    updateStudentInfo(req.body)
    res.send("completed")
})

server.put(`/editCourseCompletion`, (req,res) => {
    updateCourseCompletion(req.body)
    res.send("completed")
})

server.listen(8000, () => {
    console.log("server running on port: 8000")
})