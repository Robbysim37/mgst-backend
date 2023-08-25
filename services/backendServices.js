const bcrypt = require("bcryptjs")
const {getStudent,updateSchedule} = require("../data/dataServices")

//NEEDS TO ADD ID TO AN ACUTALLY POSTED STUDENT
//Takes last two digits of the current year, 
//and is followed by a random 6 digit number

const {createSchedule} = require("../scheduleSchema/schedule")
const crypto = require('crypto')

const generatePassword = () => {
    length = 8,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$'
    return Array.from(crypto.randomFillSync(new Uint32Array(length)))
      .map((x) => wishlist[x % wishlist.length])
      .join('')
}

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 12)
}

const staffPasswordHash = (staff) => {
    return {
        ...staff,
        password:hashPassword(staff.password)
    }
}

const generateUsernameID = (student) => {
        const firstLetter = student.firstName.split("")[0]
        const currentTime = new Date()
        const year = 

            currentTime.getFullYear().toString().split("")[2] 
            + 
            currentTime.getFullYear().toString().split("")[3]

        let randomInt = Math.floor(Math.random() * 1000000).toString().split("")
        while(randomInt.length < 6){
            randomInt.unshift("0")
        }
        return firstLetter + student.lastName + year + randomInt.join("")
}

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

const generateCredentials = (incomingArray) => {

    //**** 
    //definitely fix this mapping twice thing!
    //Probably a better way to do it
    //At this point staff is sending the complete courses before a schedule
    //Is made, so you can look at the complete courses of a student, 
    //Add those up, and then assign a grade based on incoming data.
    //****

    const firstPasswords = incomingArray.map(currStudent => {
        return {
            ...currStudent,
            username:generateUsernameID(currStudent),
            firstTimePassword:generatePassword(),
        }
    })

    studentAccounts = firstPasswords.map(currStudent => {
        return {
            lastName:currStudent.lastName,
            firstName:currStudent.firstName,
            cohort:currStudent.cohort,
            completedCourses:currStudent.completedCourses,
            username:currStudent.username,
            password:hashPassword(currStudent.firstTimePassword),
            schedule:createSchedule(currStudent.completedCourses)
        }
    })
    studentAccounts = studentAccounts.map(currStudent => {
            return {
                ...currStudent,
                grade:checkGrade(currStudent.schedule)
            }
        })

    return {
        students:studentAccounts,
        firstPasswords:firstPasswords}
}

const updateCourseCompletion = async (incomingData) => {
    let student = await getStudent(incomingData.username)
    let course = student.schedule[incomingData.yearIndex][incomingData.trimesterIndex][incomingData.courseIndex]
    course.completed = !course.completed

    await updateSchedule(
        {username:incomingData.username,
        newSchedule:student.schedule}
    )
    return await getStudent(incomingData.username)
}

const updateCourseOrder = async (incomingData) => {
    console.log(incomingData.username)
    console.log(incomingData.schedule)
    await updateSchedule(
        {username:incomingData.username,
        newSchedule:incomingData.schedule}
    )
    return "complete"
}

module.exports ={
    generateCredentials,
    checkGrade,
    updateCourseCompletion,
    updateCourseOrder,
    staffPasswordHash
}