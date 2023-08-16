import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";


export async function GET(req: NextRequest){

    const currentUserEmail = req.nextUrl.searchParams.get('email')!;

    const user = await prisma.user.findUnique({
        where: {
            email: currentUserEmail
        }
    });

    return NextResponse.json(user)
}