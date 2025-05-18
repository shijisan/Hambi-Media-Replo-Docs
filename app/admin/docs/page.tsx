"use client"

import MarkdownEditor from "@/components/MarkdownEditor";
import FetchedDocs from "@/components/admin/FetchedDocs";

export default function AdminBlogs() {
	return (
		<>
			<main className="min-h-screen p-6">
				<h1 className="text-2xl font-bold mb-4">📝 Welcome to Your Markdown Editor!</h1>
				<MarkdownEditor />
				<FetchedDocs />
			</main>
		</>
	)
}