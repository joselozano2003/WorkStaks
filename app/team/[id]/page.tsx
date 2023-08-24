import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Metadata } from 'next';

import { redirect } from "next/navigation";

import type { User } from "@prisma/client";

import TeamMembersCard from "@/components/cards/team/TeamMembersCard";
import ProjectsCard from "@/components/cards/project/ProjectsCard";
import Link from "next/link";

import { getUser, getTeam, getProjects } from "@/lib/functions";

type Team = {
    id : string;
    name: string;
    description: string;
    owner: User;
    members: User[];
}

interface Props {
    params: {
        id: string;
    };
}



export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const team: Team = await getTeam(params.id);
	return { title: `WorkStacks - ${team?.name}` };
}


export default async function Team({ params }: Props) {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin')
    }

    const currentUserEmail = session?.user?.email;

    const user: User = await getUser(currentUserEmail);

    const team: Team = await getTeam(params.id);
   
    const isMember = team?.members.some((member: User) => member.id === user?.id);

    if(!isMember){
        redirect('/home') 
        // TODO: redirect to custom 403 page
    }
    
    const members = team?.members


    const projects = await getProjects(params.id);

    return (
        <div className="p-5">
            <div id="content">
                <div className="text-center">
                    <h1 className="font-bold text-3xl text-accent-focus">{team?.name}</h1>
                    <h2 className="text-lg font-semibold pb-3">{team?.description}</h2>
                    {
                        team?.owner?.id === user?.id ? (
                            <Link href={`/manage/team/${team?.id}`} className="btn btn-primary">Manage Team</Link>
                        ) : (<></>)
                    }
                    <div className="flex flex-wrap justify-around mt-3">
                        <TeamMembersCard members={members} />
                        <div className="mt-5 md:mt-0">
                            <ProjectsCard projects={projects} team={team}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}