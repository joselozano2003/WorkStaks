import { getProject, getUser } from "@/lib/functions";
import type { User } from "@prisma/client";

import CreateTaskCard from "../CreateTaskCard";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Props {
    params: {
        id: string;
    };
}

export default async function CreateTask({ params }: Props) {

    const session = await getServerSession(authOptions);

    const currentUserEmail = session?.user?.email!;

    const user: User = await getUser(currentUserEmail)


    const project = await getProject(params.id);

    return (
        <div className="flex flex-col items-center m-0 min-h-[calc(100vh-64px)] justify-center">
            <CreateTaskCard project={project} user={user}/>
        </div>
    )
}

