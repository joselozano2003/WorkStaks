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

    const tasks: Task[] = await getTasks(params.id);

    const leastImportant = tasks.filter((task: Task) => task.importance == 1);

    const important = tasks.filter((task: Task) => task.importance == 2);

    const mostImportant = tasks.filter((task: Task) => task.importance == 3);

    return (
        <div className="p-5">
            <div className="text-center">
                <h1 className="font-bold text-3xl text-accent-focus pb-3">{project.name}</h1>
                <div className="flex justify-center">
                    { tasks.length == 0 ? <EmptyCard id = {params.id}/> :

                        <div>
                            <Link href= {`/create/task/${params.id}`} target="_blank">
                                <button className="btn btn-primary">Create Task</button>
                            </Link>
                            <div className="mt-3 flex flex-wrap flex-row justify-around">
                                <div className="flex flex-col" id="leastImportant">
                                    {  leastImportant.map((task: Task) => {
                                            return (
                                                <TasksCard task={task} project={project}/>
                                            )
                                        })
                                    }
                                </div>
                                <div className="flex flex-col" id="important">
                                    {  important.map((task: Task) => {
                                            return (
                                                <TasksCard task={task} project={project}/>
                                            )
                                        })
                                    }
                                </div>

                                <div className="flex flex-col" id="mostImportant">
                                    {  mostImportant.map((task: Task) => {
                                            return (
                                                <TasksCard task={task} project={project}/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>


                    }
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