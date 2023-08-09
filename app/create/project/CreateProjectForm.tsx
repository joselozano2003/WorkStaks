'use client';

export default function CreateProjectForm() {

    const createTeam = async (e: React.FormEvent<HTMLFormElement>) => {

    }

    return (
        <>
            <form onSubmit={createTeam} className="form-control">
                <label className="font-bold" htmlFor="title">Title</label>
                <input type="text" name="title" className="input input-bordered w-full max-w-xs my-2 text-center" required={true}/>
            </form>
            {/* <h2 className="card-title">New album is released!</h2>
            <p>Click the button to listen on Spotiwhy app.</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Listen</button>
            </div> */}
        </>
    )
}