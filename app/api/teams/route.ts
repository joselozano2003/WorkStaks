import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest){

    const currentUserEmail = req.nextUrl.searchParams.get('email')!;

    console.log(currentUserEmail);

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
        orderBy: {
            name: 'asc'
        }
    });

    return NextResponse.json(teams);
}