
// schedule contains 4 "year" arrays
// Each year contains 3 "trimester" arrays
// each trimester contains 3 "class" objects


const createCourse = (className,creditType,completed,classCode,completedCourseArr) => {

    const arrCopy = [...completedCourseArr]

    const course = 
    {
        name: className,
        creditType: creditType,
        completed: completed,
        classCode:classCode,
        creditAmount: .5
    }
    
    if(arrCopy.length > 0 && arrCopy.includes(course.classCode)){
        course.completed = true
    }

    return course
}

//schedule[0][0][0]
//[0-3][0-2][0-2]

const createSchedule = (completedCourseStr) => {
    const completedCourseArr = completedCourseStr.split(`:`)
    const completedCourseArrCopy = [...completedCourseArr]
    const schedule = [
        [
            //tri 1-3
            [
                createCourse("Algebra 1A","Math",false,"ALG-1A",completedCourseArrCopy),
                createCourse("Freshman English A","English",false,"FRE-A",completedCourseArrCopy),
                createCourse("World History A","History",false,"WH-A",completedCourseArrCopy)
            ],
            [
                createCourse("Algebra 1B","Math",false,"ALG-1B",completedCourseArrCopy),
                createCourse("Freshman English B","English",false,"FRE-B",completedCourseArrCopy),
                createCourse("Bio A","Science",false,"BIO-A",completedCourseArrCopy)
            ],
            [
                createCourse("World History B","History",false,"WH-B",completedCourseArrCopy),
                createCourse("Bio B","Science",false,"BIO-B",completedCourseArrCopy),
                createCourse("Economics","History",false,"ECON",completedCourseArrCopy)
            ]
        ],
        [
            //tri 4-6
            [
                createCourse("Geometry 1A","Math",false,"GEOM-1A",completedCourseArrCopy),
                createCourse("Sophomore English A","English",false,"SOE-A",completedCourseArrCopy),
                createCourse("Foreign Language","Elective",false,"LANG-A",completedCourseArrCopy)
            ],
            [
                createCourse("Geometry 1B","Math",false,"GEOM-1B",completedCourseArrCopy),
                createCourse("Sophomore English B","English",false,"SOE-B",completedCourseArrCopy),
                createCourse("Foreign Language","Elective",false,"LANG-B",completedCourseArrCopy)
            ],
            [
                createCourse("Government","History",false,"GOV",completedCourseArrCopy),
                createCourse("Chemistry/Physics","Science",false,"CHEM/PHYS-A",completedCourseArrCopy),
                createCourse("Health","Elective",false,"HEALTH",completedCourseArrCopy)
            ]
        ],
        [
            //tri 7-9
            [
                createCourse("Algebra 2A","Math",false,"ALG-2A",completedCourseArrCopy),
                createCourse("Junior English A","English",false,"JUE-A",completedCourseArrCopy),
                createCourse("Arts","Elective",false,"ART-A",completedCourseArrCopy)
            ],
            [
                createCourse("Algebra 2B","Math",false,"ALG-2B",completedCourseArrCopy),
                createCourse("Junior English B","English",false,"JUE-A",completedCourseArrCopy),
                createCourse("Chemistry/Physics","Science",false,"CHEM/PHYS-B",completedCourseArrCopy)
            ],
            [
                createCourse("American History A","History",false,"AMH-A",completedCourseArrCopy),
                createCourse("Science Elective","Science",false,"SCI-A",completedCourseArrCopy),
                createCourse("Arts","Elective",false,"ART-B",completedCourseArrCopy)
            ]
        ],
        [
            //tri 10-12
            [
                createCourse("Math Elective","Math",false,"MATH-A",...completedCourseArr),
                createCourse("Senior English A","English",false,"SE-A",...completedCourseArr),
                createCourse("American History B","History",false,"AMH-B",...completedCourseArr)
            ],
            [
                createCourse("Math Elective","Math",false,"MATH-B",...completedCourseArr),
                createCourse("Senior English B","English",false,"SE-B",...completedCourseArr),
                createCourse("Foreign Language/Arts","Elective",false,"LANG/ART-2A",...completedCourseArr)
            ],
            [
                createCourse("Physical Education","Elective",false,"PHYSED",...completedCourseArr),
                createCourse("Science Elective","Science",false,"SCI-B",...completedCourseArr),
                createCourse("Foreign Language/Arts","Elective",false,"LANG/ART-2B",...completedCourseArr)
            ]
        ]
    ]
    return schedule
}


module.exports = {
    createSchedule
}