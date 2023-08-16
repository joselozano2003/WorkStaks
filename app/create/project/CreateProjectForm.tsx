'use client';

interface Member {
    id: string;
    name: string | null;
    bio: string | null;
    age: number | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
  }
  
  interface Team {
    id: string;
    name: string;
    description: string | null;
    ownerId: string;
    members: Member[];
  }

interface CreateTeamFormProps {
    errorVisible: (isVisible: boolean) => void;
    successMessage: (message: string) => void;
    successVisible: (isVisible: boolean) => void;
    team: Team | null;
}

export default function CreateProjectForm(props: CreateTeamFormProps) {

    const { errorVisible, successMessage, successVisible, team } = props;


    const createTeam = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const body = {
            name: formData.get('name'),
            description: formData.get('description'),
            teamId: team?.id,
        }
        try{
            const res = await fetch('/api/projects/project', {
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
                successMessage('Project created successfully!');
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
            <div className="m-5 text-center font-bold">
                <h1 className='text-2xl'>Create Project</h1>
                <h2 className="text-xl">In {team?.name}</h2>
            </div>
            <form onSubmit={createTeam} className="form-control">
                <label className="font-bold" htmlFor="name">Project Name</label>
                <input type="text" name="name" className="input input-bordered w-full max-w-xs my-2 text-center" required={true}/>
                <label className="font-bold" htmlFor="title">Description</label>
                <input type="text" name='description' className="input input-bordered w-full max-w-xs my-2 text-center" required={true} />
                <button className="btn-primary btn mt-5 text-white" type="submit">Create Project</button>
            </form>
        </div>
    )
}