import Link from "next/link"
import ThemeToggleButton from "./ThemeToggleButton"
import Image from "next/image"

export default function Nav() {
    return (
        <>
            <nav className="fixed top-0 left-0 w-full max-h-[8vh] h-full flex md:px-[10vw] px-4 z-50 text-white">

                <div className="w-1/2 flex items-center md:gap-4">
                    <Image src="/logo.png" className="h-[4vh]" alt="logo" />
                    <h1 className="h-min text-3xl gg">Replo Docs</h1>
                </div>
                <ul className="w-1/2 flex items-center justify-between">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/account">Account</Link></li>
                    <li><ThemeToggleButton /></li>
                </ul>
            </nav>
        </>
    )
}