import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
    const teamId = req.nextUrl.searchParams.get('teamId')!;

    const projects = await prisma.project.findMany({
        where: {
            team: {
                id: teamId
            }
        }
    })
    
    return NextResponse.json(projects)
}