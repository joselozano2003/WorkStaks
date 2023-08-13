import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Metadata } from 'next';

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import TeamMembersCard from "@/components/cards/team/TeamMembersCard";
import ProjectsCard from "@/components/cards/project/ProjectsCard";
import Link from "next/link";

interface Props {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const user = await prisma.team.findUnique({ where: { id: params.id } });
	return { title: `WorkStacks - ${user?.name}` };
}

export default async function Team({ params }: Props) {

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

    try{

        const team = await prisma.team.findUnique({
            where: { id: params.id },
            include: { 
                members: true,
                owner: true,
            },
        });
          
        const isMember = team?.members.some((member) => member.id === user?.id);

        if(!isMember){
            redirect('/home') 
            // TODO: redirect to custom 403 page
        }
        
        const members = team?.members


        const projects = await prisma.project.findMany({
            where: {
                team: {
                    id: params.id
                }
            }
        })

        return (
            <div className="p-5">
                <div id="content">
                    <div className="text-center">
                        <h1 className="font-bold text-2xl">{team?.name}</h1>
                        <h2 className="text-xl font-semibold">{team?.description}</h2>
                        {
                            team?.owner?.id === user?.id ? (
                                <Link href={`/edit/team/${team?.id}`} className="btn btn-primary">Manage Team</Link>
                            ) : (<></>)
                        }
                        <div className="flex flex-wrap justify-around mt-3">
                            <TeamMembersCard members={members} />
                            <div className="">
                                <ProjectsCard projects={projects} team={team}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    catch(err){
        console.log(err)
        redirect('/500')
    }
}