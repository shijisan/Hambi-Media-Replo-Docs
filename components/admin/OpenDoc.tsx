"use client";

import { useEffect, useState } from "react";
import type { Documentation } from "@prisma/client";
import MarkdownPreview from "@uiw/react-markdown-preview";

type DocWithAuthor = Documentation & {
	author: {
		name: string;
	};
};

export default function OpenDoc({
	docId,
	onClose,
}: {
	docId: string;
	onClose: () => void;
}) {
	const [doc, setDoc] = useState<DocWithAuthor | null>(null);

	useEffect(() => {
		if (!docId) return;

		const fetchDoc = async () => {
			try {
				const res = await fetch(`/api/docs/id/${docId}`);
				if (res.ok) {
					const data = await res.json();
					setDoc(data);
				} else {
					console.error("Failed to fetch documentation.");
				}
			} catch (err) {
				console.error("Error fetching doc:", err);
			}
		};

		fetchDoc();
	}, [docId]);

	return (

		<>
			{doc ? (
				<div className="text-foreground p-6 rounded shadow-md h-full overflow-y-auto max-w-3xl w-full bg-background border">
					<div className="flex justify-end">
						<button onClick={onClose}>Close</button>
					</div>
					<div>
						<h1>{doc.title}</h1>
						<h6>Author: {doc?.author?.name}</h6>
						<h6>Updated on: {new Date(doc.updatedAt).toLocaleString()}</h6>
						<MarkdownPreview className="markdown" source={doc?.content || ""} />
					</div>
				</div>
			) : (
				<p>Loading doc...</p>
			)}
		</>

	);
}
