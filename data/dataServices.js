//STUDENT SHAPE GOING INTO DB
//firstName: String
//lastName: String
//schedule: Array of course objects
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
    const dbStudents = client.db("users").collection("_students")
    const result = await dbStudents.insertMany(newStudents)
    return result.insertedId
}

const deleteStudent = async (incomingUsername) => {
    const client = newConnection()
    await client.connect()
    const dbStudents = client.db("users").collection("_students")
    const result = await dbStudents.deleteOne({username:incomingUsername})
    return result
}

module.exports = {
    getAllStudents,
    createStudent,
    deleteStudent
}