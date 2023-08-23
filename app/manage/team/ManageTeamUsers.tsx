"use client";

interface Props {
    team: any
    errorVisible: (isVisible: boolean) => void;
    successMessage: (message: string) => void;
    successVisible: (isVisible: boolean) => void;
}

import ManageTeamUsersCard from "@/components/cards/user/ManageTeamUsersCard";

export default function ManageTeamUsers({ team, errorVisible, successMessage, successVisible }: Props) {
    return (
        <div className="card w-80 shadow-xl p-5 bg-neutral text-neutral-content">
            <h1 className="font-bold text-xl text-center">Manage Users</h1>
            <hr className="border-2 border-info rounded my-3"/>
            <div className="flex flex-wrap flex-row">
                {team?.members?.map((user: any) => (
                    <div>
                        <ManageTeamUsersCard team={team} user={user} errorVisible={errorVisible} successMessage={successMessage} successVisible={successVisible}/>
                    </div>
                ))}
            </div>
        </div>
    )
}