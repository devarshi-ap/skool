import EndpointItem from "./components/endpointItem";

export default function Custom404() {
    
    const baseURL: string = "https://skool-rest-api.herokuapp.com/api";

    return (
        <div className="flex flex-col w-[50%] mx-auto mt-20">

            <div className="flex flex-col w-full items-center place-content-center h-[30vh] font-mono border-b-[1px] border-slate-400 space-y-5" >
                <span className="text-6xl animate-pulse">🏴‍☠️</span>
                <h1 className="text-2xl">Ahoy matey! This here be a 404 page.</h1>
                <h2 className="text-xl border-slate-500">The API entrypoint is @ <a href={baseURL}>/api</a></h2>
            </div>

            <ul className="px-5 my-10 font-light space-y-10">

                <EndpointItem 
                    endpoint='/students'
                    endpointText='/ students'
                    verbs={['GET-get all students', 'POST-create new student']}
                />

                <EndpointItem 
                    endpoint='/students/2'
                    endpointText='/ students / {s-id}'
                    verbs={['GET-get student with s_id', 'PATCH-update student with s_id', 'DELETE-remove student with s_id']}
                />

                <EndpointItem 
                    endpoint='/students/2/courses'
                    endpointText='/ students / {s-id} / courses'
                    verbs={['GET-get courses of student with s_id']}
                />

                <EndpointItem 
                    endpoint='/students/2/courses/2'
                    endpointText='/ students / {s-id} / courses / {c-id}'
                    verbs={['PUT-enrol student with s_id into course with c_id', 'DELETE-drop student with s_id out of course with c_id']}
                />

                <EndpointItem 
                    endpoint='/courses'
                    endpointText='/ courses'
                    verbs={['GET-get all courses offered', 'POST-create (offer) a new course']}
                />

                <EndpointItem 
                    endpoint='/courses/1'
                    endpointText='/ courses / {c-id}'
                    verbs={['GET-get courses with c_id', 'DELETE-remove (no longer offer) course with c_id']}
                />

                <EndpointItem 
                    endpoint='/profs'
                    endpointText='/ profs'
                    verbs={['GET-get all profs', 'POST-create new prof']}
                />

            </ul>
        </div>
    );
}
