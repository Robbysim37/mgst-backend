//NEEDS TO ADD ID TO AN ACUTALLY POSTED STUDENT
//Takes last two digits of the current year, 
//and is followed by a random 6 digit number

const crypto = require('crypto')

const generatePassword = () => {
    length = 8,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$'
    return Array.from(crypto.randomFillSync(new Uint32Array(length)))
      .map((x) => wishlist[x % wishlist.length])
      .join('')
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

const generateCredentials = (incomingArray) => {
     studentAccounts = incomingArray.map(currStudent => {
        return {
            ...currStudent, 
            username:generateUsernameID(currStudent),
            password:generatePassword()}
    })
    console.log(studentAccounts)
    return studentAccounts
}

module.exports ={
    generateCredentials
}