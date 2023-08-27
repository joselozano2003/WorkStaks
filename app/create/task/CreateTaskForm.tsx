"use client";

import { Project, User, Task } from "@prisma/client";

interface CreateTaskFormProps {
    errorVisible: (isVisible: boolean) => void;
    successMessage: (message: string) => void;
    successVisible: (isVisible: boolean) => void;
    project: Project | null;
    user: User | null;
}

export default function CreateTaskForm({ errorVisible, successMessage, successVisible, project, user }: CreateTaskFormProps) {

    const importanceOptions = [
        { value: 1, label: "Low" },
        { value: 2, label: "Medium" },
        { value: 3, label: "High" }
    ];

    const createTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const importance = parseInt(formData.get('importance') as string);

        const body = {
            name: formData.get('name'),
            description: formData.get('description'),
            importance: importance,
            projectId: project?.id,
            creatorId: user?.id,
        }
        
        try{
            const res = await fetch('/api/tasks/task', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },

            })

            if (!res.ok) {
                errorVisible(true);
        
                // Set a timer to hide the error alert after 5 seconds
                setTimeout(() => {
                    errorVisible(false);
                }, 5000);
            }
            else {
                successMessage('Task created successfully!');
                successVisible(true);

                setTimeout(() => {
                    successVisible(false)
                    window.location.href = `/team/project/${project?.id}`
                }, 5000);
            }
        }
        catch(err) {
            console.log("There is an error")
            console.log(err)
            errorVisible(true);

            setTimeout(() => {
                errorVisible(false);
            }, 5000);
        }

    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="m-5 text-center font-bold">
                <h1 className='text-2xl'>Create Task</h1>
                <h2 className="text-lg">In {project?.name}</h2>
            </div>
            <form onSubmit={createTask} className="form-control">
                <input type="text" name="name" className="input input-bordered w-full max-w-xs my-2 text-center" required={true} placeholder={"Name"}/>
                <input type="text" name='description' className="input input-bordered w-full max-w-xs my-2 text-center" required={true} placeholder={"Description"}/>
                <select name="importance" className="select select-bordered w-full max-w-xs my-2 text-center" required={true} placeholder="Importance">
                    {importanceOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <button className="btn-primary btn mt-5 text-white" type="submit">Create Task</button>
            </form>
        </div>
    )
}