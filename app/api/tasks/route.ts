import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
    const projectId = req.nextUrl.searchParams.get('projectId')!;

    const tasks = await prisma.task.findMany({
        where: {
            project: {
                id: projectId
            }
        }
    })
    
    return NextResponse.json(tasks)
}