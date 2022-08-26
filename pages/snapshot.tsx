interface Student {
    "s_id": number,
    "email": string,
    "fname": string,
    "lname": string,
    "program": string,
    "year": number,
    "gpa": string,
}

interface Course {
    "c_id": number,
    "dept": string,
    "code": string,
    "title": string,
    "description": string,
    "prof": string,
    "units": number,
    "semester": string,
}

interface StuCou {
    "id": number,
    "student_id": string,
    "course_id": string,
}

export default function snapshot({ students, courses, stuCou }: {students: Student[], courses: Course[], stuCou: StuCou[]}) {

    return (
        <div className="flex flex-col w-[85%] mx-auto my-20 text-center space-y-10">
            <h1 className="text-2xl font-mono font-bold">Current DB instance:</h1>
            <hr className="my-10"/>
            
            {/* STUDENT ROWS */}
            <span className="text-lg underline font-mono font-semibold text-pink-800">Students:</span>
            <table className="table-fixed m-2">
                <thead>
                    <tr className="[&>*]:border [&>*]:border-black">
                        <th>S_Id</th>
                        <th>Email</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Program</th>
                        <th>Year</th>
                        <th>GPA</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student: Student, index: number) => (
                        <tr className="[&>*]:border [&>*]:p-2 [&>*]:border-black" key={index}>
                            <td>{student.s_id}</td>
                            <td>{student.email}</td>
                            <td>{student.fname}</td>
                            <td>{student.lname}</td>
                            <td>{student.program}</td>
                            <td>{student.year}</td>
                            <td>{student.gpa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* COURSE ROWS */}
            <span className="text-lg underline font-mono font-semibold text-pink-800">Courses:</span>
            <table className="table-fixed m-2">
                <thead>
                    <tr className="[&>*]:border [&>*]:border-black">
                        <th>C_Id</th>
                        <th>Dept.</th>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Descr.</th>
                        <th>Prof.</th>
                        <th>#Units</th>
                        <th>Semester</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course: Course, index: number) => (
                        <tr className="[&>*]:border [&>*]:p-2 [&>*]:border-black" key={index}>
                            <td>{course.c_id}</td>
                            <td>{course.dept}</td>
                            <td>{course.code}</td>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td>{course.prof}</td>
                            <td>{course.units}</td>
                            <td>{course.semester}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export async function getServerSideProps() {

    // Fetch Students from API
    const studentsRes = await fetch(`http://skool-rest-api.herokuapp.com/api/students`);
    const studentsData: { students: Student[] } = await studentsRes.json();
    const students: Student[] = studentsData.students;

    // Fetch Courses from API
    const coursesRes = await fetch(`http://skool-rest-api.herokuapp.com/api/courses`);
    const coursesdata: { courses: Course[] } = await coursesRes.json();
    const courses: Course[] = coursesdata.courses;

    // Fetch StuCou's from API
    const stuCouRes = await fetch(`http://skool-rest-api.herokuapp.com/api/stucou`);
    const stuCouData: { stuCouData: StuCou[] } = await stuCouRes.json();
    const stuCou: StuCou[] = stuCouData.stuCouData;
    
    // Pass data to the page via props
    return { props: { students, courses, stuCou } }
}