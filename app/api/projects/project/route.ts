import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get('projectId')!;

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
    });

    return NextResponse.json(project);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;

    const user = await prisma.user.findUnique({
        where: {
            email: currentUserEmail,
        },
    });

    const data = await req.json();

    console.log(data);

    const isMember = await prisma.team.findUnique({ 
        where: { 
            id: data.teamId 
        }, 
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
    });

    if (!isMember) {
        return NextResponse.json({ 
            message : "You are not member of this team!" 
        }, { 
            status: 403 
        });
    };

    const project = await prisma.project.create({
        data: {
            name: data.name,
            description: data.description,
            team: {
                connect: {
                    id: data.teamId,
                },
            },
        },
    });

    return NextResponse.json(project);
}