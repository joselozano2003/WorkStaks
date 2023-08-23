import { getUserWithId } from "@/lib/functions";
import { Task, User } from "@prisma/client";

interface Props {
    task: Task;
}

interface PriorityColors {
    [key: number]: string;
}

const priorityColors: PriorityColors = {
    1: "bg-accent",
    2: "bg-warning",
    3: "bg-error"
};



export default async function TasksCard({ task }: Props) {

    const author = await getUserWithId(task.creatorId);

    const priority: number = task?.importance;

    const priorityColor = priorityColors[priority];
    return (
        <div className={`rounded-lg shadow-md p-5 ${priorityColor} card min-w-[15rem] m-3`}>
            <div id="card-content" className="flex items-center justify-center flex-col">
                <h1 className="text-2xl font-bold text-center">{task.name}</h1>
                <div>
                    <h2 className="text-center font-semibold">{task.description}</h2>
                    <p>Created by {author?.name}</p>
                </div>
            </div>

        </div>
    )
}