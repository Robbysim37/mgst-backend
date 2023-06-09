const express = require("express")
const server = express()

server.get(`/`,(req,res) => {
    res.send("Testing the backend")
})

server.get(`/test`,(req,res) => {
    res.send("This is different")
})

server.listen(8000, () => {
    console.log("server running on port: 8000")
})