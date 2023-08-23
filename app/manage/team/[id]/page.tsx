import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";
import { getTeam, getUser } from "@/lib/functions";

import { User } from "@prisma/client";

import ManageTeamPage from "../ManageTeamPage";
import { Metadata } from "next";

interface Props {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const team: any = await getTeam(params.id);
	return { title: `Manage ${team?.name}` };
}

export default async function ManageTeam({ params }: Props){

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin')
    }

    const currentUserEmail = session?.user?.email;

    const user: User = await getUser(currentUserEmail);

    const team = await getTeam(params.id);

    if (team?.ownerId != user?.id) {
        redirect('/home')
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold text-center">Manage {team.name}</h1>
            <ManageTeamPage team={team} />
        </div>

    )




}