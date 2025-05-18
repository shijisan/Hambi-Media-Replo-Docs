"use client"

import { signIn } from "next-auth/react"

export default function SignIn(){
    return(
        <>
        <main>
            <h1>Sign In your Hambi Media Domain Account</h1>
            <button onClick={() => signIn("google", {redirectTo: "/account"})}>Sign In using Google</button>
        </main>
        </>
    )
}