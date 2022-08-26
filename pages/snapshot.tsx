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
    "student_id": number,
    "course_id": number,
}

interface StuCouClean {
    "student_name": string,
    "course_code": string,
}


export default function snapshot({ students, courses, stuCou }: {students: Student[], courses: Course[], stuCou: StuCou[]}) {

    const getStudentNameById = (student_id: number): string => {
        const stu: Student = students.filter(student => { return student.s_id == student_id })[0];
        return stu.fname + stu.lname;
    }

    const getCourseCodeById = (course_id: number): string => {
        const cou: Course = courses.filter(course => { return course.c_id == course_id })[0];
        return cou.code;
    }

    let stuCouCleaned: StuCouClean[] = [];
    stuCou.forEach((stuCouInstance: StuCou) => {
        stuCouCleaned.push({
            "student_name": getStudentNameById(stuCouInstance.student_id),
            "course_code": getCourseCodeById(stuCouInstance.course_id),
        })
    })

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

            {/* STUDENT-COURSES ROWS */}
            <span className="text-lg underline font-mono font-semibold text-pink-800">Student-Courses:</span>
            <table className="table-fixed m-2">
                <thead>
                    <tr className="[&>*]:border [&>*]:border-black">
                        <th>Student Name</th>
                        <th>Course Code</th>
                    </tr>
                </thead>
                <tbody>
                    {stuCouCleaned.map((stuCou: StuCouClean, index: number) => (
                        <tr className="[&>*]:border [&>*]:p-2 [&>*]:border-black" key={index}>
                            <td>{stuCou.student_name}</td>
                            <td>{stuCou.course_code}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export async function getServerSideProps() {

    const baseURL: string = "https://skool-rest-api.herokuapp.com/";
    // const baseURL: string = "http://localhost:3000";

    // Fetch Students from API
    const studentsRes = await fetch(`${baseURL}/api/students`);
    const studentsData: { students: Student[] } = await studentsRes.json();
    const students: Student[] = studentsData.students;

    // Fetch Courses from API
    const coursesRes = await fetch(`${baseURL}/api/courses`);
    const coursesdata: { courses: Course[] } = await coursesRes.json();
    const courses: Course[] = coursesdata.courses;

    // Fetch StuCou's from API
    const stuCouRes = await fetch(`${baseURL}/api/stucous`);
    const stuCouData: { stuCouData: StuCou[] } = await stuCouRes.json();
    const stuCou: StuCou[] = stuCouData.stuCouData;
    
    // Pass data to the page via props
    return { props: { students, courses, stuCou } }
}