import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/prisma";


export const metadata = {
    title: 'Home',
    description: 'Home page',
};

export default async function Home() {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin')
    }

    const currentUserEmail = session?.user?.email!;

    const user = await prisma.user.findUnique({
        where: {
          email: currentUserEmail,
        },
    });

    // const teams = await prisma.team.findMany({
    //     where: {
    //         members:{

    //         }
    //     }
    // });

    return (
        <div className="p-5">
            <div id="header" className="flex flex-col items-center">
                <p className='text-center font-bold text-2xl mb-4'>Welcome {session?.user?.name}</p>
                <p className="text-center btn btn-primary btn-sm items-center">
                    <Link href="/dashboard">Edit Profile</Link>
                </p>
            </div>

            <div id="content">
                <div>
                    <div id="teams" className="card w-60 bg-neutral shadow-xl text-neutral-content">
                        <div className="card-body">
                            <h2 className="card-title justify-center">My Teams</h2>
                            <hr />
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-secondary">Join</button>
                                <Link href="create/team">
                                    <button className="btn btn-primary">Create</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
