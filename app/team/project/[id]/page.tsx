import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Metadata } from 'next';

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import type { User } from "@prisma/client";
import { getUser } from "@/lib/functions";

interface Props {
    params: {
        id: string;
    };
}



export async function generateMetadata({ params }: Props) {
    const project = await prisma.project.findUnique({ where: { id: params.id } });
    return { title: `${project?.name}` };
}

export default async function Project(){
    const session = await getServerSession(authOptions);
    console.log(session);
    const user: User = await getUser(session);
    console.log(user);

    return (
        <div>
            <h1>Project</h1>
            <p>{user?.id}</p>
        </div>
    )
}