import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const data = await req.json();

    const task = await prisma.task.create({
        data: {
            name: data.name,
            description: data.description,
            projectId: data.projectId,
            importance: data.importance,
            creatorId: data.creatorId,
        }
    });

    return NextResponse.json(task);
}