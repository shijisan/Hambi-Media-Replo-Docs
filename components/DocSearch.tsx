"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DocSearch() {
	const [keyword, setKeyword] = useState("")
	const [results, setResults] = useState<any[]>([])

	const router = useRouter();

	const fetchSearch = async (searchTerm: string) => {
		const res = await fetch(`/api/docs/keyword/${searchTerm}`);
		const data = await res.json();
		setResults(data);
	};


	return (
		<>
			<div className="flex flex-col">
				<input
					type="search"
					className="rounded-s-full w-md"
					value={keyword}
					onChange={async (e) => {
						const value = e.target.value;
						setKeyword(value);
						if (value.trim().length > 3) {
							await fetchSearch(value);
						} else {
							setResults([]); // clear results if input is less than or equal to 3 chars
						}
					}}
					placeholder="Search docs..."
				/>


				<ul className="mt-1">
					{results.map((doc) => (
						<li className="bg-neutral-200 text-black px-4 py-1 rounded-sm hover:cursor-pointer hover:brightness-105" key={doc.id} onClick={() => router.push(`/docs/${doc.id}`)}>
							{doc.title}
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
