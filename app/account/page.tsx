"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Account() {

    const { data: session, update } = useSession();
    const router = useRouter();

    useEffect(() => {
        const refreshSession = async () => {
            await update();
        };
        refreshSession();
    }, [update]);





    return (
        <>
            <main className="flex justify-center items-center w-full min-h-[90vh]">
                <div className="flex flex-col card shadow-md">
                    <div className="flex justify-center items-center gap-8">
                        <Image src={session?.user.image || "https://placehold.co/32/webp"} height={64} width={64} alt="User profile photo" className="rounded-full" />
                        <div>
                            <p>{session?.user.name}</p>
                            <p>{session?.user.email}</p>
                            <p>{session?.user.role}</p>
                        </div>
                    </div>
                    <hr className="my-4 opacity-15" />
                    <div className="flex gap-4">
                        {session?.user.role === "ADMIN" && (
                            <button className="bg-blue-500 btn" onClick={() => router.push("/admin")}>View Admin Dashboard</button>
                        )}
                        <button className="bg-red-500 btn" onClick={() => signOut({ callbackUrl: "/auth/signin" })}>Sign Out</button>
                    </div>
                </div>
            </main>
        </>
    )
}