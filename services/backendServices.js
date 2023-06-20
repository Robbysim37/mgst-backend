//NEEDS TO ADD ID TO AN ACUTALLY POSTED STUDENT
//Takes last two digits of the current year, 
//and is followed by a random 6 digit number

const generateUsernameID = (studentAmount) => {
    for( i = 0 ; i < studentAmount ; i++){
        const currentTime = new Date()
        const year = 

            currentTime.getFullYear().toString().split("")[2] 
            + 
            currentTime.getFullYear().toString().split("")[3]

        let randomInt = Math.floor(Math.random() * 1000000).toString().split("")
        while(randomInt.length < 6){
            randomInt.unshift("0")
        }
        id = year + randomInt.join("")
        console.log(id)
    }
}

module.exports ={
    generateUsernameID
}