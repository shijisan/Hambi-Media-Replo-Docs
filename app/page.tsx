import DocSearch from "@/components/DocSearch";

export default function HomePage() {
	return (
		<>

			<main>
				<header className="py-[8vh] px-[10vw] flex">
					<div className="w-1/2">
						<h1 className="text-5xl font-medium gg">Hello Trainee! 👋</h1>
						<br />
						<h2 className="text-xl">Welcome to Hambi Media's Replo Documentation</h2>
						<br />
						<p className="max-w-lg">
							This is a private asset, please do not share. This web app compiles and translates your HTML, CSS, Javascript way of thinking into Replo's way of execution!
						</p>

						<div className="flex gap-2 mt-8">
							<DocSearch />
							<button className="rounded-e-full btn bg-teal-600 font-medium h-fit">Log In</button>
						</div>
					</div>
					<div className="w-1/2 flex justify-center items-center">
						<img className="w-3/4" src="/hero.svg" alt="Hero image" />
					</div>

				</header>

				<section className="px-[10vw]">
					<h1 className="gg text-5xl">New Here? Follow the Roadmap! 🗺️</h1>
					{/* here fetch the roadmap docblocks */}
				</section>
			</main>


		</>
	);
}
