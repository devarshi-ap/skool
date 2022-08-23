import { Prism } from '@mantine/prism';
import { useState } from 'react';

interface RouteItemProps {
    endpoint: string,
    endpointText: string,
    verbs: string[],
    serverJSON: any,
}

export default function RouteListItem({ endpoint, endpointText, verbs, serverJSON}: RouteItemProps) {
    
    const baseURL: string = "https://skool-rest-api.herokuapp.com/api";
    const [showReq, setShowReq] = useState(false);
    const [showRes, setShowRes] = useState(false);

    const toggleShowReq = () => {
        setShowReq(!showReq);
    }

    const toggleShowRes = () => {
        setShowRes(!showRes);
    }

    let verbsList: any;
    if (verbs && serverJSON) {
        verbsList = verbs.map((verb: string, index: number) => (
            <>
                <li key={index}><code>{verb.split("-")[0]}</code> - {verb.split("-")[1]}.</li>
                <div className="flex flex-col w-full space-y-3 my-8">
                    <button className='bg-slate-300 text-black p-1' onClick={toggleShowReq}>{showReq ? "▾ Hide" : "‣ Show"} Request : {serverJSON[verb.split("-")[0]].exUrl}</button>
                    {showReq && (
                        <Prism language="json" colorScheme="dark">{
                            JSON.stringify(serverJSON[verb.split("-")[0]]['req'], null, 2).length == 2 ? "No Request Body Required." : JSON.stringify(serverJSON[verb.split("-")[0]]['req'], null, 2)
                        }</Prism>
                    )}
                    
                    <button className='bg-slate-300 text-black p-1' onClick={toggleShowRes}>{showRes ? "▾ Hide" : "‣ Show"} Response</button>
                    {showRes && (
                        <Prism language="json" colorScheme="dark">{JSON.stringify(serverJSON[verb.split("-")[0]]['res'], null, 2)}</Prism>
                    )}
                </div>
            </>
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