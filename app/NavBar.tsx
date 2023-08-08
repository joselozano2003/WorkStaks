import AuthCheck from "@/components/AuthCheck"
import { SignInButton, SignOutButton, MobileSignOutButton } from "@/components/buttons"
import Link from "next/link"

export default function NavBar() {
    return (
        <nav id="navbar">
            <div className="navbar bg-neutral text-neutral-content min-h-[60px]">

                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] shadow rounded-box w-28 bg-neutral p-1 items-center">
                            <li><Link href="/home">Homepage</Link></li>
                            <li><a>DashBoard</a></li>
                            <AuthCheck>
                                <li><MobileSignOutButton /></li>
                            </AuthCheck>
                        </ul>
                    </div>
                </div>

                <div className="navbar-center">
                    <Link href="/" className="btn btn-ghost normal-case text-xl">WorkStaks</Link>
                </div>
                <div className="navbar-end">
                    <SignInButton />
                    <AuthCheck>
                        <button className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                        <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                        </button>
                    </AuthCheck>
                </div>
            </div>
        </nav>
    )
}