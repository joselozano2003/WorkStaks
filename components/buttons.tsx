'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";


export function SignInButton(){
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p className="text-xl font-semibold">Loading...</p>
    }

    if (status === 'authenticated') {
        return (
           <></>
        );
    }

    return <button className="btn" onClick={() => signIn()}>Sign In</button>
}


export function SignOutButton(){
    return <button className="btn btn-warning ml-2 text-center" onClick={() => signOut()}>Sign Out</button>
}

export function MobileSignOutButton(){
    return <button className="btn btn-warning btn-sm m-1 text-center" onClick={() => signOut()}>Sign Out</button>
}
