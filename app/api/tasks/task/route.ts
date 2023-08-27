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

export async function DELETE(req: NextRequest) {

    const taskId = req.nextUrl.searchParams.get('taskId')!;

    console.log(taskId);

    const task = await prisma.task.delete({
        where: {
            id: taskId
        }
    });

    return NextResponse.json(task)
}

export async function GET(req: NextRequest) {

    const taskId = req.nextUrl.searchParams.get('taskId')!;

    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    });

    return NextResponse.json(task)
}

export async function PATCH(req: NextRequest) {
    
    const data = await req.json();

    const task = await prisma.task.update({
        where: {
            id: data.taskId
        },
        data: {
            name: data.name,
            description: data.description,
            importance: data.importance,
        }
    });

    return NextResponse.json(task);
}