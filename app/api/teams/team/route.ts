import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

// Create Team
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;

    const user = await prisma.user.findUnique({
        where: {
            email: currentUserEmail,
        },
    }).then((user) => user?.id!);

    const data = await req.json();

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

// Edit team name and description
export async function PUT(req: NextRequest) {
    const data = await req.json();

    console.log(data);

    const team = await prisma.team.update({
        where: {
            id: data.teamId,
        },
        data: {
            name: data.name,
            description: data.description,
        }
    });

    return NextResponse.json(team);
}

// Add user to team
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

// Get team
export async function GET(req: NextRequest) {

    const postId = req.nextUrl.searchParams.get('id')!;

    const team = await prisma.team.findUnique({
        where: { id: postId },
        include: { 
            members: true,
            owner: true,
        },
    });

    return NextResponse.json(team);
}

export async function DELETE(req: NextRequest) {

    const teamId = req.nextUrl.searchParams.get('id')!;

    const team = await prisma.team.delete({
        where: {
            id: teamId,
        },
    });

    return NextResponse.json(team);
}