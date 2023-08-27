"use client";

import { Task } from "@prisma/client";

interface Props {
    task: Task;
    errorVisible: (isVisible: boolean) => void;
    successMessage: (message: string) => void;
    successVisible: (isVisible: boolean) => void;
}

export default function ManageTaskForm({ task, errorVisible, successMessage, successVisible }: Props) {

    const importanceOptions = [
        { value: 1, label: "Low" },
        { value: 2, label: "Medium" },
        { value: 3, label: "High" }
    ];

    const updateTask = async (e: React.FormEvent<HTMLFormElement>) => {
            
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const importance = parseInt(formData.get('importance') as string);

        const body = {
            taskId: task.id,
            name: formData.get('name'),
            description: formData.get('description'),
            importance: importance,
        }

        const res = await fetch(`/api/tasks/task`, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            errorVisible(true);
    
            // Set a timer to hide the error alert after 5 seconds
            setTimeout(() => {
                errorVisible(false);
            }, 5000);
        }
        else {
            successMessage('Task updated successfully!');
            successVisible(true);

            setTimeout(() => {
                successVisible(false)
                window.location.href = `/team/project/${task.projectId}`
            }, 5000);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="m-5 text-center font-bold">
                <h1 className='text-2xl'>Edit {task.name}</h1>
            </div>
            <form onSubmit={updateTask} className="form-control">
                <input type="text" name="name" className="input input-bordered w-full max-w-xs my-2 text-center" required={true} placeholder={"Name"} defaultValue={task.name ?? ""}/>
                <input type="text" name='description' className="input input-bordered w-full max-w-xs my-2 text-center" required={true} placeholder={"Description"} defaultValue={task.description ?? ""}/>
                <select name="importance" className="select select-bordered w-full max-w-xs my-2 text-center" required={true} placeholder="Importance">
                    {importanceOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <button className="btn-primary btn mt-5 text-white" type="submit">Update Task</button>
            </form>
        </div>
    )
}