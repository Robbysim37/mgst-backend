//STUDENT SHAPE GOING INTO DB
//firstName: String
//lastName: String
//schedule: Array of course objects
//grade: Number
//cohort: Number
//username: String
//password: hashed String

const {MongoClient} = require("mongodb")

const checkGrade = (schedule) => {
    let credits = 0
    schedule.map(year => {
        year.map(trimester => {
            trimester.map(course => {
                if(course.completed){
                    credits += course.creditAmount
                }
            })
        })
    })
    return Math.ceil((credits/4.5) + .001)}

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

const createStaff = async (newStaff) => {
    const client = newConnection()
    await client.connect()
    const dbStaff = client.db("users").collection("_staff")
    const result = await dbStaff.insertOne(newStaff)
    return result
}

const getStaff = async (staffUsername) => {
    const client = newConnection()
    await client.connect()
    const dbStaff = client.db("users").collection("_staff")
    .findOne({username:staffUsername})
    return dbStaff
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
            {"schedule":incomingData.newSchedule,
             "grade":checkGrade(incomingData.newSchedule)}
        })
    return result
}

module.exports = {
    getAllStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudentInfo,
    updateSchedule,
    createStaff,
    getStaff
}