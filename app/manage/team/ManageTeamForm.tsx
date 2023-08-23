"use client";

interface Props {
    team: any
    errorVisible: (isVisible: boolean) => void;
    successMessage: (message: string) => void;
    successVisible: (isVisible: boolean) => void;
}

export default function ManageTeamForm({ team, errorVisible, successMessage, successVisible }: Props) {

    const updateTeam = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);

        const body = {
            teamId: team.id,
            name: formData.get('name'),
            description: formData.get('description')
        }

        const res = await fetch(`/api/teams/team`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok){
            successMessage('Team Updated Successfully!');
            successVisible(true);

            setTimeout(() => {
                successVisible(false)
                window.location.href = `/team/${team.id}`
            }, 5000);
        }

        else {
            errorVisible(true);

            setTimeout(() => {
                errorVisible(false);
            }, 5000);
        }
    }

    return (
        <div className="card w-80 shadow-xl p-5 bg-warning max-h-[350px]">
            <h1 className="font-bold text-xl text-center">Edit Team</h1>
            <hr className="border-2 border-primary rounded my-3"/>
            <form onSubmit={updateTeam} className="form-control [&>label]:text-center">
                <label className="font-bold text-lg" htmlFor="name">Name</label>
                <input type="text" name="name" className="input input-bordered w-full max-w-xs my-2 text-center" defaultValue={team?.name ?? ''} />
                <label className="font-bold text-lg" htmlFor="description">Description</label>
                <input name="description" className="textarea textarea-bordered w-full max-w-xs my-2 text-center" defaultValue={team?.description ?? ''} />
                <div className="flex justify-center my-3 [&>*]:mx-4">
                    <button className="btn-primary btn" type="submit">Update</button>
                </div>
            </form>
        </div>
    )
}