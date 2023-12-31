import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";
import Link from "next/link";

import { getTeams, getUser } from "@/lib/functions";

import TeamsCard from "@/components/cards/team/TeamsCard";
import { User } from "@prisma/client";

export const metadata = {
    title: 'WorkStaks- Home',
    description: 'Home page',
};

export default async function Home() {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin')
    }

    const userEmail = session?.user?.email!;

    const user: User = await getUser(userEmail);
    const teams = await getTeams(userEmail);


    return (
        <div className="p-5">
            <div id="header" className="flex flex-col items-center mb-5">
                <p className='text-center font-bold text-2xl mb-4'>Welcome {session?.user?.name}</p>
                <p className="text-center btn btn-primary btn-sm items-center">
                    <Link href={`/manage/user/${user?.id}`} target="_blank">Edit Profile</Link>
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
