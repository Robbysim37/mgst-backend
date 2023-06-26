//STUDENT SHAPE GOING INTO DB
//firstName: String
//lastName: String
//schedule: Array of class objects
//grade: Number
//cohort: Number
//username: String
//password: hashed String

const {MongoClient} = require("mongodb")

const newConnection = () => {
    const uri = process.env.MDB
    return new MongoClient(uri)
}

const getAllStudents = async () => {
    const client = newConnection()
    await client.connect()
    const dbStudents = await client.db("users").collection("_students")
    .find({}).toArray()
    return dbStudents
}

const createStudent = async (newStudents) => {
    const client = newConnection()
    await client.connect()
    const usersStudents = client.db("users").collection("_students")
    const result = await usersStudents.insertMany(newStudents)
    return result.insertedId
}

module.exports = {
    getAllStudents,
    createStudent
}