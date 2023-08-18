import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Link from "next/link";

import type { User, Project, Task } from "@prisma/client";
import { getProject, getTasks } from "@/lib/functions";

import TasksCard from "@/components/cards/tasks/TasksCard";

interface Props {
    params: {
        id: string;
    };
}

interface CardProps {
    id: string;
}



export async function generateMetadata({ params }: Props) {
    const project = await getProject(params.id);
    return { title: `${project?.name}` };
}

export default async function Project({ params }: Props){

    const project: Project = await getProject(params.id);

    const tasks = await getTasks(params.id);

    console.log(tasks);
    console.log(tasks.length);
    

    return (
        <div className="p-5">
            <div className="text-center">
                <h1 className="font-bold text-3xl text-accent-focus pb-3">{project.name}</h1>
                <div className="flex justify-center">
                    { tasks.length == 0 ? <EmptyCard id = {params.id}/> : <TasksCard task={tasks[0]} />}
                </div>
                
            </div>
        </div>
    )
}


function EmptyCard({id}: CardProps){
    return (
        <div className="rounded-lg shadow-md p-5 bg-accent card w-80">
            <div className="flex justify-center items-center">
                <div className="flex items-center flex-col">
                    <h1 className="text-lg font-bold text-center pb-3">No Tasks in this Project!</h1>
                    <Link href= {`/create/task/${id}`} target="_blank">
                        <button className="btn btn-primary">Create Task</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}