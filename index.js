require("dotenv").config()
const express = require("express")
const server = express()
const cors = require("cors")
const {getAllStudents,createStudent} = require("./data/dataServices")

server.use(express.json())
server.use(cors())

server.get(`/`,async (req,res) => {
    const students =  await getAllStudents()
    res.send(students)
})

server.post(`/newStudent`, async (req,res) => {
    const resultId = await createStudent(req.body)
    res.send(`student succesfully created! id:${resultId}`)
})

server.listen(8000, () => {
    console.log("server running on port: 8000")
})