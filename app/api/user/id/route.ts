import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest){
    const id = req.nextUrl.searchParams.get('userId')!;

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    return NextResponse.json(user)
}

// Modify User Profile
export async function PUT(req: NextRequest){
    const data = await req.json();
    
    const user = await prisma.user.update({
        where: {
            id: data.userId,
        },
        data: {
            name: data.name,
            bio: data.bio,
            age: parseInt(data.age),
            image: data.image,
        }
    })

    return NextResponse.json(user);
}