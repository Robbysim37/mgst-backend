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
    deleteStaff,
    updateStudentInfo,
    createStaff,
    getStaff,
    updateUserToken,
    getAllStaff,
    getStudent,
    updateStudentPassword}
     = require("./data/dataServices")
const {
    generateCredentials,
    updateCourseOrder,
    generateStaffCredentials,
    resetPassword} = require("./services/backendServices")

server.use(cors())

server.use(express.json())

const checkAuth = async (req,res,next) => {
    if(req.body.username){
        const dbUser = await getStaff(req.body.username)
        if(req.body.token === dbUser.token){
            req.body.type = dbUser.type
            next()
        }
    }else{
        res.status(401).send("invalid auth")
    }
}

const checkAdmin = (req,res,next) => {
    if(req.body.type === "admin" || req.body.data.type === "admin"){
        next()
    }else{
        res.status(401).send("You are not authorized to do that")
    }
}
 
const checkDeleteAuth = async (req,res,next) => {
    if(req.body.data.username){
        const dbUser = await getStaff(req.body.data.username)
        if(req.body.data.token === dbUser.token){
            if(dbUser.type === "admin"){
                req.body.data.type = "admin"
            }
            next()
        }
    }else{
        res.status(401).send("invalid auth")
    }
}

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


server.post(`/`, checkAuth, async (req,res) => {
    const students =  await getAllStudents()
    res.send(students)
})

server.post(`/newStudents`,checkAuth, async (req,res) => {
    const studentsFirstTimeInfo = generateCredentials(req.body.data)
    await createStudent(studentsFirstTimeInfo.students)

    res.send(
        studentsFirstTimeInfo.firstPasswords.map(currStudent => {
            return {
                firstName: currStudent.firstName,
                lastName: currStudent.lastName,
                username: currStudent.username,
                password: currStudent.firstTimePassword                
            }
        })
    )
})

server.put(`/resetPassword`, checkAuth, async (req,res) => {
    const student = await getStudent(req.body.data)
    const {dataToShow,dataToStore} = resetPassword(student)
    await updateStudentPassword({dataToStore,needsReset:true})
    res.status(200).send([dataToShow])
})

server.delete(`/deleteStudent`, checkDeleteAuth, async (req,res) => {
   const deleteResult = await deleteStudent(req.body.data.data)
   res.send(`successfully deleted ${deleteResult.deletedCount} student(s) `)
})

server.delete(`/deleteStaff`, checkDeleteAuth, checkAdmin, async (req,res) => {
    const deleteResult = await deleteStaff(req.body.data.data)
    res.send(`successfully deleted staff member `)
})

server.put(`/editStudentInfo`, checkAuth, (req,res) => {
    updateStudentInfo(req.body.data)
    res.send("completed")
})

server.put(`/updateCourseOrder`, checkAuth, async (req,res) => {
    const updatedStudent = await updateCourseOrder(req.body.data)
    res.send(updatedStudent)
})

server.post(`/createStaff`, checkAuth, checkAdmin, async (req,res) => {
    const incomingStaffUsername = req.body.data
    const staffData = generateStaffCredentials(incomingStaffUsername)
    const createStaffResult = await createStaff(staffData.staff)
    if(createStaffResult){
        res.status(200).send(staffData.staffConfirmation)
    }else{
        res.status(500).send("Staff not created")
    }
})

server.post(`/getStaff`,checkAuth,checkAdmin, async (req,res) => {
    const allStaff = await getAllStaff()
    const staff = allStaff.filter(currStaff => {
        if(currStaff.type !== "admin"){
            return true
        }else{
            return false
        }
    })
    const staffUsernames = staff.map(currStaff => {
        return currStaff.username
    })
    res.status(200).send(staffUsernames)
})

server.post(`/checkToken`,(req,res) => {
    const incomingStaff = req.body
    getStaff(incomingStaff.username).then(staff => {
        incomingStaff.token === staff.token ? res.status(200).send("true") : res.status(200).send("false")
    }).catch(error => {
        res.status(400).send(error)
    })
})

server.post(`/staffLogin`,(req,res) => {
    const incomingStaff = req.body
    getStaff(incomingStaff.username).then( async (staff) => {
        if(incomingStaff && bcrypt.compareSync(incomingStaff.password, staff.password)){
            const token = generateToken(staff)
            await updateUserToken(incomingStaff.username,token)
            res.status(200).send({
                username:staff.username,
                type:staff.type,
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