"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditorProps {
	onDocCreated: () => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ onDocCreated }) => {
	const [value, setValue] = useState<string>("Write markdown format documentation here...");
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
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, content: value, tags }),
		});

		if (res.ok) {
			alert("Document created!");
			setTitle("");
			setValue("");
			setTagsInput("");
			onDocCreated();
		} else {
			alert("Failed to create document");
		}

		setLoading(false);
	};

	return (
		<form className="flex flex-col gap-4" onSubmit={createDoc}>
			<MDEditor value={value} onChange={(val) => setValue(val || "")} preview="live" style={{height: "40vh"}} previewOptions={{ className: "markdown" }} />
			<div className="flex gap-4">
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="border p-2 rounded max-w-sm w-full"
					required
				/>
				<textarea
					placeholder="Add tags/keywords here (tag1, tag2, tag3, etc...)"
					value={tagsInput}
					onChange={(e) => setTagsInput(e.target.value)}
					className="border p-2 rounded w-full"
				/>
			</div>
			<button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">
				{loading ? "Creating..." : "Create Doc"}
			</button>
		</form>
	);
};

export default MarkdownEditor;
