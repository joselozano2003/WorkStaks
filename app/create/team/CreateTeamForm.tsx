'use client';

export default function CreateTeamForm() {

    const createTeam = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const body = {
            name: formData.get('name'),
            description: formData.get('description'),
        }
        try{
            const res = await fetch('/api/team', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },

            })
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <>
            <h1 className='m-5 text-center font-bold text-2xl'>Create Team</h1>
            <form onSubmit={createTeam} className="form-control">
                <label className="font-bold" htmlFor="name">Team Name</label>
                <input type="text" name="name" className="input input-bordered w-full max-w-xs my-2 text-center" required={true}/>
                <label className="font-bold" htmlFor="title">Description</label>
                <input type="text" name='description' className="input input-bordered w-full max-w-xs my-2 text-center" required={true} />
                <button className="btn-primary btn mt-5 text-white" type="submit">Create Team</button>
            </form>
        </>
    )
}