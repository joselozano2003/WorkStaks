import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import TeamsCard from "@/components/cards/team/TeamsCard";

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

    const teams = await prisma.team.findMany({
        where: {
            members:{
                some: {
                    id: user?.id
                }
            }
        },
        orderBy: {
            name: 'asc'
        }
    });

    return (
        <div className="p-5">
            <div id="header" className="flex flex-col items-center mb-5">
                <p className='text-center font-bold text-2xl mb-4'>Welcome {session?.user?.name}</p>
                <p className="text-center btn btn-primary btn-sm items-center">
                    <Link href="/dashboard">Edit Profile</Link>
                </p>
            </div>

            <div id="content">
                <div className="flex flex-wrap justify-center">
                    <TeamsCard teams={teams}/>
                </div>
            </div>
        </div>
    )
}
