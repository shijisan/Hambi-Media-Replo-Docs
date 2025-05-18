"use client"

import { useSession, signOut } from "next-auth/react"

export default function Account(){

    const {data: session, status} = useSession();
 
    return(
        <>
        <main>
            <p>{session?.user.name}</p>
            <p>{session?.user.role}</p>
            <p>{session?.user.email}</p>
            <button onClick={() => signOut({callbackUrl: "/auth/signin"})}>Sign Out</button>
        </main>
        </>
    )
}