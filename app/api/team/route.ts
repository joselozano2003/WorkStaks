import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;

    const user = await prisma.user.findUnique({
        where: {
            email: currentUserEmail,
        },
    }).then((user) => user?.id!);

    const data = await req.json();

    console.log(data);

    const team = await prisma.team.create({
        data: {
            name: data.name,
            description: data.description,
            owner: {
                connect: {
                    id: user,
                },
            },
            members: {
                connect: {
                    id: user,
                },
            },
        }
    });

    return NextResponse.json(team);
}

export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;

    const user = await prisma.user.findUnique({
        where: {
            email: currentUserEmail,
        },
    }).then((user) => user?.id!);

    const data = await req.json();

    console.log(data);

    const team = await prisma.team.update({
        where: {
            id: data.teamId,
        },
        data:{
            members: {
                connect: {
                    id: user,
                },
            },
        }
    });

    return NextResponse.json(team);
    
}