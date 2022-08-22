interface EndpointProps {
    endpoint: string,
    endpointText: string,
    verbs: string[],
}

export default function EndpointItem({ endpoint, endpointText, verbs}: EndpointProps) {
    
    const baseURL: string = "https://skool-rest-api.herokuapp.com/api";

    const verbsList: any = verbs.map((verb: string, index: number) => (
        <li key={index}><code>{verb.split("-")[0]}</code> - {verb.split("-")[1]}.</li>
    ))

    return(
        <li>
            <a href={`${baseURL}${endpoint}`} className="text-[#2563eb] text-xl">{endpointText}</a>
            <ul className="list-disc text-sm mt-2">
                {verbsList}
            </ul>
        </li>
    )
}