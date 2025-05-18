import { useEffect, useState } from "react";

export default function FetchedDocs() {

    const [docs, setDocs] = useState([]);

    const fetchDocs = async () => {
        const res = await fetch("/api/admin/docs/0");
        if (res.ok) {
            const data = await res.json();
            setDocs(data);
        }
        else {
            console.error("Failed to fetch docs");
        }
    };

    useEffect(() => {
        fetchDocs();
    }, [])

    return (
        <>
            {docs.length === 0 ? (
            <p>No docs found</p>
            )
            :
            (
            <ul className="text-foreground">
                {docs.map((doc: any) => (
                    <li className="flex flex-col" key={doc.id}>
                        <p>{doc.title}</p>
                        <p>{new Date(doc.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
            )}
        </>
    )
}