
// schedule contains 4 "year" arrays
// Each year contains 3 "trimester" arrays
// each trimester contains 3 "class" objects


const createCourse = (className,creditType,completed,notes) => {
    const course = 
    {
        name: className,
        creditType: creditType,
        completed: completed,
        notes: notes,
        creditAmount: .5
    }
    return course
}



const createSchedule = () => {
    [
        [
            [
            createCourse("Algebra 1A","Math",false,""),
            createCourse("Freshman English A","English",false,""),
            createCourse("World History","History",false,"")
            ],
            [
            createCourse("Algebra 2B","Math",false,""),
            createCourse("Freshman English B","English",false,""),
            createCourse("Algebra 2B","Math",false,"")
            ],
            [{},{},{}]
        ],
        [
            [{},{},{}],
            [{},{},{}],
            [{},{},{}]
        ],
        [
            [{},{},{}],
            [{},{},{}],
            [{},{},{}]
        ],
        [
            [{},{},{}],
            [{},{},{}],
            [{},{},{}]
        ]
    ]
}


module.exports = {

}