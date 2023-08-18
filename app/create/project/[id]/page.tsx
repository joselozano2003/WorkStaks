import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { prisma } from "@/lib/prisma";

import CreateProjectCard from "../CreateProjectCard";

import { getTeam, getUser } from "@/lib/functions";

import type { User } from "@prisma/client";

interface Props {
    params: {
      id: string;
    };
}

export const metadata = {
	title: "Create Project",
	description: "Create a project for your team",
};

export default async function CreateProjectPage({ params }: Props) {
	

	const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin')
    }

    const currentUserEmail = session?.user?.email!;

    const user: User = await getUser(currentUserEmail)

	const team: any = await getTeam(params.id);
		  
	const isMember = team?.members.some((member: any) => member.id === user?.id);

	if(!isMember){
		redirect('/home') 
		// TODO: redirect to custom 403 page
	}


	return (
		<div className="flex flex-col items-center m-0 min-h-[calc(100vh-64px)] justify-center">
			<CreateProjectCard team={team}/>
		</div>
	);
}