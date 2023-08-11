import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Metadata } from 'next';

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import TeamMembersCard from "@/components/cards/team/TeamMembersCard";
import ProjectsCard from "@/components/cards/team/ProjectsCard";

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

        const isMember = await prisma.team.findUnique({
            where: { id: params.id },
            select: {
              members: {
                select: {
                  id: true
                },
                where: {
                  id: user?.id
                }
              }
            }
        })

        if(!isMember){
            console.log('not a member')
            redirect('/home') 
            // TODO: redirect to custom 404 page
        }
        else{
            console.log('is a member')
        }

        const team = await prisma.team.findUnique({
            where: {
                id: params.id,
        }});

        const members = await prisma.team.findUnique({
            where: { id: params.id },
            select: {
                members: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                }
            }
        })

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
                        <div className="flex justify-around">
                            <TeamMembersCard members={members} />
                            <div className="">
                                <ProjectsCard projects={projects} team={team?.name}/>
                            </div>
                            
                        </div>

                        <p>{JSON.stringify(team)}</p>
                        <p>{JSON.stringify(members)}</p>
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