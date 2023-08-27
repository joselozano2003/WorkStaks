import { getTask } from "@/lib/functions";
import { Task } from "@prisma/client";

import ManageTaskCard from "../ManageTaskCard";

interface Props {
    params: {
        id: string;
    };
}

export const metadata = {
    title: 'Edit Task',
    description: 'Edit Task',
};

interface PriorityColors {
    [key: number]: string;
}

const priorityColors: PriorityColors = {
    1: "text-accent",
    2: "text-warning",
    3: "text-error"
};

export default async function EditTask({ params }: Props) {
    const task: Task = await getTask(params.id);

    const priority: number = task?.importance;

    const priorityColor = priorityColors[priority];

    return (
        <div className="min-h-[calc(100vh-64px)] mb-12">
            <div className="flex flex-col items-center m-0 min-h-[calc(100vh-64px)] justify-center">
                <ManageTaskCard task={task} />
            </div>
        </div>
    )
}