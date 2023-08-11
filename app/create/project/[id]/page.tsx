import CreateProjectForm from "../CreateProjectForm";
import cover from '@/public/team2.png'

import Image from "next/image";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { prisma } from "@/lib/prisma";


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

    const user = await prisma.user.findUnique({
        where: {
          email: currentUserEmail,
        },
    });

	const team = await prisma.team.findUnique({
		where: { id: params.id },
		include: { members: true },
	});
	  
	const isMember = team?.members.some((member) => member.id === user?.id);

	if(!isMember){
		redirect('/home') 
		// TODO: redirect to custom 403 page
	}


	



	
	return (
		<div>
			<h1>Team ID: {params.id}</h1>
			<h1>Create Project</h1>
			<div className="card lg:card-side bg-base-100 shadow-xl">
				<div className="card-body">
					<CreateProjectForm />
				</div>
				<figure><Image src={cover} alt="Album" width={400} height={400}/></figure>
			</div>
		</div>
	);
}