const bcrypt = require("bcryptjs")
const {updateSchedule} = require("../data/dataServices")

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

const generateStaffCredentials = (incomingStaffUsername) => {
    const firstTimePassword = generatePassword()

    const staffConfirmation = {
        username:incomingStaffUsername,
        firstTimePassword
    }

    const staff = {
        username:incomingStaffUsername,
        password:hashPassword(firstTimePassword),
        type:"staff"
    }

    return {
        staffConfirmation,
        staff
    }
}

const resetPassword = (student) => {
    const newTemporaryPassword = generatePassword()

    const newStudentPassword = {
        firstName:student.firstName,
        lastName:student.lastName,
        username:student.username,
        tempPassword:hashPassword(newTemporaryPassword)
    }
    
    return newStudentPassword
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
    if(Math.ceil(credits/4.5) === 0){
        return 1
    }else{
        return Math.ceil(credits/4.5)
    }
}

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

const updateCourseOrder = async (incomingData) => {
    await updateSchedule(
        {username:incomingData.username,
        newSchedule:incomingData.schedule}
    )
    return "complete"
}

module.exports ={
    generateCredentials,
    checkGrade,
    updateCourseOrder,
    generateStaffCredentials,
    resetPassword
}