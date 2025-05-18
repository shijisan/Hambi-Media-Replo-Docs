"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Documentation } from "@prisma/client";
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function DocumentationView() {

	type DocWithAuthor = Documentation & {
		author: {
			name: string;
		};
	};


	const [doc, setDoc] = useState<DocWithAuthor | null>(null);
	const params = useParams();

	useEffect(() => {
		if (!params?.docId) return;

		const fetchDoc = async () => {
			try {
				const res = await fetch(`/api/docs/${params.docId}`);
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
	}, [params?.docId]);

	return (
		<main>
			{doc ? (
				<>
					<h1>{doc.title}</h1>
					<h6>Author: {doc?.author?.name}</h6>
					<h6>Updated on: {new Date(doc.updatedAt).toLocaleString()}</h6>
					<MarkdownPreview className="markdown" source={doc?.content || ''} />

				</>
			) : (
				<p>Loading doc...</p>
			)}
		</main>
	);
}
