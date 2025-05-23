  interface FetchedDocsProps {
    docs: any[];
    onOpen: (docId: string) => void;
  }

  interface Doc {
  id: string;
  title: string;
  createdAt: string | Date;
}


  export default function FetchedDocs({ docs, onOpen }: FetchedDocsProps) {
    return (
      <>
        {docs.length === 0 ? (
          <p>No docs found</p>
        ) : (
          <ul className="text-foreground grid md:grid-cols-4 grid-cols-1 gap-4 mt-16">
            {docs.map((doc: Doc) => (
              <li
                className="flex flex-col cursor-pointer border p-4 rounded-sm transition-all hover:bg-foreground/10"
                key={doc.id}
                onClick={() => onOpen(doc.id)}
              >
                <p>{doc.title}</p>
                <p>{new Date(doc.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
