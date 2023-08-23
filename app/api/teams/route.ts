import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

// Get all teams that an user is a member of
export async function GET(req: NextRequest){

    const currentUserEmail = req.nextUrl.searchParams.get('email')!;

    const user = await prisma.user.findUnique({
        where: {
            email: currentUserEmail,
        },
    });

    const teams = await prisma.team.findMany({
        where: {
            members:{
                some: {
                    id: user?.id
                }
            }
        },
        include: {
            members: {
                select: {
                    id: true,
                    name: true,
                }
            }
        },
        orderBy: {
            name: 'asc'
        }
    });

    return NextResponse.json(teams);
}