"use client";

import userIcon from "@/public/userIcon.png";
import Link from "next/link";

import { URL } from "@/lib/constants"

interface Props {
    user: any;
    team: any;
    errorVisible: (isVisible: boolean) => void;
    successMessage: (message: string) => void;
    successVisible: (isVisible: boolean) => void;
}

export default function TeamListItem({ user, team, errorVisible, successMessage, successVisible }: Props) {

    const leaveTeam = async () => {

        const res = await fetch(`$/api/teams/team/user/?teamId=${team.id}&userId=${user.id}`, {
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
            successMessage('Exited Team Successfully!');
            successVisible(true);

            setTimeout(() => {
                successVisible(false)
                window.location.href = '/home'
            }, 5000);
        }
    
        return res.json();
    }

    const numberOfMembers = team.members.length;

    const idAdmin = team.ownerId === user.id;
    
    return (
        <div className="my-4 flex flex-row justify-between group">

            <Link href={`/team/${team.id}`}>
                <h1 className="font-bold">{team.name}</h1>
            </Link>
            
            <div className="flex flex-row [&>*]:mx-1">
                <p>{numberOfMembers}</p>
                <img src={userIcon.src} alt="user icon" className="w-5 h-5 mt-[0.1rem]"/>
            </div>

            {idAdmin ? 
                <Link href={`/manage/team/${team.id}`} className="invisible group-hover:visible absolute right-5">
                    <button className="btn btn-xs btn-accent">Admin</button> 
                </Link>
                : 
                <button className="btn btn-xs btn-error invisible group-hover:visible absolute right-5" onClick={leaveTeam}>Leave</button>
            }

        </div>
    );

}