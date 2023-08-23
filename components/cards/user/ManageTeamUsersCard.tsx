"use client";

import { URL } from "@/lib/constants";

interface User {
    id: string,
    name: string,
    email: 'string',
    image: string,
}

interface Props {
    user: User
    team: any

    errorVisible: (isVisible: boolean) => void;
    successMessage: (message: string) => void;
    successVisible: (isVisible: boolean) => void;
}

export default function ManageTeamUsersCard({ user, team, errorVisible, successMessage, successVisible }: Props) {

    const deleteUser = async () => {
        const res = await fetch(`${URL}/api/teams/team/user/?teamId=${team.id}&userId=${user.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
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
            successMessage('User Deleted Successfully!');
            successVisible(true);

            setTimeout(() => {
                successVisible(false)
                window.location.href = '/home'
            }, 5000);
        }
    
        return res.json();
    }

    return (
        <div key={user.id} className="group relative m-5">
            <div>
                <img src={user?.image!} alt={user?.name!} width={100} height={100} referrerPolicy="no-referrer"/>
                <p className="font-bold">{user.name}</p>
            </div>
            {
                team?.ownerId == user?.id ? <></> : 
                <button className="btn btn-xs btn-error invisible group-hover:visible  absolute -right-6 top-1" onClick={deleteUser}>Delete</button> // Admin can't delete themselves
            }
        </div>
    )
}