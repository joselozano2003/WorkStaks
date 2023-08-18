import { Task } from "@prisma/client";

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



export default function TasksCard({ task }: Props) {

    const priority: number = task?.importance;

    const priorityColor = priorityColors[priority];
    return (
        <div className={`rounded-lg shadow-md p-5 ${priorityColor}`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-accent-focus mr-3"></div>
                    <h1 className="text-lg font-bold">{task.name}</h1>
                </div>
            </div>
        </div>
    )
}