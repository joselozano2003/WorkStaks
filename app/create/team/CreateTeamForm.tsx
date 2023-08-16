'use client';

interface CreateTeamFormProps {
    errorVisible: (isVisible: boolean) => void;
    successMessage: (message: string) => void;
    successVisible: (isVisible: boolean) => void;
}

export default function CreateTeamForm(props: CreateTeamFormProps) {

    const { errorVisible, successMessage, successVisible } = props;


    const createTeam = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const body = {
            name: formData.get('name'),
            description: formData.get('description'),
        }
        try{
            const res = await fetch('/api/teams/team', {
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
                successMessage('Team created successfully!');
                successVisible(true);

                setTimeout(() => {
                    successVisible(false)
                    window.location.href = '/home'
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
            <h1 className='m-5 text-center font-bold text-2xl'>Create Team</h1>
            <form onSubmit={createTeam} className="form-control">
                <label className="font-bold" htmlFor="name">Team Name</label>
                <input type="text" name="name" className="input input-bordered w-full max-w-xs my-2 text-center" required={true}/>
                <label className="font-bold" htmlFor="title">Description</label>
                <input type="text" name='description' className="input input-bordered w-full max-w-xs my-2 text-center" required={true} />
                <button className="btn-primary btn mt-5 text-white" type="submit">Create Team</button>
            </form>
        </div>
    )
}