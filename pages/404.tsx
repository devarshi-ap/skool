import RouteListItem from "./components/RouteListItem";

export default function Custom404() {
    
    const baseURL: string = "https://skool-rest-api.herokuapp.com/api";

    return (
        <div className="flex flex-col w-[80%] mx-auto mt-20">

            <div className="flex flex-col w-full items-center place-content-center h-[30vh] font-mono border-b-[1px] border-slate-400 space-y-5" >
                <span className="text-6xl animate-pulse">🏴‍☠️</span>
                <h1 className="text-2xl">Ahoy matey! This here be a 404 page.</h1>
                <h2 className="text-xl border-slate-500">The API entrypoint is @ <a href={baseURL}>/api</a></h2>
            </div>

            <ul className="px-5 my-10 font-light space-y-10">

                <RouteListItem 
                    endpoint='/students'
                    endpointText='/ students'
                    verbs={['GET-get all students', 'POST-create new student']}
                    serverJSON={{
                        "GET": {
                            "exUrl": "/students",
                            "req": {},
                            "res": {"students":[{"s_id":1,"email":"frank.ocean@ryerson.ca","fname":"Frank","lname":"Ocean","program":"Architecture","year":2,"gpa":"3.5"}]},
                        },
                        "POST": {
                            "exUrl": "/students",
                            "req": {"email": "k.dot@ryerson.ca", "fname": "Kendrick", "lname": "Lamar", "program": "Mathematics", "year": 3, "gpa": "4.3"},
                            "res": {"student": {"s_id": 2, "email": "k.dot@ryerson.ca", "fname": "Kendrick", "lname": "Lamar", "program": "Mathematics", "year": 3, "gpa": "4.3"}}
                        },
                    }}
                />

                <RouteListItem 
                    endpoint='/students/2'
                    endpointText='/ students / {s-id}'
                    verbs={['GET-get student with s_id', 'PATCH-update student with s_id', 'DELETE-remove student with s_id']}
                    serverJSON={{
                        "GET": {
                            "exUrl": "/students/1",
                            "req": {},
                            "res": {"student":[{"s_id":1,"email":"frank.ocean@ryerson.ca","fname":"Frank","lname":"Ocean","program":"Architecture","year":2,"gpa":"3.5"}]},
                        },
                        "PATCH": {
                            "exUrl": "/students/1",
                            "req": {"s_id":1,"email":"frank.ocean@ryerson.ca","fname":"Frank","lname":"Ocean","program":"Architecture","year":3,"gpa":"3.85"},
                            "res": {"student": {"s_id": 1, "email": "frank.ocean@ryerson.ca", "fname": "Frank", "lname": "Ocean", "program": "Architecture", "year": 3, "gpa": "3.85"}}
                        },
                        "DELETE": {
                            "exUrl": "/students/1",
                            "req": {},
                            "res": {"student": {"s_id": 1, "email": "frank.ocean@ryerson.ca", "fname": "Frank", "lname": "Ocean", "program": "Architecture", "year": 3, "gpa": "3.85"}}
                        },
                    }}
                />

                <RouteListItem 
                    endpoint='/students/2/courses'
                    endpointText='/ students / {s-id} / courses'
                    verbs={['GET-get courses of student with s_id']}
                    serverJSON={{
                        "GET": {
                            "exUrl": "/students/1/courses",
                            "req": {},
                            "res": {"courses": [{"id": 2, "student_id": 1, "course_id": 2 }, {"id": 3, "student_id": 1, "course_id": 3 }]}
                        },
                    }}
                />

                <RouteListItem 
                    endpoint='/students/2/courses/2'
                    endpointText='/ students / {s-id} / courses / {c-id}'
                    verbs={['PUT-enrol student with s_id into course with c_id', 'DELETE-drop student with s_id out of course with c_id']}
                    serverJSON={{
                        "PUT": {
                            "exUrl": "/students/2/courses/1",
                            "req": {},
                            "res": {"message": "Successfully enrolled Student (id: 2) into Course with id: 1", "courses": {"id": 7, "student_id": 2, "course_id": 1}}
                        },
                        "DELETE": {
                            "exUrl": "/students/2/courses/1",
                            "req": {},
                            "res": {"message": "Successfully dropped Student (id: 2) out of Course (id: 1)"}
                        },
                    }}
                />

                <RouteListItem 
                    endpoint='/courses'
                    endpointText='/ courses'
                    verbs={['GET-get all courses offered', 'POST-create (offer) a new course']}
                    serverJSON={{
                        "GET": {
                            "exUrl": "/courses",
                            "req": {},
                            "res": {"courses": [
                                    {"c_id": 2,"dept": "Architectural Sciences","code": "ASC303","title": "Structures II","description": "This course explores...","prof": "George Kapelos", "units": 1, "semester": "winter"},
                                    {"c_id": 1,"dept": "Computer Science","code": "CPS530","title": "Web Systems Development","description": "This course covers...","prof": "Denis Hamelin","units": 1,"semester": "fall"}
                                ]}
                        },
                        "POST": {
                            "exUrl": "/courses",
                            "req": {"dept": "English", "code": "ELA330", "title": "Modern Fantasy Literature", "description": "This course analyzes...", "prof": "Rick Riordan", "units": 1, "semester": "spring"},
                            "res": {"course": {"c_id": 5, "dept": "English", "code": "ELA330", "title": "Modern Fantasy Literature", "description": "This course analyzes...", "prof": "Rick Riordan", "units": 1, "semester": "spring"}}
                        },
                    }}
                />

                <RouteListItem 
                    endpoint='/courses/2'
                    endpointText='/ courses / {c-id}'
                    verbs={['GET-get courses with c_id', 'DELETE-remove (no longer offer) course with c_id']}
                    serverJSON={{
                        "GET": {
                            "exUrl": "/courses/5",
                            "req": {},
                            "res": {"course": {"c_id": 5, "dept": "English", "code": "ELA330", "title": "Modern Fantasy Literature", "description": "This course analyzes...", "prof": "Rick Riordan", "units": 1, "semester": "spring"}}
                        },
                        "DELETE": {
                            "exUrl": "/courses/5",
                            "req": {},
                            "res": {"course": {"c_id": 5, "dept": "English", "code": "ELA330", "title": "Modern Fantasy Literature", "description": "This course analyzes...", "prof": "Rick Riordan", "units": 1, "semester": "spring"}}
                        }
                    }}
                />

                <RouteListItem 
                    endpoint='/profs'
                    endpointText='/ profs'
                    verbs={['GET-get all profs', 'POST-create new prof']}
                    serverJSON={{
                        "GET": {
                            "exUrl": "/profs",
                            "req": {},
                            "res": {"profs": [{"p_id": 1, "email": "denis.hamelin@ryerson.ca", "fname": "Denis", "lname": "Hamelin", "faculty": "Computer Science", "tenured": false }]}
                        },
                        "POST": {
                            "exUrl": "/profs",
                            "req": {"email": "drake@uoft.ca", "fname": "Aubrey", "lname": "Graham", "faculty": "Chemistry", "tenured": false},
                            "res": {"prof": {"p_id": 4, "email": "drake@uoft.ca", "fname": "Aubrey", "lname": "Graham", "faculty": "Chemistry", "tenured": false}}
                        },
                    }}
                />

            </ul>
        </div>
    );
}
