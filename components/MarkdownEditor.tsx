"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const MarkdownEditor: React.FC = () => {
	const [value, setValue] = useState<string>("**Hello Boss C!** 🧠");
	const [title, setTitle] = useState("");
	const [tagsInput, setTagsInput] = useState("");
	const [loading, setLoading] = useState(false);

	const createDoc = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const tags = tagsInput
			.split(",")
			.map((tag) => tag.trim())
			.filter(Boolean);

		const res = await fetch("/api/admin/docs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				content: value,
				tags,
			}),
		});

		if (res.ok) {
			alert("Document created!");
			setTitle("");
			setValue("");
			setTagsInput("");
		} else {
			alert("Failed to create document");
		}
		setLoading(false);
	};

	return (
		<form className="flex flex-col gap-4" onSubmit={createDoc}>
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className="border p-2 rounded"
				required
			/>
			<MDEditor value={value} onChange={(val) => setValue(val || "")} preview="live" previewOptions={{ className: "markdown" }} />
			<textarea
				placeholder="Add tags/keywords here (tag1, tag2, tag3)"
				value={tagsInput}
				onChange={(e) => setTagsInput(e.target.value)}
				className="border p-2 rounded"
			/>
			<button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">
				{loading ? "Creating..." : "Create Doc"}
			</button>
		</form>
	);
};

export default MarkdownEditor;
