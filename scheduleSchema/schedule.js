
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

//schedule[0][0][0]
//[0-3][0-2][0-2]

const createSchedule = () => {
   const schedule = [
        [
            //tri 1-3
            [
                createCourse("Algebra 1A","Math",false,""),
                createCourse("Freshman English A","English",false,""),
                createCourse("World History A","History",false,"")
            ],
            [
                createCourse("Algebra 1B","Math",false,""),
                createCourse("Freshman English B","English",false,""),
                createCourse("Bio A","Science",false,"")
            ],
            [
                createCourse("World History B","History",false,""),
                createCourse("Bio B","Science",false,""),
                createCourse("Economics","History",false,"")
            ]
        ],
        [
            //tri 4-6
            [
                createCourse("Geometry 1A","Math",false,""),
                createCourse("Sophomore English A","English",false,""),
                createCourse("Foreign Language","Elective",false,"")
            ],
            [
                createCourse("Geometry 1B","Math",false,""),
                createCourse("Sophomore English B","English",false,""),
                createCourse("Foreign Language","Elective",false,"")
            ],
            [
                createCourse("Government","History",false,""),
                createCourse("Chemistry/Physics","Science",false,""),
                createCourse("Health","Elective",false,"")
            ]
        ],
        [
            //tri 7-9
            [
                createCourse("Algebra 2A","Math",false,""),
                createCourse("Junior English A","English",false,""),
                createCourse("Arts","Elective",false,"")
            ],
            [
                createCourse("Algebra 2B","Math",false,""),
                createCourse("Junior English B","English",false,""),
                createCourse("Chemistry/Physics","Science",false,"")
            ],
            [
                createCourse("American History A","History",false,""),
                createCourse("Science Elective","Science",false,""),
                createCourse("Arts","Elective",false,"")
            ]
        ],
        [
            //tri 10-12
            [
                createCourse("Math Elective","Math",false,""),
                createCourse("Senior English A","English",false,""),
                createCourse("American History B","History",false,"")
            ],
            [
                createCourse("Math Elective","Math",false,""),
                createCourse("Senior English B","English",false,""),
                createCourse("Foreign Language/Arts","Elective",false,"")
            ],
            [
                createCourse("Physical Education","Elective",false,""),
                createCourse("Science Elective","Science",false,""),
                createCourse("Foreign Language/Arts","Elective",false,"")
            ]
        ]
    ]
    return schedule
}


module.exports = {
    createSchedule
}