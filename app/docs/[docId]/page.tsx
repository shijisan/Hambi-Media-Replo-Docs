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
				const res = await fetch(`/api/docs/id/${params.docId}`);
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
		<main className="flex items-start justify-center w-full min-h-screen pt-[5vh]">
			{doc ? (
				<>
					<div className="max-w-3xl h-fit w-full border border-neutral-300 p-6 doc flex flex-col gap-2">
						<h1 className="text-3xl">{doc.title}</h1>
						<h6 className="text-xs">Author: {doc?.author?.name}</h6>
						<h6 className="text-xs">Updated on: {new Date(doc.updatedAt).toLocaleString()}</h6>
						<MarkdownPreview style={{backgroundColor: "transparent", marginTop: "1rem"}} className="markdown" source={doc?.content || ''} />
					</div>

				</>
			) : (
				<p>Loading doc...</p>
			)}
		</main>
	);
}
