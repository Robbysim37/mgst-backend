require("dotenv").config()
const express = require("express")
const server = express()
const cors = require("cors")
const {getAllStudents,createStudent} = require("./data/dataServices")
const {generateCredentials} = require("./services/backendServices")

server.use(express.json())
server.use(cors())

server.get(`/`,async (req,res) => {
    const students =  await getAllStudents()
    res.send(students)
})

server.post(`/newStudent`, async (req,res) => {
    // const resultId = await createStudent(req.body)
    // res.send(`student succesfully created! id:${resultId}`)
    const newStudentAccounts = generateCredentials(req.body)
    
    res.send(
        newStudentAccounts.map(currStudent => {
            return `${currStudent.firstName + currStudent.lastname} - 
            username: ${currStudent.username} - 
            password: ${currStudent.password}`
        })
    )
})

server.listen(8000, () => {
    console.log("server running on port: 8000")
})