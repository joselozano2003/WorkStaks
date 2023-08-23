import { getUser, getUserWithId, getTeams } from "@/lib/functions";
import { Metadata } from "next";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import { User } from "@prisma/client";
import ProfileForm from "../ProfileForm";
import UserTeams from "../UserTeams";

import ClientPage from "./ClientPage";

interface Props {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const user: User = await getUserWithId(params.id);
	return { title: `Manage ${user?.name}` };
}

export default async function ManageUserProfile({ params }: Props){

    const session = await getServerSession(authOptions);
    
    if (!session) {
        redirect('/api/auth/signin')
    }

    const user: User = await getUserWithId(params.id);

    const currentUser = await getUser(session?.user?.email!);

    const teams = await getTeams(session?.user?.email!);

    if (currentUser?.id != user?.id) {
        redirect('/home')
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold text-center">Manage {user.name}</h1>
            <ClientPage user={user} teams={teams}/>
        </div>

    )
}