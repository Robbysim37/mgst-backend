
// schedule contains 4 "year" arrays
// Each year contains 3 "trimester" arrays
// each trimester contains 3 "class" objects


const createCourse = (className,creditType,completed,notes,completedCourseStr) => {

    const completedCourseArr = completedCourseStr.split(`:`)
    console.log(completedCourseArr)

    const course = 
    {
        name: className,
        creditType: creditType,
        completed: completed,
        notes: notes,
        creditAmount: .5
    }

    if(completedCourseArr.includes(course.name)){
        course.completed = true
    }

    return course
}

//schedule[0][0][0]
//[0-3][0-2][0-2]

const createSchedule = (completedCourseStr) => {
   const schedule = [
        [
            //tri 1-3
            [
                createCourse("Algebra 1A","Math",false,"",completedCourseStr),
                createCourse("Freshman English A","English",false,"",completedCourseStr),
                createCourse("World History A","History",false,"",completedCourseStr)
            ],
            [
                createCourse("Algebra 1B","Math",false,"",completedCourseStr),
                createCourse("Freshman English B","English",false,"",completedCourseStr),
                createCourse("Bio A","Science",false,"",completedCourseStr)
            ],
            [
                createCourse("World History B","History",false,"",completedCourseStr),
                createCourse("Bio B","Science",false,"",completedCourseStr),
                createCourse("Economics","History",false,"",completedCourseStr)
            ]
        ],
        [
            //tri 4-6
            [
                createCourse("Geometry 1A","Math",false,"",completedCourseStr),
                createCourse("Sophomore English A","English",false,"",completedCourseStr),
                createCourse("Foreign Language","Elective",false,"",completedCourseStr)
            ],
            [
                createCourse("Geometry 1B","Math",false,"",completedCourseStr),
                createCourse("Sophomore English B","English",false,"",completedCourseStr),
                createCourse("Foreign Language","Elective",false,"",completedCourseStr)
            ],
            [
                createCourse("Government","History",false,"",completedCourseStr),
                createCourse("Chemistry/Physics","Science",false,"",completedCourseStr),
                createCourse("Health","Elective",false,"",completedCourseStr)
            ]
        ],
        [
            //tri 7-9
            [
                createCourse("Algebra 2A","Math",false,"",completedCourseStr),
                createCourse("Junior English A","English",false,"",completedCourseStr),
                createCourse("Arts","Elective",false,"",completedCourseStr)
            ],
            [
                createCourse("Algebra 2B","Math",false,"",completedCourseStr),
                createCourse("Junior English B","English",false,"",completedCourseStr),
                createCourse("Chemistry/Physics","Science",false,"",completedCourseStr)
            ],
            [
                createCourse("American History A","History",false,"",completedCourseStr),
                createCourse("Science Elective","Science",false,"",completedCourseStr),
                createCourse("Arts","Elective",false,"",completedCourseStr)
            ]
        ],
        [
            //tri 10-12
            [
                createCourse("Math Elective","Math",false,"",completedCourseStr),
                createCourse("Senior English A","English",false,"",completedCourseStr),
                createCourse("American History B","History",false,"",completedCourseStr)
            ],
            [
                createCourse("Math Elective","Math",false,"",completedCourseStr),
                createCourse("Senior English B","English",false,"",completedCourseStr),
                createCourse("Foreign Language/Arts","Elective",false,"",completedCourseStr)
            ],
            [
                createCourse("Physical Education","Elective",false,"",completedCourseStr),
                createCourse("Science Elective","Science",false,"",completedCourseStr),
                createCourse("Foreign Language/Arts","Elective",false,"",completedCourseStr)
            ]
        ]
    ]
    return schedule
}


module.exports = {
    createSchedule
}