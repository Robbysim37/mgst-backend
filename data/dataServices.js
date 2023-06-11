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

const createStudent = async (newStudent) => {

    console.log("NewStudent:" + newStudent)
    const client = newConnection()
    await client.connect()
    const usersStudents = client.db("users").collection("_students")
    const result = await usersStudents.insertOne(newStudent)
    console.log("here:" + result)
    return result.insertedId
}

module.exports = {
    getAllStudents,
    createStudent
}