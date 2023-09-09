require("dotenv").config()
const bcrypt = require("bcryptjs")
const express = require("express")
const server = express()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const secrets = require("./config/secrets")
const {
    getAllStudents,
    createStudent,
    deleteStudent,
    updateStudentInfo,
    createStaff,
    getStaff,
    updateUserToken}
     = require("./data/dataServices")
const {generateCredentials,updateCourseCompletion,updateCourseOrder,staffPasswordHash} = require("./services/backendServices")

server.use(cors())

server.use(express.json())

const checkAuth = async (req,res,next) => {
    if(req.username){
        const dbUser = await getStaff(req.username)
        if(req.token === dbUser.token){
            next()
        }
    }
    res.status(401).send("invalid auth")
}

server.user(checkAuth)

const generateToken = (user) => {
    const payload = {
        subject:user.username,
        username:user.username
    }
    const secret = secrets.jwtSecret
    const options = {
        expiresIn: "8h"
    }
    return jwt.sign(payload,secret,options)
}


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
    const staff = staffPasswordHash(req.body)
    const createStaffResult = await createStaff(staff)
    if(createStaffResult){
        res.status(200).send("Staff created Successfully")
    }else{
        res.status(500).send("Staff not created")
    }
})

server.post(`/checkToken`,(req,res) => {
    const incomingStaff = req.body
    getStaff(incomingStaff.username).then(staff => {
        console.log(`Incoming:${incomingStaff.token}`)
        console.log(`DB:${staff.token}`)
        incomingStaff.token === staff.token ? res.status(200).send("true") : res.status(200).send("false")
    }).catch(error => {
        res.status(400).send(error)
    })
})

server.post(`/staffLogin`,(req,res) => {
    const incomingStaff = req.body
    getStaff(incomingStaff.username).then(staff => {
        if(incomingStaff && bcrypt.compareSync(incomingStaff.password, staff.password)){
            const token = generateToken(staff)
            updateUserToken(incomingStaff.username,token).then(async (promise) => {
                const newStaff = await getStaff(incomingStaff.username)
            })
            res.status(200).send({
                message:` Welcome,${staff.username}!`,
                token
            })
        }else{
            res.status(400).send("incorrect credentials")
        }
    })
})

server.listen(8000, () => {
    console.log("server running on port: 8000")
})