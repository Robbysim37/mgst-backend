
// schedule contains 4 "year" arrays
// Each year contains 3 "trimester" arrays
// each trimester contains 3 "class" objects


const createCourse = (className,creditType,completed,notes,classCode,completedCourseStr) => {

    const completedCourseArr = completedCourseStr.split(`:`)
    console.log(completedCourseArr)

    const course = 
    {
        name: className,
        creditType: creditType,
        completed: completed,
        notes: notes,
        classCode:classCode,
        creditAmount: .5
    }
    
    if(completedCourseArr.length > 0 && completedCourseArr.includes(course.name)){
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
                createCourse("Algebra 1A","Math",false,"","ALG-1A",completedCourseStr),
                createCourse("Freshman English A","English",false,"FRE-A",completedCourseStr),
                createCourse("World History A","History",false,"WH-A",completedCourseStr)
            ],
            [
                createCourse("Algebra 1B","Math",false,"","ALG-1B",completedCourseStr),
                createCourse("Freshman English B","English",false,"FRE-B",completedCourseStr),
                createCourse("Bio A","Science",false,"BIO-A",completedCourseStr)
            ],
            [
                createCourse("World History B","History",false,"WH-B",completedCourseStr),
                createCourse("Bio B","Science",false,"BIO-B",completedCourseStr),
                createCourse("Economics","History",false,"ECON",completedCourseStr)
            ]
        ],
        [
            //tri 4-6
            [
                createCourse("Geometry 1A","Math",false,"GEOM-1A",completedCourseStr),
                createCourse("Sophomore English A","English",false,"SOE-A",completedCourseStr),
                createCourse("Foreign Language","Elective",false,"LANG-A",completedCourseStr)
            ],
            [
                createCourse("Geometry 1B","Math",false,"GEOM-1B",completedCourseStr),
                createCourse("Sophomore English B","English",false,"SOE-B",completedCourseStr),
                createCourse("Foreign Language","Elective",false,"LANG-B",completedCourseStr)
            ],
            [
                createCourse("Government","History",false,"GOV",completedCourseStr),
                createCourse("Chemistry/Physics","Science",false,"CHEM/PHYS-A",completedCourseStr),
                createCourse("Health","Elective",false,"HEALTH",completedCourseStr)
            ]
        ],
        [
            //tri 7-9
            [
                createCourse("Algebra 2A","Math",false,"ALG-2A",completedCourseStr),
                createCourse("Junior English A","English",false,"JUE-A",completedCourseStr),
                createCourse("Arts","Elective",false,"ART-A",completedCourseStr)
            ],
            [
                createCourse("Algebra 2B","Math",false,"ALG-2B",completedCourseStr),
                createCourse("Junior English B","English",false,"JUE-A",completedCourseStr),
                createCourse("Chemistry/Physics","Science",false,"CHEM/PHYS-B",completedCourseStr)
            ],
            [
                createCourse("American History A","History",false,"AMH-A",completedCourseStr),
                createCourse("Science Elective","Science",false,"SCI-A",completedCourseStr),
                createCourse("Arts","Elective",false,"ART-B",completedCourseStr)
            ]
        ],
        [
            //tri 10-12
            [
                createCourse("Math Elective","Math",false,"MATH-A",completedCourseStr),
                createCourse("Senior English A","English",false,"SE-A",completedCourseStr),
                createCourse("American History B","History",false,"AMH-B",completedCourseStr)
            ],
            [
                createCourse("Math Elective","Math",false,"MATH-B",completedCourseStr),
                createCourse("Senior English B","English",false,"SE-B",completedCourseStr),
                createCourse("Foreign Language/Arts","Elective",false,"LANG/ART-2A",completedCourseStr)
            ],
            [
                createCourse("Physical Education","Elective",false,"PHYSED",completedCourseStr),
                createCourse("Science Elective","Science",false,"SCI-B",completedCourseStr),
                createCourse("Foreign Language/Arts","Elective",false,"LANG/ART-2B",completedCourseStr)
            ]
        ]
    ]
    return schedule
}


module.exports = {
    createSchedule
}