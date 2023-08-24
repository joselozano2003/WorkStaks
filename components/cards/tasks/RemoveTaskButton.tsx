"use client";
export default function RemoveTaskButton({ taskId, teamId }: any){

    const removeTask = async () => {
        const res = await fetch(`/api/tasks/task/?taskId=${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        
        console.log(res);
        
        if (res.ok) {
            window.location.href = `/team/${teamId}`
        }


    }
    return <button className="btn btn-xs btn-error invisible group-hover:visible absolute right-1 top-1" onClick={removeTask}>Remove</button>
}