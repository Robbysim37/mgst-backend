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

const getStudent = async (incomingUsername) => {
    const client = newConnection()
    await client.connect()
    const dbStudent = await client.db("users").collection("_students")
    .findOne({username:incomingUsername})
    return dbStudent
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

const updateStudentInfo = async(incomingData) => {
    const client = newConnection()
    await client.connect()
    const result = client.db("users").collection("_students")
    .updateOne({username:incomingData.username},
        {
            $set: 
            {"firstName":incomingData.firstName,
            "lastName":incomingData.lastName,
            "cohort":incomingData.cohort}
        })
    return result
}

const updateSchedule = async(incomingData) => {
    const client = newConnection()
    await client.connect()
    const result = client.db("users").collection("_students")
    .updateOne({username:incomingData.username},
        {
            $set:
            {"schedule":incomingData.newSchedule}
        })
    return result
}

module.exports = {
    getAllStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudentInfo,
    updateSchedule
}