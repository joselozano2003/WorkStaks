import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Remove user from team
export async function DELETE(req: NextRequest) {
    const teamId = req.nextUrl.searchParams.get('teamId')!;
    const userId = req.nextUrl.searchParams.get('userId')!;

    console.log(teamId, userId);

    const team = await prisma.team.update({
        where: {
            id: teamId
        },
        data: {
            members: {
                disconnect: {
                    id: userId
                }
            }
        }
    });

    return NextResponse.json(team);
}