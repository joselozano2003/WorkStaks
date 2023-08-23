'use client';

interface Props {
    user: any;
    errorVisible: (isVisible: boolean) => void;
    successMessage: (message: string) => void;
    successVisible: (isVisible: boolean) => void;
}

export default function ProfileForm({ user, errorVisible, successMessage, successVisible }: Props) {

    const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);

        const body = {
            userId: user.id,
            name: formData.get('name'),
            bio: formData.get('bio'),
            age: formData.get('age'),
            image: formData.get('image'),
        };

        const res = await fetch('/api/user/id', {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(res);
        
        if (res.ok){
            successMessage('User Updated Successfully!');
            successVisible(true);

            setTimeout(() => {
                successVisible(false)
                window.location.href = `/team/${user.id}`
            }, 5000);
        }

        else {
            errorVisible(true);

            setTimeout(() => {
                errorVisible(false);
            }, 5000);
        }
    };



    return (
        <div className="flex flex-col justify-center items-center">
            {/* {isErrorVisible && <ErrorAlert/>}
            {isSuccessVisible && <SuccessAlert message={success}/>} */}
            <div className="card w-80 bg-[#ffa230] shadow-2xl px-5 py-3 [&>*]:text-center">
                <h1 className='font-bold text-2xl'>Edit Profile</h1>
                <hr className="border-2 border-primary rounded my-3"/>
                <form onSubmit={updateUser} className="form-control">
                    <label className="font-bold" htmlFor="name">Name</label>
                    <input type="text" name="name" className="input input-bordered w-full max-w-xs my-2 text-center" defaultValue={user?.name ?? ''} />
                    <label htmlFor="bio" className="font-bold">Bio</label>
                    <textarea
                    className="textarea h-24 my-2 text-center"
                    name="bio"
                    cols={5}
                    rows={5}
                    defaultValue={user?.bio ?? ''}
                    ></textarea>
                    <label htmlFor="age" className="font-bold">Age</label>
                    <div className="flex justify-center">
                        <input className="input input-bordered w-[calc(50%)] max-w-xs text-center my-2 " type="number" name="age" defaultValue={user?.age ?? 0} />
                    </div>
                    <label htmlFor="image" className="font-bold">Profile Image URL</label>
                    <input className="input input-bordered my-2" type="text" name="image" defaultValue={user?.image ?? ''} />
                    <div className="flex justify-center my-3">
                        <button className="btn-primary btn w-[calc(50%)]" type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}