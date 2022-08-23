interface RouteItemProps {
    endpoint: string,
    endpointText: string,
    verbs: string[],
}

export default function RouteListItem({ endpoint, endpointText, verbs}: RouteItemProps) {
    
    const baseURL: string = "https://skool-rest-api.herokuapp.com/api";
    let verbsList: any;
    if (verbs) {
        verbsList = verbs.map((verb: string, index: number) => (
            <li key={index}><code>{verb.split("-")[0]}</code> - {verb.split("-")[1]}.</li>
        ))
    } else {
        <li>Something went wrong</li>
    }

    return(
        <li>
            <a href={`${baseURL}${endpoint}`} className="text-[#2563eb] text-xl">{endpointText}</a>
            <ul className="list-disc text-sm mt-2">
                {verbsList}
            </ul>
        </li>
    )
}